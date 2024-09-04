import { CustomError } from "./CustomError";

export class InvalidCredentialsError extends CustomError {
  constructor() {
    super("The name or password is incorrect.", 401); // 401 Unauthorized status code
    this.name = "InvalidCredentialsError"; // Set the error name
  }
}
