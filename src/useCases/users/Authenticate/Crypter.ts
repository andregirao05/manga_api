import { compare, genSaltSync, hashSync } from "bcrypt";
import { ICrypter } from "./ICrypter";

export class Crypter implements ICrypter {
  async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
  }

  async comparePassword(
    password: string,
    encryptedPassword: string
  ): Promise<boolean> {
    return await compare(password, encryptedPassword);
  }
}
