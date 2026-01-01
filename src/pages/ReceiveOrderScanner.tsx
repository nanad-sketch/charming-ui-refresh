import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRScanner } from '@/components/scanner/QRScanner';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Package, Truck, Calendar, Hash } from 'lucide-react';
import { orders } from '@/data/sampleData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function ReceiveOrderScanner() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(true);
  const [scannedOrder, setScannedOrder] = useState<typeof orders[0] | null>(null);

  const handleScan = (result: string) => {
    // Simulate finding order by scanned code
    const order = orders.find(o => 
      o.orderNumber.toLowerCase() === result.toLowerCase()
    ) || orders.find(o => o.status === 'in-transit') || orders[0];

    setScannedOrder(order);
    setIsScanning(false);
  };

  const handleConfirmReceive = () => {
    if (scannedOrder) {
      toast.success(`Order ${scannedOrder.orderNumber} marked as received`);
      navigate('/dashboard');
    }
  };

  const handleScanAnother = () => {
    setScannedOrder(null);
    setIsScanning(true);
  };

  if (isScanning) {
    return (
      <QRScanner
        onScan={handleScan}
        onClose={() => navigate('/dashboard')}
        title="Receive Order"
        subtitle="Scan order QR when delivery arrives"
      />
    );
  }

  return (
    <MobileLayout title="Confirm Receipt" showBack onBack={() => setIsScanning(true)}>
      <div className="p-4 space-y-4">
        {scannedOrder && (
          <>
            {/* Order Card */}
            <Card className="animate-slide-up">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-semibold text-foreground text-lg">{scannedOrder.orderNumber}</h2>
                    <p className="text-sm text-muted-foreground">{scannedOrder.supplier}</p>
                  </div>
                  <Badge className={cn(
                    'flex items-center gap-1',
                    scannedOrder.status === 'in-transit' && 'bg-info/10 text-info',
                    scannedOrder.status === 'pending' && 'bg-warning/10 text-warning',
                    scannedOrder.status === 'received' && 'bg-success/10 text-success'
                  )}>
                    <Truck className="w-3 h-3" />
                    {scannedOrder.status.replace('-', ' ')}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Expected:</span>
                    <span className="text-foreground">{scannedOrder.expectedDelivery}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Hash className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Items:</span>
                    <span className="text-foreground">{scannedOrder.items.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items List */}
            <Card className="animate-slide-up" style={{ animationDelay: '50ms' }}>
              <CardContent className="p-4">
                <p className="text-sm font-medium text-foreground mb-3">Order Items</p>
                <div className="space-y-3">
                  {scannedOrder.items.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
                    >
                      <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                        <Package className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3 pt-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <Button 
                className="w-full h-14 text-base"
                onClick={handleConfirmReceive}
              >
                <Check className="w-5 h-5 mr-2" />
                Confirm Order Received
              </Button>
              <Button 
                variant="outline"
                className="w-full"
                onClick={handleScanAnother}
              >
                Scan Another Order
              </Button>
            </div>
          </>
        )}
      </div>
    </MobileLayout>
  );
}
