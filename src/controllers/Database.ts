/* import * as mysql from 'mysql'; */
import { Messages } from '../util/messages';

import { Pool, Client } from 'pg';
import { AuthController } from './AuthController';
import { EmailController } from './Email';
import { GeneralController } from './GeneralController';

const crypto = require('crypto');

const connection = new Client({
    /*/
    user: 'dev',
    host: process.env.DB_HOST,
    database: 'aposta',
    password: 'test1205',
    port: Number(process.env.DB_PORT),
    /*/
    user : 'postgres',
    database : 'aposta', 
    password : '1205',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    //*/
  }) //Checar porque no me reconoce los parametros.


class Database {

    constructor(){
        try{ connection.connect(); }
        catch(error){ throw new Error(Messages.CANNOT_CONNECT_DB); }
    }

    async insertUser( name : string , username : string , email : string, password : string){
        let hashPassword = GeneralController.generateHash( password );
        let tokenData = GeneralController.encodeToken(AuthController.generateWebToken({ username : username, email : email }));
        let createdOn = new Date();
        let arrValues = [username, hashPassword, email, name, createdOn, false, false, 2, tokenData];
        let selectData = [username, email];
        let selectQuery = 'SELECT * FROM usuarios WHERE username=$1 or email=$2';
        let insertQuery = 'INSERT INTO usuarios(username, password, email, name, created_on, active, validated, role_id, code ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)';
        let checkUserExist = await this.runQueryAsync( selectQuery, selectData ).catch( (error : any) => { console.log(error); throw new Error(Messages.SINGIN_ERROR)} );
        if (checkUserExist.rows.length) { throw new Error(Messages.ACCOUNT_ALREADY_EXIST) }
        let result = await this.runQueryAsync(insertQuery, arrValues).catch( (error : any) => { console.log("error insert"); console.log(error); throw new Error(Messages.SINGIN_ERROR) } )
        EmailController.registerEmail(email, name, tokenData);
        return result;
    }

    async loginUser( username : string, password : string ){
        let hashPassword = GeneralController.generateHash( password );
        let checkExistData = [username];
        let loginData = [username, hashPassword];
        let selectQuery = 'SELECT * FROM usuarios WHERE username=$1';
        let loginQuery = 'SELECT user_id, name, email, username FROM usuarios WHERE username = $1 AND password = $2';
        let checkUserExist = await this.runQueryAsync( selectQuery, checkExistData ).catch( (error : any) => { throw new Error(Messages.LOGIN_ERROR)} );
        if ( !checkUserExist.rows.length ) { throw new Error(Messages.USERNAME_NOT_EXIST) }
        let checkLogin = await this.runQueryAsync( loginQuery, loginData ).catch( (error : any) => { throw new Error(Messages.LOGIN_ERROR)} );
        if ( !checkLogin.rows.length ) { throw new Error(Messages.WRONG_PASSWORD) }
        return checkLogin.rows;
    }

    async confirmCodeActivation( token : string ){
        let checkExistData = [token];
        let selectQuery = 'SELECT * FROM usuarios WHERE code=$1';
        let checkUserExist = await this.runQueryAsync( selectQuery, checkExistData ).catch( (error : any) => { throw new Error(Messages.LOGIN_ERROR)} );
        if ( !checkUserExist.rows.length ) { throw new Error(Messages.USERNAME_NOT_EXIST) }
        return checkUserExist.rows;
    }

    async validActivation( user_id : any ){
        let updateData = [user_id];
        let updateQuery = "UPDATE usuarios SET active = true, validated = true WHERE user_id = $1";
        await this.runQueryAsync( updateQuery, updateData ).catch( (error : any) => { throw new Error(Messages.VALIDATED_ERROR)} );
    }

    async getDataByEmail( email : string ){

    }

    async insertLiga( nombre : string, path_img : string , activo : boolean ){
        let updateData = [nombre, path_img, activo];
        let updateQuery = "INSERT INTO ligas( nombre, logo, active ) VALUES($1, $2, $3)";
        await this.runQueryAsync( updateQuery, updateData ).catch( (error : any) => { throw new Error(Messages.LIGA_INSERT_ERROR)} );
    }

    async updateLiga( id : any, nombre : string, path_img : string , activo : boolean ){
        let updateData = [id, nombre, path_img, activo];
        let updateQuery = "UPDATE ligas SET nombre = $2, logo = $3, active = $4 WHERE liga_id = $1";
        await this.runQueryAsync( updateQuery, updateData ).catch( (error : any) => { throw new Error(Messages.QUERY_UPDATE_ERROR)} );
    }

    async deleteLiga( id : any ){
        let deleteData = [id];
        let deleteQuery = "DELETE FROM ligas where liga_id = $1";
        await this.runQueryAsync( deleteQuery, deleteData ).catch( (error : any) => { throw new Error(Messages.QUERY_DELETE_ERROR)} );
    }

    async deleteById( tabla : string, atributo : string, atributo_id : any ){
        let deleteData = [atributo_id];
        let deleteQuery = "DELETE FROM " + tabla + " WHERE " + atributo + " = $1";
        await this.runQueryAsync( deleteQuery, deleteData ).catch( (error : any) => { throw new Error(Messages.QUERY_DELETE_ERROR)} );
    }

    async simpleSelectById( tabla: string, atributo : string, atributo_id : any ){
        let selectData = [atributo_id];
        let selectQuery = "SELECT * FROM " + tabla + " WHERE " + atributo + " = $1";
        let selectResult = await this.runQueryAsync( selectQuery, selectData ).catch( (error : any) => { throw new Error(Messages.QUERY_SELECT_ERROR)} );
        if ( !selectResult.rows.length ) { return null; }
        return selectResult.rows;
    }

    //agregar a la tabla el campo de activo
    async selectAll( tabla: string ){
        let selectQuery = "SELECT * FROM " + tabla ;
        let selectResult = await this.runQueryAsync( selectQuery, null ).catch( (error : any) => { throw new Error(Messages.QUERY_SELECT_ERROR)} );
        if ( !selectResult.rows.length ) { return null; }
        return selectResult.rows;
    }

    runQueryAsync = ( query : string , queryValues : any ) => {
        return new Promise<any>( (resolve, reject ) => {
            let finalQuery = {
                text : query,
                values : queryValues
            };
            connection.query(finalQuery, (err : any, res : any) => {
                if(err) reject(err);
                else resolve(res);
            })
        })
    }

}

export const DatabaseController = new Database();
