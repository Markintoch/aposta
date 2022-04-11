import { Router } from 'express';
import { JornadaController } from '../controllers/JornadaController';

class JornadaRouter{

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() : void {
        this.router.post('/create', JornadaController.createJornada.bind(JornadaController));
        this.router.post('/update', JornadaController.updateJornada.bind(JornadaController));
        this.router.get('/delete/:id', JornadaController.deleteTemporada.bind(JornadaController));
        this.router.get('/get/:id', JornadaController.getJornada.bind(JornadaController));
        this.router.get('/list/:id', JornadaController.getJornadaByTemporada.bind(JornadaController));
    }

}

const JORNADA_ROUTER = new JornadaRouter();
export default JORNADA_ROUTER.router;