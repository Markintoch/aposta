import { Router } from 'express';
import { PartidoController } from '../controllers/PartidoController';

class PartidoRouter{

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() : void {
        this.router.post('/create', PartidoController.createPartido.bind(PartidoController));
        this.router.post('/update', PartidoController.updatePartido.bind(PartidoController));
        this.router.get('/delete/:id', PartidoController.deletePartido.bind(PartidoController));
        this.router.get('/get/:id', PartidoController.getPartido.bind(PartidoController));
        // this.router.get('/list-liga/:id', PartidoController.getPartidosByLiga.bind(PartidoController));
        // this.router.get('/list-temporada/:id', PartidoController.getPartidosByTemp.bind(PartidoController));
        // this.router.get('/list-jornada/:id', PartidoController.getPartidosByJornada.bind(PartidoController));
        this.router.get('/list/:idLiga/:idTemporada/:idJornada', PartidoController.getPartidos.bind(PartidoController));
        this.router.get('/list-bet/:idLiga/:idTemporada', PartidoController.getPartidosBet.bind(PartidoController));
    }

}

const PARTIDO_ROUTER = new PartidoRouter();
export default PARTIDO_ROUTER.router;