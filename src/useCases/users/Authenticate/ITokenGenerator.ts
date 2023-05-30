export interface TokenData {
  id: string;
}

export interface ITokenGenerator {
  generate(data: TokenData): Promise<string>;
}
