import { useState } from 'react';
import { useStore } from '@/lib/store';
import { useAutoStore } from '@/lib/hooks/useAutoStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ProductFormData } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { calculatePricePerHundredGrams } from '@/lib/utils/price';
import { PriceInput } from './PriceInput';
import { ProductTypeToggles } from './ProductTypeToggles';
import { ProductCard } from '../ProductCard';
import { cn } from '@/lib/utils';

export function Calculator() {
  const [useTotalPrice, setUseTotalPrice] = useState(false);
  const [formData, setFormData] = useState<Partial<ProductFormData>>({
    isPromotion: false,
    isVegan: false,
    isCheese: false,
  });
  const [weight, setWeight] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [addedProduct, setAddedProduct] = useState<ProductFormData | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const { addProduct, stores } = useStore();
  const { toast } = useToast();
  useAutoStore(formData.store);

  const resetForm = () => {
    setFormData({
      isPromotion: false,
      isVegan: false,
      isCheese: false,
    });
    setWeight('');
    setTotalPrice('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.store || !formData.proteinContent) return;

    const pricePerHundredGrams = useTotalPrice
      ? calculatePricePerHundredGrams(totalPrice, weight)
      : formData.pricePerHundredGrams || 0;

    const product = {
      id: uuidv4(),
      ...formData,
      pricePerHundredGrams,
    } as ProductFormData;

    try {
      await addProduct(product);
      setAddedProduct(product);
      setIsAnimating(true);
      toast({
        title: "Product Added Successfully",
        description: "Your product has been added to the database.",
        duration: 3000,
      });
      resetForm();

      // Clear the added product notification after 5 seconds
      setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => {
          setAddedProduct(null);
        }, 300); // Wait for fade out animation
      }, 5000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ... rest of the form code ... */}
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
            <ProductCard product={{ ...addedProduct, createdAt: new Date() }} />
          </div>
        </div>
      )}
    </div>
  );
}