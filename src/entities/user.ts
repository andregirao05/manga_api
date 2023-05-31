export interface IUser {
  id: string;
  username: string;
  password: string;
  permitions: string;
}

export class User implements IUser {
  id: string;
  username: string;
  password: string;
  permitions: string;

  constructor(data: IUser) {
    this.id = data?.id || null;
    this.username = data.username;
    this.password = data.password;
    this.permitions = data.permitions;
  }
}
