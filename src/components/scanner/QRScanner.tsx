import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, X, Flashlight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QRScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export function QRScanner({ onScan, onClose, title = "Scan QR Code", subtitle }: QRScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startScanner = async () => {
      try {
        scannerRef.current = new Html5Qrcode("qr-reader");
        
        await scannerRef.current.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            onScan(decodedText);
            stopScanner();
          },
          () => {
            // Ignore errors during scanning
          }
        );
        
        setIsScanning(true);
        setError(null);
      } catch (err) {
        console.error("Error starting scanner:", err);
        setError("Unable to access camera. Please grant camera permissions.");
      }
    };

    startScanner();

    return () => {
      stopScanner();
    };
  }, [onScan]);

  const stopScanner = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current = null;
        setIsScanning(false);
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
  };

  const handleClose = () => {
    stopScanner();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col safe-area-inset">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-background/95 backdrop-blur">
        <div>
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="rounded-full"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Scanner Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {error ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
              <Camera className="w-8 h-8 text-destructive" />
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">{error}</p>
            <Button onClick={handleClose} variant="outline">
              Go Back
            </Button>
          </div>
        ) : (
          <div className="relative w-full max-w-sm">
            {/* Scanner viewport */}
            <div 
              id="qr-reader" 
              className="w-full aspect-square rounded-2xl overflow-hidden bg-muted"
            />
            
            {/* Scanning overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 border-2 border-primary/50 rounded-2xl" />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-2xl" />
              
              {/* Scanning line animation */}
              <div className="absolute left-4 right-4 h-0.5 bg-primary animate-pulse top-1/2" />
            </div>
          </div>
        )}

        <p className="text-sm text-muted-foreground mt-6 text-center">
          Position the QR code within the frame
        </p>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 pb-8">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
