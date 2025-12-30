import { LayoutDashboard, Package, ShoppingCart, AlertTriangle, User } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Inventory', url: '/inventory', icon: Package },
  { title: 'Orders', url: '/orders', icon: ShoppingCart },
  { title: 'Alerts', url: '/alerts', icon: AlertTriangle },
  { title: 'Profile', url: '/profile', icon: User },
];

export function MobileNavigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.title}
              to={item.url}
              className={cn(
                'flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-200 relative',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full" />
              )}
              <item.icon className={cn(
                'w-5 h-5 transition-transform duration-200',
                isActive && 'scale-110'
              )} />
              <span className="text-[10px] font-medium">{item.title}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
