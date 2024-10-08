"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = void 0;
const CustomError_1 = require("./CustomError");
class AuthenticationError extends CustomError_1.CustomError {
    constructor() {
        super("invalid username or password.", 401); // 401 Unauthorized status code
        this.name = "InvalidCredentialsError"; // Set the error name
    }
}
exports.AuthenticationError = AuthenticationError;
