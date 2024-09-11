"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsError = void 0;
const CustomError_1 = require("./CustomError");
class InvalidCredentialsError extends CustomError_1.CustomError {
    constructor() {
        super("The name or password is incorrect.", 401); // 401 Unauthorized status code
        this.name = "InvalidCredentialsError"; // Set the error name
    }
}
exports.InvalidCredentialsError = InvalidCredentialsError;
