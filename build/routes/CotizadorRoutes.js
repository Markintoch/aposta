"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/* import { AfirmeController } from '../controllers/Afirme';
import { GeneralDeSegurosController } from '../controllers/GeneralDeSeguros'; */
/* import { DataController } from '../controllers/DataController'; */
class Cotizador {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        /* this.router.get('/estados',DataController.estados.bind(DataController));
        this.router.get('/municipios/:id',DataController.municipios.bind(DataController));
        this.router.get('/municipios/',DataController.municipios.bind(DataController));
        this.router.get('/marcas',DataController.marcas.bind(DataController));
        this.router.get('/estilos/:id_marca/:modelo', DataController.estilos.bind(DataController));
        this.router.get('/modelos/:id',DataController.modelos.bind(DataController));
        this.router.post('/generarCotizacion',DataController.generarCotizacion.bind(DataController));
        this.router.post('/generarPDF', DataController.generarPDFCotizacion.bind(DataController)); */
    }
}
const COTIZADOR_ROUTER = new Cotizador();
exports.default = COTIZADOR_ROUTER.router;
