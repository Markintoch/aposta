"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/* import { GeneralDeSegurosController } from '../controllers/GeneralDeSeguros'; */
class Cotizador {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        /* this.router.post('/coberturas',GeneralDeSegurosController.coberturas.bind(GeneralDeSegurosController)); */
    }
}
const GN_ROUTER = new Cotizador();
exports.default = GN_ROUTER.router;
