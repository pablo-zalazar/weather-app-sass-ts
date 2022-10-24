export const tempConvert = (value: number): string => {
  return Math.round((value - 32) * (5 / 9)).toString();
};
