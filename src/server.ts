import express, { Application } from 'express';
import AUTH_ROUTER from './routes/AuthRoutes';
import LIGA_ROUTER from './routes/LigaRoutes';
import { Messages } from './util/messages'; 
import cors from 'cors';

import { DatabaseController } from './controllers/Database';
import fileUpload from 'express-fileupload';

const bodyParser = require('body-parser');

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
    }

    start() : void {
        let port = this.app.get('port');
        this.app.listen( port ,()=> console.log(`${ Messages.RUNNING_PORT } ${ port }`) );
    }

}

const server = new Server();
server.start();
