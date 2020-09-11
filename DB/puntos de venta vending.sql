SELECT * FROM pventas WHERE id_empresa='KSNACKS';

SELECT * FROM (SELECT (RTRIM(LTRIM(pventa))+'-'+nombre) nombre FROM pventas WHERE
id_empresa='KSNACKS') a GROUP BY nombre

/*and pventa=9531 
order by fecha_cierre desc and estatus='normal'*/

SELECT pventa FROM pventas WHERE 
id_empresa='AMERCADEO' AND nombre LIKE '%HOME DEPOT%' GROUP BY pventa

SELECT TOP 1 plaza, tipo tipomaq, ruta FROM pventas 
WHERE id_empresa='AMERCADEO' AND nombre LIKE ('%'+'%HOME DEPOT SAN LUIS CP Sk'+'%')
ORDER BY fecha_cierre DESC

SELECT TOP 1 plaza, tipo tipomaq, ruta FROM pventas 
WHERE id_empresa='AMERCADEO' AND nombre LIKE ('%'+?+'%')
ORDER BY fecha_cierre DESC

SELECT TOP 1 * FROM pventas WHERE id_empresa='AMERCADEO' AND
nombre LIKE ('%SAN LUIS%')
ORDER BY fecha_cierre DESC

SELECT pventa FROM pventas 
WHERE fecha_cierre='1900-01-01 00:00:00:000'
AND id_empresa='AMERCADEO' AND fechacap LIKE ('%2020%')
ORDER BY fecha_cierre DESC

UPDATE pventas SET fecha_cierre=GETDATE() WHERE pventa IN (SELECT pventa FROM pventas 
WHERE fecha_cierre='1900-01-01 00:00:00:000'
AND id_empresa='AMERCADEO' AND fechacap LIKE ('%2020%'))

SELECT TOP 1 plaza, tipo tipomaq, ruta,pventa FROM pventas
WHERE id_empresa='AMERCADEO' AND nombre LIKE ('%HOME DEPOT ACAPULCO DIAMANTE CP RF%')
ORDER BY fecha_cierre DESC

SELECT * FROM (SELECT (RTRIM(LTRIM(pventa))+'-'+nombre) nombre FROM pventas WHERE
id_empresa='AMERCADEO' AND nombre LIKE '%HOME DEPOT%') a GROUP BY nombre

SELECT TOP 1 plaza, tipo tipomaq, ruta, pventa FROM pventas 
WHERE id_empresa='AMERCADEO' AND nombre LIKE '%HOME DEPOT LOMAS VERDES CP RFS%' AND pventa=15234
ORDER BY fecha_cierre DESC

10056-HOME DEPOT LOMAS VERDES CP RFS

SELECT * FROM transfpventa WHERE pventa_ori=2401 AND pventa_dest=2228 ORDER BY fec_envio DESC

/*nombre like '%HOME DEPOT%'

2401 2228

/*8139        HOME DEPOT SAN LUIS CP Sk

HOME DEPOT  SENDERO PASILLO Sk
HOME DEPOT ALFREDO DEL MAZO PASILLO SK*/



