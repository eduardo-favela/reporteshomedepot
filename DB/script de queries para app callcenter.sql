SELECT * FROM reporteservicio where atendio='CALLCENTER' and nombre like '%HOME DEPOT%'
and anomalia=18 and fechatomarep between '2020-01-01' and GETDATE() order by folio desc

INSERT INTO reporteservicio(fechatomarep,atendio,quienreporta,
ruta,tipomaq,anomalia,pventa,nombre,serie,aquienreporta,medio,puesto,
observaciones,estatus,tiporeporta,reporto, telefono,fechaterminoreporte, plaza,fechareptecnico,fechalibera, 
Libero,observaciones2)
VALUES (GETDATE(),'CALLCENTER','JOSE ESCOBAR','671','SK',18,9531,'HOME DEPOT LOMAS VERDESCP SK',
0,'EDUARDO FAVELA','CORREO','VENDING',
'LA MAQUINA NO DIO PRODUCTO Y NO MARCA CREDITO AL 
INGRESAR MONEDAS TEL: 5522572099LA MAQUINA NO DIO PRODUCTO Y NO MARCA CREDITO AL INGRESAR MONEDAS TEL: 5522572099',
'REPORTADO','Usuario Externo','CALLCENTER','',getdate(),'MEXICO-NORTE','','','','');

/*OBTENER LOS PUNTOS DE VENTA DE VENDING EN BASE DE DATOS VOFICINAME*/
/*select * from pventas where id_empresa='AMERCADEO' and nombre like '%HOME DEPOT%' and estatus='normal' and pventa=8140*/

/*OBTENER DEFINICION DE ANOMALIAS BD KPOS*/
/*SELECT * FROM TipoAnomalia*/

/*OBTENER LAS PLAZAS DE LOS PVENTA DE VENDING BD KPOS*/
/*select sucursal plaza from Sucursales where id=59*/

/*anomalia 
atendio 
estatus 
fechalibera 
fechaterminoreporte 
fechatomarep 
folio 
observaciones 
observaciones2 
plaza 
pventa 
quienreporta 
tipomaq*/

delete reporteservicio where folio in (198462)

update reporteservicio set plaza='LEON' where folio=198459