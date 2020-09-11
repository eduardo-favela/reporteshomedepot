SELECT * FROM reporteservicio WHERE atendio='CALLCENTER' AND nombre LIKE '%HOME DEPOT%'
AND anomalia=18 AND fechatomarep BETWEEN '2019-01-01' AND getdate() ORDER BY folio DESC


SELECT folio, (pventa+' - '+nombre) puntoventa, 
CONVERT(VARCHAR(10), fechatomarep, 103) AS [fechatomarep], telefono,quienreporta,estatus,observaciones
FROM reporteservicio WHERE folio=198901 AND tipomaq NOT  IN ('SK','Sk','RF','Rf','RFS','Rfs','RFs','rf','rfs','sk') ORDER BY folio DESC

/*kiosko 198899*/

/*prueba kpos 198900
198901*/

/*home depot 198892*/

SELECT * FROM reporteservicio WHERE fechatomarep BETWEEN '2020-08-01' AND getdate() ORDER BY folio DESC


SELECT * FROM (SELECT (RTRIM(LTRIM(pventa))+'_'+nombre) nombre FROM pventas WHERE
id_empresa='AMERCADEO' AND nombre LIKE '%HOME DEPOT%') a GROUP BY nombre



SELECT folio, (pventa+' - '+nombre) puntoventa, fechatomarep, telefono,quienreporta,estatus,observaciones2 
FROM reporteservicio WHERE atendio='CALLCENTER' AND nombre LIKE '%HOME DEPOT%'
AND anomalia=18 AND fechatomarep BETWEEN 'estatus<>'LIBERADO' ORDER BY folio DESC2020-01-01' AND '2020-07-27' AND estatus<>'LIBERADO' ORDER BY folio DESC

UPDATE reporteservicio SET fechaterminoreporte='2020-07-23' WHERE folio=198463

INSERT INTO reporteservicio(fechatomarep,atendio,quienreporta,
ruta,tipomaq,anomalia,pventa,nombre,serie,aquienreporta,medio,puesto,
observaciones,estatus,tiporeporta,reporto, telefono,fechaterminoreporte, plaza,fechareptecnico,fechalibera, 
Libero,observaciones2)
VALUES (GETDATE(),'CALLCENTER','JOSE ESCOBAR','671','SK',18,9531,'HOME DEPOT LOMAS VERDESCP SK',
0,'EDUARDO FAVELA','CORREO','VENDING',
'LA MAQUINA NO DIO PRODUCTO Y NO MARCA CREDITO AL 
INGRESAR MONEDAS TEL: 5522572099LA MAQUINA NO DIO PRODUCTO Y NO MARCA CREDITO AL INGRESAR MONEDAS TEL: 5522572099',
'REPORTADO','Usuario Externo','CALLCENTER','',getdate(),'MEXICO-NORTE','','','','');

SELECT (RTRIM(LTRIM(pventa))+'-'+nombre) nombre FROM pventas WHERE
id_empresa='AMERCADEO' AND nombre LIKE '%HOME DEPOT%'

SELECT TOP 1 plaza, tipo tipomaq, ruta, pventa FROM pventas 
WHERE id_empresa='AMERCADEO' AND nombre LIKE ('%?%') AND pventa=
ORDER BY fecha_cierre DESC

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

/*DELETE reporteservicio WHERE folio IN (198848)*/

/*UPDATE reporteservicio SET observaciones='YA TIENE UNA SEMANA QUE ESTA HACIENDO UN RUIDO MUY FEO LA LLELERA' WHERE folio=198901*/


SELECT * FROM reporteservicio WHERE folio=198848