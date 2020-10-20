/*Actualizar venta*/
update ventas set id_venta=((select MAX(Id_Venta) from ventas where folioturno='69D514B8-E9B4-4700-94D6-1BAB62C0B05E')+1)
where folioturno='69D514B8-E9B4-4700-94D6-1BAB62C0B05E' 
and folio=(select top 1 Folio from ventas where folioturno='69D514B8-E9B4-4700-94D6-1BAB62C0B05E' order by id_venta) 

/*Actualizar ventasdet*/
update VentasDet set id_venta=(select top 1 id_Venta from ventas 
where folioturno='69D514B8-E9B4-4700-94D6-1BAB62C0B05E' order by id_venta desc) where folio=(select top 1 Folio from ventas 
where folioturno='69D514B8-E9B4-4700-94D6-1BAB62C0B05E' order by id_venta desc)


select count(*) from ventas where folioturno='5DF11C6D-9BB3-41C0-A3E9-C6AB2B6A18A4'

