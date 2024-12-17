import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ProductFormData } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export function Calculator() {
  const [useTotalPrice, setUseTotalPrice] = useState(false);
  const [formData, setFormData] = useState<Partial<ProductFormData>>({
    isPromotion: false,
    isVegan: false,
    isCheese: false,
  });
  const [weight, setWeight] = useState('');
  const [totalPrice, setTotalPrice] = useState('');

  const { addProduct, stores } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.store || !formData.proteinContent) return;

    const pricePerHundredGrams = useTotalPrice
      ? (parseFloat(totalPrice) / parseFloat(weight)) * 100
      : formData.pricePerHundredGrams || 0;

    const product = {
      id: uuidv4(),
      ...formData,
      pricePerHundredGrams,
      createdAt: new Date(),
    } as ProductFormData;

    addProduct(product);
    // Reset form
    setFormData({
      isPromotion: false,
      isVegan: false,
      isCheese: false,
    });
    setWeight('');
    setTotalPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            value={formData.name || ''}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Enter product name"
          />
        </div>

        <div>
          <Label htmlFor="store">Store</Label>
          <Input
            id="store"
            value={formData.store || ''}
            onChange={(e) =>
              setFormData({ ...formData, store: e.target.value })
            }
            placeholder="Enter store name"
            list="stores"
          />
          <datalist id="stores">
            {stores.map((store) => (
              <option key={store.id} value={store.name} />
            ))}
          </datalist>
        </div>

        <div>
          <Label>Price Input Method</Label>
          <div className="flex items-center space-x-2">
            <Switch
              checked={useTotalPrice}
              onCheckedChange={setUseTotalPrice}
            />
            <span>
              {useTotalPrice ? 'Total Price + Weight' : 'Price per 100g'}
            </span>
          </div>
        </div>

        {useTotalPrice ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="totalPrice">Total Price (€)</Label>
              <Input
                id="totalPrice"
                type="number"
                step="0.01"
                value={totalPrice}
                onChange={(e) => setTotalPrice(e.target.value)}
                placeholder="Enter total price"
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight (g)</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight in grams"
              />
            </div>
          </div>
        ) : (
          <div>
            <Label htmlFor="pricePerHundredGrams">Price per 100g (€)</Label>
            <Input
              id="pricePerHundredGrams"
              type="number"
              step="0.01"
              value={formData.pricePerHundredGrams || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pricePerHundredGrams: parseFloat(e.target.value),
                })
              }
              placeholder="Enter price per 100g"
            />
          </div>
        )}

        <div>
          <Label htmlFor="proteinContent">Protein Content (g/100g)</Label>
          <Input
            id="proteinContent"
            type="number"
            step="0.1"
            value={formData.proteinContent || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                proteinContent: parseFloat(e.target.value),
              })
            }
            placeholder="Enter protein content"
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="isPromotion"
              checked={formData.isPromotion}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isPromotion: checked })
              }
            />
            <Label htmlFor="isPromotion">Promotion</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isVegan"
              checked={formData.isVegan}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isVegan: checked })
              }
            />
            <Label htmlFor="isVegan">Vegan</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isCheese"
              checked={formData.isCheese}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isCheese: checked })
              }
            />
            <Label htmlFor="isCheese">Cheese</Label>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Calculate & Save
      </Button>
    </form>
  );
}