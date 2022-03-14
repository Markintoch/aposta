"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const messages_1 = require("./util/messages");
const cors_1 = __importDefault(require("cors"));
const bodyParser = require('body-parser');
require('dotenv').config();
class Server {
    constructor() {
        this.port = process.env.PORT || 3000;
        this.app = (0, express_1.default)();
        this.app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
        this.app.use(bodyParser.json({ limit: '100mb', extended: true }));
        this.cors = (0, cors_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', this.port);
    }
    routes() {
        this.app.use(this.cors);
        this.app.use('/api/auth', AuthRoutes_1.default);
    }
    start() {
        let port = this.app.get('port');
        this.app.listen(port, () => console.log(`${messages_1.Messages.RUNNING_PORT} ${port}`));
    }
}
const server = new Server();
server.start();
