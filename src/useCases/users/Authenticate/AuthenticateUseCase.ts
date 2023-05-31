import { IUser } from "../../../entities";
import { InvalidPasswordError, UserNotFoundError } from "../../../errors";
import { IUserRepository } from "../../../repositories";
import { IUseCase } from "../../../protocols/IUseCase";
import { IAuthenticateDTO } from "./IAuthenticateDTO";
import { ICrypter } from "./ICrypter";
import { ITokenGenerator } from "./ITokenGenerator";

export interface IAuthResults {
  token: string;
  user: IUser;
}

export class AuthenticateUseCase
  implements IUseCase<IAuthenticateDTO, IAuthResults>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly crypter: ICrypter,
    private readonly tokenGenerator: ITokenGenerator
  ) {}

  async execute(data: IAuthenticateDTO): Promise<IAuthResults> {
    const { username, password } = data;

    const user = await this.userRepository.getUser({ username });

    if (!user) throw new UserNotFoundError(username);

    if (!(await this.crypter.comparePassword(password, user.password)))
      throw new InvalidPasswordError();

    user.password = undefined;

    const token = await this.tokenGenerator.generate({ id: user.id });

    return {
      user,
      token,
    };
  }
}
