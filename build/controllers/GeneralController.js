"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralController = void 0;
const crypto = require('crypto');
const path_dir = require('path');
const path_logo = 'media/logo_';
class General {
    generateHash(password) {
        let hash = crypto.createHash('sha256').update(password).digest('base64');
        return hash;
    }
    encodeToken(token) {
        let buff = new Buffer(token);
        let base64data = buff.toString('base64');
        return base64data;
    }
    generateDatabaseQueryParam(value) {
        return value.map((valor, key) => {
            return `$${key + 1}`;
        });
        // let queryParams = '';
        // for(let i = 1; i == count ; count ++){ 
        //     if( i == count ){ queryParams += `$${i}`; }
        //     else{ queryParams += `$${i},`; }
        // }
        // return queryParams;
    }
    generateDatabaseQueryUpdateAtt(atributos) {
        return atributos.map((valor, key) => {
            return `${valor} = $${key + 1}`;
        });
        /* let queryParams = '';
        let count = atributos.length
        for(let i = 1; i == count; i++){
            if( i == count ){ queryParams += `${atributos[i - 1]} + $${i}`; }
            else{ queryParams += `${atributos[i - 1]} + $${i},`; }
        }
        return queryParams; */
    }
    saveFile(file) {
        let ext = path_dir.extname(file.name);
        let final_path = path_logo + new Date().getTime() + ext;
        file.mv(final_path);
        return final_path;
    }
}
exports.GeneralController = new General();
