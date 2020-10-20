select * from turnos where pventa=2091 order by fecha desc

SELECT MAX(id_venta) FROM turnos tr 
JOIN ventas vt ON tr.Folio = vt.FolioTurno 
WHERE tr.PVenta = 2091 and tr.Fecha > '2018/01/01'

			 
select * from ventas where folioturno='F2CC1578-44E5-4B23-8CC5-B2B3FE1B541A' order by Id_Venta desc

update ventas set id_venta=((select MAX(Id_Venta) from ventas where folioturno='F2CC1578-44E5-4B23-8CC5-B2B3FE1B541A')+1)
where folioturno='F2CC1578-44E5-4B23-8CC5-B2B3FE1B541A' 
and folio='E68688B0-8D6D-406D-AEBA-27BE6FBA7DA4'

update VentasDet set id_Venta=((select MAX(Id_Venta) from ventas where folioturno='F2CC1578-44E5-4B23-8CC5-B2B3FE1B541A')+1)
where folio='E68688B0-8D6D-406D-AEBA-27BE6FBA7DA4'

select * from VentasDet where folio='E68688B0-8D6D-406D-AEBA-27BE6FBA7DA4'

/*226145*/

/*--------------------------------------INTENTO NÚMERO 2--------------------------------------------*/

/*Id de venta de la venta con menor número en el turno*/
select top 1 Id_Venta from ventas where folioturno='F2CC1578-44E5-4B23-8CC5-B2B3FE1B541A' order by id_venta


/*Folio de la venta con menor número en el turno*/
select top 1 Folio from ventas where folioturno='F2CC1578-44E5-4B23-8CC5-B2B3FE1B541A' order by id_venta

/*Actualizar venta*/
update ventas set id_venta=((select MAX(Id_Venta) from ventas where folioturno='F2CC1578-44E5-4B23-8CC5-B2B3FE1B541A')+1)
where folioturno='F2CC1578-44E5-4B23-8CC5-B2B3FE1B541A' 
and folio=(select top 1 Folio from ventas where folioturno='F2CC1578-44E5-4B23-8CC5-B2B3FE1B541A' order by id_venta) 

/*Actualizar ventasdet*/
update VentasDet set id_venta=(select top 1 id_Venta from ventas 
where folioturno='F2CC1578-44E5-4B23-8CC5-B2B3FE1B541A' order by id_venta desc) where folio=(select top 1 Folio from ventas 
where folioturno='F2CC1578-44E5-4B23-8CC5-B2B3FE1B541A' order by id_venta desc)

select * from VentasDet where folio=(select top 1 Folio from ventas 
where folioturno='F2CC1578-44E5-4B23-8CC5-B2B3FE1B541A' order by id_venta desc)

select * from ventas where folioturno='F2CC1578-44E5-4B23-8CC5-B2B3FE1B541A' order by Id_Venta desc

select * from turnos where pventa=2091 order by fecha desc

select * from ventas where FolioTurno='69D514B8-E9B4-4700-94D6-1BAB62C0B05E' order by Id_Venta desc

select id_venta, fecha from ventas
inner join turnos on ventas.folioturno=turnos.Folio
where PVenta=2091 and turnos.fecha between '2020-09-19' and '2020-09-26' order by id_venta desc