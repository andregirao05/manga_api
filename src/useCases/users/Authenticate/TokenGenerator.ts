import { ITokenGenerator, TokenData } from "./ITokenGenerator";
import * as jwt from "jsonwebtoken";

export class TokenGenerator implements ITokenGenerator {
  constructor(private readonly secret: string) {}

  async generate(data: TokenData): Promise<string> {
    const token = jwt.sign(data, this.secret, { expiresIn: "100y" });
    return token;
  }
}
