"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PartidoController_1 = require("../controllers/PartidoController");
class PartidoRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/create', PartidoController_1.PartidoController.createPartido.bind(PartidoController_1.PartidoController));
        this.router.post('/update', PartidoController_1.PartidoController.updatePartido.bind(PartidoController_1.PartidoController));
        this.router.get('/delete/:id', PartidoController_1.PartidoController.deletePartido.bind(PartidoController_1.PartidoController));
        this.router.get('/get/:id', PartidoController_1.PartidoController.getPartido.bind(PartidoController_1.PartidoController));
        this.router.get('/list/:id', PartidoController_1.PartidoController.getPartidosByJornada.bind(PartidoController_1.PartidoController));
    }
}
const PARTIDO_ROUTER = new PartidoRouter();
exports.default = PARTIDO_ROUTER.router;
