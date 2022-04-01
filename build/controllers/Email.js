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
exports.EmailController = void 0;
const nodemailer = __importStar(require("nodemailer"));
class Email {
    async enviarCotizacion(receiverMail, copyMail, pdfPath) {
        try {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: { user: 'timeisoverxd@gmail.com', pass: '8u45kCVe=&eW5CR( >Nb' }
            });
            await transporter.sendMail({
                from: 'AS SEGUROS <ejemplo@gmail.com>',
                to: `${receiverMail}, ${copyMail}`,
                subject: 'Le enviamos su cotizacion por parte de AS SEGUROS',
                attachments: [{ filename: 'cotizacion.pdf', path: pdfPath, contentType: 'application/pdf' }]
            });
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al enviar la cotizacion por email, contacte a soporte");
        }
    }
    async registerEmail(receiverMail, nombre, codigo) {
        try {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: { user: 'timeisoverxd@gmail.com', pass: "8u45kCVe=&eW5CR( >Nb" }
            });
            await transporter.sendMail({
                from: 'APOSTA SERVICES <ejemplo@gmail.com>',
                to: `${receiverMail}`,
                subject: 'Confirmacion de activacion de cuenta',
                html: `<h1>Confirmacion de correo</h1>
                    <h2>Hello ${nombre}</h2>
                    <p>Gracias por registrarte en APOSTA, termina la verificacion de tu correo dando click al siguiente enlace :</p>
                    <a href=http://localhost:3000/api/auth/confirm/${codigo}>Verificar</a>
                    </div>`,
            });
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al enviar la cotizacion por email, contacte a soporte");
        }
    }
}
exports.EmailController = new Email();
