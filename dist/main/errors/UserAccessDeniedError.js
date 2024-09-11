"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccessDeniedError = void 0;
const CustomError_1 = require("./CustomError");
class UserAccessDeniedError extends CustomError_1.CustomError {
    constructor() {
        super("You need to be an admin to do this operation", 403); // 403 Forbidden status code
        this.name = "InvalidCredentialsError"; // Set the error name
    }
}
exports.UserAccessDeniedError = UserAccessDeniedError;
