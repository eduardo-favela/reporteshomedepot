alter database poskiosko set offline with rollback immediate
alter database poskiosko set online

RESTORE DATABASE [poskiosko] FROM  
DISK = N'C:\010620202066_backup.bak' 
WITH  FILE = 1,  NOUNLOAD,  REPLACE,  STATS = 10
GO

/*Tabla: tmpfoliocentraltrasnferencia