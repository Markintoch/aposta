import { Router } from 'express';
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
        this.router.get('/get/:id');
        this.router.get('/list');
    }

}

const TEMPORADA_ROUTER = new TemporadaRouter();
export default TEMPORADA_ROUTER.router;