import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRScanner } from '@/components/scanner/QRScanner';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Package, Minus, Plus, X } from 'lucide-react';
import { inventoryItems } from '@/data/sampleData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function StockOutScanner() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(true);
  const [scannedProduct, setScannedProduct] = useState<typeof inventoryItems[0] | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleScan = (result: string) => {
    // Simulate finding product by scanned code
    // In real app, this would lookup by barcode/QR code
    const product = inventoryItems.find(item => 
      item.id === result || 
      item.name.toLowerCase().includes(result.toLowerCase())
    ) || inventoryItems[0]; // Fallback to first item for demo

    setScannedProduct(product);
    setIsScanning(false);
    setQuantity(1);
  };

  const handleConfirmStockOut = () => {
    if (scannedProduct) {
      toast.success(`Stocked out ${quantity}x ${scannedProduct.name}`);
      navigate('/dashboard');
    }
  };

  const handleScanAnother = () => {
    setScannedProduct(null);
    setIsScanning(true);
  };

  if (isScanning) {
    return (
      <QRScanner
        onScan={handleScan}
        onClose={() => navigate('/dashboard')}
        title="Stock Out"
        subtitle="Scan product for customer purchase"
      />
    );
  }

  return (
    <MobileLayout title="Confirm Stock Out" showBack onBack={() => setIsScanning(true)}>
      <div className="p-4 space-y-4">
        {scannedProduct && (
          <>
            {/* Product Card */}
            <Card className="animate-slide-up">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center">
                    <Package className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-foreground">{scannedProduct.name}</h2>
                    <p className="text-sm text-muted-foreground">{scannedProduct.category}</p>
                    <p className="text-xs text-muted-foreground mt-1">ID: {scannedProduct.id}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className={cn(
                        scannedProduct.status === 'in-stock' && 'bg-success/10 text-success border-success/20',
                        scannedProduct.status === 'low-stock' && 'bg-warning/10 text-warning border-warning/20',
                        scannedProduct.status === 'out-of-stock' && 'bg-destructive/10 text-destructive border-destructive/20'
                      )}>
                        {scannedProduct.quantity} in stock
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quantity Selector */}
            <Card className="animate-slide-up" style={{ animationDelay: '50ms' }}>
              <CardContent className="p-4">
                <p className="text-sm font-medium text-foreground mb-3">Quantity</p>
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-12 h-12 rounded-full"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-5 h-5" />
                  </Button>
                  <span className="text-3xl font-bold text-foreground w-16 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-12 h-12 rounded-full"
                    onClick={() => setQuantity(Math.min(scannedProduct.quantity, quantity + 1))}
                    disabled={quantity >= scannedProduct.quantity}
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3 pt-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <Button 
                className="w-full h-14 text-base"
                onClick={handleConfirmStockOut}
              >
                <Check className="w-5 h-5 mr-2" />
                Confirm Stock Out
              </Button>
              <Button 
                variant="outline"
                className="w-full"
                onClick={handleScanAnother}
              >
                Scan Another Product
              </Button>
            </div>
          </>
        )}
      </div>
    </MobileLayout>
  );
}
