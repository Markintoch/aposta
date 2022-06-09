import {Request, Response} from 'express';
import { Messages } from '../util/messages';
import { DatabaseController } from '../controllers/Database';

class Partido{

    async getPartido( request : Request, response : Response ){
        try{
            let partido_id : any = request.params.id;
            if( partido_id == undefined || partido_id == null ){ throw new Error(Messages.ID_ISREQUIRED); }
            let resultQuery = await DatabaseController.simpleSelectById( "partidos", "partido_id", partido_id );
            let body = { status : 200, data : resultQuery };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    async getPartidos( request : Request, response : Response ){
        try{
            let { idLiga, idTemporada, idJornada } = request.params;
            console.log( idLiga, idTemporada, idJornada, 'params...')

            // let resultQuery = await DatabaseController.selectAll("partidos");
            let resultQuery = await DatabaseController.selectPartidos(Number(idLiga), Number(idTemporada), Number(idJornada));
            let body = { status : 200, data : resultQuery };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    async getPartidosBet( request : Request, response : Response ){
        try{
            let { idLiga, idTemporada } = request.params;
            console.log( idLiga, idTemporada, 'params...')

            // let resultQuery = await DatabaseController.selectAll("partidos");
            let resultQuery = await DatabaseController.selectPartidos(Number(idLiga), Number(idTemporada), 0);
            let lastTimeMatches = this.orderLastMatches(resultQuery);
            let body = { status : 200, data : lastTimeMatches };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    orderLastMatches(resultQuery: Array<any>) {
        function compare(a: any, b: any) {
            if ( a.jornada_id < b.jornada_id ){
              return -1;
            }
            if ( a.jornada_id > b.jornada_id ){
              return 1;
            }
            return 0;
          }
          
        resultQuery.sort(compare);
        
        return resultQuery.filter((elem) => { if(elem.jornada_id === resultQuery[resultQuery.length-1].jornada_id) return elem })
    }

    /* async getPartidosByJornada( request : Request, response : Response ){
        try{
            let jornada_id : any = request.params.id;
            if( jornada_id == undefined || jornada_id == null ){ throw new Error(Messages.JORNADA_NUMBER_ISREQUIRED); }
            let resultQuery = await DatabaseController.simpleSelectById( "partidos", "jornada_id", jornada_id );
            let body = { status : 200, data : resultQuery };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    } */

    async getPartidosByLiga( request : Request, response : Response ){
        try{
            let liga_id : any = request.params.id;
            if( liga_id == undefined || liga_id == null ){ throw new Error(Messages.LIGA_ID_ISREQUIRED); }
            let resultQuery = await DatabaseController.selectPartidosByLiga(liga_id); //simpleSelectById( "partidos", "jornada_id", jornada_id );
            let body = { status : 200, data : resultQuery };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    async getPartidosByTemp( request : Request, response : Response ){
        try{
            let temporada_id : any = request.params.id;
            if( temporada_id == undefined || temporada_id == null ){ throw new Error(Messages.LIGA_ID_ISREQUIRED); }
            let resultQuery = await DatabaseController.selectPartidosByTemp(temporada_id); //selectPartidosByLiga(liga_id); //simpleSelectById( "partidos", "jornada_id", jornada_id );
            let body = { status : 200, data : resultQuery };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    async getPartidosByJornada( request : Request, response : Response ){
        try{
            let jornada_id : any = request.params.id;
            if( jornada_id == undefined || jornada_id == null ){ throw new Error(Messages.LIGA_ID_ISREQUIRED); }
            let resultQuery = await DatabaseController.selectPartidosByJornada(jornada_id); //selectPartidosByLiga(liga_id); //simpleSelectById( "partidos", "jornada_id", jornada_id );
            let body = { status : 200, data : resultQuery };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    async createPartido( request : Request, response : Response ){
        try{
            let liga_id : any  = request.body.liga_id;
            let temporada_id : string = request.body.temporada_id;
            let jornada_id : string = request.body.jornada_id;
            let vistante_id : any = request.body.vistante_id;
            let local_id : any = request.body.local_id;
            let jornada_original : any = request.body.jornada_original;
            if( liga_id == undefined || liga_id == null ){ throw new Error(Messages.LIGA_ID_ISREQUIRED)}
            if( temporada_id == undefined || temporada_id == null ){ throw new Error(Messages.TEMPORADA_ID_ISREQUIRED)}
            if( jornada_id == undefined || jornada_id == null ){ throw new Error(Messages.JORNADA_NUMBER_ISREQUIRED) }
            if( vistante_id == undefined || vistante_id == null ){ throw new Error(Messages.VISITANTE_ID_ISREQUIRED) }
            if( local_id == undefined || local_id == null ){ throw new Error(Messages.LOCAL_ID_ISREQUIRED) }
            let insertData = [liga_id, temporada_id, jornada_id, vistante_id, local_id, jornada_original]
            await DatabaseController.simpleInsert( "partidos", "liga_id, temporada_id, jornada_id, vistante_id, local_id, jornada_original", insertData );
            let body = { status : 200, message : Messages.SUCCESS_INSERT, data : null };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    async updatePartido( request : Request, response : Response ){
        try{
            let partido_id : any = request.body.partido_id;
            let liga_id : any  = request.body.liga_id;
            let temporada_id : string = request.body.temporada_id;
            let jornada_id : string = request.body.jornada_id;
            let vistante_id : any = request.body.vistante_id;
            let local_id : any = request.body.local_id;
            let jornada_original : any = request.body.jornada_original;
            if( partido_id == undefined || partido_id == null ){ throw new Error(Messages.ID_ISREQUIRED)}
            if( liga_id == undefined || liga_id == null ){ throw new Error(Messages.LIGA_ID_ISREQUIRED)}
            if( temporada_id == undefined || temporada_id == null ){ throw new Error(Messages.TEMPORADA_ID_ISREQUIRED)}
            if( jornada_id == undefined || jornada_id == null ){ throw new Error(Messages.JORNADA_NUMBER_ISREQUIRED) }
            if( vistante_id == undefined || vistante_id == null ){ throw new Error(Messages.VISITANTE_ID_ISREQUIRED) }
            if( local_id == undefined || local_id == null ){ throw new Error(Messages.LOCAL_ID_ISREQUIRED) }
            let updateData = [liga_id, temporada_id, jornada_id, vistante_id, local_id, jornada_original]
            await DatabaseController.simpleUpdateWithCondition( "partidos", ["liga_id", "temporada_id", "jornada_id", "vistante_id", "local_id", "jornada_original"], updateData, `partido_id = ${partido_id}` );
            let body = { status : 200, message : Messages.SUCCESS_INSERT, data : null };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    async deletePartido( request : Request, response : Response ){
        try{
            let partido_id : any = request.params.id;
            if( partido_id == undefined || partido_id == null ){ throw new Error(Messages.ID_ISREQUIRED); }
            await DatabaseController.deleteById( "partidos", "partido_id", partido_id );
            let body = { status : 200, message : Messages.SUCCESS_DELETE, data : null };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

}

export const PartidoController = new Partido();