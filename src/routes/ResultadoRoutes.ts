import { Router } from 'express';
import { ResultadoController } from '../controllers/ResultadoController';

class ResultadoRouter{

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() : void {
        this.router.post('/create', ResultadoController.createResultado.bind(ResultadoController));
        this.router.post('/update', ResultadoController.updateResultado.bind(ResultadoController));
        this.router.get('/delete/:id', ResultadoController.deleteResultado.bind(ResultadoController));
        this.router.get('/get/:id', ResultadoController.getResultado.bind(ResultadoController));
        /* this.router.get('/list/:id', ResultadoController.getPartidosByJornada.bind(ResultadoController)); */
    }

}

const RESULTADO_ROUTER = new ResultadoRouter();
export default RESULTADO_ROUTER.router;