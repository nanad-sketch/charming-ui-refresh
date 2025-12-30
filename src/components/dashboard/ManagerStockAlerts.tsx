import { AlertTriangle, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { stockAlerts } from '@/data/sampleData';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export function ManagerStockAlerts() {
  const navigate = useNavigate();
  const criticalCount = stockAlerts.filter(a => a.severity === 'critical').length;

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive/10 text-destructive';
      case 'warning':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-info/10 text-info';
    }
  };

  return (
    <Card className="card-shadow animate-slide-up border-l-4 border-l-destructive">
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            Stock Alerts
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="destructive" className="text-[10px]">
              {criticalCount} critical
            </Badge>
            <button 
              onClick={() => navigate('/alerts')}
              className="text-xs text-primary flex items-center gap-1"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-2">
        {stockAlerts.slice(0, 4).map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "p-3 rounded-xl",
              alert.severity === 'critical' ? 'bg-destructive/5' : 'bg-warning/5'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-foreground">{alert.itemName}</p>
              <Badge className={cn('text-[10px]', getSeverityStyles(alert.severity))}>
                {alert.severity}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Progress
                value={(alert.currentStock / alert.minStock) * 100}
                className={cn(
                  'h-1.5 flex-1',
                  alert.severity === 'critical' ? '[&>div]:bg-destructive' : '[&>div]:bg-warning'
                )}
              />
              <span className="text-[10px] text-muted-foreground">
                {alert.currentStock}/{alert.minStock}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
