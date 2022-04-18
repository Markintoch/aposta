"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartidoController = void 0;
const messages_1 = require("../util/messages");
const Database_1 = require("../controllers/Database");
class Partido {
    async getPartido(request, response) {
        try {
            let partido_id = request.params.id;
            if (partido_id == undefined || partido_id == null) {
                throw new Error(messages_1.Messages.ID_ISREQUIRED);
            }
            let resultQuery = await Database_1.DatabaseController.simpleSelectById("partidos", "partido_id", partido_id);
            let body = { status: 200, data: resultQuery };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async getPartidos(request, response) {
        try {
            let resultQuery = await Database_1.DatabaseController.selectAll("partidos");
            let body = { status: 200, data: resultQuery };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async getPartidosByJornada(request, response) {
        try {
            let jornada_id = request.params.id;
            if (jornada_id == undefined || jornada_id == null) {
                throw new Error(messages_1.Messages.JORNADA_NUMBER_ISREQUIRED);
            }
            let resultQuery = await Database_1.DatabaseController.simpleSelectById("partidos", "jornada_id", jornada_id);
            let body = { status: 200, data: resultQuery };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async createPartido(request, response) {
        try {
            let liga_id = request.body.liga_id;
            let temporada_id = request.body.temporada_id;
            let jornada_id = request.body.jornada_id;
            let vistante_id = request.body.vistante_id;
            let local_id = request.body.local_id;
            let jornada_original = request.body.jornada_original;
            if (liga_id == undefined || liga_id == null) {
                throw new Error(messages_1.Messages.LIGA_ID_ISREQUIRED);
            }
            if (temporada_id == undefined || temporada_id == null) {
                throw new Error(messages_1.Messages.TEMPORADA_ID_ISREQUIRED);
            }
            if (jornada_id == undefined || jornada_id == null) {
                throw new Error(messages_1.Messages.JORNADA_NUMBER_ISREQUIRED);
            }
            if (vistante_id == undefined || vistante_id == null) {
                throw new Error(messages_1.Messages.VISITANTE_ID_ISREQUIRED);
            }
            if (local_id == undefined || local_id == null) {
                throw new Error(messages_1.Messages.LOCAL_ID_ISREQUIRED);
            }
            let insertData = [liga_id, temporada_id, jornada_id, vistante_id, local_id, jornada_original];
            await Database_1.DatabaseController.simpleInsert("partidos", "liga_id, temporada_id, jornada_id, vistante_id, local_id, jornada_original", insertData);
            let body = { status: 200, message: messages_1.Messages.SUCCESS_INSERT, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async updatePartido(request, response) {
        try {
            let partido_id = request.body.partido_id;
            let liga_id = request.body.liga_id;
            let temporada_id = request.body.temporada_id;
            let jornada_id = request.body.jornada_id;
            let vistante_id = request.body.vistante_id;
            let local_id = request.body.local_id;
            let jornada_original = request.body.f_fin;
            if (partido_id == undefined || partido_id == null) {
                throw new Error(messages_1.Messages.ID_ISREQUIRED);
            }
            if (liga_id == undefined || liga_id == null) {
                throw new Error(messages_1.Messages.LIGA_ID_ISREQUIRED);
            }
            if (temporada_id == undefined || temporada_id == null) {
                throw new Error(messages_1.Messages.TEMPORADA_ID_ISREQUIRED);
            }
            if (jornada_id == undefined || jornada_id == null) {
                throw new Error(messages_1.Messages.JORNADA_NUMBER_ISREQUIRED);
            }
            if (vistante_id == undefined || vistante_id == null) {
                throw new Error(messages_1.Messages.VISITANTE_ID_ISREQUIRED);
            }
            if (local_id == undefined || local_id == null) {
                throw new Error(messages_1.Messages.LOCAL_ID_ISREQUIRED);
            }
            let updateData = [liga_id, temporada_id, jornada_id, vistante_id, local_id, jornada_original];
            await Database_1.DatabaseController.simpleUpdateWithCondition("partidos", ["liga_id", "temporada_id", "jornada_id", "vistante_id", "local_id", "jornada_original"], updateData, `partido_id = ${partido_id}`);
            let body = { status: 200, message: messages_1.Messages.SUCCESS_INSERT, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async deletePartido(request, response) {
        try {
            let partido_id = request.params.id;
            if (partido_id == undefined || partido_id == null) {
                throw new Error(messages_1.Messages.ID_ISREQUIRED);
            }
            await Database_1.DatabaseController.deleteById("partidos", "partido_id", partido_id);
            let body = { status: 200, message: messages_1.Messages.SUCCESS_DELETE, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
}
exports.PartidoController = new Partido();
