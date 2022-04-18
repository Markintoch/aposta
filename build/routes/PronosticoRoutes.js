"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PronosticoController_1 = require("../controllers/PronosticoController");
class PronosticoRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/create', PronosticoController_1.PronosticoController.createPronostico.bind(PronosticoController_1.PronosticoController));
        /* this.router.post('/update', PronosticoController.updateResultado.bind(PronosticoController));
        this.router.get('/delete/:id', PronosticoController.deleteResultado.bind(PronosticoController));
        this.router.get('/get/:id', PronosticoController.getResultado.bind(PronosticoController)); */
        /* this.router.get('/list/:id', ResultadoController.getPartidosByJornada.bind(ResultadoController)); */
    }
}
const PRONOSTICO_ROUTER = new PronosticoRouter();
exports.default = PRONOSTICO_ROUTER.router;
