import { IUser } from "../../../entities";
import { InvalidPasswordError, UserNotFoundError } from "../../../errors";
import { IUserRepository } from "../../../repositories";
import { IResultsWithAuthTokens } from "../../IResultsWithAuthToken";
import { IUseCase } from "../../IUseCase";
import { IAuthenticateDTO } from "./IAuthenticateDTO";
import { ICrypter } from "./ICrypter";
import { ITokenGenerator } from "./ITokenGenerator";

export class AuthenticateUseCase
  implements
    IUseCase<IAuthenticateDTO, IResultsWithAuthTokens<Omit<IUser, "password">>>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly crypter: ICrypter,
    private readonly tokenGenerator: ITokenGenerator
  ) {}

  async execute(
    data: IAuthenticateDTO
  ): Promise<IResultsWithAuthTokens<Omit<IUser, "password">>> {
    const { username, password } = data;

    const user = await this.userRepository.getUser({ username });

    if (!user) throw new UserNotFoundError(username);

    if (!(await this.crypter.comparePassword(password, user.password)))
      throw new InvalidPasswordError();

    user.password = undefined;

    const token = await this.tokenGenerator.generate({ id: user.id });

    return {
      data: user,
      token,
    };
  }
}
