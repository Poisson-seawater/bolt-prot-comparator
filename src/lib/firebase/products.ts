import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { db } from './config';
import { Product } from '@/types';

const PRODUCTS_COLLECTION = 'products';

export const getUserProductsCollection = (userId: string) => 
  collection(db, 'users', userId, PRODUCTS_COLLECTION);

export async function addProduct(userId: string, product: Omit<Product, 'id'>) {
  const docRef = await addDoc(getUserProductsCollection(userId), {
    ...product,
    createdAt: new Date(),
  });
  return { ...product, id: docRef.id };
}

export async function updateProduct(userId: string, id: string, product: Partial<Product>) {
  const docRef = doc(db, 'users', userId, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, product);
}

export async function deleteProduct(userId: string, id: string) {
  const docRef = doc(db, 'users', userId, PRODUCTS_COLLECTION, id);
  await deleteDoc(docRef);
}

export async function getAllProducts(userId: string) {
  const productsCollection = getUserProductsCollection(userId);
  const q = query(productsCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
}

export async function getProductsByFilter(userId: string, filterType: string) {
  const productsCollection = getUserProductsCollection(userId);
  let q = query(productsCollection);

  switch (filterType) {
    case 'vegan':
      q = query(productsCollection, where('isVegan', '==', true));
      break;
    case 'cheese':
      q = query(productsCollection, where('isCheese', '==', true));
      break;
    case 'promo':
      q = query(productsCollection, where('isPromotion', '==', true));
      break;
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
}