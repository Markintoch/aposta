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
            let active = request.body.active;
            let logo = request.files ? request.files.logo : null;
            if (nombre_liga == undefined || nombre_liga == null || nombre_liga.trim() == '') {
                throw new Error(messages_1.Messages.NOMBRE_LIGA_ISREQUIRED);
            }
            //if( logo == undefined || logo == null || logo.length == 0 ){throw new Error(Messages.IMG_ISREQUIRED)}
            let path = request.files ? GeneralController_1.GeneralController.saveFile(logo) : logo;
            await Database_1.DatabaseController.simpleInsert("ligas", "nombre, logo, active", [nombre_liga, path, active]);
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
            let active = request.body.active;
            let path = request.body.path;
            if (id_liga == undefined || id_liga == null) {
                throw new Error(messages_1.Messages.ID_ISREQUIRED);
            }
            if (nombre_liga == undefined || nombre_liga == null || nombre_liga.trim() == '') {
                throw new Error(messages_1.Messages.NOMBRE_LIGA_ISREQUIRED);
            }
            let updateData = [nombre_liga, active];
            let fieldsData = ["nombre", "active"];
            if (request.files) {
                let logo = request.files.logo;
                path = GeneralController_1.GeneralController.saveFile(logo);
                updateData.push(path);
                fieldsData.push('logo');
            }
            await Database_1.DatabaseController.simpleUpdateWithCondition("ligas", fieldsData, updateData, `liga_id = ${id_liga}`);
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
