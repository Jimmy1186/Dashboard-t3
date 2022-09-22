export const numberWithCommas = (x: number | undefined) => {
  if (x === undefined) x = 0;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
