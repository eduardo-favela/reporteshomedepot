const { ipcMain } = require('electron');
const helper = require('../helpers/capturareportes');
const fs = require('fs');
const xl = require('excel4node');
const { homedir } = require('os');


ipcMain.on('getpventas', async(event,tiporeporte)=>{
    const pventas=await helper.getpventas(tiporeporte);
    if(tiporeporte=="Vending"){
        event.reply('getpventasresult', pventas);
    }
    else if(tiporeporte=="Kiosko"){
        event.reply('getpventasksnacksresult', pventas);
    }
})

ipcMain.on('getanomalias',async(event)=>{
    const anomalias=await helper.getanomalias()
    event.reply('getanomaliasresult',anomalias)
})

ipcMain.on('getpventasksnacks', async(event,tiporeporte)=>{
    const pventas=await helper.getpventas(tiporeporte);
    event.reply('getpventasksnacksresult', pventas);
})

ipcMain.on('getplazatipomaq',async(event,nombrepventa,tiporeporte)=>{
    let nopventa=nombrepventa.split('_')[0]
    nombrepventa=nombrepventa.split('_')[1]
    //console.log(nopventa)
    //console.log(nombrepventa)
    const infopventa=await helper.getplazatipomaq(nombrepventa,nopventa,tiporeporte)
    if(infopventa){
        event.reply('getplazatipomaqresult',infopventa.recordset[0]);
    }
})

ipcMain.on('guardareporte',async(event,reporte)=>{
    const guardareport=await helper.guardareporte(reporte)
    event.reply('guardareporteresult',guardareport)
})

ipcMain.on('consultareportes',async(event,params)=>{
    const reportes=await helper.getreportes(params)
    event.reply('consultareportesresult',reportes)
})

ipcMain.on('guardarcambios',async(event,reporte)=>{
    const updateregistro=await helper.updateregistro(reporte)
    event.reply('guardarcambiosresult',updateregistro)
})

ipcMain.on('buscareportefolio',async(event,folio)=>{
    const reporte=await helper.getreportefolio(folio)
    event.reply('buscareportefolioresult',reporte)
})

ipcMain.on('exportareportesexcel',async(event,fecha)=>{
    const exportex=await helper.getdeptosreportes(fecha)
    

    if(exportex){
         ///////////Se crea el libro de excel///////////
         let wb = new xl.Workbook()
         const headingColumnNames = [
             "Folio",
             "Punto de venta",
             "Fecha",
             "Telefono",
             "Quien reporta",
             "Estatus",
             "Observavciones"
         ]
         const myStyle3 = wb.createStyle({
             font:{
                 color:'FFFFFF'
             },
             fill: {
                 type: 'pattern',
                 patternType: 'solid',
                 bgColor: '#2F75B5',
                 fgColor: '#2F75B5',
               }
         })

         for (let i = 0; i < exportex.length; i++) {
             
             ///////////Se crea la hoja en el libro de excel///////////
             let ws=wb.addWorksheet(exportex[i].depto)

             ///////////Se asignan nombres a las columnas de la tabla///////////
             let headingColumnIndex = 1;
             headingColumnNames.forEach(heading => {
                 ws.cell(1, headingColumnIndex++)
                     .style(myStyle3)
                     .string(heading)
             })
             
             ///////////Se consultan los reportes de cada departamento///////////
             let reportesfexcel=await helper.getreportesexpexcel(fecha,exportex[i].depto)

             let rowIndex = 2
             reportesfexcel.forEach( record => {
                 let columnIndex = 1
                 Object.keys(record ).forEach(columnName =>{
                     ws.cell(rowIndex,columnIndex++)
                         .string(record [columnName])
                 })
                 rowIndex++
             })
         }

         let dir = homedir+'/Documents/ReportesCallCenter'
         if (!fs.existsSync(dir)){
             fs.mkdirSync(dir)
         }
         wb.write(dir+'/'+fecha+'.xlsx', function(err, stats) {
             if (err) {
               event.reply('exportareportesexcelresult',false)
             } else {
               event.reply('exportareportesexcelresult',true)
             }
           })
    }
    else{
        event.reply('exportareportesexcelresult',false)
    }
})