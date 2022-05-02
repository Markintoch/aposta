"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipoController = void 0;
const messages_1 = require("../util/messages");
const Database_1 = require("../controllers/Database");
const GeneralController_1 = require("./GeneralController");
class Equipo {
    async getEquipo(request, response) {
        try {
            let equipo_id = request.params.id;
            if (equipo_id == undefined || equipo_id == null) {
                throw new Error(messages_1.Messages.ID_ISREQUIRED);
            }
            let resultQuery = await Database_1.DatabaseController.simpleSelectById("equipos", "equipo_id", equipo_id);
            let body = { status: 200, data: resultQuery };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async getEquiposByTemporada(request, response) {
        try {
            let temporada_id = request.params.id;
            if (temporada_id == undefined || temporada_id == null) {
                throw new Error(messages_1.Messages.TEMPORADA_ID_ISREQUIRED);
            }
            let resultQuery = await Database_1.DatabaseController.selectEquipoByTemp(temporada_id); //await DatabaseController.simpleSelectById( "equipos", "temporada_id", temporada_id );
            let body = { status: 200, data: resultQuery };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async getEquiposByLiga(request, response) {
        try {
            let liga_id = request.params.id;
            if (liga_id == undefined || liga_id == null) {
                throw new Error(messages_1.Messages.LIGA_ID_ISREQUIRED);
            }
            let resultQuery = await Database_1.DatabaseController.selectEquipoByLiga(liga_id); //await DatabaseController.simpleSelectById( "equipos", "liga_id", liga_id );
            let body = { status: 200, data: resultQuery };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async getEquipos(request, response) {
        try {
            let resultQuery = await Database_1.DatabaseController.selectAll("equipos");
            let body = { status: 200, data: resultQuery };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async createEquipo(request, response) {
        try {
            if (!request.files) {
                throw new Error(messages_1.Messages.IMG_ISREQUIRED);
            }
            let liga_id = request.body.liga_id;
            let id_temporada = request.body.temporada_id;
            let nombre_equipo = request.body.nombre;
            let activo = request.body.activo;
            let logo = request.files.logo;
            if (liga_id == undefined || liga_id == null) {
                throw new Error(messages_1.Messages.LIGA_ID_ISREQUIRED);
            }
            if (id_temporada == undefined || id_temporada == null) {
                throw new Error(messages_1.Messages.TEMPORADA_ID_ISREQUIRED);
            }
            if (nombre_equipo == undefined || nombre_equipo == null || nombre_equipo.trim() == '') {
                throw new Error(messages_1.Messages.NOMBRE_EQUIPO_ISREQUIRED);
            }
            if (logo == undefined || logo == null || logo.length == 0) {
                throw new Error(messages_1.Messages.IMG_ISREQUIRED);
            }
            let path_logo = GeneralController_1.GeneralController.saveFile(logo);
            let insertData = [liga_id, id_temporada, nombre_equipo, path_logo, activo];
            await Database_1.DatabaseController.simpleInsert("equipos", "liga_id, temporada_id, nombre, logo, activo", insertData);
            let body = { status: 200, message: messages_1.Messages.SUCCESS_INSERT, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async updateEquipo(request, response) {
        try {
            let equipo_id = request.body.equipo_id;
            let liga_id = request.body.liga_id;
            let id_temporada = request.body.temporada_id;
            let nombre_equipo = request.body.nombre;
            let activo = request.body.activo;
            let path = request.body.logo;
            if (equipo_id == undefined || equipo_id == null) {
                throw new Error(messages_1.Messages.ID_ISREQUIRED);
            }
            if (liga_id == undefined || liga_id == null) {
                throw new Error(messages_1.Messages.LIGA_ID_ISREQUIRED);
            }
            if (id_temporada == undefined || id_temporada == null) {
                throw new Error(messages_1.Messages.TEMPORADA_ID_ISREQUIRED);
            }
            if (nombre_equipo == undefined || nombre_equipo == null || nombre_equipo.trim() == '') {
                throw new Error(messages_1.Messages.NOMBRE_EQUIPO_ISREQUIRED);
            }
            let updateData = [liga_id, id_temporada, nombre_equipo, activo];
            let fieldsData = ["liga_id", "temporada_id", "nombre", "activo"];
            if (request.files) {
                let logo = request.files.logo;
                path = GeneralController_1.GeneralController.saveFile(logo);
                updateData.push(path);
                fieldsData.push('logo');
            }
            await Database_1.DatabaseController.simpleUpdateWithCondition("equipos", fieldsData, updateData, `equipo_id = ${equipo_id}`);
            let body = { status: 200, message: messages_1.Messages.SUCCESS_UPDATE, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async deleteEquipo(request, response) {
        try {
            let equipo_id = request.params.id;
            if (equipo_id == undefined || equipo_id == null) {
                throw new Error(messages_1.Messages.ID_ISREQUIRED);
            }
            await Database_1.DatabaseController.deleteById("equipos", "equipo_id", equipo_id);
            let body = { status: 200, message: messages_1.Messages.SUCCESS_DELETE, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
}
exports.EquipoController = new Equipo();
