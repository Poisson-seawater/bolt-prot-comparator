import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { useAuth } from '@/lib/hooks/useAuth';
import {
  getAllProducts,
  addProduct as addFirestoreProduct,
  updateProduct as updateFirestoreProduct,
  deleteProduct as deleteFirestoreProduct,
} from '@/lib/firebase/products';
import {
  getAllStores,
  addStore as addFirestoreStore,
} from '@/lib/firebase/stores';
import type { Product, Store } from '@/types';

export function useFirestore() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { products, stores, setProducts, setStores } = useStore();
  const { user } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      if (!user) {
        setProducts([]);
        setStores([]);
        setLoading(false);
        return;
      }

      try {
        const [productsData, storesData] = await Promise.all([
          getAllProducts(user.uid),
          getAllStores(user.uid),
        ]);
        setProducts(productsData);
        setStores(storesData);
      } catch (error) {
        console.error('Error loading data:', error);
        setError(error instanceof Error ? error : new Error('Failed to load data'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, setProducts, setStores]);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    if (!user) throw new Error('User must be authenticated');
    try {
      const newProduct = await addFirestoreProduct(user.uid, product);
      setProducts([...products, newProduct]);
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    if (!user) throw new Error('User must be authenticated');
    try {
      await updateFirestoreProduct(user.uid, id, product);
      setProducts(products.map((p) => (p.id === id ? { ...p, ...product } : p)));
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    if (!user) throw new Error('User must be authenticated');
    try {
      await deleteFirestoreProduct(user.uid, id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const addStore = async (store: Omit<Store, 'id'>) => {
    if (!user) throw new Error('User must be authenticated');
    try {
      const newStore = await addFirestoreStore(user.uid, store);
      if (!stores.some((s) => s.id === newStore.id)) {
        setStores([...stores, newStore]);
      }
      return newStore;
    } catch (error) {
      console.error('Error adding store:', error);
      throw error;
    }
  };

  return {
    loading,
    error,
    products,
    stores,
    addProduct,
    updateProduct,
    deleteProduct,
    addStore,
  };
}