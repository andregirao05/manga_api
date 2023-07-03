import { IUser } from "entities";

export interface IGetUserProps {
  username: string;
}

export interface IUserRepository {
  getUser(data: IGetUserProps): Promise<IUser>;
}
