import { Router } from 'express';
/* import { AfirmeController } from '../controllers/Afirme';
import { GeneralDeSegurosController } from '../controllers/GeneralDeSeguros'; */
/* import { DataController } from '../controllers/DataController'; */

class Cotizador{

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() : void {
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
export default COTIZADOR_ROUTER.router;