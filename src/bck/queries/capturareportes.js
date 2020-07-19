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