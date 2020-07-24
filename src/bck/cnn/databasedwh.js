const sql = require('mssql');
const { databasedwh } = require('./keys');
const { ipcMain } = require('electron');
console.log("Conectado al servidor: " + databasedwh.server)
const pool = new sql.ConnectionPool(databasedwh);
let conexion = {};
ipcMain.on('conexion', async(event) => {
    conexion = event;
});


const poolconnected=pool.connect(databasedwh)
.catch((err)=>{conexion.reply('errorconexion', err);})

module.exports = poolconnected;