import {Request, Response} from 'express';
import { Messages } from '../util/messages';
import { DatabaseController } from '../controllers/Database';

class Temporada {

    async getTemporada( request : Request, response : Response ){
        try{
            let id_temporada : any = request.params.id;
            if( id_temporada == undefined || id_temporada == null ){ throw new Error(Messages.ID_ISREQUIRED); }
            let resultQuery = await DatabaseController.simpleSelectById( "temporadas", "temporada_id", id_temporada );
            let body = { status : 200, data : resultQuery };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    async getTemporadasByLiga( request : Request, response : Response ){
        try{
            let liga_id : any = request.params.id;
            if( liga_id == undefined || liga_id == null ){ throw new Error(Messages.LIGA_ID_ISREQUIRED); }
            let resultQuery = await DatabaseController.simpleSelectById( "temporadas", "liga_id", liga_id );
            let body = { status : 200, data : resultQuery };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    async getTemporadas( request : Request, response : Response ){
        try{
            let resultQuery = await DatabaseController.selectAll("temporadas");
            let body = { status : 200, data : resultQuery };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    async createTemporada( request : Request, response : Response ){
        try{
            let liga_id : any  = request.body.liga_id;
            let nombre_temporada : string = request.body.nombre;
            let numero_tempoarada : any = request.body.numero;
            let fecha_inicio : Date = request.body.f_inicio;
            let fecha_fin : Date = request.body.f_fin;
            if( liga_id == undefined || liga_id == null ){ throw new Error(Messages.LIGA_ID_ISREQUIRED)}
            if( nombre_temporada == undefined || nombre_temporada == null || nombre_temporada.trim() == '' ){throw new Error(Messages.NOMBRE_TEMPOARADA_ISREQUIRED)}
            if( numero_tempoarada == undefined || numero_tempoarada == null ){ throw new Error(Messages.LIGA_NUMBER_ISREQUIRED) }
            if( fecha_inicio == undefined || fecha_inicio == null ){ throw new Error(Messages.DATE_START_ISREQUIRED) }
            if( fecha_fin == undefined || fecha_fin == null ){ throw new Error(Messages.DATE_END_ISREQUIRED) }
            await DatabaseController.simpleInsert( "temporadas", "liga_id, nombre, numero, fecha_inicio, fecha_fin", [liga_id, nombre_temporada, numero_tempoarada, fecha_inicio, fecha_fin] );
            let body = { status : 200, message : Messages.SUCCESS_INSERT, data : null };
            response.json(body);
        }catch(error : any ){
            console.log(error)
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    async deleteTemporada( request : Request, response : Response ){
        try{
            let id_temporada : any = request.params.id;
            if( id_temporada == undefined || id_temporada == null ){ throw new Error(Messages.ID_ISREQUIRED); }
            await DatabaseController.deleteById( "temporadas", "temporada_id", id_temporada );
            let body = { status : 200, message : Messages.SUCCESS_DELETE, data : null };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    async updateTemporada( request : Request, response : Response ){
        try{
            let temporada_id : any = request.body.temporada_id;
            let liga_id : any  = request.body.liga_id;
            let nombre_temporada : string = request.body.nombre;
            let numero_tempoarada : any = request.body.numero;
            let fecha_inicio : Date = request.body.f_inicio;
            let fecha_fin : Date = request.body.f_fin;
            if( temporada_id == undefined || temporada_id == null ){ throw new Error(Messages.ID_ISREQUIRED)}
            if( liga_id == undefined || liga_id == null ){ throw new Error(Messages.LIGA_ID_ISREQUIRED)}
            if( nombre_temporada == undefined || nombre_temporada == null || nombre_temporada.trim() == '' ){throw new Error(Messages.NOMBRE_TEMPOARADA_ISREQUIRED)}
            if( numero_tempoarada == undefined || numero_tempoarada == null ){ throw new Error(Messages.LIGA_NUMBER_ISREQUIRED) }
            if( fecha_inicio == undefined || fecha_inicio == null ){ throw new Error(Messages.DATE_START_ISREQUIRED) }
            if( fecha_fin == undefined || fecha_fin == null ){ throw new Error(Messages.DATE_END_ISREQUIRED) }
            await DatabaseController.simpleUpdateWithCondition( "temporadas", ["liga_id", "nombre", "numero", "fecha_inicio", "fecha_fin"], [liga_id, nombre_temporada, numero_tempoarada, fecha_inicio, fecha_fin], `temporada_id = ${temporada_id}`  );
            let body = { status : 200, message : Messages.SUCCESS_UPDATE, data : null };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }
    

}

export const TemporadaController = new Temporada();
