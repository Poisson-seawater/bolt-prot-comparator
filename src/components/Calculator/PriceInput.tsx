import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PriceInputProps {
  useTotalPrice: boolean;
  totalPrice: string;
  weight: string;
  pricePerHundredGrams: number | undefined;
  onTotalPriceChange: (value: string) => void;
  onWeightChange: (value: string) => void;
  onPricePerHundredGramsChange: (value: number) => void;
}

export function PriceInput({
  useTotalPrice,
  totalPrice,
  weight,
  pricePerHundredGrams,
  onTotalPriceChange,
  onWeightChange,
  onPricePerHundredGramsChange,
}: PriceInputProps) {
  if (useTotalPrice) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="totalPrice">Total Price (€)</Label>
          <Input
            id="totalPrice"
            type="number"
            step="0.01"
            value={totalPrice}
            onChange={(e) => onTotalPriceChange(e.target.value)}
            placeholder="Enter total price"
          />
        </div>
        <div>
          <Label htmlFor="weight">Weight (g)</Label>
          <Input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => onWeightChange(e.target.value)}
            placeholder="Enter weight in grams"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Label htmlFor="pricePerHundredGrams">Price per 100g (€)</Label>
      <Input
        id="pricePerHundredGrams"
        type="number"
        step="0.01"
        value={pricePerHundredGrams || ''}
        onChange={(e) => onPricePerHundredGramsChange(parseFloat(e.target.value))}
        placeholder="Enter price per 100g"
      />
    </div>
  );
}