import { Package, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { inventoryItems } from '@/data/sampleData';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export function StaffInventory() {
  const navigate = useNavigate();
  const inStockItems = inventoryItems.filter(i => i.status === 'in-stock').slice(0, 4);

  const getStockPercentage = (quantity: number, minStock: number) => {
    return Math.min((quantity / (minStock * 2)) * 100, 100);
  };

  return (
    <Card className="card-shadow animate-slide-up" style={{ animationDelay: '100ms' }}>
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Package className="w-4 h-4 text-primary" />
            Inventory
          </CardTitle>
          <button 
            onClick={() => navigate('/inventory')}
            className="text-xs text-primary flex items-center gap-1"
          >
            View All <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-2">
        {inStockItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
          >
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                <span className="text-xs text-muted-foreground ml-2">{item.quantity} units</span>
              </div>
              <Progress
                value={getStockPercentage(item.quantity, item.minStock)}
                className="h-1.5 mt-2 [&>div]:bg-success"
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
