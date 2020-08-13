const poolkpos = require('../cnn/databasekpos');
const pooldwh = require('../cnn/databasedwh');
const poolvoficiname = require('../cnn/databasevoficiname');
const queries = require('../queries/capturareportes');

module.exports.getpventas=async()=>{
    let arraypventas=[]
    const pventas= await (await poolvoficiname).query(queries.getpventas)
    for (var i = 0; i < pventas.recordset.length; i++) {
        arraypventas.push(pventas.recordset[i]);
        arraypventas[i].nombre=arraypventas[i].nombre.trim()
    }
    return arraypventas
}

module.exports.getplazatipomaq=async(nombrepventa,nopventa)=>{
    //console.log(nombrepventa)
    let nombrepuntoventa=nombrepventa.replace(/\s+/g,' ').replace('HOME DEPOT','').trim()
    let infopventa=await(await poolvoficiname).query(queries.getinfopventa
        .replace('?',nombrepuntoventa)
        .replace('nopventa',nopventa))
    let idplaza=infopventa.recordset[0].plaza
    infopventa.recordset[0].plaza=await(await poolkpos).query(queries.getplaza.replace('?',idplaza))
    infopventa.recordset[0].plaza=infopventa.recordset[0].plaza.recordset[0].plaza.trim()
    infopventa.recordset[0].tipomaq=infopventa.recordset[0].tipomaq.trim()
    infopventa.recordset[0].pventa=infopventa.recordset[0].pventa.trim()
    //console.log(infopventa)
    return infopventa
}

module.exports.guardareporte=async(reporte)=>{
    if (reporte.tiporeporta=='SELECCIONAR'){
        reporte.tiporeporta=''
    }
    if (reporte.quienreporta=='' || reporte.tipomaq=='' || reporte.npventa=='' || reporte.pventa=='' || reporte.aquienreporta=='' || reporte.observaciones=='' || reporte.tiporeporta=='' || reporte.plaza=='') {
        //console.log(reporte)
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
        //console.log(reporte)
        let guardareporte=await(await pooldwh).query(report)
        //console.log(report)
        return true
    }
}

module.exports.getreportes=async(fechas)=>{
    let reportes=queries.getreportes
    .replace('fecha1',fechas.fecha1)
    .replace('fecha2',fechas.fecha2)
    /* console.log(reportes) */
    let getreport=await(await pooldwh).query(reportes)
    for (let i = 0; i < getreport.recordset.length; i++) {
        getreport.recordset[i].puntoventa=getreport.recordset[i].puntoventa.trim()
    }
    return getreport.recordset
}

module.exports.updateregistro=async(reporte)=>{
    if(reporte.estatus==="LIBERADO"){
        let updatereporte=queries.updateregistro
        .replace('nuevoestatus',reporte.estatus)
        .replace('observations',reporte.observaciones2)
        .replace('serial',reporte.folio)
        let actualizareporte=await(await pooldwh).query(updatereporte)
        return true
    }
    else if(reporte.estatus==="PENDIENTE"){
        let updatereportepend=queries.updateregistropend
        .replace('nuevoestatus',reporte.estatus)
        .replace('serial',reporte.folio)
        let actualizareportepend=await(await pooldwh).query(updatereportepend)
        return true
    }
}