import { request } from "express";

const assert = require('assert')

const classe = require("./main")

describe("Testando as rotas /sign-up  e /login", function() {
    it("Testando sign-up com string vazia", function() {
        const userName = "";
        const userPassword = "123";

        response = request(app).post("/sign-up")

        assert.isStrictEqual(response.code, 400);
        assert.isStrictEqual(response.message, "String Vazia")
        
    });

} )