/* import {Request, Response} from 'express';
import * as fs from 'fs';
import { Messages } from '../util/messages';

//import improvisado
import { AfirmeController } from '../controllers/Afirme';
import { PDFController } from '../controllers/PDF';
import { EmailController } from "../controllers/Email";
import { GeneralDeSegurosController } from './GeneralDeSeguros';

const path = require('path');


const UNICODE = "utf8";
const estadosPath = path.join(__dirname,'../data/estados.json');
const municipiosPath = path.join(__dirname,'../data/municipios.json');
const marcasPath = path.join(__dirname,'../data/marcas.json');
const estilosPath = path.join(__dirname,'../data/estilos.json');
const modelosPath = path.join(__dirname,'../data/modelos.json');

class Data {

    public estados( request : Request, response : Response ){
        try{
            let stringEstados = fs.readFileSync(estadosPath,UNICODE);
            if(stringEstados == undefined || stringEstados == null){ throw new Error(Messages.ESTADOS_ISEMPTY); }
            let estados = JSON.parse(stringEstados);
            let body = { estados : estados };
            response.send(body);
        }catch(error){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    public municipios( request : Request , response : Response ){
        try{
            let idEstado = request.params.id;
            if( idEstado == undefined || idEstado == null ){ throw new Error(Messages.ID_ESTADO_ISNULL) }
            let municipiosArray = this.getMunicipiosById( idEstado )
            let body = { municipios : municipiosArray };
            response.send(body);
        }catch(error){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    public marcas( request : Request, response : Response ){
        try{
            let stringMarcas = fs.readFileSync(marcasPath,UNICODE);
            if(stringMarcas == undefined || stringMarcas == null){ throw new Error(Messages.MARCAS_ISNULL); }
            let marcas = JSON.parse(stringMarcas);
            let body = { marcas : marcas };
            response.send(body);
        }catch(error){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    public modelos( request : Request , response : Response ){
        try{
            let idMarca = request.params.id;
            if( idMarca == undefined || idMarca == null ){ throw new Error(Messages.ID_MARCA_ISNULL) }
            let modelos = this.getModelosById( idMarca );
            let body = { modelos : modelos };
            response.json(body);
        }catch(error){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    public estilos( request : Request, response : Response ){
        try{
            let idMarca = request.params.id_marca;
            let idModelo = request.params.modelo;
            if( idMarca == undefined || idMarca == null ){ throw new Error(Messages.ID_MARCA_ISNULL) }
            if( idModelo == undefined || idMarca == null ){ throw new Error(Messages.ID_MODELO_ISNULL) }
            let estilosResponse = this.getEstilosById( idMarca, idModelo );
            let body = { estilos : estilosResponse };
            response.send(body);
        }catch(error){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    public async generarCotizacion( request : Request, response : Response ){
        try{
            let cotizacionAfirme = null;
            let cotizacionGN = null;
            let cotizacionGNP = null;
            console.log(request.body);
            let jsonCotizacionAfirme = await AfirmeController.getBodyCotizacion(request.body);
            if( jsonCotizacionAfirme != null ){ cotizacionAfirme = await AfirmeController.generarCotizacionExpress( jsonCotizacionAfirme ) };
            let body = {afirme : cotizacionAfirme , gn : cotizacionGN, gnp : cotizacionGNP };
            response.send(body);
        }catch(error){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    public async generarPDFCotizacion( request : Request, response : Response ){
        try{
            let cotizacionData = request.body;
            let resultPDFPath = await PDFController.generatePDF( cotizacionData ).catch( error => {throw new Error("Error al general el PDF, contacte a soporte")});
            await EmailController.enviarCotizacion(cotizacionData.datos_asegurado.email, cotizacionData.email_agente, resultPDFPath).catch( error => {throw new Error("Error al enviar la cotizacion por email, contacte a soporte")});
            response.status(200).send();
        }catch(error){
            let errorBody = { error : error.message };
            response.status(400).send(errorBody);
        }
    }

    public getMunicipiosById( idEstado : number ){
        let arrayBusqueda = [];
        try{
            let stringMunicipios = fs.readFileSync(municipiosPath, UNICODE);
            if(stringMunicipios == undefined || stringMunicipios == null) { throw new Error(Messages.MUNICIPIOS_ISEMPTY) }
            let municipios = JSON.parse(stringMunicipios);
            for( let municipio of municipios){ if(municipio.id_estado == idEstado){ arrayBusqueda.push(municipio); } }
            return arrayBusqueda;
        }catch(error){ throw new Error(error.message)}
    }

    public getModelosById( idMarca : number ){
        let arrayModelos = [];
        try{
            let stringModelos = fs.readFileSync(modelosPath, UNICODE);
            if(stringModelos == undefined || stringModelos == null){ throw new Error(Messages.MODELOS_ISNULL) }
            let modelos = JSON.parse(stringModelos);
            for( let modelo of modelos ){ if(modelo.id_marca == idMarca ){ arrayModelos.push(modelo) } }
            return arrayModelos;
        }catch(error){ throw new Error(error.message) }
    }

    public getEstilosById( idMarca : number, modelo : number ){
        let arrayEstilos = [];
        try{
            let stringEstilos = fs.readFileSync(estilosPath, UNICODE);
            if(stringEstilos == undefined || stringEstilos == null){ throw new Error(Messages.ESTILOS_ISNULL) }
            let estilos = JSON.parse(stringEstilos);
            for( let estilo of estilos ){ if(estilo.id_marca == idMarca && estilo.modelo == modelo ){ arrayEstilos.push(estilo) } }
            arrayEstilos.sort( (a,b) => {return a.valor.localeCompare(b.valor)} );
            return arrayEstilos;
        }catch(error){ throw new Error(error.message) }
    }

}

export const DataController = new Data(); */