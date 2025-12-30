import { useAuth } from '@/contexts/AuthContext';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Package, ShoppingCart, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { inventoryItems, orders, stockAlerts } from '@/data/sampleData';
import { cn } from '@/lib/utils';

// Staff Components
import { StaffOpenOrders } from '@/components/dashboard/StaffOpenOrders';
import { StaffInventory } from '@/components/dashboard/StaffInventory';
import { StaffStockOut } from '@/components/dashboard/StaffStockOut';

// Manager Components
import { ManagerStockAlerts } from '@/components/dashboard/ManagerStockAlerts';
import { ManagerOpenOrders } from '@/components/dashboard/ManagerOpenOrders';
import { ManagerRegisterStaff } from '@/components/dashboard/ManagerRegisterStaff';
import { ManagerAddProduct } from '@/components/dashboard/ManagerAddProduct';

// Shared stat cards data
const getStatCards = (role: string) => {
  if (role === 'manager') {
    return [
      {
        title: 'Total Items',
        value: inventoryItems.length,
        icon: Package,
        color: 'text-primary',
        bgColor: 'bg-primary/10',
      },
      {
        title: 'Alerts',
        value: stockAlerts.length,
        icon: AlertTriangle,
        color: 'text-warning',
        bgColor: 'bg-warning/10',
      },
      {
        title: 'Open Orders',
        value: orders.filter((o) => o.status === 'pending' || o.status === 'in-transit').length,
        icon: ShoppingCart,
        color: 'text-info',
        bgColor: 'bg-info/10',
      },
      {
        title: 'In Stock',
        value: inventoryItems.filter((i) => i.status === 'in-stock').length,
        icon: TrendingUp,
        color: 'text-success',
        bgColor: 'bg-success/10',
      },
    ];
  }

  return [
    {
      title: 'Open Orders',
      value: orders.filter((o) => o.status === 'pending' || o.status === 'in-transit').length,
      icon: ShoppingCart,
      color: 'text-info',
      bgColor: 'bg-info/10',
    },
    {
      title: 'In Stock',
      value: inventoryItems.filter((i) => i.status === 'in-stock').length,
      icon: Package,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Low Stock',
      value: inventoryItems.filter((i) => i.status === 'low-stock').length,
      icon: AlertTriangle,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      title: 'Out of Stock',
      value: inventoryItems.filter((i) => i.status === 'out-of-stock').length,
      icon: AlertTriangle,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    },
  ];
};

export default function Dashboard() {
  const { user } = useAuth();
  const isManager = user?.role === 'manager';
  const statCards = getStatCards(user?.role || 'staff');

  return (
    <MobileLayout title="Dashboard">
      <div className="p-4 space-y-4">
        {/* Welcome Header */}
        <div className="animate-fade-in">
          <h1 className="text-xl font-bold text-foreground">
            Welcome, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-sm text-muted-foreground">
            {isManager ? 'Manager Dashboard' : 'Staff Dashboard'}
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

        {/* Role-specific content */}
        {isManager ? (
          // Manager Dashboard
          <>
            <ManagerStockAlerts />
            <ManagerOpenOrders />
            <div className="grid grid-cols-1 gap-3">
              <ManagerRegisterStaff />
              <ManagerAddProduct />
            </div>
          </>
        ) : (
          // Staff Dashboard
          <>
            <StaffOpenOrders />
            <StaffInventory />
            <StaffStockOut />
          </>
        )}
      </div>
    </MobileLayout>
  );
}
