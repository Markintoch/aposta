/* import pdfkit from "pdfkit";
import * as fs from 'fs'; */

/* const path = require('path'); */
/* const puppeteer = require('puppeteer'); */

/* const tempPDFPath = path.join(__dirname,'../../docs/');
const assetsPath = path.join(__dirname,'../../assets/'); */

const descripcion = "Somos una agencia de seguros con mas de 18 años de experiencia,atendiendo las necesidades de proteccion de las familias Mexicanas. Ponemos a su consideracion la cotizacion del seguro para su Auto de acuerdo a la siguiente informacion :";


class PDF{

   /*  pdfDocument = new pdfkit; */

    public async generatePDF( pdfData : any ){
        try{
            //INITIAL CONFIG
            let marginLeft = 30;
            let imagenOptions : any = { width : 170 };
            let tableOptions : any = { width : 550 };
            let footerOptions : any = { width : 560, height : 170 };
            let font = 11;
            let descriptionOptions : any = { width: 550, align: 'justify'};

            /* let pdfDocument = new pdfkit; */

            //HEADER
            /* let pdfName = "pdf-" + Date.now() + ".pdf";
            let pdfFile = fs.createWriteStream(tempPDFPath + pdfName);
            pdfDocument.pipe(pdfFile); //Genera el archivo pdf
            pdfDocument.image(assetsPath+'as_seguro_logo.png', 50, 15, imagenOptions)
            pdfDocument.image(assetsPath+'auto_seguro_maestro.png', 400, 25, imagenOptions)
            pdfDocument.moveTo(marginLeft, 85).lineTo(580, 85).stroke();  */

            //DESCRIPCION
            /* pdfDocument.font('Helvetica-Bold').fontSize(font).text('Estimado(a)',marginLeft, 100);
            pdfDocument.font('Helvetica').fontSize(font).text(descripcion, marginLeft ,120, descriptionOptions); */
    
            //TABLA DE INFORMACION Y FORMAS DE PAGO
            /* let primerPaginaIMG = await this.primerPaginaPDF(pdfData);
            let pagina1 = Buffer.from(primerPaginaIMG, 'base64'); 
            pdfDocument.image(pagina1, marginLeft, 160, tableOptions);
    
            pdfDocument.addPage(); */
    
            //TABLA DE COBERTURAS
            /* let segundaPaginaIMG = await this.segundaPaginaPDF(pdfData);
            let pagina2 = Buffer.from(segundaPaginaIMG, 'base64'); 
            pdfDocument.image(pagina2, marginLeft, 20, tableOptions);
    
            pdfDocument.image(assetsPath+'footer.png', 25, 650, footerOptions)
            pdfDocument.end();

            return tempPDFPath + pdfName; */
        }catch( error ){
            console.log(error);
            throw new Error ("Error al generar el PDF, contacte a soporte");
        }
    }

   /*  public async generatePDF( pdfData : any ){
        try{
            let marginLeft = 30;
            let imagenOptions : any = { width : 170 };
            let tableOptions : any = { width : 550 };
            let footerOptions : any = { width : 560, height : 170 };
            let font = 11;
            let descriptionOptions : any = { width: 550, align: 'justify'};
    
            //HEADER
            let pdfName = "pdf-" + Date.now() + ".pdf";
            let pdfFile = fs.createWriteStream(tempPDFPath + pdfName);
            this.pdfDocument.pipe(pdfFile); //Genera el archivo pdf
            this.pdfDocument.image(assetsPath+'as_seguro_logo.png', 50, 15, imagenOptions)
            this.pdfDocument.image(assetsPath+'auto_seguro_maestro.png', 400, 25, imagenOptions)
            this.pdfDocument.moveTo(marginLeft, 85).lineTo(580, 85).stroke(); 
    
            //DESCRIPCION
            this.pdfDocument.font('Helvetica-Bold').fontSize(font).text('Estimado(a)',marginLeft, 100);
            this.pdfDocument.font('Helvetica').fontSize(font).text(descripcion, marginLeft ,120, descriptionOptions);
    
            //TABLA DE INFORMACION Y FORMAS DE PAGO
            let primerPaginaIMG = await this.primerPaginaPDF(pdfData);
            let pagina1 = Buffer.from(primerPaginaIMG, 'base64'); 
            this.pdfDocument.image(pagina1, marginLeft, 160, tableOptions);
    
            this.pdfDocument.addPage();
    
            //TABLA DE COBERTURAS
            let segundaPaginaIMG = await this.segundaPaginaPDF(pdfData);
            let pagina2 = Buffer.from(segundaPaginaIMG, 'base64'); 
            this.pdfDocument.image(pagina2, marginLeft, 20, tableOptions);
    
            this.pdfDocument.image(assetsPath+'footer.png', 25, 650, footerOptions)
            this.pdfDocument.end();
        }catch( error ){
            console.log(error);
            throw new Error ("Error al generar el PDF, contacte a soporte");
        }
        
    } */

