import { Package, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { stockAlerts } from '@/data/sampleData';

interface MobileHeaderProps {
  title?: string;
}

export function MobileHeader({ title }: MobileHeaderProps) {
  const { user } = useAuth();
  const alertCount = stockAlerts.filter(a => a.severity === 'critical').length;

  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border safe-area-top">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Package className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">
            {title || 'Inventory'}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            {alertCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px]"
              >
                {alertCount}
              </Badge>
            )}
          </button>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
