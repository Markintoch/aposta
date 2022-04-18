import { Router } from 'express';
import { PronosticoController } from '../controllers/PronosticoController';

class PronosticoRouter{

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() : void {
        this.router.post('/create', PronosticoController.createPronostico.bind(PronosticoController));
        /* this.router.post('/update', PronosticoController.updateResultado.bind(PronosticoController));
        this.router.get('/delete/:id', PronosticoController.deleteResultado.bind(PronosticoController));
        this.router.get('/get/:id', PronosticoController.getResultado.bind(PronosticoController)); */
        /* this.router.get('/list/:id', ResultadoController.getPartidosByJornada.bind(ResultadoController)); */
    }

}

const PRONOSTICO_ROUTER = new PronosticoRouter();
export default PRONOSTICO_ROUTER.router;