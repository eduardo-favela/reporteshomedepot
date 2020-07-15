const sql = require('mssql');
const { databasevoficiname } = require('./keys');
const { ipcMain } = require('electron');
console.log("Conectado al servidor: " + databasevoficiname.server)
const pool = new sql.ConnectionPool(databasevoficiname);
var conexion = {};
ipcMain.on('conexion', async(event) => {
    conexion = event;
});

const poolconnected=pool.connect(databasevoficiname);


module.exports = poolconnected;