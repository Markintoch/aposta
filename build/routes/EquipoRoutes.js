"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EquipoController_1 = require("../controllers/EquipoController");
/* import { DataController } from '../controllers/DataController'; */
class EquipoRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/create', EquipoController_1.EquipoController.createEquipo.bind(EquipoController_1.EquipoController));
        this.router.post('/update', EquipoController_1.EquipoController.updateEquipo.bind(EquipoController_1.EquipoController));
        this.router.get('/delete/:id', EquipoController_1.EquipoController.deleteEquipo.bind(EquipoController_1.EquipoController));
        this.router.get('/get/:id', EquipoController_1.EquipoController.getEquipo.bind(EquipoController_1.EquipoController));
        this.router.get('/list/:id', EquipoController_1.EquipoController.getEquiposByTemporada.bind(EquipoController_1.EquipoController));
        this.router.get('/list', EquipoController_1.EquipoController.getEquipos.bind(EquipoController_1.EquipoController));
    }
}
const EQUIPO_ROUTER = new EquipoRouter();
exports.default = EQUIPO_ROUTER.router;
