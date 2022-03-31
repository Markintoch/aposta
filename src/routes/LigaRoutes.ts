import { Router } from 'express';
/* import { DataController } from '../controllers/DataController'; */

class LigaRouter{

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

const LIGA_ROUTER = new LigaRouter();
export default LIGA_ROUTER.router;