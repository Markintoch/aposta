"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporadaController = void 0;
const messages_1 = require("../util/messages");
const Database_1 = require("../controllers/Database");
class Temporada {
    async getTemporada(request, response) {
        try {
            let id_temporada = request.params.id;
            if (id_temporada == undefined || id_temporada == null) {
                throw new Error(messages_1.Messages.ID_ISREQUIRED);
            }
            let resultQuery = await Database_1.DatabaseController.simpleSelectById("temporadas", "temporada_id", id_temporada);
            let body = { status: 200, data: resultQuery };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async getTemporadasByLiga(request, response) {
        try {
            let liga_id = request.params.id;
            if (liga_id == undefined || liga_id == null) {
                throw new Error(messages_1.Messages.LIGA_ID_ISREQUIRED);
            }
            let resultQuery = await Database_1.DatabaseController.simpleSelectById("temporadas", "liga_id", liga_id);
            let body = { status: 200, data: resultQuery };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async getTemporadas(request, response) {
        try {
            let resultQuery = await Database_1.DatabaseController.selectAll("temporadas");
            let body = { status: 200, data: resultQuery };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async createTemporada(request, response) {
        try {
            let liga_id = request.body.liga_id;
            let nombre_temporada = request.body.nombre;
            let numero_tempoarada = request.body.numero;
            let fecha_inicio = request.body.f_inicio;
            let fecha_fin = request.body.f_fin;
            if (liga_id == undefined || liga_id == null) {
                throw new Error(messages_1.Messages.LIGA_ID_ISREQUIRED);
            }
            if (nombre_temporada == undefined || nombre_temporada == null || nombre_temporada.trim() == '') {
                throw new Error(messages_1.Messages.NOMBRE_TEMPOARADA_ISREQUIRED);
            }
            if (numero_tempoarada == undefined || numero_tempoarada == null) {
                throw new Error(messages_1.Messages.LIGA_NUMBER_ISREQUIRED);
            }
            if (fecha_inicio == undefined || fecha_inicio == null) {
                throw new Error(messages_1.Messages.DATE_START_ISREQUIRED);
            }
            if (fecha_fin == undefined || fecha_fin == null) {
                throw new Error(messages_1.Messages.DATE_END_ISREQUIRED);
            }
            await Database_1.DatabaseController.simpleInsert("temporadas", "liga_id, nombre, numero, fecha_inicio, fecha_fin", [liga_id, nombre_temporada, numero_tempoarada, fecha_inicio, fecha_fin]);
            let body = { status: 200, message: messages_1.Messages.SUCCESS_INSERT, data: null };
            response.json(body);
        }
        catch (error) {
            console.log(error);
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async deleteTemporada(request, response) {
        try {
            let id_temporada = request.params.id;
            if (id_temporada == undefined || id_temporada == null) {
                throw new Error(messages_1.Messages.ID_ISREQUIRED);
            }
            await Database_1.DatabaseController.deleteById("temporadas", "temporada_id", id_temporada);
            let body = { status: 200, message: messages_1.Messages.SUCCESS_DELETE, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async updateTemporada(request, response) {
        try {
            let temporada_id = request.body.temporada_id;
            let liga_id = request.body.liga_id;
            let nombre_temporada = request.body.nombre;
            let numero_tempoarada = request.body.numero;
            let fecha_inicio = request.body.f_inicio;
            let fecha_fin = request.body.f_fin;
            if (temporada_id == undefined || temporada_id == null) {
                throw new Error(messages_1.Messages.ID_ISREQUIRED);
            }
            if (liga_id == undefined || liga_id == null) {
                throw new Error(messages_1.Messages.LIGA_ID_ISREQUIRED);
            }
            if (nombre_temporada == undefined || nombre_temporada == null || nombre_temporada.trim() == '') {
                throw new Error(messages_1.Messages.NOMBRE_TEMPOARADA_ISREQUIRED);
            }
            if (numero_tempoarada == undefined || numero_tempoarada == null) {
                throw new Error(messages_1.Messages.LIGA_NUMBER_ISREQUIRED);
            }
            if (fecha_inicio == undefined || fecha_inicio == null) {
                throw new Error(messages_1.Messages.DATE_START_ISREQUIRED);
            }
            if (fecha_fin == undefined || fecha_fin == null) {
                throw new Error(messages_1.Messages.DATE_END_ISREQUIRED);
            }
            await Database_1.DatabaseController.simpleUpdateWithCondition("temporadas", ["liga_id", "nombre", "numero", "fecha_inicio", "fecha_fin"], [liga_id, nombre_temporada, numero_tempoarada, fecha_inicio, fecha_fin], `temporada_id = ${temporada_id}`);
            let body = { status: 200, message: messages_1.Messages.SUCCESS_UPDATE, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
}
exports.TemporadaController = new Temporada();
