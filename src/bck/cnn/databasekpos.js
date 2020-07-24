const sql = require('mssql');
const { databasekpos } = require('./keys');
const { ipcMain } = require('electron');
console.log("Conectado al servidor: " + databasekpos.host)
const pool = new sql.ConnectionPool(databasekpos);
let conexion = {};
ipcMain.on('conexion', async(event) => {
    conexion = event;
});

const poolconnected=pool.connect(databasekpos)
.catch((err)=>{conexion.reply('errorconexion', err);})

module.exports = poolconnected;
