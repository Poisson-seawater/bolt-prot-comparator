import { Product } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Store, Tag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const pricePerProteinGram = (
    product.pricePerHundredGrams /
    product.proteinContent
  ).toFixed(2);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
        <div className="flex gap-2">
          {product.isPromotion && (
            <Badge variant="destructive">
              <Tag className="mr-1 h-3 w-3" />
              Promo
            </Badge>
          )}
          {product.isVegan && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Vegan
            </Badge>
          )}
          {product.isCheese && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              Cheese
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Store className="mr-1 h-4 w-4" />
            {product.store}
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">
              €{product.pricePerHundredGrams}/100g
            </p>
            <p className="text-xs text-muted-foreground">
              €{pricePerProteinGram}/g protein
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}