"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtLeastOneAdminError = void 0;
const CustomError_1 = require("../CustomError");
class AtLeastOneAdminError extends CustomError_1.CustomError {
    constructor() {
        super("Its needed at least one admin to create a project.", 400); // 400 Bad Request status code
        this.name = "AtLeastOneAdminError"; // Set the error name
    }
}
exports.AtLeastOneAdminError = AtLeastOneAdminError;
