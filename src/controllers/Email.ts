import * as nodemailer from 'nodemailer';

class Email{

    public async enviarCotizacion(receiverMail : string, copyMail : string, pdfPath : string){
        try{
            let transporter = nodemailer.createTransport({
                host : 'smtp.gmail.com',
                port : 587,
                secure : false,
                auth : { user : 'timeisoverxd@gmail.com', pass : '8u45kCVe=&eW5CR( >Nb'}
            });
    
            await transporter.sendMail({
                from : 'AS SEGUROS <ejemplo@gmail.com>',
                to : `${receiverMail}, ${copyMail}`,
                subject : 'Le enviamos su cotizacion por parte de AS SEGUROS',
                attachments : [ { filename : 'cotizacion.pdf', path : pdfPath, contentType: 'application/pdf' } ]
            });
        }catch(error){
            console.error(error);
            throw new Error ("Error al enviar la cotizacion por email, contacte a soporte");
        }
    }

    public async registerEmail(receiverMail : string, nombre : string, codigo : string){
        try{
            let transporter = nodemailer.createTransport({
                host : 'smtp.gmail.com',
                port : 587,
                secure : false,
                auth : { user : 'timeisoverxd@gmail.com', pass : "8u45kCVe=&eW5CR( >Nb"}
            });
    
            await transporter.sendMail({
                from : 'APOSTA SERVICES <ejemplo@gmail.com>',
                to : `${receiverMail}`,
                subject : 'Confirmacion de activacion de cuenta',
                html: `<h1>Confirmacion de correo</h1>
                    <h2>Hello ${nombre}</h2>
                    <p>Gracias por registrarte en APOSTA, termina la verificacion de tu correo dando click al siguiente enlace :</p>
                    <a href=http://localhost:3000/api/auth/confirm/${codigo}>Verificar</a>
                    </div>`,
            });
        }catch(error){
            console.error(error);
            throw new Error ("Error al enviar la cotizacion por email, contacte a soporte");
        }
    }

}

export const EmailController = new Email();