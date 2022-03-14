"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const messages_1 = require("../util/messages");
const Database_1 = require("../controllers/Database");
const jwt = __importStar(require("jsonwebtoken"));
//Test
const secret = "aposta2021";
class Auth {
    async singinUser(request, response) {
        try {
            let nombre = request.body.nombre;
            let username = request.body.username;
            let email = request.body.email;
            let password = request.body.password;
            if (nombre == undefined || nombre == null || nombre.trim() == '') {
                throw new Error(messages_1.Messages.NOMBRE_ISREQUIRED);
            }
            if (email == undefined || email == null || email.trim() == '') {
                throw new Error(messages_1.Messages.EMAIL_ISREQUIRED);
            }
            if (username == undefined || username == null || username.trim() == '') {
                throw new Error(messages_1.Messages.USERNAME_ISREQUIRED);
            }
            if (password == undefined || password == null || password.trim() == '') {
                throw new Error(messages_1.Messages.PASSWORD_ISREQUIRED);
            }
            let result = await Database_1.DatabaseController.insertUser(nombre, username, email, password);
            let responseData = { id: result.user_id, nombre: nombre, username: username, email: email };
            let body = { status: 200, message: "COnfirmar su registro con el correo de auth", data: responseData };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async loginUser(request, response) {
        try {
            let username = request.body.username;
            let password = request.body.password;
            if (username == undefined || username == null || username.trim() == '') {
                throw new Error(messages_1.Messages.USERNAME_ISREQUIRED);
            }
            if (password == undefined || password == null || password.trim() == '') {
                throw new Error(messages_1.Messages.PASSWORD_ISREQUIRED);
            }
            let result = await Database_1.DatabaseController.loginUser(username, password);
            let responseData = { id: result[0].user_id, nombre: result[0].name, username: username, email: result[0].email };
            let token = this.generateWebToken(responseData);
            let body = { data: responseData, token: token };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    async confirmRegister(request, response) {
        try {
            let token64 = request.params.token;
            if (token64 == undefined || token64 == null || token64.trim() == '') {
                throw new Error("error al recibir token");
            }
            let result = await Database_1.DatabaseController.confirmCodeActivation(token64);
            let responseData = { id: result[0].user_id, nombre: result[0].nombre, username: result[0].username, email: result[0].email };
            let body = { status: 200, data: responseData };
            response.json(body);
        }
        catch (error) {
            let errorBody = { error: error.message };
            response.status(400).send(errorBody);
        }
    }
    generateWebToken(data) {
        let expiresData = { expiresIn: 60 * 60 }; //Expira en 1 hr
        let token = jwt.sign(data, secret, expiresData);
        return token;
    }
}
exports.AuthController = new Auth();
