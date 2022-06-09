import {Request, Response} from 'express';
import { Messages } from '../util/messages';
import { DatabaseController } from '../controllers/Database';

import * as jwt from 'jsonwebtoken';

//Test
const secret = "aposta2021";

class Auth {

    async singinUser( request : Request, response : Response ){
        try{
            let nombre : string  = request.body.nombre;
            let username : string = request.body.username;
            let email : string = request.body.email;
            let password : string = request.body.password;
            if( nombre == undefined || nombre == null || nombre.trim() == '' ){throw new Error(Messages.NOMBRE_ISREQUIRED)}
            if( email == undefined || email == null || email.trim() == '' ){throw new Error(Messages.EMAIL_ISREQUIRED)}
            if( username == undefined || username == null || username.trim() == '' ){throw new Error(Messages.USERNAME_ISREQUIRED)}
            if( password == undefined || password == null || password.trim() == '' ){throw new Error(Messages.PASSWORD_ISREQUIRED)}
            let result = await DatabaseController.insertUser( nombre, username, email, password );
            let responseData = { id : result.user_id, nombre : nombre, username : username, email : email };
            let body = { status : 200, message : "Revise su correo electronico concluir el registro", data : responseData };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    async loginUser( request : Request, response : Response ){
        try{
            let username : string = request.body.username;
            let password : string = request.body.password;
            if( username == undefined || username == null || username.trim() == '' ){throw new Error(Messages.USERNAME_ISREQUIRED)}
            if( password == undefined || password == null || password.trim() == '' ){throw new Error(Messages.PASSWORD_ISREQUIRED)}
            let result = await DatabaseController.loginUser( username, password );
            let responseData = { id : result[0].user_id, nombre : result[0].name, username : username, email : result[0].email, role : result[0].role_id };
            let token = this.generateWebToken( responseData );
            let body = { data : responseData, token : token };
            response.json(body);
        }catch(error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    async confirmRegister(request : Request, response : Response){
        try{
            let token64 = request.params.token;
            if( token64 == undefined || token64 == null || token64.trim() == '' ){throw new Error("Error al recibir token")}
            let result = await DatabaseController.confirmCodeActivation(token64);
            let responseData = { id : result[0].user_id, nombre : result[0].nombre, username : result[0].username, email : result[0].email };
            await DatabaseController.validActivation(result[0].user_id);
            let body = { status : 200, data : responseData };
            response.json(body);
        }catch(error : any){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    async recoverPassword(request : Request, response : Response){
        try{
            let email = request.params.email;
        }catch( error : any ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    public generateWebToken( data : any ){
        let expiresData = { expiresIn : 60 * 60 }; //Expira en 1 hr
        let token = jwt.sign( data, secret, expiresData );
        return token;
    }

}

export const AuthController = new Auth();