const mysql = require('mysql');
const { promisify } = require('util');
const { databasekpos } = require('./keys');
const { ipcMain } = require('electron');
console.log("Conectado al servidor: " + databasekpos.host)
const pool = mysql.createPool(databasekpos);
var conexion = {};
ipcMain.on('conexion', async(event) => {
    conexion = event;
});

pool.getConnection((err, connection) => {
    if (err) {
        conexion.reply('errorconexion', err);
        console.log("Error: ", err.code);
        if (err.code === 'ECONNRESET') {
            conexion.reply('errorconexion', err);
        }
        if (err.code === 'EHOSTUNREACH') {
            conexion.reply('errorconexion', err);
        }
        if (err.code === 'ETIMEDOUT') {
            conexion.reply('errorconexion', err);
        }
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conexion.reply('errorconexion', err);
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            conexion.reply('errorconexion', err);
        }
        if (err.code === 'ECONNREFUSED') {
            conexion.reply('errorconexion', err);
        }
        if (err.code === 'ECANCELED') {
            conexion.reply('errorconexion', err);
        }
    }

    if (connection) connection.release();
    console.log('DB is Connected');
    return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;