const { ipcMain } = require('electron');
const helper = require('../helpers/capturareportes');
const fs = require('fs');

ipcMain.on('getpventas', async(event)=>{
    let puntosventa=[]
    const pventas=await helper.getpventas();
    for (var i = 0; i < pventas.length; i++) {
        puntosventa.push(pventas[i]);
    }
    fs.writeFileSync(`${__dirname}/../../puntosventa.json`,JSON.stringify(puntosventa))
    event.reply('getpventasresult',puntosventa);
})

ipcMain.on('getplazatipomaq',async(event,nombrepventa)=>{
    const infopventa=await helper.getplazatipomaq(nombrepventa)
    event.reply('getplazatipomaqresult',infopventa.recordset[0]);
})

ipcMain.on('guardareporte',async(event,reporte)=>{
    const guardareport=await helper.guardareporte(reporte)
    event.reply('guardareporteresult',guardareport)
})