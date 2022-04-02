import { Router } from 'express';
import { LigaController } from '../controllers/LigaController';
/* import { DataController } from '../controllers/DataController'; */

class LigaRouter{

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() : void {
        this.router.post('/create', LigaController.createLiga.bind(LigaController));
        this.router.post('/update',LigaController.updateLiga.bind(LigaController));
        this.router.delete('/delete/:id', LigaController.deleteLiga.bind(LigaController));
        this.router.get('/get/:id', LigaController.getLiga.bind(LigaController));
        this.router.get('/list', LigaController.getLigas.bind(LigaController));
    }

}

const LIGA_ROUTER = new LigaRouter();
export default LIGA_ROUTER.router;