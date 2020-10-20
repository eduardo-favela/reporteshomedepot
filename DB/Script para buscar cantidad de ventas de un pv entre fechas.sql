select /*Id_Venta,Fum,Turno*/count(*) total_ventas_desde_ultimo_recibo_de_gel from ventas 
inner join turnos on ventas.FolioTurno=turnos.folio
where pventa=2114 and 
fecha between (select CONVERT(date, i.fecharecibo, 111) fecha_recibo from (select TOP 1 Embarques.Fec_Recibo fecharecibo, 
Embarques.PVenta puntoventa, 
Embarques.Fec_Remision fecharemision from Embarques 
inner join MovInvent as mi on mi.Folio_Central=Embarques.Folio_Central
inner join MovInventDet as mid on mi.Folio_Central=mid.Folio_Central
where mid.Articulo=00050 and Embarques.Fec_Recibo <> '' 
and embarques.PVenta=2110) as i) and CONVERT(date,GETDATE(),111) order by Id_Venta desc

/*29/05/2020
28/04/2020*/

/*select Embarques.Fec_Recibo, Embarques.PVenta, Embarques.Fec_Remision from Embarques 
inner join MovInvent as mi on mi.Folio_Central=Embarques.Folio_Central
inner join MovInventDet as mid on mi.Folio_Central=mid.Folio_Central
where mid.Articulo=00050 and Embarques.Fec_Recibo <> '' and embarques.PVenta=2059 order by Embarques.Fec_Recibo desc;*/

select count(*) from ventas 
inner join turnos on ventas.FolioTurno=turnos.folio
where pventa=2078 and fecha between '2020-05-25' and '2020-06-30'

select * from (select sum(TotalVenta) as total, Turnos.Folio as foliot from ventas 
inner join turnos on ventas.FolioTurno=turnos.folio
where Turnos.Fecha='2020-10-04' group by turnos.Folio) a where a.total>6000

select * from turnos where folio='9E193243-6104-453D-A641-D6CD3AA89237' order by fecha desc

select sum(TotalVenta) from ventas 
inner join turnos on ventas.FolioTurno=turnos.folio
where FolioTurno='9E193243-6104-453D-A641-D6CD3AA89237'