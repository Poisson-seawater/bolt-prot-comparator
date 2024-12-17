import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface ProductTypeTogglesProps {
  isPromotion: boolean;
  isVegan: boolean;
  isCheese: boolean;
  onPromotionChange: (checked: boolean) => void;
  onVeganChange: (checked: boolean) => void;
  onCheeseChange: (checked: boolean) => void;
}

export function ProductTypeToggles({
  isPromotion,
  isVegan,
  isCheese,
  onPromotionChange,
  onVeganChange,
  onCheeseChange,
}: ProductTypeTogglesProps) {
  return (
    <div className="flex space-x-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="isPromotion"
          checked={isPromotion}
          onCheckedChange={onPromotionChange}
        />
        <Label htmlFor="isPromotion">Promotion</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="isVegan"
          checked={isVegan}
          onCheckedChange={onVeganChange}
        />
        <Label htmlFor="isVegan">Vegan</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="isCheese"
          checked={isCheese}
          onCheckedChange={onCheeseChange}
        />
        <Label htmlFor="isCheese">Cheese</Label>
      </div>
    </div>
  );
}