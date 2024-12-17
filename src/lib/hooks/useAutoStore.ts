import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { v4 as uuidv4 } from 'uuid';

export function useAutoStore(storeName: string | undefined) {
  const { stores, addStore } = useStore();

  useEffect(() => {
    if (storeName && !stores.some((s) => s.name === storeName)) {
      addStore({
        id: uuidv4(),
        name: storeName,
      });
    }
  }, [storeName, stores, addStore]);