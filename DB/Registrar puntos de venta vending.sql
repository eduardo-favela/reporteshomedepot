SELECT pventa FROM pventas WHERE /*nombre like '%HOME DEPOT%' and*/ pventa IN(8139
,8140
,8454
,8574
,8594
,8595
,8607
,8608
,8618
,8629
,8707
,8860
,8927
,9096
,9152
,9287
,9334
,9335
,9363
,9531
,9574
,9589
,9594
,9595
,9606
,9628
,9629
,9643
,9644
,9678
,9952
,10056
,10085
,10330
,10343
,10362
,10363
,10368
,10369
,10384
,10385
,10408
,10409
,10414
,10415
,10417
,10425
,10427
,10454
,10469
,10470
,10487
,10501
,10531
,10532
,10602
,10603
,10604
,10605
,10767
,10768
,10807
,10808
,10825
,10826
,10830
,10839
,10840
,10845
,10846
,10851
,10887
,10888
,10920
,10921
,10922
,10937
,10938
,10947
,10948
,10964
,10965
,10966
,10978
,11019
,11020
,11021
,11110
,11220
,11221
,11551
,11552
,11653
,11654
,11656
,11837
,11856
,11866
,11887
,11888
,11963
,12035
,12036
,12130
,12131
,12633
,12634
,12644
,12706
,12707
,12711
,12712
,12865
,12866
,12884
,12885
,12947
,13283
,13288
,13289
,13350
,13402
,13428
,13458
,13834
,13835
,13887
,13888
,13890
,13952
,13953
,14110
,14113
,14117
,14118
,14312
,14313
,14382
,14383
,14391
,14523
,14612
,14613
,14631
,14632
,14791
,14792
,14847
,14858
,14859
,14867
,14868
,14869
,14870
,14877
,14878
,14914
,14916
,14918
,14919
,14920
,14921
,14922
,14923
,14924
,14925
,14926
,14927
,14928
,14929
,14933
,14944
,14945
,14964
,14965
,14966
,14968
,14975
,14976
,14979
,14980
,15061
,15067
,15068
,15077
,15078
,15084
,15085
,15105
,15117
,15118
,15120
,15122
,15128
,15129
,15132
,15133
,15134
,15135
,15137
,15138
,15139
,15140
,15141
,15142
,15143
,15144
,15145
,15146
,15147
,15148
,15158
,15159
,15160
,15161
,15162
,15163
,15172
,15174
,15175
,15177
,15178
,15208
,15209
,15218
,15219
,15223
,15224
,15234
,15239
,15241
,15242
,15243
,15244
,15256
,15257
,15258
,15259
,15269
,15270
,15286
,15287
,15288
,15289
,15290
,15291
,15300
,15301
,15304
,15305
,15306
,15307
,15310
,15319
,15332
,15333
,15341
,15342
,15347
,15350
,15351
,15352
,15353
,15354
,15355
,15356
,15357
,15358
,15359
,15360
,15367
,15368
,15369
,15370
,15371
,15374) GROUP BY pventa ORDER BY pventa

SELECT * FROM pventas WHERE pventa=15234


INSERT INTO pventas(pventa,nombre,tipo,plaza,orden,ruta,zona,iva,supervisor,
bodega,fechacap,turnos,cuentactb1,cuentactb2,cuentactb3,cuentactb4,cuentactb5,cuentactb6,cuentactb7,cuentactb8,cuentactb9,
cuentactb10,uniforme,posada,capacita,aguinaldo,gratifica,id_usuario,fum,id_empresa,id_sucursal,estatus,id_pventa,dir1,
dir2,dir3,ruta_financiero,estatus_financiero,fecha_apertura,fecha_cierre,abasto_automatico,dias_visita,pventa_alterno,
id_cliente,id_subcliente,id_ubicacion,cash,sale,lectura_monedero,cap_monedero,tubo1,tubo2,tubo3,tubo4,cap_tubo1,
cap_tubo2,cap_tubo3,cap_tubo4,rowguid) VALUES
(15332,	'HOME DEPOT HOME DEPOT JURIQUILLA CP SK',	'SK', 29,	0,0,0,0,0,0,GETDATE(),1,'','','','',
'','','','','','','','','','','','','','AMERCADEO','QUERETARO','','','','','','','',GETDATE(),GETDATE(),'','','',
'','','','','','','','','','','','','','','',NEWID())

UPDATE pventas SET fecha_cierre=getdate() WHERE pventa=15332

14113	Bimbo	HOME DEPOT NUEVO LAREDO	123067608256	SNACKS	USI	3538	Home Depot	COMEDOR	REFORMA # 5601	LAS ALAMEDAS PLAZA REFORMA	NUEVO LAREDO	TAMAULIPAS	88001	14113	Bimbo	A825	Serie Duplicada	21-Oct-11					


DELETE pventas WHERE pventa=14113 AND nombre = 'HOME DEPOT HOME DEPOT JURIQUILLA CP SK'

/*ESE SCRIPT ES PARA AGREGAR PUNTOS DE VENTA DE VENDING, LO �NICO QUE HAY QUE CAMBIAR ES EL ID DE LA PLAZA Y EL 
NOMBRE*/

SELECT * FROM empleados WHERE nombre LIKE '%beatriz%' AND cve_Sucursal=4 AND estatus='ALTA'