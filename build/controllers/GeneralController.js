"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralController = void 0;
const crypto = require('crypto');
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
}
exports.GeneralController = new General();
