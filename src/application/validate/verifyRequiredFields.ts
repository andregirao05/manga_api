export function verifyRequiredFields(field: any, requiredFields: string[]) {
  const missingParams = requiredFields.filter((name) => !field[name]);

  return missingParams;
}
