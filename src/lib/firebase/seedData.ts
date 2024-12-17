import { addProduct } from './products';
import { addStore } from './stores';

const sampleProducts = [
  {
    name: "Greek Yogurt",
    store: "Carrefour",
    pricePerHundredGrams: 0.89,
    proteinContent: 10,
    isPromotion: false,
    isVegan: false,
    isCheese: false,
    createdAt: new Date()
  },
  {
    name: "Tofu Bio",
    store: "Biocoop",
    pricePerHundredGrams: 1.2,
    proteinContent: 8,
    isPromotion: true,
    isVegan: true,
    isCheese: false,
    createdAt: new Date()
  },
  {
    name: "Parmesan",
    store: "Auchan",
    pricePerHundredGrams: 2.5,
    proteinContent: 32,
    isPromotion: false,
    isVegan: false,
    isCheese: true,
    createdAt: new Date()
  }
];

const sampleStores = [
  { name: "Carrefour" },
  { name: "Biocoop" },
  { name: "Auchan" }
];

export async function seedDatabase(userId: string) {
  try {
    console.log('Starting database seeding...');
    
    // Add stores first
    for (const store of sampleStores) {
      await addStore(userId, store);
      console.log(`Added store: ${store.name}`);
    }

    // Add products
    for (const product of sampleProducts) {
      await addProduct(userId, product);
      console.log(`Added product: ${product.name}`);
    }

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}