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

    async createTemporada( request : Request, response : Response ){
        try{
            let liga_id : any  = request.body.liga_id;
            let nombre_temporada : string = request.body.nombre;
            let numero_tempoarada : any = request.body.numero;
            let fecha_inicio : Date = request.body.f_inicio;
            let fecha_fin : Date = request.body.f_fin;
            /* if( liga_id == undefined || liga_id == null ){ throw new Error(Messages.LIGA_ID_ISREQUIRED)}
            if( nombre_temporada == undefined || nombre_temporada == null || nombre_temporada.trim() == '' ){throw new Error(Messages.NOMBRE_TEMPOARADA_ISREQUIRED)}
            await DatabaseController.insertLiga( nombre_liga, path, activo );
            let body = { status : 200, message : Messages.SUCCESS_INSERT, data : null };
            response.json(body); */
        }catch(error : any ){
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

}

export const TemporadaController = new Temporada();
