const { ipcMain } = require('electron');
const helper = require('../helpers/capturareportes');
const fs = require('fs');
const JsonFile = require("edit-json-file");

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
