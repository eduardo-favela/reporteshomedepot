const sql = require('mssql');
const { databasevoficiname } = require('./keys');
const { ipcMain } = require('electron');
console.log("Conectado al servidor: " + databasevoficiname.server)
const pool = new sql.ConnectionPool(databasevoficiname);
let conexion = {};
ipcMain.on('conexion', async(event) => {
    conexion = event;
});

const poolconnected=pool.connect(databasevoficiname)
.catch((err)=>{conexion.reply('errorconexion', err);})

module.exports = poolconnected;