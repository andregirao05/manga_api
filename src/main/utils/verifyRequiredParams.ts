export function verifyRequiredParams(params: any, requiredParams: string[]) {
  const missingParams = requiredParams.filter((name) => !params[name]);

  return missingParams;
}
