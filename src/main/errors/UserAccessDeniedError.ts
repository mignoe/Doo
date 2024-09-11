import { CustomError } from "./CustomError";

export class UserAccessDeniedError extends CustomError {
  constructor() {
    super("You need to be an admin to do this operation", 403); // 403 Forbidden status code
    this.name = "InvalidCredentialsError"; // Set the error name
  }
}
