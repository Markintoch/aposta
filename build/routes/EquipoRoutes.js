"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/* import { DataController } from '../controllers/DataController'; */
class EquipoRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/create');
        this.router.post('/update');
        this.router.get('/delete/:id');
        this.router.get('/get/:id');
        this.router.get('/list');
    }
}
const EQUIPO_ROUTER = new EquipoRouter();
exports.default = EQUIPO_ROUTER.router;
