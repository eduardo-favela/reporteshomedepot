SELECT ID_SUCURSAL
FROM PUNTO_VENTA
WHERE PVENTA = 2089
AND 
FSV_PVENTA > GETDATE() 

select * --delete
from controlarchivohuella where
    controlarchivoid=(select controlarchivoid
    FROM ControlArchivo
    WHERE nombrearchivo LIKE '20200425_4_2077_2%')  

SELECT * --delete 
     FROM ControlArchivo
     WHERE nombrearchivo LIKE '20200425_4_2077_2%'



	 SELECT *
FROM Turnos TR
JOIN Ventas VT
on TR.Folio = VT.FolioTurno
JOIN VentasDet VTD
ON VT.Folio = VTD.Folio
WHERE TR.PVenta = 2140
AND
TR.Fecha = '2020-04-25'
AND
TR.Turno = 2