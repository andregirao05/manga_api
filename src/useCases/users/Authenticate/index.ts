import { getEnv } from "../../../configs";
import { userRepository } from "../../../repositories";
import { AuthenticateController } from "./AuthenticateController";
import { AuthenticateUseCase } from "./AuthenticateUseCase";
import { Crypter } from "./Crypter";
import { TokenGenerator } from "./TokenGenerator";

const crypter = new Crypter();
const tokenGenerator = new TokenGenerator(getEnv("TOKEN_GENERATOR_SECRET"));
const authenticateUseCase = new AuthenticateUseCase(
  userRepository,
  crypter,
  tokenGenerator
);
const authenticateController = new AuthenticateController(authenticateUseCase);

export { authenticateController };

export { IAuthenticateDTO } from "./IAuthenticateDTO";
