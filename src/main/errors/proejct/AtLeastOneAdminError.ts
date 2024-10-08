import { CustomError } from "../CustomError";

export class AtLeastOneAdminError extends CustomError {
  constructor() {
    super("Its needed at least one admin to create a project.", 400); // 400 Bad Request status code
    this.name = "AtLeastOneAdminError"; // Set the error name
  }
}
