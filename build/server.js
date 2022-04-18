"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messages_1 = require("./util/messages");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const LigaRoutes_1 = __importDefault(require("./routes/LigaRoutes"));
const TemporadaRoutes_1 = __importDefault(require("./routes/TemporadaRoutes"));
const EquipoRoutes_1 = __importDefault(require("./routes/EquipoRoutes"));
const JornadaRoutes_1 = __importDefault(require("./routes/JornadaRoutes"));
const PartidoRoutes_1 = __importDefault(require("./routes/PartidoRoutes"));
const ResultadoRoutes_1 = __importDefault(require("./routes/ResultadoRoutes"));
const PronosticoRoutes_1 = __importDefault(require("./routes/PronosticoRoutes"));
const bodyParser = require('body-parser');
const path = require('path');
const mediaPath = path.join(__dirname, '../media');
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
        this.app.use((0, express_fileupload_1.default)({ createParentPath: true }));
    }
    routes() {
        this.app.use(this.cors);
        this.app.use('/api/auth', AuthRoutes_1.default);
        this.app.use('/api/liga', LigaRoutes_1.default);
        this.app.use('/api/temporada', TemporadaRoutes_1.default);
        this.app.use('/api/equipo', EquipoRoutes_1.default);
        this.app.use('/api/jornada', JornadaRoutes_1.default);
        this.app.use('/api/partido', PartidoRoutes_1.default);
        this.app.use('/api/resultado', ResultadoRoutes_1.default);
        this.app.use('/api/pronostico', PronosticoRoutes_1.default);
        this.app.use('/media', express_1.default.static(mediaPath));
    }
    start() {
        let port = this.app.get('port');
        this.app.listen(port, () => console.log(`${messages_1.Messages.RUNNING_PORT} ${port}`));
    }
}
const server = new Server();
server.start();
