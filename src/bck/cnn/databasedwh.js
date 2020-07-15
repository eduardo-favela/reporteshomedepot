const sql = require('mssql');
const { databasedwh } = require('./keys');
const { ipcMain } = require('electron');
console.log("Conectado al servidor: " + databasedwh.server)
const pool = new sql.ConnectionPool(databasedwh);
var conexion = {};
ipcMain.on('conexion', async(event) => {
    conexion = event;
});


const poolconnected=pool.connect(databasedwh);

module.exports = poolconnected;