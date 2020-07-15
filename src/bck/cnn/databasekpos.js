const sql = require('mssql');
const { databasekpos } = require('./keys');
const { ipcMain } = require('electron');
console.log("Conectado al servidor: " + databasekpos.host)
const pool = new sql.ConnectionPool(databasekpos);
var conexion = {};
ipcMain.on('conexion', async(event) => {
    conexion = event;
});

const poolconnected=pool.connect(databasekpos);

module.exports = poolconnected;