    public async primerPaginaPDF( pdfData : any ){
        let tablaPagos = this.tablaPagos(pdfData);
        let pdf_contenido = 
        `<html>
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
                    <td>${pdfData.fecha}</td>
                    <td>${pdfData.id_agente}</td>
                    <td>${pdfData.aseguradora}</td>
                </tbody>
                </table>
                <table class="table table-bordered table-sm center">
                <thead>
                    <tr><td colspan="2" class="col-head"><strong>Datos del Asegurado</strong></td></tr>
                </thead>
                <tbody>
                    <tr>
                    <td style="width: 50%"><strong>Nombre : </strong>${pdfData.datos_asegurado.nombre}</td>
                    <td style="width: 50%"><strong>Fecha de Nacimiento : </strong>${pdfData.datos_asegurado.fecha_nacimiento}</td>
                    </tr>
                    <tr>
                    <td style="width: 50%"><strong>Email : </strong>${pdfData.datos_asegurado.email}</td>
                    <td style="width: 50%"><strong>Telefono : </strong>${pdfData.datos_asegurado.telefono}</td>
                    </tr>
                </tbody>
                </table>
                <table class="table table-bordered table-sm center">
                <thead>
                    <tr><td colspan="2" class="col-head"><strong>Datos del Vehículo</strong></td></tr>
                </thead>
                <tbody>
                    <tr>
                    <td style="width: 50%"><strong>Marca : </strong>${pdfData.datos_vehiculo.marca}</td>
                    <td style="width: 50%"><strong>Modelo : </strong>${pdfData.datos_vehiculo.modelo}</td>
                    </tr>
                    <tr>
                    <td style="width: 50%"><strong>Estilo : </strong>${pdfData.datos_vehiculo.estilo}</td>
                    <td style="width: 50%"><strong>Nombre del Asesor : </strong>${pdfData.nombre_agente}</td>
                    </tr>
                </tbody>
                </table>
                ${tablaPagos}
            </body>
        </html>`;
        /* const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.setContent(pdf_contenido)
        let result = await page.screenshot({ encoding: "base64", clip : { x : 0, y : 0, width : 800, height: 900 } });
        await browser.close();
        return result; */
    }

    public async segundaPaginaPDF( pdfData : any ){
        let tabla_coberturas = this.tablaCoberturas(pdfData);
        let pdf_contenido = `
            <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                    <style>
                        .center{ text-align : center;}	
                        .col-head{background : #006BB7; color : #ffffff;}  
                    </style>
                </head>
                <body>
                    ${tabla_coberturas}
                </body>
            </html>`;
        /* const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.setContent(pdf_contenido)
        let result = await page.screenshot({ encoding: "base64", clip : { x : 0, y : 0, width : 800, height: 950 } });
        await browser.close();
        return result; */
    }

    public tablaPagos( pdfData : any ){
        let contenidoTabla = "";
        if (pdfData.aseguradora == "AFIRME" ){
            for(let cotizacionData of pdfData.cotizacion){
                let renglonesPago = "";
                for(let pago of cotizacionData.cotizacion.formas_pago){
                    let renglon = ` <tr><td>${pago.forma_pago}</td><td align="right">${pago.pago_inicial}</td><td align="right">${pago.recibos_subsecuentes}</td><td align="right">${pago.pagos_subsecuentes}</td></tr>`;
                    renglonesPago = renglonesPago + renglon;
                }
                let bodyPago = `<tbody><tr><th colspan="4">${cotizacionData.nombre}</th></tr>${renglonesPago}</tbody>`;
                contenidoTabla = contenidoTabla + bodyPago;
            }
            let tabla = `<table class="table table-bordered table-sm center"><thead><tr><th class="col-head" scope="col">Forma de Pago</th><th class="col-head" scope="col">Pago Inicial</th><th class="col-head" scope="col">N° Recibos</th><th class="col-head" scope="col">Subsecuentes</th></tr></thead> ${contenidoTabla}</table>`;
            return tabla;
        }
        
    }

    public tablaCoberturas( pdfData : any ){
        let contenidoTabla = "";
        if (pdfData.aseguradora == "AFIRME" ){
            for(let cotizacionData of pdfData.cotizacion){
                let renglonesCobertura = "";
                for(let cobertura of cotizacionData.cotizacion.coberturas){
                    let renglon = ` <tr><td>${cobertura.descripcion}</td><td align="right">${cobertura.prima_neta}</td><td align="right">${cobertura.suma_asegurada}</td></tr>`;
                    renglonesCobertura = renglonesCobertura + renglon;
                }
                renglonesCobertura = renglonesCobertura +  `<tr><td>DERECHO DE POLIZA</td><td align="right">${cotizacionData.cotizacion.derecho_pago}</td><td align="right">-</td></tr>`;
                let bodyCobertura = `<tbody><tr><th colspan="4">${cotizacionData.nombre}</th></tr>${renglonesCobertura}</tbody>`;
                contenidoTabla = contenidoTabla + bodyCobertura;
            }
            let tabla = `<table class="table table-bordered table-sm center"><thead><tr><th class="col-head" scope="col">Coberturas básicas</th><th class="col-head" scope="col">Prima Neta</th><th class="col-head" scope="col">Suma Asegurada</th></tr></thead> ${contenidoTabla}</table>`;
            return tabla;
        }
    }


}

export const PDFController = new PDF();