"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LigaController = void 0;
const messages_1 = require("../util/messages");
const Database_1 = require("../controllers/Database");
const GeneralController_1 = require("./GeneralController");
class Liga {
    async getLigas(request, response) {
        try {
            let resultQuery = await Database_1.DatabaseController.selectAll("ligas");
            let body = { status: 200, data: resultQuery };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async getLiga(request, response) {
        try {
            let id_liga = request.params.id;
            if (id_liga == undefined || id_liga == null) {
                throw new Error(messages_1.Messages.ID_ISREQUIRED);
            }
            let resultQuery = await Database_1.DatabaseController.simpleSelectById("ligas", "liga_id", id_liga);
            let body = { status: 200, data: resultQuery };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async createLiga(request, response) {
        try {
            if (!request.files) {
                throw new Error(messages_1.Messages.IMG_ISREQUIRED);
            }
            let nombre_liga = request.body.nombre;
            let activo = request.body.activo;
            let logo = request.files.logo;
            if (nombre_liga == undefined || nombre_liga == null || nombre_liga.trim() == '') {
                throw new Error(messages_1.Messages.NOMBRE_LIGA_ISREQUIRED);
            }
            if (logo == undefined || logo == null || logo.length == 0) {
                throw new Error(messages_1.Messages.IMG_ISREQUIRED);
            }
            let path = GeneralController_1.GeneralController.saveFile(logo);
            await Database_1.DatabaseController.simpleInsert("ligas", "nombre, logo, active", [nombre_liga, path, activo]);
            let body = { status: 200, message: messages_1.Messages.SUCCESS_INSERT, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async updateLiga(request, response) {
        try {
            let id_liga = request.body.id;
            let nombre_liga = request.body.nombre;
            let activo = request.body.activo;
            let path = request.body.logo;
            if (id_liga == undefined || id_liga == null) {
                throw new Error(messages_1.Messages.ID_ISREQUIRED);
            }
            if (nombre_liga == undefined || nombre_liga == null || nombre_liga.trim() == '') {
                throw new Error(messages_1.Messages.NOMBRE_LIGA_ISREQUIRED);
            }
            if (request.files) {
                let logo = request.files.logo;
                path = GeneralController_1.GeneralController.saveFile(logo);
            }
            let updateData = [nombre_liga, path, activo];
            await Database_1.DatabaseController.simpleUpdateWithCondition("ligas", ["nombre", "logo", "active"], updateData, `liga_id = ${id_liga}`);
            let body = { status: 200, message: messages_1.Messages.SUCCESS_UPDATE, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async deleteLiga(request, response) {
        try {
            let id_liga = request.params.id;
            if (id_liga == undefined || id_liga == null) {
                throw new Error(messages_1.Messages.ID_ISREQUIRED);
            }
            await Database_1.DatabaseController.deleteLiga(id_liga);
            let body = { status: 200, message: messages_1.Messages.SUCCESS_DELETE, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
}
exports.LigaController = new Liga();
