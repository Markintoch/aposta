"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ResultadoController_1 = require("../controllers/ResultadoController");
class ResultadoRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/create', ResultadoController_1.ResultadoController.createResultado.bind(ResultadoController_1.ResultadoController));
        this.router.post('/create-list', ResultadoController_1.ResultadoController.createResultados.bind(ResultadoController_1.ResultadoController));
        this.router.post('/update-list', ResultadoController_1.ResultadoController.updateResultados.bind(ResultadoController_1.ResultadoController));
        this.router.post('/update', ResultadoController_1.ResultadoController.updateResultado.bind(ResultadoController_1.ResultadoController));
        this.router.get('/delete/:id', ResultadoController_1.ResultadoController.deleteResultado.bind(ResultadoController_1.ResultadoController));
        this.router.get('/get/:id', ResultadoController_1.ResultadoController.getResultado.bind(ResultadoController_1.ResultadoController));
        this.router.get('/get-by-jornada/:jornada', ResultadoController_1.ResultadoController.checkExisteResultado.bind(ResultadoController_1.ResultadoController));
        /* this.router.get('/list/:id', ResultadoController.getPartidosByJornada.bind(ResultadoController)); */
    }
}
const RESULTADO_ROUTER = new ResultadoRouter();
exports.default = RESULTADO_ROUTER.router;
