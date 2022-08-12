import { Router } from 'express';
import { TemporadaController } from '../controllers/TemporadaController';
/* import { DataController } from '../controllers/DataController'; */

class TemporadaRouter{

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() : void {
        this.router.post('/create', TemporadaController.createTemporada.bind(TemporadaController));
        this.router.post('/update', TemporadaController.updateTemporada.bind(TemporadaController));
        this.router.delete('/delete/:id', TemporadaController.deleteTemporada.bind(TemporadaController));
        this.router.get('/get/:id', TemporadaController.getTemporada.bind(TemporadaController));
        this.router.get('/list/:liga_id', TemporadaController.getTemporadas.bind(TemporadaController));
        this.router.get('/list-min/:liga_id', TemporadaController.getTemporadasMin.bind(TemporadaController));
        //this.router.get('/list', TemporadaController.getTemporadas.bind(TemporadaController));
    }

}

const TEMPORADA_ROUTER = new TemporadaRouter();
export default TEMPORADA_ROUTER.router;