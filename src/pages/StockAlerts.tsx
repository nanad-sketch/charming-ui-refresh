import { AlertTriangle, Bell, Package, TrendingDown } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
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
        return 'bg-destructive/10 text-destructive';
      case 'warning':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-info/10 text-info';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'warning':
        return <TrendingDown className="w-5 h-5 text-warning" />;
      default:
        return <Bell className="w-5 h-5 text-info" />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return 'Just now';
  };

  return (
    <MobileLayout title="Stock Alerts">
      <div className="p-4 space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 animate-fade-in">
          <Card className="card-shadow">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <p className="text-2xl font-bold text-foreground">{criticalCount}</p>
              <p className="text-[10px] text-muted-foreground">Critical</p>
            </CardContent>
          </Card>
          <Card className="card-shadow">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-2">
                <TrendingDown className="w-5 h-5 text-warning" />
              </div>
              <p className="text-2xl font-bold text-foreground">{warningCount}</p>
              <p className="text-[10px] text-muted-foreground">Warning</p>
            </CardContent>
          </Card>
          <Card className="card-shadow">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stockAlerts.length}</p>
              <p className="text-[10px] text-muted-foreground">Total</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts List */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground animate-fade-in">Active Alerts</h3>
          {stockAlerts.map((alert, index) => (
            <Card
              key={alert.id}
              className={cn(
                'card-shadow animate-slide-up active:scale-[0.98] transition-transform',
                alert.severity === 'critical' && 'border-l-4 border-l-destructive',
                alert.severity === 'warning' && 'border-l-4 border-l-warning'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    'p-2 rounded-xl flex-shrink-0',
                    alert.severity === 'critical' ? 'bg-destructive/10' : 'bg-warning/10'
                  )}>
                    {getSeverityIcon(alert.severity)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="font-semibold text-foreground">{alert.itemName}</p>
                        <Badge className={cn('text-[10px] mt-1', getSeverityStyles(alert.severity))}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                        {formatTime(alert.createdAt)}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Stock: {alert.currentStock} / {alert.minStock}</span>
                      </div>
                      <Progress
                        value={(alert.currentStock / alert.minStock) * 100}
                        className={cn(
                          'h-1.5',
                          alert.severity === 'critical' ? '[&>div]:bg-destructive' : '[&>div]:bg-warning'
                        )}
                      />
                    </div>
                    <Button size="sm" variant="outline" className="mt-3 h-8 text-xs w-full">
                      <Package className="w-3 h-3 mr-1" />
                      Reorder
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
