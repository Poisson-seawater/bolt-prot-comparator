import { useState } from 'react';
import { useStore } from '@/lib/store';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';

type FilterType = 'all' | 'vegan' | 'cheese' | 'promo';

export function BestDeals() {
  const [filter, setFilter] = useState<FilterType>('all');
  const products = useStore((state) => state.products);

  const filteredProducts = products
    .filter((product) => {
      switch (filter) {
        case 'vegan':
          return product.isVegan;
        case 'cheese':
          return product.isCheese;
        case 'promo':
          return product.isPromotion;
        default:
          return true;
      }
    })
    .sort(
      (a, b) =>
        a.pricePerHundredGrams / a.proteinContent -
        b.pricePerHundredGrams / b.proteinContent
    )
    .slice(0, 7);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All Products
        </Button>
        <Button
          variant={filter === 'vegan' ? 'default' : 'outline'}
          onClick={() => setFilter('vegan')}
        >
          Vegan
        </Button>
        <Button
          variant={filter === 'cheese' ? 'default' : 'outline'}
          onClick={() => setFilter('cheese')}
        >
          Cheese
        </Button>
        <Button
          variant={filter === 'promo' ? 'default' : 'outline'}
          onClick={() => setFilter('promo')}
        >
          Promotions
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}