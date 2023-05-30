import { ObjectSchema, object, string } from "yup";
import { IAuthenticateDTO } from "./IAuthenticateDTO";

const authenticateSchema: ObjectSchema<IAuthenticateDTO> = object({
  username: string().required(),
  password: string().required(),
});

export { authenticateSchema };
