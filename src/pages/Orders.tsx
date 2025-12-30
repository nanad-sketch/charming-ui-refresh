import { useState } from 'react';
import { ShoppingCart, Search, Truck, Clock, CheckCircle, XCircle, Plus } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { orders } from '@/data/sampleData';
import { cn } from '@/lib/utils';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

export default function Orders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  const tabs = ['all', 'received', 'in-transit', 'pending'];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-transit':
        return <Truck className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <ShoppingCart className="w-4 h-4" />;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'received':
        return 'bg-success/10 text-success';
      case 'in-transit':
        return 'bg-info/10 text-info';
      case 'pending':
        return 'bg-warning/10 text-warning';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <MobileLayout title="Orders">
      <div className="p-4 space-y-4">
        {/* Search */}
        <div className="relative animate-fade-in">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 rounded-xl"
          />
        </div>

        {/* Tab Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide animate-slide-up">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2',
                activeTab === tab
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {tab === 'all' ? 'All' : tab.replace('-', ' ')}
              <span className={cn(
                'text-xs px-1.5 rounded-full',
                activeTab === tab ? 'bg-primary-foreground/20' : 'bg-foreground/10'
              )}>
                {tab === 'all' 
                  ? orders.length 
                  : orders.filter(o => o.status === tab).length}
              </span>
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {filteredOrders.map((order, index) => (
            <Card
              key={order.id}
              className="card-shadow animate-slide-up active:scale-[0.98] transition-transform"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedOrder(order)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-foreground">{order.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">{order.supplier}</p>
                  </div>
                  <Badge className={cn('flex items-center gap-1', getStatusStyles(order.status))}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize text-[10px]">{order.status.replace('-', ' ')}</span>
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{order.items.length} items</span>
                    <span>{new Date(order.expectedDelivery).toLocaleDateString()}</span>
                  </div>
                  <span className="font-bold text-foreground">
                    ${order.totalAmount.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No orders found</p>
          </div>
        )}

        {/* FAB */}
        <Button
          size="icon"
          className="fixed bottom-20 right-4 w-14 h-14 rounded-full shadow-lg z-40 animate-scale-in"
        >
          <Plus className="w-6 h-6" />
        </Button>

        {/* Order Detail Drawer */}
        <Drawer open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DrawerContent className="max-h-[85vh]">
            <DrawerHeader>
              <DrawerTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                {selectedOrder?.orderNumber}
              </DrawerTitle>
              <DrawerDescription>{selectedOrder?.supplier}</DrawerDescription>
            </DrawerHeader>

            {selectedOrder && (
              <div className="px-4 pb-8 space-y-4 overflow-auto">
                <div className="flex items-center justify-between">
                  <Badge className={cn('flex items-center gap-1', getStatusStyles(selectedOrder.status))}>
                    {getStatusIcon(selectedOrder.status)}
                    <span className="capitalize">{selectedOrder.status.replace('-', ' ')}</span>
                  </Badge>
                  <span className="text-2xl font-bold text-foreground">
                    ${selectedOrder.totalAmount.toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-muted/50">
                    <p className="text-xs text-muted-foreground">Order Date</p>
                    <p className="font-medium text-foreground">
                      {new Date(selectedOrder.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50">
                    <p className="text-xs text-muted-foreground">Expected Delivery</p>
                    <p className="font-medium text-foreground">
                      {new Date(selectedOrder.expectedDelivery).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Order Items</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/30"
                      >
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DrawerContent>
        </Drawer>
      </div>
    </MobileLayout>
  );
}
