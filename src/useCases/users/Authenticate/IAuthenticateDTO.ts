import { IUser } from "entities";

export interface IAuthenticateDTO extends Omit<IUser, "id" | "permitions"> {}
