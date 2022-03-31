import { Router } from 'express';
/* import { DataController } from '../controllers/DataController'; */

class PartidoRouter{

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

const PARTIDO_ROUTER = new PartidoRouter();
export default PARTIDO_ROUTER.router;