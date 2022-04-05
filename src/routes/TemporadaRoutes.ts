import { Router } from 'express';
import { TemporadaController } from '../controllers/TemporadaController';
/* import { DataController } from '../controllers/DataController'; */

class TemporadaRouter{

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() : void {
        this.router.post('/create');
        this.router.post('/update');
        this.router.get('/delete/:id');
        this.router.delete('/delete/:id', TemporadaController.deleteTemporada.bind(TemporadaController));
        this.router.get('/get/:id', TemporadaController.getTemporada.bind(TemporadaController));
        this.router.get('/list');
    }

}

const TEMPORADA_ROUTER = new TemporadaRouter();
export default TEMPORADA_ROUTER.router;