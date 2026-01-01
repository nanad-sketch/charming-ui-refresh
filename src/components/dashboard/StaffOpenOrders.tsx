import { ShoppingCart, Truck, Clock, CheckCircle, ChevronRight, QrCode } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { orders } from '@/data/sampleData';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export function StaffOpenOrders() {
  const navigate = useNavigate();
  const openOrders = orders.filter(o => o.status === 'pending' || o.status === 'in-transit');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-transit':
        return <Truck className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <ShoppingCart className="w-4 h-4" />;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'in-transit':
        return 'bg-info/10 text-info';
      case 'pending':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="card-shadow animate-slide-up">
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-info" />
            Open Orders
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={() => navigate('/receive-order')}
            >
              <QrCode className="w-3 h-3" />
              Scan
            </Button>
            <button 
              onClick={() => navigate('/orders')}
              className="text-xs text-primary flex items-center gap-1"
            >
              View All <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-2">
        {openOrders.slice(0, 4).map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between p-3 rounded-xl bg-muted/50 active:bg-muted transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{order.orderNumber}</p>
              <p className="text-xs text-muted-foreground">{order.supplier}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={cn('flex items-center gap-1 text-[10px]', getStatusStyles(order.status))}>
                {getStatusIcon(order.status)}
                {order.status.replace('-', ' ')}
              </Badge>
            </div>
          </div>
        ))}
        {openOrders.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No open orders</p>
        )}
      </CardContent>
    </Card>
  );
}
