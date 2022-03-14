import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';


class Cotizador{

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() : void {
        this.router.post('/signin',AuthController.singinUser.bind(AuthController));
        this.router.post('/login',AuthController.loginUser.bind(AuthController));
        this.router.get('/confirm/:token',AuthController.confirmRegister.bind(AuthController));
    }

}

const AUTH_ROUTER = new Cotizador();
export default AUTH_ROUTER.router;
