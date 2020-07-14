module.exports.getpventas=`select nombre from pventas where 
id_empresa='AMERCADEO' and nombre like '%HOME DEPOT%' group by nombre`;