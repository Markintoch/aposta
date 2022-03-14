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


}

export const GeneralController = new General();