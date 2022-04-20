import {Request, Response} from 'express';
import { Messages } from '../util/messages';
import { DatabaseController } from '../controllers/Database';

import moment, { Moment } from "moment";

class Pronostico{

    async getPronosticosByJornada( request : Request, response : Response ){
        try{
            let jornada_id : any = request.params.id;
            let user_id : any = request.params.user_id;
            if( jornada_id == undefined || jornada_id == null ){ throw new Error(Messages.ID_ISREQUIRED); }
            let resultQuery = await DatabaseController.selectByJoin( "p.*","pronosticos p", "partidos par", "p.partido_id = par.partido_id", `par.jornada_id = ${jornada_id} AND p.user_id = ${user_id}` );
            let body = { status : 200, data : resultQuery };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    async getPronostico( request : Request, response : Response ){
        try{
            let pronostico_id : any = request.params.id;
            if( pronostico_id == undefined || pronostico_id == null ){ throw new Error(Messages.ID_ISREQUIRED); }
            let resultQuery = await DatabaseController.simpleSelectById( "pronosticos", "pronostico_id", pronostico_id );
            let body = { status : 200, data : resultQuery };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    async createPronostico( request : Request, response : Response ){
        try{
            await this.createPronosticoNoRest( request.body );
            let body = { status : 200, message : Messages.SUCCESS_INSERT, data : null };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    async createPronosticos( request : Request, response : Response ){
        try{
            let pronosticos : any[] = request.body.pronosticos;
            for(let pronostico of pronosticos){
                await this.createPronosticoNoRest( pronostico );
            }
            let body = { status : 200, message : Messages.SUCCESS_INSERT, data : null };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    async updatePronostico( request : Request, response : Response ){
        try{
            await this.updatePronosticoNoRest( request.body );
            let body = { status : 200, message : Messages.SUCCESS_UPDATE, data : null };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    async updatePronosticos( request : Request, response : Response ){
        try{
            let pronosticos : any[] = request.body.pronosticos;
            for(let pronostico of pronosticos){
                await this.updatePronosticoNoRest( pronostico );
            }
            let body = { status : 200, message : Messages.SUCCESS_UPDATE, data : null };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    async createPronosticoNoRest( pronostico : any ){
        let user_id : any = pronostico.user_id;
        let partido_id : any  = pronostico.partido_id;
        let ganador_id : string = pronostico.ganador_id;
        let created_on : Date = new Date();
        if( user_id == undefined || user_id == null ){ throw new Error(Messages.USER_ID_ISREQUIRED)}
        if( partido_id == undefined || partido_id == null ){ throw new Error(Messages.PARTIDO_ID_ISREQUIRED)}
        if( ganador_id == undefined || ganador_id == null ){ throw new Error(Messages.GANADOR_ID_ISREQUIRED)}
        if(await this.canSendPronostico(partido_id)){
            let insertData = [user_id, partido_id, ganador_id, created_on];
            await DatabaseController.simpleInsert( "pronosticos", "user_id, partido_id, ganador_id, created_on", insertData );
        }else{ throw new Error(Messages.CANNOT_SEND_PRONOSTICO); }
    }

    async updatePronosticoNoRest( pronostico : any ){
        let pronostico_id : any = pronostico.id;
        let partido_id : any  = pronostico.partido_id;
        let ganador_id : string = pronostico.ganador_id;
        if( pronostico_id == undefined || pronostico_id == null ){ throw new Error(Messages.ID_ISREQUIRED)}
        if( partido_id == undefined || partido_id == null ){ throw new Error(Messages.PARTIDO_ID_ISREQUIRED)}
        if( ganador_id == undefined || ganador_id == null ){ throw new Error(Messages.GANADOR_ID_ISREQUIRED)}
        if(await this.canSendPronostico(partido_id)){
            let updateData = [partido_id, ganador_id];
            await DatabaseController.simpleUpdateWithCondition( "pronosticos", ["partido_id", "ganador_id"], updateData, `pronostico_id = ${pronostico_id}`  );
        }else{ throw new Error(Messages.CANNOT_SEND_PRONOSTICO); }
    }

    async canSendPronostico( partido_id : any ) : Promise<boolean>{
        try{
            let resultadoPartido = await DatabaseController.simpleSelectById( "partidos", "jornada_id", partido_id );
            let resultadoJornada = await DatabaseController.simpleSelectById( "jornadas", "jornada_id", resultadoPartido[0].jornada_id );
            let dateNow : Moment = moment();
            let dateJornada : Moment = moment(resultadoJornada[0].fecha_inicio);
            return dateNow.diff(dateJornada, 'days') > 0 ? false : true;
        }catch(error :any){
            console.log(error.message);
            return false;
        }
        
    }

}

export const PronosticoController = new Pronostico();