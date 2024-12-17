import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, Store } from '@/types';

interface AppState {
  products: Product[];
  stores: Store[];
  setProducts: (products: Product[]) => void;
  setStores: (stores: Store[]) => void;
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  addStore: (store: Store) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      products: [],
      stores: [],
      setProducts: (products) => set({ products }),
      setStores: (stores) => set({ stores }),
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      updateProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updatedProduct } : p
          ),
        })),
      addStore: (store) =>
        set((state) => {
          if (!state.stores.some((s) => s.id === store.id)) {
            return { stores: [...state.stores, store] };
          }
          return state;
        }),
    }),
    {
      name: 'protein-price-tracker',
      version: 1,
    }
  )
);