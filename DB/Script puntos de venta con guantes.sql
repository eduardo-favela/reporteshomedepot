select * from articulos where nombre LIKE ('%GEL%')

select * from embarques

/*folio_embarque*/

select Embarques.Fec_Recibo, Embarques.PVenta, Embarques.Fec_Remision from Embarques 
inner join MovInvent as mi on mi.Folio_Central=Embarques.Folio_Central
inner join MovInventDet as mid on mi.Folio_Central=mid.Folio_Central
where mid.Articulo=00050 and Embarques.Fec_Recibo <> '' /*and embarques.PVenta=2059*/ 
order by Embarques.Fec_Recibo desc;

select * from movinvent where folio_central='D6F92401-68B9-4D90-9A27-4161CD7481BE'

select * from deposito_turno_e where Ref_Vendedora='20829032'