module.exports = {
    databasekpos: leerConexionkpos(),
    databasedwh: leerConexiondwh(),
    databasevoficiname: leerConexionvoficiname()
};

function leerConexionkpos() {
    const editJsonFile = require("edit-json-file");
    let file = editJsonFile(`${__dirname}/conexion.json`);
    var coneObj = {
        server: file.toObject().kpos.ip,
        user: file.toObject().kpos.usuario,
        password: file.toObject().kpos.contrasena,
        database: file.toObject().kpos.baseDatos,
        encrypt:false,
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        }
    };
    return coneObj;
}

function leerConexiondwh() {
    const editJsonFile = require("edit-json-file");
    let file = editJsonFile(`${__dirname}/conexion.json`);
    var coneObj = {
        server: file.toObject().dwh.ip,
        user: file.toObject().dwh.usuario,
        password: file.toObject().dwh.contrasena,
        database: file.toObject().dwh.baseDatos,
        encrypt:false,
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        }
    };
    return coneObj;
}

function leerConexionvoficiname() {
    const editJsonFile = require("edit-json-file");
    let file = editJsonFile(`${__dirname}/conexion.json`);
    var coneObj = {
        server: file.toObject().voficiname.ip,
        user: file.toObject().voficiname.usuario,
        password: file.toObject().voficiname.contrasena,
        database: file.toObject().voficiname.baseDatos,
        encrypt:false,
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        }
    };
    return coneObj;
}