SELECT COUNT(*) FROM
ventas INNER JOIN turnos ON turnos.folio=ventas.FolioTurno
WHERE pventa=2150 AND fecha BETWEEN '2020-04-22 00:00:00.000' AND '2020-05-17 00:00:00.000'

EXEC CargaTurnoConVentaCero_uUp 2213, '2020-06-02', 1, 0

EXEC CargaTurnoConVentaCero_uUp 2213, '2020-06-02', 2, 0

SELECT * FROM turnos WHERE pventa=2266 ORDER BY fecha DESC

SELECT * FROM ventas WHERE folioturno='69991B87-72EF-4C21-8DA9-2FDDE199C9D6' ORDER BY id_venta DESC

SELECT MAX(ID_VENTA)
FROM turnos tr
JOIN Ventas vt
ON TR.Folio = vt.FolioTurno
WHERE TR.PVenta = 2234
AND
TR.Fecha > '2020-02-29'

INSERT INTO deposito_turno_e
SELECT NEWID(), folio, NULL, 0,0,0,fecha,getdate(),0,0,0,0,NULL,1,0,1
FROM turnos

/*DBCC CHECKIDENT (ventas, RESEED, 355926)*/


SELECT * FROM TransfPVenta WHERE PVenta_Ori=2125 AND pventa_dest=4650 ORDER BY Fec_Envio DESC