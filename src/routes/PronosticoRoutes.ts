import { Router } from 'express';
import { PronosticoController } from '../controllers/PronosticoController';

class PronosticoRouter{

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() : void {
        this.router.post('/create', PronosticoController.createPronostico.bind(PronosticoController));
        this.router.post('/create-multiple', PronosticoController.createPronosticos.bind(PronosticoController));
        this.router.post('/update', PronosticoController.updatePronostico.bind(PronosticoController));
        this.router.post('/update-multiple', PronosticoController.updatePronosticos.bind(PronosticoController));
        this.router.get('/get/:id', PronosticoController.getPronostico.bind(PronosticoController));
        this.router.get('/get-by-jornada/:id/:user_id', PronosticoController.getPronosticosByJornada.bind(PronosticoController));
        this.router.get('/list-user/:user_id/:liga_id/:temporada_id', PronosticoController.getPronosticosUser.bind(PronosticoController));
    }

}

const PRONOSTICO_ROUTER = new PronosticoRouter();
export default PRONOSTICO_ROUTER.router;