import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { ProductCard } from '../ProductCard';
import { searchProducts } from '@/lib/utils/filters';

export function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const products = useStore((state) => state.products);

  const filteredProducts = searchProducts(products, searchTerm);

  return (
    <div className="space-y-6">
      <Input
        placeholder="Search products or stores..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}