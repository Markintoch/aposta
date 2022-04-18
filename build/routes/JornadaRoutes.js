"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const JornadaController_1 = require("../controllers/JornadaController");
class JornadaRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/create', JornadaController_1.JornadaController.createJornada.bind(JornadaController_1.JornadaController));
        this.router.post('/update', JornadaController_1.JornadaController.updateJornada.bind(JornadaController_1.JornadaController));
        this.router.get('/delete/:id', JornadaController_1.JornadaController.deleteTemporada.bind(JornadaController_1.JornadaController));
        this.router.get('/get/:id', JornadaController_1.JornadaController.getJornada.bind(JornadaController_1.JornadaController));
        this.router.get('/list/:id', JornadaController_1.JornadaController.getJornadaByTemporada.bind(JornadaController_1.JornadaController));
        this.router.get('/list', JornadaController_1.JornadaController.getJornadas.bind(JornadaController_1.JornadaController));
    }
}
const JORNADA_ROUTER = new JornadaRouter();
exports.default = JORNADA_ROUTER.router;
