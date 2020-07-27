select COUNT(*) from
ventas inner join turnos on turnos.folio=ventas.FolioTurno
where pventa=2150 and fecha BETWEEN '2020-04-22 00:00:00.000' and '2020-05-17 00:00:00.000'

exec CargaTurnoConVentaCero_uUp 2213, '2020-06-02', 1, 0

exec CargaTurnoConVentaCero_uUp 2213, '2020-06-02', 2, 0

select * from turnos where pventa=2076 order by fecha desc

select * from ventas where folioturno='69991B87-72EF-4C21-8DA9-2FDDE199C9D6' order by id_venta desc

SELECT MAX(ID_VENTA)
FROM turnos tr
JOIN Ventas vt
ON TR.Folio = vt.FolioTurno
WHERE TR.PVenta = 2095
AND
TR.Fecha > '2020-02-29'

INSERT INTO deposito_turno_e
SELECT NEWID(), folio, null, 0,0,0,fecha,getdate(),0,0,0,0,null,1,0,1
FROM turnos

/*DBCC CHECKIDENT (ventas, RESEED, 316730)*/


select * from TransfPVenta where PVenta_Ori=2125 and pventa_dest=4650 order by Fec_Envio desc