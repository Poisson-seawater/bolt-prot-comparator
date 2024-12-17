import { Badge } from '@/components/ui/badge';
import { Tag } from 'lucide-react';

interface ProductBadgesProps {
  isPromotion: boolean;
  isVegan?: boolean;
  isCheese?: boolean;
}

export function ProductBadges({
  isPromotion,
  isVegan,
  isCheese,
}: ProductBadgesProps) {
  return (
    <div className="flex gap-2">
      {isPromotion && (
        <Badge variant="destructive">
          <Tag className="mr-1 h-3 w-3" />
          Promo
        </Badge>
      )}
      {isVegan && (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Vegan
        </Badge>
      )}
      {isCheese && (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Cheese
        </Badge>
      )}
    </div>
  );
}