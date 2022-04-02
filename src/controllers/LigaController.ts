import {Request, Response} from 'express';
import { Messages } from '../util/messages';
import { DatabaseController } from '../controllers/Database';

const path_dir = require('path');

const path_logo = 'media/logo_';

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
            let logo : any = request.files.logo;
            if( nombre_liga == undefined || nombre_liga == null || nombre_liga.trim() == '' ){throw new Error(Messages.NOMBRE_LIGA_ISREQUIRED)}
            if( logo == undefined || logo == null || logo.length == 0 ){throw new Error(Messages.IMG_ISREQUIRED)}
            let ext = path_dir.extname(logo.name);
            let path = path_logo + new Date().getTime()+ext;
            logo.mv(path);
            await DatabaseController.insertLiga( nombre_liga, path );
            let body = { status : 200, message : Messages.SUCCESS_INSERT, data : null };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    async updateLiga( request : Request, response : Response ){
        try{
            if(!request.files){ throw new Error(Messages.IMG_ISREQUIRED); }
            let id_liga : any = request.body.id;
            let nombre_liga : string  = request.body.nombre;
            let logo : any = request.files.logo;
            if( id_liga == undefined || id_liga == null ){ throw new Error(Messages.ID_ISREQUIRED); }
            if( nombre_liga == undefined || nombre_liga == null || nombre_liga.trim() == '' ){throw new Error(Messages.NOMBRE_LIGA_ISREQUIRED)}
            if( logo == undefined || logo == null || logo.length == 0 ){throw new Error(Messages.IMG_ISREQUIRED)}
            let ext = path_dir.extname(logo.name);
            let path = path_logo + new Date().getTime()+ext;
            logo.mv(path);
            await DatabaseController.updateLiga( id_liga, nombre_liga, path );
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

