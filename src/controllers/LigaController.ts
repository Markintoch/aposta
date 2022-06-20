import {Request, Response} from 'express';
import { Messages } from '../util/messages';
import { DatabaseController } from '../controllers/Database';
import { GeneralController } from './GeneralController';

class Liga{

    async getLigas( request : Request, response : Response ){
        try{
            let resultQuery = await DatabaseController.selectAll( "ligas");
            let body = { status : 200, data : resultQuery };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    async getLiga( request : Request, response : Response ){
        try{
            let id_liga : any = request.params.id;
            if( id_liga == undefined || id_liga == null ){ throw new Error(Messages.ID_ISREQUIRED); }
            let resultQuery = await DatabaseController.simpleSelectById( "ligas", "liga_id", id_liga );
            let body = { status : 200, data : resultQuery };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    async createLiga( request : Request, response : Response ){
        try{
            if(!request.files){ throw new Error(Messages.IMG_ISREQUIRED); }
            let nombre_liga : string  = request.body.nombre;
            let activo : boolean = request.body.activo;
            let logo : any = request.files ? request.files.logo : request.body.path;
            if( nombre_liga == undefined || nombre_liga == null || nombre_liga.trim() == '' ){throw new Error(Messages.NOMBRE_LIGA_ISREQUIRED)}
            //if( logo == undefined || logo == null || logo.length == 0 ){throw new Error(Messages.IMG_ISREQUIRED)}
            let path = request.files ? GeneralController.saveFile(logo) : logo;
            await DatabaseController.simpleInsert( "ligas", "nombre, logo, active", [nombre_liga, path, activo] );
            let body = { status : 200, message : Messages.SUCCESS_INSERT, data : null };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    async updateLiga( request : Request, response : Response ){
        try{
            let id_liga : any = request.body.id;
            let nombre_liga : string  = request.body.nombre;
            let activo : boolean = request.body.activo;
            let path : string = request.body.logo;
            if( id_liga == undefined || id_liga == null ){ throw new Error(Messages.ID_ISREQUIRED); }
            if( nombre_liga == undefined || nombre_liga == null || nombre_liga.trim() == '' ){throw new Error(Messages.NOMBRE_LIGA_ISREQUIRED)}
            let updateData = [nombre_liga, activo];
            let fieldsData = ["nombre", "active"]

            if(request.files){
                let logo : any = request.files.logo;
                path = GeneralController.saveFile(logo);

                updateData.push(path)
                fieldsData.push('logo')
            }

            await DatabaseController.simpleUpdateWithCondition( "ligas", fieldsData, updateData, `liga_id = ${id_liga}`  );
            let body = { status : 200, message : Messages.SUCCESS_UPDATE, data : null };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    async deleteLiga( request : Request, response : Response ){
        try{
            let id_liga : any = request.params.id;
            if( id_liga == undefined || id_liga == null ){ throw new Error(Messages.ID_ISREQUIRED); }
            await DatabaseController.deleteLiga( id_liga );
            let body = { status : 200, message : Messages.SUCCESS_DELETE, data : null };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }
}

export const LigaController = new Liga();

