import { Router } from 'express';
/* import { GeneralDeSegurosController } from '../controllers/GeneralDeSeguros'; */



class Cotizador{

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() : void {
        /* this.router.post('/coberturas',GeneralDeSegurosController.coberturas.bind(GeneralDeSegurosController)); */
    }

}

const GN_ROUTER = new Cotizador();
export default GN_ROUTER.router;