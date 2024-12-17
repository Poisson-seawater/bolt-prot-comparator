export interface Product {
  id: string;
  name: string;
  store: string;
  pricePerHundredGrams: number;
  proteinContent: number;
  isPromotion: boolean;
  isVegan?: boolean;
  isCheese?: boolean;
  createdAt: Date;
}

export interface Store {
  id: string;
  name: string;
}

export type ProductFormData = Omit<Product, 'id' | 'createdAt'>;