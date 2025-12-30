import { AlertTriangle, Package, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { inventoryItems } from '@/data/sampleData';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export function StaffStockOut() {
  const navigate = useNavigate();
  const outOfStockItems = inventoryItems.filter(i => i.status === 'out-of-stock' || i.status === 'low-stock');

  return (
    <Card className="card-shadow animate-slide-up" style={{ animationDelay: '200ms' }}>
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            Stock Out
          </CardTitle>
          <Badge variant="destructive" className="text-[10px]">
            {outOfStockItems.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-2">
        {outOfStockItems.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex items-center justify-between p-3 rounded-xl",
              item.status === 'out-of-stock' ? 'bg-destructive/10' : 'bg-warning/10'
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                item.status === 'out-of-stock' ? 'bg-destructive/20' : 'bg-warning/20'
              )}>
                <Package className={cn(
                  "w-5 h-5",
                  item.status === 'out-of-stock' ? 'text-destructive' : 'text-warning'
                )} />
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
                  ? 'bg-destructive/20 text-destructive' 
                  : 'bg-warning/20 text-warning'
              )}
            >
              {item.quantity} left
            </Badge>
          </div>
        ))}
        {outOfStockItems.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">All items in stock!</p>
        )}
      </CardContent>
    </Card>
  );
}
