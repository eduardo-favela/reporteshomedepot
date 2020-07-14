module.exports = {
    databasekpos: leerConexionkpos(),
    databasedwh: leerConexiondwh(),
    databasevoficiname: leerConexionvoficiname()
};

function leerConexionkpos() {
    const editJsonFile = require("edit-json-file");
    let file = editJsonFile(`${__dirname}/conexion.json`);
    var coneObj = {
        host: file.toObject().kpos.ip,
        user: file.toObject().kpos.usuario,
        password: file.toObject().kpos.contrasena,
        database: file.toObject().kpos.baseDatos,
        connectionLimit: 1000,
        connectTimeout: 60 * 10 * 1000,
        acquireTimeout: 60 * 10 * 1000,
        timeout: 60 * 10 * 1000,
    };
    return coneObj;
}

function leerConexiondwh() {
    const editJsonFile = require("edit-json-file");
    let file = editJsonFile(`${__dirname}/conexion.json`);
    var coneObj = {
        host: file.toObject().dwh.ip,
        user: file.toObject().dwh.usuario,
        password: file.toObject().dwh.contrasena,
        database: file.toObject().dwh.baseDatos,
        connectionLimit: 1000,
        connectTimeout: 60 * 10 * 1000,
        acquireTimeout: 60 * 10 * 1000,
        timeout: 60 * 10 * 1000,
    };
    return coneObj;
}

function leerConexionvoficiname() {
    const editJsonFile = require("edit-json-file");
    let file = editJsonFile(`${__dirname}/conexion.json`);
    var coneObj = {
        host: file.toObject().voficiname.ip,
        user: file.toObject().voficiname.usuario,
        password: file.toObject().voficiname.contrasena,
        database: file.toObject().voficiname.baseDatos,
        connectionLimit: 1000,
        connectTimeout: 60 * 10 * 1000,
        acquireTimeout: 60 * 10 * 1000,
        timeout: 60 * 10 * 1000,
    };
    return coneObj;
}