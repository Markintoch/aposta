import express, { Application } from 'express';
import { Messages } from './util/messages'; 
import fileUpload from 'express-fileupload';
import cors from 'cors';

import AUTH_ROUTER from './routes/AuthRoutes';
import LIGA_ROUTER from './routes/LigaRoutes';
import TEMPORADA_ROUTER from './routes/TemporadaRoutes';
import EQUIPO_ROUTER from './routes/EquipoRoutes';
import JORNADA_ROUTER from './routes/JornadaRoutes';
import PARTIDO_ROUTER from './routes/PartidoRoutes';
import RESULTADO_ROUTER from './routes/ResultadoRoutes';

const bodyParser = require('body-parser');
const path = require('path');

const mediaPath = path.join(__dirname,'../media');

require('dotenv').config()


class Server{

    public app: Application;
    public cors : any;
    public port : any = process.env.PORT || 3000;

    constructor(){
        this.app = express();
        this.app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
        this.app.use(bodyParser.json({limit: '100mb', extended: true}))
        this.cors = cors();
        this.config();
        this.routes();
    }

    config() : void {
        this.app.set('port', this.port);
        this.app.use(fileUpload({ createParentPath: true }));
    }

    routes() : void {
        this.app.use(this.cors);
        this.app.use('/api/auth', AUTH_ROUTER);
        this.app.use('/api/liga', LIGA_ROUTER);
        this.app.use('/api/temporada', TEMPORADA_ROUTER);
        this.app.use('/api/equipo', EQUIPO_ROUTER);
        this.app.use('/api/jornada', JORNADA_ROUTER);
        this.app.use('/api/partido', PARTIDO_ROUTER);
        this.app.use('/api/resultado', RESULTADO_ROUTER);

        this.app.use('/media',express.static(mediaPath));
    }

    start() : void {
        let port = this.app.get('port');
        this.app.listen( port ,()=> console.log(`${ Messages.RUNNING_PORT } ${ port }`) );
    }

}

const server = new Server();
server.start();
