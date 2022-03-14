"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
class Cotizador {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/signin', AuthController_1.AuthController.singinUser.bind(AuthController_1.AuthController));
        this.router.post('/login', AuthController_1.AuthController.loginUser.bind(AuthController_1.AuthController));
        this.router.get('/confirm/:token', AuthController_1.AuthController.confirmRegister.bind(AuthController_1.AuthController));
    }
}
const AUTH_ROUTER = new Cotizador();
exports.default = AUTH_ROUTER.router;
