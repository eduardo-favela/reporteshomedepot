SELECT * FROM reporteservicio WHERE atendio='CALLCENTER' AND nombre LIKE '%HOME DEPOT%'
AND anomalia=18 AND fechatomarep BETWEEN '2019-01-01' AND getdate() ORDER BY folio DESC

select * from (SELECT (RTRIM(LTRIM(pventa))+'_'+nombre) nombre from pventas where
id_empresa='AMERCADEO') a group by nombre

SELECT folio, (pventa+' - '+nombre) puntoventa, 
CONVERT(VARCHAR(10), fechatomarep, 103) AS [fechatomarep], telefono,quienreporta,estatus,observaciones
FROM reporteservicio WHERE tipomaq not IN ('SK','Sk','RF','Rf','RFS','Rfs','RFs','rf','rfs','sk')
ORDER BY folio DESC



/*199172*/

/*kiosko 198899*/

/*prueba kpos 198900
198901*/

/*home depot 198892*/

SELECT * FROM reporteservicio ORDER BY folio DESC

/*199036*/

select depto from (SELECT SUBSTRING(reporteservicio.observaciones,0,CHARINDEX('&',reporteservicio.observaciones,0)) as depto
FROM reporteservicio
where fechatomarep between '2020-09-01' and '2020-10-01') a where depto <> '' group by depto

SELECT folio, (pventa+' - '+nombre) puntoventa,
CONVERT(VARCHAR(10), fechatomarep, 103) AS [fechatomarep], telefono,quienreporta,estatus,
SUBSTRING(reporteservicio.observaciones,CHARINDEX('&',reporteservicio.observaciones)+1, 
len(reporteservicio.observaciones)) observaciones
from reporteservicio where fechatomarep between'2020-10-10' and '2020-10-10' and
SUBSTRING(reporteservicio.observaciones,0,CHARINDEX('&',reporteservicio.observaciones,0))='SISTEMAS'

select * from reporteservicio where folio in (199104,199106,199116)

update reporteservicio set observaciones='OTRO&ES PARA INFORMAR QUE  SE PRODUJO UN INCENDIO,  SE ESCUCHO TRONIDO Y SALIERON LLAMAS SE USO EXTINTORES Y BAJARON LOS BREAK DE LA ISLA LA CUAL NO NOS DEJARAN TRABAJAR HASTA QUE VENGA ALGUIEN Y CHEQUE EL DETALLE.'
where folio=199116

SELECT * FROM (SELECT (RTRIM(LTRIM(pventa))+'_'+nombre) nombre FROM pventas WHERE
id_empresa='AMERCADEO' AND nombre LIKE '%HOME DEPOT%') a GROUP BY nombre



SELECT folio, (pventa+' - '+nombre) puntoventa, fechatomarep, telefono,quienreporta,estatus,observaciones2 
FROM reporteservicio WHERE atendio='CALLCENTER' AND nombre LIKE '%HOME DEPOT%'
AND anomalia=18 AND fechatomarep BETWEEN 'estatus<>'LIBERADO' ORDER BY folio DESC2020-01-01' AND '2020-07-27' AND estatus<>'LIBERADO' ORDER BY folio DESC

/*UPDATE reporteservicio SET fechaterminoreporte='2020-07-23' WHERE folio=198463*/

/*INSERT INTO reporteservicio(fechatomarep,atendio,quienreporta,
ruta,tipomaq,anomalia,pventa,nombre,serie,aquienreporta,medio,puesto,
observaciones,estatus,tiporeporta,reporto, telefono,fechaterminoreporte, plaza,fechareptecnico,fechalibera, 
Libero,observaciones2)
VALUES (GETDATE(),'CALLCENTER','JOSE ESCOBAR','671','SK',18,9531,'HOME DEPOT LOMAS VERDESCP SK',
0,'EDUARDO FAVELA','CORREO','VENDING',
'LA MAQUINA NO DIO PRODUCTO Y NO MARCA CREDITO AL 
INGRESAR MONEDAS TEL: 5522572099LA MAQUINA NO DIO PRODUCTO Y NO MARCA CREDITO AL INGRESAR MONEDAS TEL: 5522572099',
'REPORTADO','Usuario Externo','CALLCENTER','',getdate(),'MEXICO-NORTE','','','','');*/

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

/*DELETE reporteservicio WHERE folio IN (198900)*/

/*UPDATE reporteservicio SET observaciones='YA TIENE UNA SEMANA QUE ESTA HACIENDO UN RUIDO MUY FEO LA LLELERA' WHERE folio=198901*/


SELECT * FROM reporteservicio WHERE folio=199135

select * from reporteservicio where observaciones like('%SELECCIONAR%') and estatus <> 'LIBERADO' and fechatomarep>'2020-01-01'

update reporteservicio set observaciones=(select replace(observaciones,'-','&') 
from reporteservicio where folio=199116) where folio=199116

update reporteservicio set observaciones='SISTEMAS&NO FUNCIONA EL DETECTOR DE HUELLA' where folio=199135