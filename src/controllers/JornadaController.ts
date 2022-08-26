import {Request, Response} from 'express';
import { Messages } from '../util/messages';
import { DatabaseController } from '../controllers/Database';

class Jornada{

    async getJornada( request : Request, response : Response ){
        try{
            let jornada_id : any = request.params.id;
            if( jornada_id == undefined || jornada_id == null ){ throw new Error(Messages.ID_ISREQUIRED); }
            let resultQuery = await DatabaseController.simpleSelectById( "jornadas", "jornada_id", jornada_id );
            let body = { status : 200, data : resultQuery };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    async getJornadaByTemporada( request : Request, response : Response ){
        try{
            let temporada_id : any = request.params.id;
            if( temporada_id == undefined || temporada_id == null ){ throw new Error(Messages.TEMPORADA_ID_ISREQUIRED); }
            let resultQuery = await DatabaseController.selectJornadaByTemp(temporada_id); //simpleSelectById( "jornadas", "temporada_id", temporada_id );
            let body = { status : 200, data : resultQuery };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    async getJornadaByLiga( request : Request, response : Response ){
        try{
            let liga_id : any = request.params.id;
            if( liga_id == undefined || liga_id == null ){ throw new Error(Messages.LIGA_ID_ISREQUIRED); }
            let resultQuery = await DatabaseController.selectJornadaByLiga(liga_id); //simpleSelectById( "jornadas", "temporada_id", temporada_id );
            let body = { status : 200, data : resultQuery };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    async getJornadas( request : Request, response : Response ){
        try{
            let { idLiga, idTemporada } = request.params;
            //let resultQuery = await DatabaseController.selectAll("jornadas");
            let resultQuery = await DatabaseController.selectJornadas(idLiga, idTemporada);
            let body = { status : 200, data : resultQuery };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    async getJornadasWeek( request : Request, response : Response ){
        try{
            let { idLiga, idTemporada } = request.params;
            let resultQuery = await DatabaseController.selectJornadasWeek(idLiga, idTemporada);
            let body = { status : 200, data : resultQuery };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    async createJornada( request : Request, response : Response ){
        try{
            let liga_id : any  = request.body.liga_id;
            let temporada_id : string = request.body.temporada_id;
            let nombre_jornada : string = request.body.nombre;
            let num_jornada : any = request.body.numero;
            let fecha_inicio : Date = request.body.f_inicio;
            let fecha_fin : Date = request.body.f_fin;
            if( liga_id == undefined || liga_id == null ){ throw new Error(Messages.LIGA_ID_ISREQUIRED)}
            if( temporada_id == undefined || temporada_id == null ){ throw new Error(Messages.TEMPORADA_ID_ISREQUIRED)}
            if( nombre_jornada == undefined || nombre_jornada == null || nombre_jornada.trim() == '' ){throw new Error(Messages.NOMBRE_TEMPOARADA_ISREQUIRED)}
            if( num_jornada == undefined || num_jornada == null ){ throw new Error(Messages.JORNADA_NUMBER_ISREQUIRED) }
            if( fecha_inicio == undefined || fecha_inicio == null ){ throw new Error(Messages.DATE_START_ISREQUIRED) }
            if( fecha_fin == undefined || fecha_fin == null ){ throw new Error(Messages.DATE_END_ISREQUIRED) }
            await DatabaseController.simpleInsert( "jornadas", "liga_id, temporada_id, nombre, numero, fecha_inicio, fecha_fin", [liga_id, temporada_id, nombre_jornada, num_jornada, fecha_inicio, fecha_fin] );
            let body = { status : 200, message : Messages.SUCCESS_INSERT, data : null };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    async updateJornada( request : Request, response : Response ){
        try{
            let jornada_id : any = request.body.jornada_id;
            let liga_id : any  = request.body.liga_id;
            let temporada_id : string = request.body.temporada_id;
            let nombre_jornada : string = request.body.nombre;
            let num_jornada : any = request.body.numero;
            let fecha_inicio : Date = request.body.f_inicio;
            let fecha_fin : Date = request.body.f_fin;
            if( jornada_id == undefined || jornada_id == null ){ throw new Error(Messages.ID_ISREQUIRED)}
            if( liga_id == undefined || liga_id == null ){ throw new Error(Messages.LIGA_ID_ISREQUIRED)}
            if( temporada_id == undefined || temporada_id == null ){ throw new Error(Messages.TEMPORADA_ID_ISREQUIRED)}
            if( nombre_jornada == undefined || nombre_jornada == null || nombre_jornada.trim() == '' ){throw new Error(Messages.NOMBRE_TEMPOARADA_ISREQUIRED)}
            if( num_jornada == undefined || num_jornada == null ){ throw new Error(Messages.JORNADA_NUMBER_ISREQUIRED) }
            if( fecha_inicio == undefined || fecha_inicio == null ){ throw new Error(Messages.DATE_START_ISREQUIRED) }
            if( fecha_fin == undefined || fecha_fin == null ){ throw new Error(Messages.DATE_END_ISREQUIRED) }
            let updateData = [liga_id, temporada_id, nombre_jornada, num_jornada, fecha_inicio, fecha_fin];
            await DatabaseController.simpleUpdateWithCondition( "jornadas", ["liga_id", "temporada_id", "nombre", "numero", "fecha_inicio", "fecha_fin"], updateData, `jornada_id = ${jornada_id}` );
            let body = { status : 200, message : Messages.SUCCESS_UPDATE, data : null };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    async deleteTemporada( request : Request, response : Response ){
        try{
            let jornada_id : any = request.params.id;
            if( jornada_id == undefined || jornada_id == null ){ throw new Error(Messages.ID_ISREQUIRED); }
            await DatabaseController.deleteById( "jornadas", "jornada_id", jornada_id );
            let body = { status : 200, message : Messages.SUCCESS_DELETE, data : null };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

}


export const JornadaController = new Jornada();