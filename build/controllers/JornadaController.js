"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JornadaController = void 0;
const messages_1 = require("../util/messages");
const Database_1 = require("../controllers/Database");
class Jornada {
    async getJornada(request, response) {
        try {
            let jornada_id = request.params.id;
            if (jornada_id == undefined || jornada_id == null) {
                throw new Error(messages_1.Messages.ID_ISREQUIRED);
            }
            let resultQuery = await Database_1.DatabaseController.simpleSelectById("jornadas", "jornada_id", jornada_id);
            let body = { status: 200, data: resultQuery };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async getJornadaByTemporada(request, response) {
        try {
            let temporada_id = request.params.id;
            if (temporada_id == undefined || temporada_id == null) {
                throw new Error(messages_1.Messages.TEMPORADA_ID_ISREQUIRED);
            }
            let resultQuery = await Database_1.DatabaseController.selectJornadaByTemp(temporada_id); //simpleSelectById( "jornadas", "temporada_id", temporada_id );
            let body = { status: 200, data: resultQuery };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async getJornadaByLiga(request, response) {
        try {
            let liga_id = request.params.id;
            if (liga_id == undefined || liga_id == null) {
                throw new Error(messages_1.Messages.LIGA_ID_ISREQUIRED);
            }
            let resultQuery = await Database_1.DatabaseController.selectJornadaByLiga(liga_id); //simpleSelectById( "jornadas", "temporada_id", temporada_id );
            let body = { status: 200, data: resultQuery };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async getJornadas(request, response) {
        try {
            let { idLiga, idTemporada } = request.params;
            //let resultQuery = await DatabaseController.selectAll("jornadas");
            let resultQuery = await Database_1.DatabaseController.selectJornadas(idLiga, idTemporada);
            let body = { status: 200, data: resultQuery };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async createJornada(request, response) {
        try {
            let liga_id = request.body.liga_id;
            let temporada_id = request.body.temporada_id;
            let nombre_jornada = request.body.nombre;
            let num_jornada = request.body.numero;
            let fecha_inicio = request.body.f_inicio;
            let fecha_fin = request.body.f_fin;
            if (liga_id == undefined || liga_id == null) {
                throw new Error(messages_1.Messages.LIGA_ID_ISREQUIRED);
            }
            if (temporada_id == undefined || temporada_id == null) {
                throw new Error(messages_1.Messages.TEMPORADA_ID_ISREQUIRED);
            }
            if (nombre_jornada == undefined || nombre_jornada == null || nombre_jornada.trim() == '') {
                throw new Error(messages_1.Messages.NOMBRE_TEMPOARADA_ISREQUIRED);
            }
            if (num_jornada == undefined || num_jornada == null) {
                throw new Error(messages_1.Messages.JORNADA_NUMBER_ISREQUIRED);
            }
            if (fecha_inicio == undefined || fecha_inicio == null) {
                throw new Error(messages_1.Messages.DATE_START_ISREQUIRED);
            }
            if (fecha_fin == undefined || fecha_fin == null) {
                throw new Error(messages_1.Messages.DATE_END_ISREQUIRED);
            }
            await Database_1.DatabaseController.simpleInsert("jornadas", "liga_id, temporada_id, nombre, numero, fecha_inicio, fecha_fin", [liga_id, temporada_id, nombre_jornada, num_jornada, fecha_inicio, fecha_fin]);
            let body = { status: 200, message: messages_1.Messages.SUCCESS_INSERT, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async updateJornada(request, response) {
        try {
            let jornada_id = request.body.jornada_id;
            let liga_id = request.body.liga_id;
            let temporada_id = request.body.temporada_id;
            let nombre_jornada = request.body.nombre;
            let num_jornada = request.body.numero;
            let fecha_inicio = request.body.f_inicio;
            let fecha_fin = request.body.f_fin;
            if (jornada_id == undefined || jornada_id == null) {
                throw new Error(messages_1.Messages.ID_ISREQUIRED);
            }
            if (liga_id == undefined || liga_id == null) {
                throw new Error(messages_1.Messages.LIGA_ID_ISREQUIRED);
            }
            if (temporada_id == undefined || temporada_id == null) {
                throw new Error(messages_1.Messages.TEMPORADA_ID_ISREQUIRED);
            }
            if (nombre_jornada == undefined || nombre_jornada == null || nombre_jornada.trim() == '') {
                throw new Error(messages_1.Messages.NOMBRE_TEMPOARADA_ISREQUIRED);
            }
            if (num_jornada == undefined || num_jornada == null) {
                throw new Error(messages_1.Messages.JORNADA_NUMBER_ISREQUIRED);
            }
            if (fecha_inicio == undefined || fecha_inicio == null) {
                throw new Error(messages_1.Messages.DATE_START_ISREQUIRED);
            }
            if (fecha_fin == undefined || fecha_fin == null) {
                throw new Error(messages_1.Messages.DATE_END_ISREQUIRED);
            }
            let updateData = [liga_id, temporada_id, nombre_jornada, num_jornada, fecha_inicio, fecha_fin];
            await Database_1.DatabaseController.simpleUpdateWithCondition("jornadas", ["liga_id", "temporada_id", "nombre", "numero", "fecha_inicio", "fecha_fin"], updateData, `jornada_id = ${jornada_id}`);
            let body = { status: 200, message: messages_1.Messages.SUCCESS_UPDATE, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async deleteTemporada(request, response) {
        try {
            let jornada_id = request.params.id;
            if (jornada_id == undefined || jornada_id == null) {
                throw new Error(messages_1.Messages.ID_ISREQUIRED);
            }
            await Database_1.DatabaseController.deleteById("jornadas", "jornada_id", jornada_id);
            let body = { status: 200, message: messages_1.Messages.SUCCESS_DELETE, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
}
exports.JornadaController = new Jornada();
