import { Schema, ValidationError as YupValidationError } from "yup";
import { IValidator } from "./IValidator";
import { ServerError, ValidationError } from "../errors";

export class Validator<T> implements IValidator<T> {
  constructor(private readonly schema: Schema) {}

  validate(data: T): Promise<T> {
    try {
      const results = this.schema.validateSync(data);
      return results;
    } catch (error) {
      if (error instanceof YupValidationError)
        throw new ValidationError(error.message);
      else throw new ServerError("Unexpected error in validator.");
    }
  }
}
