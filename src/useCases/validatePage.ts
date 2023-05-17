export function validatePage(page: string): boolean {
  const pageNumber = Number(page);
  return (
    !Number.isNaN(pageNumber) && Number.isInteger(pageNumber) && pageNumber > 0
  );
}
