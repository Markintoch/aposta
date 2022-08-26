"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultadoController = void 0;
const messages_1 = require("../util/messages");
const Database_1 = require("../controllers/Database");
class Resultado {
    async getResultado(request, response) {
        try {
            let resultado_id = request.params.id;
            if (resultado_id == undefined || resultado_id == null) {
                throw new Error(messages_1.Messages.ID_ISREQUIRED);
            }
            let resultQuery = await Database_1.DatabaseController.simpleSelectById("resultados", "resultado_id", resultado_id);
            let body = { status: 200, data: resultQuery };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async createResultado(request, response) {
        try {
            let partido_id = request.body.partido_id;
            let marcador_local = request.body.marcador_local;
            let marcador_visitante = request.body.marcador_visitante;
            let ganador_id = request.body.ganador_id;
            if (partido_id == undefined || partido_id == null) {
                throw new Error(messages_1.Messages.PARTIDO_ID_ISREQUIRED);
            }
            if (marcador_local == undefined || marcador_local == null) {
                throw new Error(messages_1.Messages.MARCADOR_L_ISREQUIRED);
            }
            if (marcador_visitante == undefined || marcador_visitante == null) {
                throw new Error(messages_1.Messages.MARCADOR_V_ISREQUIRED);
            }
            if (ganador_id == undefined || ganador_id == null) {
                throw new Error(messages_1.Messages.GANADOR_ID_ISREQUIRED);
            }
            let insertData = [partido_id, marcador_local, marcador_visitante, ganador_id];
            await Database_1.DatabaseController.simpleInsert("resultados", "partido_id, marcador_local, marcador_visitante, ganador_id", insertData);
            let body = { status: 200, message: messages_1.Messages.SUCCESS_INSERT, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async createResultados(request, response) {
        try {
            let resultados = request.body.resultados;
            let jsonResultados = JSON.parse(resultados);
            if (jsonResultados == undefined || jsonResultados == null) {
                throw new Error(messages_1.Messages.PARTIDO_ID_ISREQUIRED);
            }
            for (let resultado of jsonResultados) {
                if (resultado.jornada_id == undefined || resultado.jornada_id == null) {
                    throw new Error(messages_1.Messages.JORNADA_ID_ISREQUIRED);
                }
                if (resultado.partido_id == undefined || resultado.partido_id == null) {
                    throw new Error(messages_1.Messages.PARTIDO_ID_ISREQUIRED);
                }
                if (resultado.ganador_id == undefined || resultado.ganador_id == null) {
                    throw new Error(messages_1.Messages.GANADOR_ID_ISREQUIRED);
                }
                let insertData = [resultado.jornada_id, resultado.partido_id, resultado.ganador_id];
                await Database_1.DatabaseController.simpleInsert("resultados", "jornada_id, partido_id, ganador_id", insertData);
            }
            let body = { status: 200, message: messages_1.Messages.SUCCESS_INSERT, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async updateResultados(request, response) {
        try {
            let resultados = request.body.resultados;
            let jsonResultados = JSON.parse(resultados);
            if (jsonResultados == undefined || jsonResultados == null) {
                throw new Error(messages_1.Messages.PARTIDO_ID_ISREQUIRED);
            }
            for (let resultado of jsonResultados) {
                if (resultado.resultado_id == undefined || resultado.resultado_id == null) {
                    if (resultado.jornada_id == undefined || resultado.jornada_id == null) {
                        throw new Error(messages_1.Messages.JORNADA_ID_ISREQUIRED);
                    }
                    if (resultado.partido_id == undefined || resultado.partido_id == null) {
                        throw new Error(messages_1.Messages.PARTIDO_ID_ISREQUIRED);
                    }
                    if (resultado.ganador_id == undefined || resultado.ganador_id == null) {
                        throw new Error(messages_1.Messages.GANADOR_ID_ISREQUIRED);
                    }
                    let insertData = [resultado.jornada_id, resultado.partido_id, resultado.ganador_id];
                    await Database_1.DatabaseController.simpleInsert("resultados", "jornada_id, partido_id, ganador_id", insertData);
                }
                else {
                    let updateData = [resultado.ganador_id];
                    await Database_1.DatabaseController.simpleUpdateWithCondition("resultados", ['ganador_id'], updateData, `resultado_id = ${resultado.resultado_id}`);
                }
            }
            let body = { status: 200, message: messages_1.Messages.SUCCESS_UPDATE, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async updateResultado(request, response) {
        try {
            let resultado_id = request.body.resultado_id;
            let partido_id = request.body.partido_id;
            let marcador_local = request.body.marcador_local;
            let marcador_visitante = request.body.marcador_visitante;
            let ganador_id = request.body.ganador_id;
            if (resultado_id == undefined || resultado_id == null) {
                throw new Error(messages_1.Messages.ID_ISREQUIRED);
            }
            if (partido_id == undefined || partido_id == null) {
                throw new Error(messages_1.Messages.PARTIDO_ID_ISREQUIRED);
            }
            if (marcador_local == undefined || marcador_local == null) {
                throw new Error(messages_1.Messages.MARCADOR_L_ISREQUIRED);
            }
            if (marcador_visitante == undefined || marcador_visitante == null) {
                throw new Error(messages_1.Messages.MARCADOR_V_ISREQUIRED);
            }
            if (ganador_id == undefined || ganador_id == null) {
                throw new Error(messages_1.Messages.GANADOR_ID_ISREQUIRED);
            }
            let insertData = [partido_id, marcador_local, marcador_visitante, ganador_id];
            await Database_1.DatabaseController.simpleUpdateWithCondition("resultados", ["partido_id", "marcador_local", "marcador_visitante", "ganador_id"], insertData, `resultado_id = ${resultado_id}`);
            let body = { status: 200, message: messages_1.Messages.SUCCESS_UPDATE, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async deleteResultado(request, response) {
        try {
            let resultado_id = request.params.id;
            if (resultado_id == undefined || resultado_id == null) {
                throw new Error(messages_1.Messages.ID_ISREQUIRED);
            }
            await Database_1.DatabaseController.deleteById("resultados", "resultado_id", resultado_id);
            let body = { status: 200, message: messages_1.Messages.SUCCESS_DELETE, data: null };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async checkExisteResultado(request, response) {
        try {
            let jornada_id = request.params.jornada;
            if (jornada_id == undefined || jornada_id == null) {
                throw new Error(messages_1.Messages.JORNADA_ID_ISREQUIRED);
            }
            let resultQuery = await Database_1.DatabaseController.getResultadosByJornada(jornada_id);
            let body = { status: 200, data: resultQuery };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
}
exports.ResultadoController = new Resultado();
