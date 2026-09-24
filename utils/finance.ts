export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const safeAlpha = (color: string | undefined, alpha: number): string => {
  if (!color) return `rgba(255, 255, 255, ${alpha})`;
  
  // if it's a 7 char hex (e.g., #FF0000)
  if (color.startsWith('#') && color.length === 7) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  // fallback for named colors or invalid hex
  return color;
};
