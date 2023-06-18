// calculate a total of borrowed or lent amounts
export const calculateTotalAmount = <T extends { totalAmount: number }>(
  data: T[]
): string => {
  return data
    .reduce((total: number, data: T) => total + data.totalAmount, 0)
    .toFixed(2)
    .toLocaleString();
};
