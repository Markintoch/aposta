"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* const puppeteer = require('puppeteer') */
const axios = require('axios');
class Server {
    constructor() {
    }
    async testHTMLToImg() {
        let test1 = "2001-18-09";
        let test2 = "Markintoch";
        let tabla_coberturas = this.getCoberturasTable();
        let test = `<html>
        <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
          <style>
              .center{ text-align : center;}	
              .col-head{background : #006BB7; color : #ffffff;}  
          </style>
        </head>
        <body>
          <table class="table table-bordered table-sm center">
            <thead>
              <td class="col-head" scope="col" style="width: 33%"><strong>Fecha</strong></td>
              <td class="col-head" scope="col" style="width: 33%"><strong>Id AS</strong></td>
              <td class="col-head" scope="col" style="width: 33%"><strong>Cotizacion Compañia</strong></td>
            </thead>
            <tbody>
                <td>$fecha}</td>
              <td>$id_agente}</td>
              <td>$aseguradora}</td>
            </tbody>
          </table>
          <table class="table table-bordered table-sm center">
            <thead>
              <tr><td colspan="2" class="col-head"><strong>Datos del Asegurado</strong></td></tr>
            </thead>
            <tbody>
                <tr>
                <td style="width: 50%"><strong>Nombre : </strong>$datos_asegurado.nombre}</td>
                <td style="width: 50%"><strong>Fecha de Nacimiento : </strong>$datos_asegurado.fecha_nacimiento}</td>
              </tr>
              <tr>
                <td style="width: 50%"><strong>Email : </strong>$datos_asegurado.email}</td>
                <td style="width: 50%"><strong>Telefono : </strong>$datos_asegurado.telefono}</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered table-sm center">
            <thead>
              <tr><td colspan="2" class="col-head"><strong>Datos del Vehículo</strong></td></tr>
            </thead>
            <tbody>
                <tr>
                <td style="width: 50%"><strong>Marca : </strong>$datos_vehiculo.marca}</td>
                <td style="width: 50%"><strong>Modelo : </strong>$datos_vehiculo.modelo}</td>
              </tr>
              <tr>
                <td style="width: 50%"><strong>Estilo : </strong>$datos_vehiculo.estilo}</td>
                <td style="width: 50%"><strong>Nombre del Asesor : </strong>$nombre_agente}</td>
              </tr>
            </tbody>
          </table>
          ${tabla_coberturas}
        </body>
      </html>`;
        /* const browser = await puppeteer.launch()
          const page = await browser.newPage()
          await page.setContent(test)
          let result = await page.screenshot({ encoding: "base64", clip : { x : 0, y : 0, width : 800, height: 500 } });
          console.log(result);
          await browser.close(); */
    }
    getCoberturasTable() {
        let bodyCoberturas = "";
        let coberturas = [{ forma_pago: "ANUAL", forma_inicial: "9,159.54", n_recibos: 8, pagos_sub: 88554.23 }, { forma_pago: "ANUAL", forma_inicial: "9,159.54", n_recibos: 8, pagos_sub: 88554.23 }];
        for (let cobertura of coberturas) {
            let renglong = `
            <tr>
                <td>${cobertura.forma_pago}</td>
                <td>${cobertura.forma_inicial}</td>
                <td>${cobertura.n_recibos}</td>
                <td>${cobertura.pagos_sub}</td>
            </tr>`;
            bodyCoberturas = bodyCoberturas + renglong;
        }
        let tabla = `
        <table class="table table-bordered table-sm center">
            <thead>
                <tr>
                    <th class="col-head" scope="col">Forma de Pago</th>
                    <th class="col-head" scope="col">Pago Inicial</th>
                    <th class="col-head" scope="col">N° Recibos</th>
                    <th class="col-head" scope="col">Subsecuentes</th>
                </tr>
            </thead>
            <tbody>
            ${bodyCoberturas}
            </tbody
        </table>`;
        return tabla;
    }
}
const server = new Server();
