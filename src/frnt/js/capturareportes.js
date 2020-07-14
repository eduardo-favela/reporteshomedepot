const { ipcRenderer } = require('electron');

ipcRenderer.send('conexion', '')
ipcRenderer.send('getpventas','')


ipcRenderer.on('getpventasresult',(event,pventas)=>{
    console.log('puntos de venta :',pventas)
})
