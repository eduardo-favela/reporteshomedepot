const poolkpos = require('../cnn/databasekpos');
const pooldwh = require('../cnn/databasedwh');
const poolvoficiname = require('../cnn/databasevoficiname');
const queries = require('../querys/capturareportes');
const poolkpos = require('../cnn/databasekpos');

module.exports.getpventas=async()=>{
    let arraypventas=[]
    const pventas= await poolkpos.query(queries.getpventas)
    for (var i = 0; i < pventas.length; i++) {
        arraypventas.push(pventas[i].nombre);
    }
    console.log("puntos de venta vending: ",pventas)
    return arraypventas;
}