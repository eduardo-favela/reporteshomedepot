module.exports.getpventas=`select * from (SELECT (RTRIM(LTRIM(pventa))+'_'+nombre) nombre from pventas where
id_empresa='AMERCADEO' and nombre like '%HOME DEPOT%') a group by nombre`;


module.exports.getpventasksnacks=`select * from (SELECT (RTRIM(LTRIM(pventa))+'_'+nombre) 
nombre from pventas where
id_empresa='KSNACKS') a group by nombre`;


module.exports.getinfopventa=`select TOP 1 plaza, tipo tipomaq, ruta, pventa from pventas 
where nombre like ('%?%') and pventa=nopventa
order by fecha_cierre desc`;

module.exports.guardareporte=`INSERT INTO reporteservicio(fechatomarep,atendio,quienreporta,
    ruta,tipomaq,anomalia,pventa,nombre,serie,aquienreporta,medio,puesto,
    observaciones,estatus,tiporeporta,reporto, telefono,fechaterminoreporte, plaza,fechareptecnico,fechalibera, 
    Libero,observaciones2)
    VALUES (GETDATE(),'CALLCENTER','whoreports','route','machinetype',idanomalia,npos,'pointofsale',
    0,'whoreceive','CALLCENTER','CALLCENTER',
    'observations',
    'REPORTADO','usertype','CALLCENTER','telephone','','place','','','','');`

module.exports.getplaza=`select sucursal plaza from Sucursales where id=?`

module.exports.getreportes=`SELECT folio, (pventa+' - '+nombre) puntoventa, 
CONVERT(VARCHAR(10), fechatomarep, 103) AS [fechatomarep], telefono,quienreporta,estatus,observaciones2 
FROM reporteservicio WHERE atendio='CALLCENTER' AND nombre LIKE '%HOME DEPOT%'
AND anomalia=18 AND fechatomarep BETWEEN 'fecha1' AND 'fecha2'
and estatus<>'LIBERADO' ORDER BY folio DESC`

module.exports.getreportesksnacks=`SELECT folio, (pventa+' - '+nombre) puntoventa,
CONVERT(VARCHAR(10), fechatomarep, 103) AS [fechatomarep], telefono,quienreporta,estatus,observaciones
FROM reporteservicio WHERE fechatomarep BETWEEN 'fecha1' AND 'fecha2'
and tipomaq not in ('SK','Sk','RF','Rf','RFS','Rfs','RFs','rf','rfs','sk')
and estatus<>'LIBERADO' ORDER BY folio DESC`

module.exports.updateregistro=`UPDATE reporteservicio set estatus='nuevoestatus', 
observaciones2='observations', fechaterminoreporte=GETDATE(), fechalibera=GETDATE(),
libero='CALLCENTER' WHERE folio=serial`

module.exports.updateregistropend=`UPDATE reporteservicio set fechareptecnico=GETDATE(), estatus='nuevoestatus'
WHERE folio=serial`

module.exports.getanomalias=`SELECT Id_Cve_Anomalia as id, Desc_Anomalia as anomalia
FROM TipoAnomalia where Tipo_PtoVta=2`

module.exports.getreportefolio=`SELECT folio, (pventa+' - '+nombre) puntoventa, 
CONVERT(VARCHAR(10), fechatomarep, 103) AS [fechatomarep], telefono,quienreporta,estatus,observaciones
FROM reporteservicio WHERE folio=nofolio and tipomaq 
not in ('SK','Sk','RF','Rf','RFS','Rfs','RFs','rf','rfs','sk')`

module.exports.updateregistrokiosko=`UPDATE reporteservicio set fechareptecnico=GETDATE(), 
observaciones='nuevasobservaciones'
WHERE folio=serial`