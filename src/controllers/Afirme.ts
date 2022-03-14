/* import {Request, Response} from 'express';
import { Messages } from '../util/messages';

const axios = require('axios');
const soap = require('soap');

const currencyFormatter = require('currency-formatter');

const urlAuthAfirme = "https://servicios.segurosafirme.com.mx/MidasWeb/rest/auth/login.action";
const afirmeCredentials = { params : { usuario : "RASANDI1", password : "azul0726" } };

const wsdlAfirme = "./wsdl/Afirme/CotizacionAutoIndividualService.wsdl";

const bodyAfirmeCotizarExpress = {
    datosPoliza : { idNegocio : 91, idProducto : 174, idTipoPoliza : 176},
    zonaCirculacion : { idEstadoCirculacion : null , idMunicipioCirculacion : null },
    vehiculo : { idLineaNegocio : 1235, idMarca : null, modelo : null, idEstilo : 0 },
    paquete : { idPaquete : 678, idFormaPago : 3, pctDescuentoEstado : 40 }
}

const paquetes = [
    {nombre : "AMPLIA", id : 1},
    {nombre : "LIMITADA", id : 3},
    {nombre : "BASICO", id : 678},
];

let intentos = 0;

class Afirme{

    public async getToken( credentials : any  ){
        let tokenResponse = await axios.get(urlAuthAfirme, credentials).catch((error : any) => { throw new Error(Messages.TOKEN_ERROR_AFIRME) });
        let token = tokenResponse.data.data ? tokenResponse.data.data.token : null;
        if(token) return token;
        else throw new Error(Messages.TOKEN_NOT_RECEIVED);
    }

    public async generarCotizacionExpress( cotizacionRequests : any){
        let cotizaciones = [];
        let client = await soap.createClientAsync(wsdlAfirme);
        try{
            for( let cotizacionRequest of cotizacionRequests ){
                let responseCotizacion = await client.cotizarPolizaAsync(cotizacionRequest.request);
                let cotizacion = JSON.parse(responseCotizacion[0].return);
                let cotizacionJson = { nombre : cotizacionRequest.nombre, cotizacion : this.formatResponse(cotizacion) };
                cotizaciones.push(cotizacionJson);
            }
            intentos = 0;
            return cotizaciones;
        }catch( error ){
            if( error.message = "Parse Error"  && intentos < 4 ){  intentos ++; this.generarCotizacionExpress( cotizacionRequests ) }
            else { intentos = 0; throw new Error( error ) }
        }
    }

    public async getBodyCotizacion( cotizacionData: any ){
        let afirmeRequests = [];
        let token = await this.getToken( afirmeCredentials );
        if( token == null || token == undefined ){ return null };
        if( cotizacionData.marca.id_afirme == null || cotizacionData.marca.id_afirme == undefined ){ return null };
        if( cotizacionData.estilo.id_afirme == null || cotizacionData.estilo.id_afirme == undefined ){ return null };
        if( !cotizacionData.modelo.afirme || cotizacionData.modelo.afirme == null ){ return null };
        bodyAfirmeCotizarExpress.zonaCirculacion.idEstadoCirculacion = cotizacionData.estado.id_afirme;
        bodyAfirmeCotizarExpress.zonaCirculacion.idMunicipioCirculacion = cotizacionData.municipio.id_afirme;
        bodyAfirmeCotizarExpress.vehiculo.idMarca = cotizacionData.marca.id_afirme;
        bodyAfirmeCotizarExpress.vehiculo.idEstilo = cotizacionData.estilo.id_afirme;
        bodyAfirmeCotizarExpress.vehiculo.modelo = cotizacionData.modelo.valor; 
        for(let paquete of paquetes){
            bodyAfirmeCotizarExpress.paquete.idPaquete = paquete.id;
            let afirmeRequest = {token : token , json : JSON.stringify(bodyAfirmeCotizarExpress) };
            let request = {nombre : paquete.nombre, request : afirmeRequest }
            afirmeRequests.push( request );
        }
        return afirmeRequests;
    }

    public formatResponse( responseCotizacion : any ){
        let responseCoberturas = responseCotizacion.coberturas;
        let responsePagos = responseCotizacion.esquemaPago;
        let derechoPago = this.isNumber(responseCotizacion.derechoPago) ? currencyFormatter.format(responseCotizacion.derechoPago, { code: 'USD' }) : responseCotizacion.derechoPago;
        let returnResponse = {id_cotizacion : responseCotizacion.idToCotizacion, iva : responseCotizacion.iva, folio : responseCotizacion.folio, prima_neta : responseCotizacion.primaNeta, prima_total : responseCotizacion.primaTotal, derecho_pago : derechoPago,  recargo : responseCotizacion.recargo, descuentos : responseCotizacion.descuentos, coberturas : "", formas_pago : ""};
        let coberturas : any = [];
        let pagos : any  = [];
        for( let cobertura in responseCoberturas ){
            let primaNeta = currencyFormatter.format(responseCoberturas[cobertura].primaNeta, { code: 'USD' });
            let sumaAsegurada = this.isNumber(responseCoberturas[cobertura].sumaAsegurada) ? currencyFormatter.format(responseCoberturas[cobertura].sumaAsegurada, { code: 'USD' }) : responseCoberturas[cobertura].sumaAsegurada;
            let coberturaObject = { descripcion :  responseCoberturas[cobertura].descripcion, id_cobertura : responseCoberturas[cobertura].idCobertura, prima_neta : primaNeta, suma_asegurada : sumaAsegurada };
            coberturas.push(coberturaObject);
        }
        for( let pago in responsePagos ){
            let pagoObject = { forma_pago : responsePagos[pago].formaPago, pago_inicial : responsePagos[pago].pagoInicial, recibos_subsecuentes : responsePagos[pago].noRecibosSubsecuentes, pagos_subsecuentes : responsePagos[pago].pagoSubsecuente };
            pagos.push(pagoObject);
        }
        returnResponse.coberturas = coberturas;
        returnResponse.formas_pago = pagos;
        return returnResponse;
    }

    isNumber( valor : any ){
        return isFinite(valor);
    }

}

export const AfirmeController = new Afirme(); */