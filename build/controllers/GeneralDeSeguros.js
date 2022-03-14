"use strict";
/* import { Messages } from '../util/messages';
import {Request, Response} from 'express';

const soap = require('soap');

const wsdlAuth = "https://gdswas.mx/gsautos-ws/soap/autenticacionWS?wsdl";
const wsdlCatalogosAutos = "https://gdswas.mx/gsautos-ws/soap/catalogoAutosWS?wsdl";
const wsdlCotizacion = "https://gdswas.mx/gsautos-ws/soap/cotizacionEmisionWS?wsdl";
const wsdlCoberturas = "https://gdswas.mx/gsautos-ws/soap/catalogoCoberturasWS?wsdl";
const GNCredentials = { arg0 : {usuario : 'ATC0', password : '2r2kGdeUA0' } };

const bodyGeneralSegurosCotizacion = {
    token : null, configuracionProducto : 'RESIDENTE_INDIVIDUAL', cp : null, descuento : 0,
    inciso : { claveGs : null, conductorMenor30 : 1, modelo : null, tipoServicio : 'PARTICULAR', tipoValor : 'VALOR_COMERCIAL', tipoVehiculo : 'AUTO_PICKUP' }
}

class GeneralDeSeguros{

    public async coberturas( request : Request, response : Response ){
        try{
            let token = await this.getToken();
            let idCotizacion = request.body.id_cotizacion;
            let paquetes = request.body.paquetes;
            if( token == null || token == undefined ){ throw new Error(Messages.TOKEN_ERROR_GN) };
            if( idCotizacion == null || idCotizacion == undefined ){ throw new Error(Messages.ID_COTIZACION_ISNULL) };
            if( paquetes == null || paquetes == undefined ){ throw new Error(Messages.PAQUETES_ISNULL) };
            let coberturas = await this.getCoberturas( token, idCotizacion, paquetes );
            let bodyResponse = {coberturas : coberturas};
            response.send(bodyResponse);
        }catch( error ){
            let errorBody = { error : error.message};
            response.status(400).send(errorBody);
        }
    }

    public async getToken(){
        let gnClient = await soap.createClientAsync(wsdlAuth);
        let tokenResponse = await gnClient.obtenerTokenAsync(GNCredentials).catch( (error : any) => { throw new Error(Messages.TOKEN_ERROR_GN) } );
        let token = tokenResponse[0].return.token ? tokenResponse[0].return.token : null;
        if(token) return token;
        else throw new Error(Messages.TOKEN_NOT_RECEIVED);
    }

    public async getBodyCotizacion( cotizacionData: any ){
        let token = await this.getToken();
        if( token == null || token == undefined ){ return null };
        if( cotizacionData.estilo.id_gn == null || cotizacionData.estilo.id_gn == undefined ){ return null };
        if( !cotizacionData.modelo.gn || cotizacionData.modelo.gn == null ){ return null };
        bodyGeneralSegurosCotizacion.token = token;
        bodyGeneralSegurosCotizacion.cp = cotizacionData.codigo_postal;
        bodyGeneralSegurosCotizacion.inciso.claveGs = cotizacionData.estilo.id_gn;
        bodyGeneralSegurosCotizacion.inciso.modelo = cotizacionData.modelo.valor;
        let gnRequest = { arg0 : bodyGeneralSegurosCotizacion };
        return gnRequest;
    }

    public async genCotizarExpress( cotizacionRequest : any){
        let client = await soap.createClientAsync(wsdlCotizacion);
        let responseCotizacion = await client.generarCotizacionAsync(cotizacionRequest);
        let cotizacion = responseCotizacion[0].return;
        console.log(cotizacion);
        if(cotizacion != null && cotizacion != undefined){ if( cotizacion.exito ) {console.log(cotizacion); return cotizacion} else return null; }
        else return null;
    }

    public async getCoberturas( token : string, idCotizacion : any , paquetes : any ){
        let coberturasArray = [];
        let client = await soap.createClientAsync( wsdlCoberturas );
        for( let paquete of paquetes ){
            let requestCoberturas = { arg0 : { token : token, cotizacion : idCotizacion, paquete : paquete.id } };
            let responseCoberturas = await client.wsObtenerCoberturasCotizacionAsync( requestCoberturas );
            let coberturas = responseCoberturas[0].return;
            let bodyCoberturas = { nombre : paquete.nombre, coberturas : coberturas };
            coberturasArray.push(bodyCoberturas);
        }
        return coberturasArray;
    }

}

export const GeneralDeSegurosController = new GeneralDeSeguros();
 */ 
