const { ipcMain } = require('electron');
const helper = require('../helpers/capturareportes');
const fs = require('fs');
const JsonFile = require("edit-json-file");

ipcMain.on('getpventas', async(event)=>{
    let puntosventa=[]
    const pventas=await helper.getpventas();
    for (var i = 0; i < pventas.length; i++) {
        puntosventa.push(pventas[i]);
    }
    event.reply('getpventasresult', pventas);
})

ipcMain.on('getplazatipomaq',async(event,nombrepventa)=>{
    let nopventa=nombrepventa.split('-')[0]
    nombrepventa=nombrepventa.split('-')[1]
    const infopventa=await helper.getplazatipomaq(nombrepventa,nopventa)
    event.reply('getplazatipomaqresult',infopventa.recordset[0]);
})

ipcMain.on('guardareporte',async(event,reporte)=>{
    const guardareport=await helper.guardareporte(reporte)
    event.reply('guardareporteresult',guardareport)
})

ipcMain.on('consultareportes',async(event,fechas)=>{
    const reportes=await helper.getreportes(fechas)
    event.reply('consultareportesresult',reportes)
})

ipcMain.on('guardarcambios',async(event,reporte)=>{
    const updateregistro=await helper.updateregistro(reporte)
    event.reply('guardarcambiosresult',updateregistro)
})
