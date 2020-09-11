const poolkpos = require('../cnn/databasekpos');
const pooldwh = require('../cnn/databasedwh');
const poolvoficiname = require('../cnn/databasevoficiname');
const queries = require('../queries/capturareportes');

module.exports.getpventas=async(tiporeporte)=>{
    let arraypventas=[]
    let pventas={}

    if(tiporeporte==="Vending"){
        pventas= await (await poolvoficiname).query(queries.getpventas)
    }
    else if(tiporeporte==="Kiosko"){
        pventas= await (await poolvoficiname).query(queries.getpventasksnacks)
    }
    for (var i = 0; i < pventas.recordset.length; i++) {
        arraypventas.push(pventas.recordset[i]);
        arraypventas[i].nombre=arraypventas[i].nombre.trim()
    }
    return arraypventas
}

module.exports.getplazatipomaq=async(nombrepventa,nopventa,tiporeporte)=>{
    /* console.log(nombrepventa) */
    if(nombrepventa){
        let nombrepuntoventa=''
        if(tiporeporte==='Vending'){
            nombrepuntoventa=nombrepventa.replace(/\s+/g,' ').replace('HOME DEPOT','').trim()
        }
        else if(tiporeporte==='Kiosko'){
            nombrepuntoventa=nombrepventa.replace(/\s+/g,' ').trim()
        }
        let consulta=queries.getinfopventa
        .replace('?',nombrepuntoventa)
        .replace('nopventa',nopventa)
        let infopventa=await(await poolvoficiname).query(consulta)
        //console.log(consulta)
        let idplaza=infopventa.recordset[0].plaza
        infopventa.recordset[0].plaza=await(await poolkpos).query(queries.getplaza.replace('?',idplaza))
        infopventa.recordset[0].plaza=infopventa.recordset[0].plaza.recordset[0].plaza.trim()
        infopventa.recordset[0].tipomaq=infopventa.recordset[0].tipomaq.trim()
        infopventa.recordset[0].pventa=infopventa.recordset[0].pventa.trim()
        //console.log(infopventa)
        return infopventa
    }
    else{return false}
}

module.exports.getanomalias=async()=>{
    let anomalias=await(await poolkpos).query(queries.getanomalias)
    return anomalias.recordset
}

module.exports.guardareporte=async(reporte)=>{
    if (reporte.tiporeporta=='SELECCIONAR'){
        reporte.tiporeporta=''
    }
    if (reporte.quienreporta=='' || reporte.tipomaq=='' || reporte.npventa=='' || reporte.pventa=='' ||
        reporte.aquienreporta=='' || reporte.observaciones=='' || reporte.tiporeporta=='' ||
        reporte.plaza=='') {
        //console.log(reporte)
        return false
    }
    else{
        let anomalia=0
        if(reporte.anomalia){
            anomalia=reporte.anomalia
        }
        else{
            anomalia=18
        }
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
        .replace('idanomalia',anomalia)
        //console.log(reporte)
        let guardareporte=await(await pooldwh).query(report)
        //console.log(report)
        return true
    }
}

module.exports.getreportes=async(params)=>{
    let reportes=""
    let result={}
    result.reportes=[]
    if(params.tiporeportes==='Kiosko'){
        reportes=queries.getreportesksnacks
        .replace('fecha1',params.fecha1)
        .replace('fecha2',params.fecha2)
    }
    else if(params.tiporeportes==='Vending'){
        reportes=queries.getreportes
        .replace('fecha1',params.fecha1)
        .replace('fecha2',params.fecha2)
    }
    /* console.log(reportes) */
    let getreport=await(await pooldwh).query(reportes)
    if(params.tiporeportes==='Kiosko'){
        for (let i = 0; i < getreport.recordset.length; i++) {
            if(getreport.recordset[i].observaciones.split("-")[0]=="SISTEMAS"||getreport.recordset[i].observaciones.split("-")[0]=="MANTENIMIENTO"){
                //console.log("Reportes que entran en el if de split")
                getreport.recordset.splice(i,1)
            }
            else{
                getreport.recordset[i].puntoventa=getreport.recordset[i].puntoventa.trim()
                result.reportes.push(getreport.recordset[i])
            }
        }
    }
    else{
        for (let i = 0; i < getreport.recordset.length; i++) {
            getreport.recordset[i].puntoventa=getreport.recordset[i].puntoventa.trim()
            result.reportes.push(getreport.recordset[i])
        }
    }
    result.tipo=params.tiporeportes
    return result
}

module.exports.updateregistro=async(reporte)=>{

    if(reporte.tiporeporte==="Vending"){
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
    else if(reporte.tiporeporte==="Kiosko"){
        let departamento=reporte.departamento
        let observaciones=departamento+"-"+reporte.observaciones
        let updatereportek=queries.updateregistrokiosko
        .replace('serial',reporte.folio)
        .replace('nuevasobservaciones',observaciones)
        let actualizareport=await(await pooldwh).query(updatereportek)
        return true
    }
}

module.exports.getreportefolio=async(folio)=>{
    let queryreporte=queries.getreportefolio.replace('nofolio',folio.folio)
    if(folio.tiporeporte=="Vending"){
        queryreporte=queryreporte.replace('not','').replace('observaciones','observaciones2')
    }
    let reporte=await(await pooldwh).query(queryreporte)
    if(reporte.recordset[0]){
        let rep=reporte.recordset[0]
        rep.tiporeporte=folio.tiporeporte
        let depto=rep.observaciones.split("-")[0]
        if(depto){
            return depto
        }
        else{
            return rep
        }
    }
    else{
        return false
    }
}