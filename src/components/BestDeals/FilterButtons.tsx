import { Button } from '@/components/ui/button';

interface FilterButtonsProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterButtons({
  currentFilter,
  onFilterChange,
}: FilterButtonsProps) {
  const filters = [
    { id: 'all', label: 'All Products' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'cheese', label: 'Cheese' },
    { id: 'promo', label: 'Promotions' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={currentFilter === filter.id ? 'default' : 'outline'}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}