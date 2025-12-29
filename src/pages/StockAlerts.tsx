import { AlertTriangle, Bell, Package, TrendingDown } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { stockAlerts, inventoryItems } from '@/data/sampleData';
import { cn } from '@/lib/utils';

export default function StockAlerts() {
  const criticalCount = stockAlerts.filter((a) => a.severity === 'critical').length;
  const warningCount = stockAlerts.filter((a) => a.severity === 'warning').length;

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive text-destructive-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-info text-info-foreground';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5" />;
      case 'warning':
        return <TrendingDown className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <AlertTriangle className="w-7 h-7 text-warning" />
              Stock Alerts
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor items that need immediate attention
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="card-shadow hover-lift animate-slide-up border-l-4 border-l-destructive">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Critical</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{criticalCount}</p>
                  <p className="text-xs text-muted-foreground mt-1">Out of stock items</p>
                </div>
                <div className="p-3 rounded-lg bg-destructive/10">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="card-shadow hover-lift animate-slide-up border-l-4 border-l-warning"
            style={{ animationDelay: '100ms' }}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Warning</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{warningCount}</p>
                  <p className="text-xs text-muted-foreground mt-1">Low stock items</p>
                </div>
                <div className="p-3 rounded-lg bg-warning/10">
                  <TrendingDown className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="card-shadow hover-lift animate-slide-up border-l-4 border-l-primary"
            style={{ animationDelay: '200ms' }}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Total Alerts</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stockAlerts.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Requiring attention</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <Bell className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts List */}
        <Card className="card-shadow animate-slide-up" style={{ animationDelay: '300ms' }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Active Alerts</CardTitle>
            <CardDescription>Items that need to be restocked</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stockAlerts.map((alert, index) => {
              const item = inventoryItems.find(
                (i) => i.name.toLowerCase() === alert.itemName.toLowerCase()
              );
              return (
                <div
                  key={alert.id}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 hover:shadow-md animate-fade-in',
                    alert.severity === 'critical'
                      ? 'border-destructive/30 bg-destructive/5'
                      : 'border-warning/30 bg-warning/5'
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={cn(
                      'p-3 rounded-lg',
                      alert.severity === 'critical' ? 'bg-destructive/10' : 'bg-warning/10'
                    )}
                  >
                    {getSeverityIcon(alert.severity)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-foreground">{alert.itemName}</p>
                      <Badge className={cn('text-xs', getSeverityStyles(alert.severity))}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">
                            Stock: {alert.currentStock} / {alert.minStock}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(alert.createdAt)}
                          </span>
                        </div>
                        <Progress
                          value={(alert.currentStock / alert.minStock) * 100}
                          className={cn(
                            'h-2',
                            alert.severity === 'critical'
                              ? '[&>div]:bg-destructive'
                              : '[&>div]:bg-warning'
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <Button size="sm" variant="outline" className="hover-glow shrink-0">
                    <Package className="w-4 h-4 mr-2" />
                    Reorder
                  </Button>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
