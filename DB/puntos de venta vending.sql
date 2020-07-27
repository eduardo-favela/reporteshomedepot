select * from pventas where id_empresa='AMERCADEO' 
and nombre like '%HOME DEPOT%' group by nombre;
/*and pventa=9531 
order by fecha_cierre desc and estatus='normal'*/

select CONCAT(pventa,' ',nombre) from pventas

select TOP 1 plaza, tipo tipomaq, ruta from pventas 
where id_empresa='AMERCADEO' and nombre like ('%'+'%HOME DEPOT SAN LUIS CP Sk'+'%')
order by fecha_cierre desc

select TOP 1 plaza, tipo tipomaq, ruta from pventas 
where id_empresa='AMERCADEO' and nombre like ('%'+?+'%')
order by fecha_cierre desc

select TOP 1 plaza, tipo tipomaq, ruta from pventas 
where nombre like ('%juriquilla%')
order by fecha_cierre desc

select TOP 1 plaza, tipo tipomaq, ruta,pventa from pventas
where id_empresa='AMERCADEO' and nombre like ('%HOME DEPOT ACAPULCO DIAMANTE CP RF%')
order by fecha_cierre desc

/*nombre like '%HOME DEPOT%'


/*8139        HOME DEPOT SAN LUIS CP Sk

HOME DEPOT  SENDERO PASILLO Sk
HOME DEPOT ALFREDO DEL MAZO PASILLO SK