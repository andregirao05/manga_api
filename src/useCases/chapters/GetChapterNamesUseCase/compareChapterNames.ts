export function compareChapterNames(a: string, b: string): number {
  const isNumericA = !isNaN(Number(a));
  const isNumericB = !isNaN(Number(b));

  if (isNumericA && isNumericB) {
    return Number(a) - Number(b);
  } else if (isNumericA) {
    return -1;
  } else if (isNumericB) {
    return 1;
  } else {
    return a.localeCompare(b);
  }
}
