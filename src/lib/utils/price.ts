export const calculatePricePerHundredGrams = (
  totalPrice: string,
  weight: string
): number => {
  return (parseFloat(totalPrice) / parseFloat(weight)) * 100;
};

export const calculatePricePerProteinGram = (
  pricePerHundredGrams: number,
  proteinContent: number
): string => {
  return (pricePerHundredGrams / proteinContent).toFixed(2);
};