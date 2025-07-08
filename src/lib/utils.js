export const formatLargeNumbers = (value, maxFractionDigits) => {
  return value > 9999
    ? Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: maxFractionDigits,
      }).format(value)
    : value;
};
