import { ObjectId } from "mongodb";

export const validateId = (id: string) => ObjectId.isValid(id)
