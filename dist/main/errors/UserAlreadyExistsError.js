"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistsError = void 0;
const CustomError_1 = require("./CustomError");
class UserAlreadyExistsError extends CustomError_1.CustomError {
    constructor() {
        super("User already exists", 409); // 409 Conflict status code
        this.name = "UserAlreadyExistsError"; // Set the error name
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
