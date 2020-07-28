module.exports.getpventas=`select nombre from pventas where 
id_empresa='AMERCADEO' and nombre like '%HOME DEPOT%' group by nombre`;

module.exports.getinfopventa=`select TOP 1 plaza, tipo tipomaq, ruta, pventa from pventas 
where id_empresa='AMERCADEO' and nombre like ('%?%')
order by fecha_cierre desc`;

module.exports.guardareporte=`INSERT INTO reporteservicio(fechatomarep,atendio,quienreporta,
    ruta,tipomaq,anomalia,pventa,nombre,serie,aquienreporta,medio,puesto,
    observaciones,estatus,tiporeporta,reporto, telefono,fechaterminoreporte, plaza,fechareptecnico,fechalibera, 
    Libero,observaciones2)
    VALUES (GETDATE(),'CALLCENTER','whoreports','route','machinetype',18,npos,'pointofsale',
    0,'whoreceive','CALLCENTER','VENDING',
    'observations',
    'REPORTADO','usertype','CALLCENTER','telephone',getdate(),'place','','','','');`

module.exports.getplaza=`select sucursal plaza from Sucursales where id=?`

module.exports.getreportes=`SELECT folio, (pventa+' - '+nombre) puntoventa, 
CONVERT(VARCHAR(10), fechatomarep, 103) AS [fechatomarep], telefono,quienreporta,estatus,observaciones2 
FROM reporteservicio WHERE atendio='CALLCENTER' AND nombre LIKE '%HOME DEPOT%'
AND anomalia=18 AND fechatomarep BETWEEN 'fecha1' AND 'fecha2' 
and estatus<>'LIBERADO' ORDER BY folio DESC`

module.exports.updateregistro=`UPDATE reporteservicio set estatus='nuevoestatus', 
observaciones2='observations', fechalibera=GETDATE(), libero='CALLCENTER' WHERE folio=serial`