import { Product } from '@/types';

export const filterProductsByType = (products: Product[], filter: string) => {
  switch (filter) {
    case 'vegan':
      return products.filter((product) => product.isVegan);
    case 'cheese':
      return products.filter((product) => product.isCheese);
    case 'promo':
      return products.filter((product) => product.isPromotion);
    default:
      return products;
  }
};

export const sortByProteinPrice = (products: Product[]) => {
  return products.sort(
    (a, b) =>
      a.pricePerHundredGrams / a.proteinContent -
      b.pricePerHundredGrams / b.proteinContent
  );
};

export const searchProducts = (products: Product[], searchTerm: string) => {
  const term = searchTerm.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(term) ||
      product.store.toLowerCase().includes(term)
  );
};