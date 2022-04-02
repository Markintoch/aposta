"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LigaController_1 = require("../controllers/LigaController");
/* import { DataController } from '../controllers/DataController'; */
class LigaRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/create', LigaController_1.LigaController.createLiga.bind(LigaController_1.LigaController));
        this.router.post('/update', LigaController_1.LigaController.updateLiga.bind(LigaController_1.LigaController));
        this.router.delete('/delete/:id', LigaController_1.LigaController.deleteLiga.bind(LigaController_1.LigaController));
        this.router.get('/get/:id', LigaController_1.LigaController.getLiga.bind(LigaController_1.LigaController));
        this.router.get('/list', LigaController_1.LigaController.getLigas.bind(LigaController_1.LigaController));
    }
}
const LIGA_ROUTER = new LigaRouter();
exports.default = LIGA_ROUTER.router;
