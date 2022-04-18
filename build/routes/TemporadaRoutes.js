"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TemporadaController_1 = require("../controllers/TemporadaController");
/* import { DataController } from '../controllers/DataController'; */
class TemporadaRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/create', TemporadaController_1.TemporadaController.createTemporada.bind(TemporadaController_1.TemporadaController));
        this.router.post('/update', TemporadaController_1.TemporadaController.updateTemporada.bind(TemporadaController_1.TemporadaController));
        this.router.delete('/delete/:id', TemporadaController_1.TemporadaController.deleteTemporada.bind(TemporadaController_1.TemporadaController));
        this.router.get('/get/:id', TemporadaController_1.TemporadaController.getTemporada.bind(TemporadaController_1.TemporadaController));
        this.router.get('/list/:id', TemporadaController_1.TemporadaController.getTemporadasByLiga.bind(TemporadaController_1.TemporadaController));
        this.router.get('/list', TemporadaController_1.TemporadaController.getTemporadas.bind(TemporadaController_1.TemporadaController));
    }
}
const TEMPORADA_ROUTER = new TemporadaRouter();
exports.default = TEMPORADA_ROUTER.router;
