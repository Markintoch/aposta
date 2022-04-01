"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LigaController = void 0;
const messages_1 = require("../util/messages");
const Database_1 = require("../controllers/Database");
const path_dir = require('path');
const path_logo = 'media/logo_';
class Liga {
    async createLiga(request, response) {
        try {
            if (!request.files) {
                throw new Error(messages_1.Messages.IMG_ISREQUIRED);
            }
            let nombre_liga = request.body.nombre;
            let logo = request.files.logo;
            if (nombre_liga == undefined || nombre_liga == null || nombre_liga.trim() == '') {
                throw new Error(messages_1.Messages.NOMBRE_LIGA_ISREQUIRED);
            }
            if (logo == undefined || logo == null || logo.length == 0) {
                throw new Error(messages_1.Messages.IMG_ISREQUIRED);
            }
            let ext = path_dir.extname(logo.name);
            let path = path_logo + new Date().getTime() + ext;
            logo.mv(path);
            await Database_1.DatabaseController.insertLiga(nombre_liga, path);
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
            if (!request.files) {
                throw new Error(messages_1.Messages.IMG_ISREQUIRED);
            }
            let id_liga = request.body.id;
            let nombre_liga = request.body.nombre;
            let logo = request.files.logo;
            if (id_liga == undefined || id_liga == null) {
                throw new Error(messages_1.Messages.ID_ISREQUIRED);
            }
            if (nombre_liga == undefined || nombre_liga == null || nombre_liga.trim() == '') {
                throw new Error(messages_1.Messages.NOMBRE_LIGA_ISREQUIRED);
            }
            if (logo == undefined || logo == null || logo.length == 0) {
                throw new Error(messages_1.Messages.IMG_ISREQUIRED);
            }
            let ext = path_dir.extname(logo.name);
            let path = path_logo + new Date().getTime() + ext;
            logo.mv(path);
            await Database_1.DatabaseController.updateLiga(id_liga, nombre_liga, path);
            let body = { status: 200, message: messages_1.Messages.SUCCES_UPDATE, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
}
exports.LigaController = new Liga();
