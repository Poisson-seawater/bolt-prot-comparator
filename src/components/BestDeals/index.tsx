import { useState } from 'react';
import { useStore } from '@/lib/store';
import { ProductCard } from '../ProductCard';
import { FilterButtons } from './FilterButtons';
import { filterProductsByType, sortByProteinPrice } from '@/lib/utils/filters';

type FilterType = 'all' | 'vegan' | 'cheese' | 'promo';

export function BestDeals() {
  const [filter, setFilter] = useState<FilterType>('all');
  const products = useStore((state) => state.products);

  const filteredProducts = sortByProteinPrice(
    filterProductsByType(products, filter)
  ).slice(0, 7);

  return (
    <div className="space-y-6">
      <FilterButtons
        currentFilter={filter}
        onFilterChange={(newFilter) => setFilter(newFilter as FilterType)}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}