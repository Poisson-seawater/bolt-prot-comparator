import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from './config';
import { Store } from '@/types';

const getUserStoresCollection = (userId: string) => 
  collection(db, 'users', userId, 'stores');

export async function addStore(userId: string, store: Omit<Store, 'id'>) {
  const storesCollection = getUserStoresCollection(userId);
  const q = query(storesCollection, where('name', '==', store.name));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    const docRef = await addDoc(storesCollection, store);
    return { ...store, id: docRef.id };
  }

  return { ...store, id: snapshot.docs[0].id };
}

export async function getAllStores(userId: string) {
  const storesCollection = getUserStoresCollection(userId);
  const snapshot = await getDocs(storesCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Store[];
}