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
        this.router.post('/create-multiple', PronosticoController_1.PronosticoController.createPronosticos.bind(PronosticoController_1.PronosticoController));
        this.router.post('/update', PronosticoController_1.PronosticoController.updatePronostico.bind(PronosticoController_1.PronosticoController));
        this.router.post('/update-multiple', PronosticoController_1.PronosticoController.updatePronosticos.bind(PronosticoController_1.PronosticoController));
        this.router.get('/get/:id', PronosticoController_1.PronosticoController.getPronostico.bind(PronosticoController_1.PronosticoController));
        this.router.get('/get-by-jornada/:id/:user_id', PronosticoController_1.PronosticoController.getPronosticosByJornada.bind(PronosticoController_1.PronosticoController));
    }
}
const PRONOSTICO_ROUTER = new PronosticoRouter();
exports.default = PRONOSTICO_ROUTER.router;
