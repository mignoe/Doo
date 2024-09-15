import { CustomError } from "./CustomError";

export class UserAlreadyExistsError extends CustomError {
  constructor() {
    super("User already exists", 409); // 409 Conflict status code
    this.name = "UserAlreadyExistsError"; // Set the error name
  }
}
