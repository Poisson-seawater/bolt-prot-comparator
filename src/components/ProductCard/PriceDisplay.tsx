import { Store } from 'lucide-react';
import { calculatePricePerProteinGram } from '@/lib/utils/price';

interface PriceDisplayProps {
  store: string;
  pricePerHundredGrams: number;
  proteinContent: number;
}

export function PriceDisplay({
  store,
  pricePerHundredGrams,
  proteinContent,
}: PriceDisplayProps) {
  const pricePerProteinGram = calculatePricePerProteinGram(
    pricePerHundredGrams,
    proteinContent
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center text-sm text-muted-foreground">
        <Store className="mr-1 h-4 w-4" />
        {store}
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">€{pricePerHundredGrams}/100g</p>
        <p className="text-xs text-muted-foreground">
          €{pricePerProteinGram}/g protein
        </p>
      </div>
    </div>
  );
}