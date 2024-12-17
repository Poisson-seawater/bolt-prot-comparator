import { Product } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductBadges } from './ProductBadges';
import { PriceDisplay } from './PriceDisplay';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
        <ProductBadges
          isPromotion={product.isPromotion}
          isVegan={product.isVegan}
          isCheese={product.isCheese}
        />
      </CardHeader>
      <CardContent>
        <PriceDisplay
          store={product.store}
          pricePerHundredGrams={product.pricePerHundredGrams}
          proteinContent={product.proteinContent}
        />
      </CardContent>
    </Card>
  );
}