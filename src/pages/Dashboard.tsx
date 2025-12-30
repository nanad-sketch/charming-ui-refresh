import { Package, ShoppingCart, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { inventoryItems, orders, stockAlerts, recentActivity } from '@/data/sampleData';
import { cn } from '@/lib/utils';

const statCards = [
  {
    title: 'Total Items',
    value: inventoryItems.length,
    icon: Package,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    title: 'Pending',
    value: orders.filter((o) => o.status === 'pending' || o.status === 'in-transit').length,
    icon: ShoppingCart,
    color: 'text-info',
    bgColor: 'bg-info/10',
  },
  {
    title: 'Alerts',
    value: stockAlerts.length,
    icon: AlertTriangle,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    title: 'In Stock',
    value: inventoryItems.filter((i) => i.status === 'in-stock').length,
    icon: TrendingUp,
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

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

  return (
    <MobileLayout title="Dashboard">
      <div className="p-4 space-y-4">
        {/* Welcome Header */}
        <div className="animate-fade-in">
          <h1 className="text-xl font-bold text-foreground">
            Welcome, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-sm text-muted-foreground">
            Here's your inventory overview
          </p>
        </div>

        {/* Stats Grid - 2x2 on mobile */}
        <div className="grid grid-cols-2 gap-3">
          {statCards.map((stat, index) => (
            <Card
              key={stat.title}
              className="card-shadow animate-slide-up active:scale-95 transition-transform"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={cn('p-2 rounded-xl', stat.bgColor)}>
                    <stat.icon className={cn('w-5 h-5', stat.color)} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stock Alerts */}
        <Card className="card-shadow animate-slide-up" style={{ animationDelay: '200ms' }}>
          <CardHeader className="pb-2 px-4 pt-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                Stock Alerts
              </CardTitle>
              <Badge variant="secondary" className="text-xs">
                {stockAlerts.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-2">
            {stockAlerts.slice(0, 3).map((alert) => (
              <div
                key={alert.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 active:bg-muted transition-colors"
              >
                <Badge className={cn('text-[10px] px-2', getSeverityStyles(alert.severity))}>
                  {alert.severity}
                </Badge>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{alert.itemName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress
                      value={(alert.currentStock / alert.minStock) * 100}
                      className="h-1 flex-1"
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {alert.currentStock}/{alert.minStock}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="card-shadow animate-slide-up" style={{ animationDelay: '300ms' }}>
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-2">
            {recentActivity.slice(0, 4).map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {activity.description}
                  </p>
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                  {formatTime(activity.timestamp)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Low Stock Preview */}
        <Card className="card-shadow animate-slide-up" style={{ animationDelay: '400ms' }}>
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-base">Low Stock Items</CardTitle>
            <CardDescription className="text-xs">Items needing reorder</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-2">
              {inventoryItems
                .filter((item) => item.status !== 'in-stock')
                .slice(0, 3)
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <Package className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={cn(
                        'text-[10px]',
                        item.status === 'out-of-stock'
                          ? 'bg-destructive/10 text-destructive'
                          : 'bg-warning/10 text-warning'
                      )}
                    >
                      {item.quantity} left
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
}
