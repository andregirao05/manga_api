import { getEnv } from "configs";
import { userRepository } from "repositories";
import { AuthenticateController } from "./AuthenticateController";
import { AuthenticateUseCase } from "./AuthenticateUseCase";
import { Crypter } from "./Crypter";
import { TokenGenerator } from "./TokenGenerator";
import { Validator } from "validation";
import { IAuthenticateDTO } from "./IAuthenticateDTO";
import { authenticateSchema } from "./authenticateSchema";

const crypter = new Crypter();
const tokenGenerator = new TokenGenerator(getEnv("TOKEN_GENERATOR_SECRET"));
const authenticateUseCase = new AuthenticateUseCase(
  userRepository,
  crypter,
  tokenGenerator
);

const authenticateValidator = new Validator<IAuthenticateDTO>(
  authenticateSchema
);

const authenticateController = new AuthenticateController(
  authenticateUseCase,
  authenticateValidator
);

export { authenticateController };

export { IAuthenticateDTO } from "./IAuthenticateDTO";
