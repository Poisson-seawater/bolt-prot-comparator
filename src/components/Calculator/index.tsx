import { useState } from 'react';
import { useStore } from '@/lib/store';
import { useAutoStore } from '@/lib/hooks/useAutoStore';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { calculatePricePerHundredGrams } from '@/lib/utils/price';
import { ProductCard } from '../ProductCard';
import { cn } from '@/lib/utils';

// Définition des types
interface Product {
  id: string;
  createdAt: Date;
  name: string;
  store: string;
  proteinContent: number;
  pricePerHundredGrams: number;
  isPromotion: boolean;
  isVegan: boolean;
  isCheese: boolean;
}

interface ProductFormData {
  name?: string;
  store?: string;
  proteinContent?: number;
  pricePerHundredGrams?: number;
  isPromotion: boolean;
  isVegan: boolean;
  isCheese: boolean;
}

export function Calculator() {
  const [useTotalPrice] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: undefined,
    store: undefined,
    proteinContent: undefined,
    pricePerHundredGrams: undefined,
    isPromotion: false,
    isVegan: false,
    isCheese: false,
  });
  const [weight, setWeight] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [addedProduct, setAddedProduct] = useState<Product | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const { addProduct } = useStore();
  const { toast } = useToast();
  useAutoStore(formData.store);

  const resetForm = () => {
    setFormData({
      name: undefined,
      store: undefined,
      proteinContent: undefined,
      pricePerHundredGrams: undefined,
      isPromotion: false,
      isVegan: false,
      isCheese: false,
    });
    setWeight('');
    setTotalPrice('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.store || !formData.proteinContent) {
      toast({
        title: "Error",
        description: "Name, store, and protein content are required.",
        variant: "destructive",
      });
      return;
    }

    const pricePerHundredGrams = useTotalPrice
      ? calculatePricePerHundredGrams(totalPrice, weight)
      : formData.pricePerHundredGrams || 0;

    const completeProduct: Product = {
      id: uuidv4(),
      createdAt: new Date(),
      name: formData.name,
      store: formData.store,
      proteinContent: formData.proteinContent,
      pricePerHundredGrams,
      isPromotion: formData.isPromotion,
      isVegan: formData.isVegan,
      isCheese: formData.isCheese,
    };

    try {
      await addProduct(completeProduct);
      setAddedProduct(completeProduct);
      setIsAnimating(true);
      toast({
        title: "Product Added Successfully",
        description: "Your product has been added to the database.",
        duration: 3000,
      });
      resetForm();

      setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => {
          setAddedProduct(null);
        }, 300);
      }, 5000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="rounded border p-2"
          />
          <input
            type="text"
            name="store"
            value={formData.store || ''}
            onChange={handleInputChange}
            placeholder="Store"
            className="rounded border p-2"
          />
          <input
            type="number"
            name="proteinContent"
            value={formData.proteinContent || ''}
            onChange={handleInputChange}
            placeholder="Protein Content"
            className="rounded border p-2"
          />
          <input
            type="number"
            name="pricePerHundredGrams"
            value={formData.pricePerHundredGrams || ''}
            onChange={handleInputChange}
            placeholder="Price per 100g"
            className="rounded border p-2"
          />
        </div>

        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isPromotion"
              checked={formData.isPromotion}
              onChange={handleInputChange}
              className="mr-2"
            />
            Promotion
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isVegan"
              checked={formData.isVegan}
              onChange={handleInputChange}
              className="mr-2"
            />
            Vegan
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isCheese"
              checked={formData.isCheese}
              onChange={handleInputChange}
              className="mr-2"
            />
            Cheese
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>

      {addedProduct && (
        <div
          className={cn(
            "transition-all duration-300 ease-in-out transform",
            isAnimating
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          )}
        >
          <div className="rounded-lg bg-green-50 p-4 mb-4 shadow-lg border border-green-100">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <h3 className="text-green-800 font-medium">
                Product Added Successfully
              </h3>
            </div>
            <ProductCard product={addedProduct} />
          </div>
        </div>
      )}
    </div>
  );
}
