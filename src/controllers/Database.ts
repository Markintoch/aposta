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
    /*/
    user : 'postgres',
    database : 'aposta', 
    password : 'pegasso1',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    /*/
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
        let loginQuery = 'SELECT user_id, name, email, username, role_id FROM usuarios WHERE username = $1 AND password = $2';
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

    async simpleInsert( tabla : string, atributos : string, valores : any[] ){
        let insetData : any[] = valores;
        let queryValues : string = GeneralController.generateDatabaseQueryParam(valores);

        console.log(valores, queryValues , 'something else')

        let insetQuery = `INSERT INTO ${tabla} ( ${atributos} ) VALUES ( ${queryValues} )`;
        console.log(insetQuery)
        await this.runQueryAsync( insetQuery, insetData ).catch( (error : any) => { 
            console.log(error)
            throw new Error(Messages.LIGA_INSERT_ERROR)}
             );
    }

    async simpleUpdateWithCondition( tabla : string, atributos : string[], valores : any[], condicion : string ){
        let updateData = valores;
        let queryAtributos = GeneralController.generateDatabaseQueryUpdateAtt(atributos)
        let updateQuery =`UPDATE ${tabla} SET ${queryAtributos} WHERE ${condicion}`;
        console.log(updateQuery);
        await this.runQueryAsync( updateQuery, updateData ).catch( (error : any) => { console.log(error); throw new Error(Messages.QUERY_UPDATE_ERROR)} );
    }

    async selectByJoin( atributos : string, tabla : string, tabla_join : string, relacion : string, condicion : string ){
        let selectQuery = `SELECT ${atributos} FROM ${tabla} INNER JOIN ${tabla_join} on ${relacion} WHERE ${condicion}`;
        let selectResult = await this.runQueryAsync( selectQuery, null ).catch( (error : any) => { throw new Error(Messages.QUERY_SELECT_ERROR)} );
        if ( !selectResult.rows.length ) { return null; }
        return selectResult.rows;
    } 

    async selectEquipoByTemp( id : any ){
        let selectQuery = `SELECT e.*, l.nombre as "nombre_liga", t.nombre as "temporada" FROM equipos e INNER JOIN temporadas t on t.temporada_id = e.temporada_id INNER JOIN ligas l on l.liga_id = e.liga_id WHERE e.temporada_id = ${id}`;
        let selectResult = await this.runQueryAsync( selectQuery, null ).catch( (error : any) => { console.log(error); throw new Error(Messages.QUERY_SELECT_ERROR)} );
        if ( !selectResult.rows.length ) { return null; }
        return selectResult.rows;
    }

    async selectEquipoByLiga( id : any ){
        let selectQuery = `SELECT e.*, l.nombre as "nombre_liga", t.nombre as "temporada" FROM equipos e INNER JOIN temporadas t on t.temporada_id = e.temporada_id INNER JOIN ligas l on l.liga_id = e.liga_id WHERE e.liga_id = ${id}`;
        let selectResult = await this.runQueryAsync( selectQuery, null ).catch( (error : any) => { console.log(error); throw new Error(Messages.QUERY_SELECT_ERROR)} );
        if ( !selectResult.rows.length ) { return null; }
        return selectResult.rows;
    }

    async selectEquipos( idLiga : any, idTemporada: any ){
        let selectQuery = `SELECT e.*, l.nombre as "nombre_liga", t.nombre as "temporada" FROM equipos e INNER JOIN temporadas t on t.temporada_id = e.temporada_id INNER JOIN ligas l on l.liga_id = e.liga_id`;

        if(idLiga) selectQuery = selectQuery + ` ${!selectQuery.includes('WHERE') && 'WHERE'} e.liga_id = ${idLiga}`
        if(idTemporada) selectQuery = selectQuery + ` ${!selectQuery.includes('WHERE') ? 'WHERE' : 'AND'} e.temporada_id = ${idTemporada}`

        let selectResult = await this.runQueryAsync( selectQuery, null ).catch( (error : any) => { console.log(error); throw new Error(Messages.QUERY_SELECT_ERROR)} );
        if ( !selectResult.rows.length ) { return null; }
        return selectResult.rows;
    }

    async selectJornadaByTemp( id : any ){
        let selectQuery = `SELECT j.*, l.nombre as "nombre_liga", t.nombre as "temporada" FROM jornadas j INNER JOIN temporadas t on t.temporada_id = j.temporada_id INNER JOIN ligas l on l.liga_id = j.liga_id WHERE j.temporada_id = ${id}`;
        let selectResult = await this.runQueryAsync( selectQuery, null ).catch( (error : any) => { console.log(error); throw new Error(Messages.QUERY_SELECT_ERROR)} );
        if ( !selectResult.rows.length ) { return null; }
        return selectResult.rows;
    }

    async selectJornadaByLiga( id : any ){
        let selectQuery = `SELECT j.*, l.nombre as "nombre_liga", t.nombre as "temporada" FROM jornadas j INNER JOIN temporadas t on t.temporada_id = j.temporada_id INNER JOIN ligas l on l.liga_id = j.liga_id WHERE j.liga_id = ${id}`;
        let selectResult = await this.runQueryAsync( selectQuery, null ).catch( (error : any) => { console.log(error); throw new Error(Messages.QUERY_SELECT_ERROR)} );
        if ( !selectResult.rows.length ) { return null; }
        return selectResult.rows;
    }

    async selectPartidosByLiga( id : any ){
        let selectQuery = `SELECT p.*, l.nombre as "nombre_liga", t.nombre as "temporada", j.nombre as "jornada", ev.nombre as "nombre_visitante", el.nombre as "nombre_local" FROM partidos p 
            INNER JOIN temporadas t on t.temporada_id = p.temporada_id INNER JOIN ligas l on l.liga_id = p.liga_id INNER JOIN jornadas j on j.jornada_id = p.jornada_id
            INNER JOIN equipos ev on ev.equipo_id = p.vistante_id INNER JOIN equipos el on el.equipo_id = p.local_id WHERE p.liga_id = ${id}`;
        let selectResult = await this.runQueryAsync( selectQuery, null ).catch( (error : any) => { console.log(error); throw new Error(Messages.QUERY_SELECT_ERROR)} );
        if ( !selectResult.rows.length ) { return null; }
        return selectResult.rows;
    }

    async selectPartidosByTemp( id : any ){
        let selectQuery = `SELECT p.*, l.nombre as "nombre_liga", t.nombre as "temporada", j.nombre as "jornada", ev.nombre as "nombre_visitante", el.nombre as "nombre_local" FROM partidos p 
            INNER JOIN temporadas t on t.temporada_id = p.temporada_id INNER JOIN ligas l on l.liga_id = p.liga_id INNER JOIN jornadas j on j.jornada_id = p.jornada_id
            INNER JOIN equipos ev on ev.equipo_id = p.vistante_id INNER JOIN equipos el on el.equipo_id = p.local_id WHERE p.temporada_id = ${id}`;
        let selectResult = await this.runQueryAsync( selectQuery, null ).catch( (error : any) => { console.log(error); throw new Error(Messages.QUERY_SELECT_ERROR)} );
        if ( !selectResult.rows.length ) { return null; }
        return selectResult.rows;
    }

    async selectPartidosByJornada( id : any ){
        let selectQuery = `SELECT p.*, l.nombre as "nombre_liga", t.nombre as "temporada", j.nombre as "jornada", ev.nombre as "nombre_visitante", el.nombre as "nombre_local" FROM partidos p 
            INNER JOIN temporadas t on t.temporada_id = p.temporada_id INNER JOIN ligas l on l.liga_id = p.liga_id INNER JOIN jornadas j on j.jornada_id = p.jornada_id
            INNER JOIN equipos ev on ev.equipo_id = p.vistante_id INNER JOIN equipos el on el.equipo_id = p.local_id WHERE p.jornada_id = ${id}`;
        let selectResult = await this.runQueryAsync( selectQuery, null ).catch( (error : any) => { console.log(error); throw new Error(Messages.QUERY_SELECT_ERROR)} );
        if ( !selectResult.rows.length ) { return null; }
        return selectResult.rows;
    }

    async selectPartidos(idLiga: any, idTemporada: any, idJornada: any){
        let selectQuery = `SELECT p.*, l.nombre as "nombre_liga", t.nombre as "temporada", j.nombre as "jornada", ev.nombre as "nombre_visitante", ev.logo as "logo_visitante", el.nombre as "nombre_local", el.logo as "logo_local" FROM partidos p 
            INNER JOIN temporadas t on t.temporada_id = p.temporada_id INNER JOIN ligas l on l.liga_id = p.liga_id INNER JOIN jornadas j on j.jornada_id = p.jornada_id
            INNER JOIN equipos ev on ev.equipo_id = p.vistante_id INNER JOIN equipos el on el.equipo_id = p.local_id`;
        
        if(idLiga) selectQuery = selectQuery + ` ${!selectQuery.includes('WHERE') && 'WHERE'} p.liga_id = ${idLiga}`
        if(idTemporada) selectQuery = selectQuery + ` ${!selectQuery.includes('WHERE') ? 'WHERE' : 'AND'} p.temporada_id = ${idTemporada}`
        if(idJornada) selectQuery = selectQuery + ` ${!selectQuery.includes('WHERE') ? 'WHERE' : 'AND'} p.jornada_id = ${idJornada}`

        console.log(selectQuery, 'the query...')
        
        let selectResult = await this.runQueryAsync( selectQuery, null ).catch( (error : any) => { console.log(error); throw new Error(Messages.QUERY_SELECT_ERROR)} );
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
