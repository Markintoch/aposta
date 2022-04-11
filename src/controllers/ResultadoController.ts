import {Request, Response} from 'express';
import { Messages } from '../util/messages';
import { DatabaseController } from '../controllers/Database';

class Resultado{

    async getResultado( request : Request, response : Response ){
        try{
            let resultado_id : any = request.params.id;
            if( resultado_id == undefined || resultado_id == null ){ throw new Error(Messages.ID_ISREQUIRED); }
            let resultQuery = await DatabaseController.simpleSelectById( "resultados", "resultado_id", resultado_id );
            let body = { status : 200, data : resultQuery };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    async createResultado( request : Request, response : Response ){
        try{
            let partido_id : any  = request.body.partido_id;
            let marcador_local : any = request.body.marcador_local;
            let marcador_visitante : any = request.body.marcador_visitante;
            let ganador_id : any = request.body.ganador_id;
            if( partido_id == undefined || partido_id == null ){ throw new Error(Messages.PARTIDO_ID_ISREQUIRED); }
            if( marcador_local == undefined || marcador_local == null ){ throw new Error(Messages.MARCADOR_L_ISREQUIRED); }
            if( marcador_visitante == undefined || marcador_visitante == null ){ throw new Error(Messages.MARCADOR_V_ISREQUIRED); }
            if( ganador_id == undefined || ganador_id == null ){ throw new Error(Messages.GANADOR_ID_ISREQUIRED); }
            let insertData = [partido_id, marcador_local, marcador_visitante, ganador_id]
            await DatabaseController.simpleInsert( "resultados", "partido_id, marcador_local, marcador_visitante, ganador_id", insertData );
            let body = { status : 200, message : Messages.SUCCESS_INSERT, data : null };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    async updateResultado( request : Request, response : Response ){
        try{
            let resultado_id : any = request.body.resultado_id;
            let partido_id : any  = request.body.partido_id;
            let marcador_local : any = request.body.marcador_local;
            let marcador_visitante : any = request.body.marcador_visitante;
            let ganador_id : any = request.body.ganador_id;
            if( resultado_id == undefined || resultado_id == null ){ throw new Error(Messages.ID_ISREQUIRED); }
            if( partido_id == undefined || partido_id == null ){ throw new Error(Messages.PARTIDO_ID_ISREQUIRED); }
            if( marcador_local == undefined || marcador_local == null ){ throw new Error(Messages.MARCADOR_L_ISREQUIRED); }
            if( marcador_visitante == undefined || marcador_visitante == null ){ throw new Error(Messages.MARCADOR_V_ISREQUIRED); }
            if( ganador_id == undefined || ganador_id == null ){ throw new Error(Messages.GANADOR_ID_ISREQUIRED); }
            let insertData = [partido_id, marcador_local, marcador_visitante, ganador_id]
            await DatabaseController.simpleUpdateWithCondition( "resultados", ["partido_id", "marcador_local", "marcador_visitante", "ganador_id"], insertData, `resultado_id = ${resultado_id}` );
            let body = { status : 200, message : Messages.SUCCESS_UPDATE, data : null };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    async deleteResultado( request : Request, response : Response ){
        try{
            let resultado_id : any = request.params.id;
            if( resultado_id == undefined || resultado_id == null ){ throw new Error(Messages.ID_ISREQUIRED); }
            await DatabaseController.deleteById( "resultados", "resultado_id", resultado_id );
            let body = { status : 200, message : Messages.SUCCESS_DELETE, data : null };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }
 
}

export const ResultadoController = new Resultado();