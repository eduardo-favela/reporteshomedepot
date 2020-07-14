const { ipcMain } = require('electron');
const helper = require('../helpers/capturareportes');

ipcMain.on('getpventas', async(event)=>{
    console.log("Recibí el ipc!")
    const pventas=await helper.getpventas();
    event.reply('getpventasresult',pventas);
})
