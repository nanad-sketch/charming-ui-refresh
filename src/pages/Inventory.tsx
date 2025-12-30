import { useState } from 'react';
import { Search, Package, Plus } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { inventoryItems } from '@/data/sampleData';
import { cn } from '@/lib/utils';

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = ['all', 'in-stock', 'low-stock', 'out-of-stock'];

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || item.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-success/10 text-success';
      case 'low-stock':
        return 'bg-warning/10 text-warning';
      case 'out-of-stock':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStockPercentage = (quantity: number, minStock: number) => {
    return Math.min((quantity / (minStock * 2)) * 100, 100);
  };

  return (
    <MobileLayout title="Inventory">
      <div className="p-4 space-y-4">
        {/* Search */}
        <div className="relative animate-fade-in">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 rounded-xl"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide animate-slide-up">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                activeFilter === filter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {filter === 'all' ? 'All' : filter.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground animate-fade-in">
          {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
        </p>

        {/* Items List */}
        <div className="space-y-3">
          {filteredItems.map((item, index) => (
            <Card
              key={item.id}
              className="card-shadow animate-slide-up active:scale-[0.98] transition-transform"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                      <Badge className={cn('text-[10px] shrink-0', getStatusStyles(item.status))}>
                        {item.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          Stock: {item.quantity} / {item.minStock} min
                        </span>
                        <span className="font-semibold text-foreground">${item.price}</span>
                      </div>
                      <Progress
                        value={getStockPercentage(item.quantity, item.minStock)}
                        className={cn(
                          'h-1.5',
                          item.status === 'out-of-stock' && '[&>div]:bg-destructive',
                          item.status === 'low-stock' && '[&>div]:bg-warning',
                          item.status === 'in-stock' && '[&>div]:bg-success'
                        )}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No items found</p>
          </div>
        )}

        {/* FAB */}
        <Button
          size="icon"
          className="fixed bottom-20 right-4 w-14 h-14 rounded-full shadow-lg z-40 animate-scale-in"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </MobileLayout>
  );
}
