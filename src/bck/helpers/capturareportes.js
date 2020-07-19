const poolkpos = require('../cnn/databasekpos');
const pooldwh = require('../cnn/databasedwh');
const poolvoficiname = require('../cnn/databasevoficiname');
const queries = require('../queries/capturareportes');

module.exports.getpventas=async()=>{
    let arraypventas=[]
    const pventas= await (await poolvoficiname).query(queries.getpventas)
    for (var i = 0; i < pventas.recordset.length; i++) {
        arraypventas.push(pventas.recordset[i]);
    }
    return arraypventas;
}

module.exports.getplazatipomaq=async(nombrepventa)=>{
    //console.log(nombrepventa)
    let nombrepuntoventa=nombrepventa.replace(/\s+/g,' ').replace('HOME DEPOT','').trim()
    let infopventa=await(await poolvoficiname).query(queries.getinfopventa.replace('?',nombrepuntoventa))
    let idplaza=infopventa.recordset[0].plaza
    infopventa.recordset[0].plaza=await(await poolkpos).query(queries.getplaza.replace('?',idplaza))
    //console.log(queries.getinfopventa.replace('?',nombrepuntoventa))
    //infopventa.recordset[0].plaza=infopventa.recordset[0].plaza.trim()
    infopventa.recordset[0].plaza=infopventa.recordset[0].plaza.recordset[0].plaza.trim()
    infopventa.recordset[0].tipomaq=infopventa.recordset[0].tipomaq.trim()
    infopventa.recordset[0].pventa=infopventa.recordset[0].pventa.trim()
    return infopventa
}

module.exports.guardareporte=async(reporte)=>{
    if (reporte.tiporeporta=='SELECCIONAR'){
        reporte.tiporeporta=''
    }
    if (reporte.quienreporta=='' || reporte.ruta=='' || reporte.tipomaq=='' || reporte.npventa=='' || reporte.pventa=='' || reporte.aquienreporta=='' || reporte.observaciones=='' || reporte.tiporeporta=='' || reporte.telefono=='' || reporte.plaza=='') {
        return false
    }
    else{
        let report=queries.guardareporte
        .replace('whoreports',reporte.quienreporta)
        .replace('route',reporte.ruta)
        .replace('machinetype',reporte.tipomaq)
        .replace('npos',reporte.npventa)
        .replace('pointofsale',reporte.pventa)
        .replace('whoreceive',reporte.aquienreporta)
        .replace('observations',reporte.observaciones)
        .replace('usertype',reporte.tiporeporta)
        .replace('telephone',reporte.telefono)
        .replace('place',reporte.plaza)
        console.log(reporte)
        let guardareporte=await(await pooldwh).query(report)
        return true
    }
}