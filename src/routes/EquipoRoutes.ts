import { Router } from 'express';
import { EquipoController } from '../controllers/EquipoController';
/* import { DataController } from '../controllers/DataController'; */

class EquipoRouter{

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() : void {
        this.router.post('/create', EquipoController.createEquipo.bind(EquipoController));
        this.router.post('/update', EquipoController.updateEquipo.bind(EquipoController));
        this.router.get('/delete/:id', EquipoController.deleteEquipo.bind(EquipoController));
        this.router.get('/get/:id', EquipoController.getEquipo.bind(EquipoController));
        this.router.get('/list/:id', EquipoController.getEquiposByTemporada.bind(EquipoController));
    }

}

const EQUIPO_ROUTER = new EquipoRouter();
export default EQUIPO_ROUTER.router;