import { CustomError } from "./CustomError";

export class AuthenticationError extends CustomError {
  constructor() {
    super("invalid username or password.", 401); // 401 Unauthorized status code
    this.name = "InvalidCredentialsError"; // Set the error name
  }
}
