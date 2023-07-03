import { Model, model } from "mongoose";
import { IUser } from "entities";
import { IGetUserProps, IUserRepository } from "./interfaces";
import { UserSchema } from "./schemas";

class UserRepository implements IUserRepository {
  private UserModel: Model<IUser>;

  constructor() {
    this.UserModel = model("User", UserSchema);
  }

  async getUser(data: IGetUserProps): Promise<IUser> {
    const { username } = data;
    const user = await this.UserModel.findOne({ username });

    return user;
  }
}
export const userRepository = new UserRepository();
