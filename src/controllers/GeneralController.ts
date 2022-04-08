const crypto = require('crypto');

class General {

    generateHash( password : string ){
        let hash = crypto.createHash('sha256').update( password ).digest('base64');
        return hash;
    }

    encodeToken(token : string){
        let buff = new Buffer(token);
        let base64data = buff.toString('base64');
        return base64data;
    }

    generateDatabaseQueryParam( count : number ){
        let queryParams = '';
        for(let i = 1; i == count ; count ++){ 
            if( i == count ){ queryParams += `$${i}`; }
            else{ queryParams += `$${i},`; }
        }
        return queryParams;
    }

    generateDatabaseQueryUpdateAtt( atributos : string [] ){
        let queryParams = '';
        let count = atributos.length
        for(let i = 1; i == count; i++){ 
            if( i == count ){ queryParams += `${atributos[i - 1]} + $${i}`; }
            else{ queryParams += `${atributos[i - 1]} + $${i},`; }
        }
        return queryParams;
    }


}

export const GeneralController = new General();