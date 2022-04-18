"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PronosticoController = void 0;
const messages_1 = require("../util/messages");
const Database_1 = require("../controllers/Database");
const moment_1 = __importDefault(require("moment"));
class Pronostico {
    async createPronostico(request, response) {
        try {
            await this.createPronosticoNoRest(request.body);
            let body = { status: 200, message: messages_1.Messages.SUCCESS_INSERT, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async createPronosticos(request, response) {
        try {
            let pronosticos = request.body.pronosticos;
            for (let pronostico of pronosticos) {
                await this.createPronosticoNoRest(pronostico);
            }
            let body = { status: 200, message: messages_1.Messages.SUCCESS_INSERT, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async createPronosticoNoRest(pronostico) {
        let partido_id = pronostico.partido_id;
        let ganador_id = pronostico.ganador_id;
        let created_on = new Date();
        if (partido_id == undefined || partido_id == null) {
            throw new Error(messages_1.Messages.PARTIDO_ID_ISREQUIRED);
        }
        if (ganador_id == undefined || ganador_id == null) {
            throw new Error(messages_1.Messages.GANADOR_ID_ISREQUIRED);
        }
        if (await this.canSendPronostico(partido_id)) {
            let insertData = [partido_id, ganador_id, created_on];
            await Database_1.DatabaseController.simpleInsert("pronosticos", "partido_id, ganador_id, created_on", insertData);
        }
        else {
            throw new Error(messages_1.Messages.CANNOT_SEND_PRONOSTICO);
        }
    }
    async canSendPronostico(partido_id) {
        try {
            let resultadoPartido = await Database_1.DatabaseController.simpleSelectById("partidos", "jornada_id", partido_id);
            let resultadoJornada = await Database_1.DatabaseController.simpleSelectById("jornadas", "jornada_id", resultadoPartido[0].jornada_id);
            let dateNow = (0, moment_1.default)();
            let dateJornada = (0, moment_1.default)(resultadoJornada[0].fecha_inicio);
            return dateNow.diff(dateJornada, 'days') > 0 ? false : true;
        }
        catch (error) {
            console.log(error.message);
            return false;
        }
    }
}
exports.PronosticoController = new Pronostico();
