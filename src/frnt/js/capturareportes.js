const { ipcRenderer } = require('electron');
ipcRenderer.send('conexion', '')
ipcRenderer.send('getpventas','')
ipcRenderer.on('errorconexion', (event, data) => {
    ipcRenderer.send('conectionerr','')
})
let opciones={

    url: "../../puntosventa.json",

    adjustWidth: false,

    getValue: "nombre",
  
    list: {
		match: {
			enabled: true
		},
		maxNumberOfElements: 5,

		showAnimation: {
			type: "slide",
			time: 300
		},
		hideAnimation: {
			type: "slide",
			time: 300
        },
        onSelectItemEvent: function() {
            let nombrepventa=$("#pventa").val().toString();
            ipcRenderer.send('getplazatipomaq',nombrepventa)
        }
    },
    theme:"square"
  };

$("#pventa").easyAutocomplete(opciones);

$(document).ready(function(){
    $(".easy-autocomplete.eac-square").css("width","100%");
    $("#pventa")
    .css("width","100%")
    .css("min-width","100%")
    .css("border-color","#c6cfd0")
    .css("box-shadow","none")
    .css("border-radius","4px")
    .css("color","black")
})
function vereportes(){
    $("#vereportesmodal").modal().toggle()
    $("#bodytabla").empty()
    $("#bodytabla").append("<tr><td><p>No hay registros para mostrar</p></td></tr>")
}
ipcRenderer.on('getplazatipomaqresult',(event,infopventa)=>{
    console.log(infopventa);
    $("#plaza").empty()
    $("#tipomaq").empty()
    $("#ruta").empty()
    $("#npventa").empty()
    $("#npventa").val(infopventa.pventa)
    $("#ruta").val(infopventa.ruta)
    $("#plaza").val(infopventa.plaza)
    $("#tipomaq").val(infopventa.tipomaq)
})

function guardar(){
    let reporte={}
    reporte.plaza=$("#plaza").val().toString().toUpperCase()
    reporte.tipomaq=$("#tipomaq").val().toString().toUpperCase()
    reporte.ruta=$("#ruta").val().toString().toUpperCase()
    reporte.observaciones=$("#observaciones").val().toString().toUpperCase()
    reporte.tiporeporta=$("#tiporeporta").val().toString().toUpperCase()
    reporte.aquienreporta=$("#aquienreporta").val().toString().toUpperCase()
    reporte.telefono=$("#telefono").val().toString().toUpperCase()
    reporte.quienreporta=$("#quienreporta").val().toString().toUpperCase()
    reporte.npventa=$("#npventa").val().toString().toUpperCase()
    reporte.pventa=$("#pventa").val().toString().toUpperCase()
    ipcRenderer.send('guardareporte',reporte)
}
function limpiar(){
    $("#plaza").val("")
    $("#tipomaq").val("")
    $("#ruta").val("")
    $("#observaciones").val("")
    $("#tiporeporta").val("seleccionar");
    $("#aquienreporta").val("")
    $("#telefono").val("")
    $("#quienreporta").val("")
    $("#npventa").val("")
    $("#pventa").val("")
    $("#quienreporta").focus()
}

function consultareportes(){
    if($("#fecha1").val()&&$("#fecha2").val()){
        let fechas={}
        fechas.fecha1=$("#fecha1").val().toString()
        fechas.fecha2=$("#fecha2").val().toString()
        ipcRenderer.send('consultareportes',fechas)
    }
}

function continuarcapturarep(){
    $('#vereportesmodal').modal('toggle');
    limpiar()
}

function continuarcaptura(){
    $('#Confirmaregistro').modal('toggle');
    limpiar()
}

function cerrarmodal(){
    $('#Confirmaregistro').modal('toggle');
}

ipcRenderer.on('consultareportesresult',(event,result)=>{

    if(result){
        let cont=""
        $.each(result, function(i, r) {
            let opcionestatus=""
            if(r.estatus==="PENDIENTE"){
                opcionestatus="REPORTADO"
            }
            else{
                opcionestatus="PENDIENTE"
            }
            cont += "<tr>" +
                "<td>" + r.folio + "</td>" +
                "<td>" + r.puntoventa + "</td>" +
                "<td>" + r.fechatomarep + "</td>" +
                "<td>" + r.telefono + "</td>" +
                "<td><select id='estatusrep'>"+
                        "<option>"+opcionestatus+"</option>"+
                        "<option selected value="+ r.estatus + ">"+r.estatus+"</option>"+
                        "<option>LIBERADO</option>"+
                    "</select>"+
                "</td>" +
                "<td>" + r.quienreporta + "</td>" +
                "<td><textarea type='text' placeholder='Observaciones de liberación de reporte' readonly></textarea></td>" +
                "<td><button class='btn btn-success' id='btnGuardarcambios' type='button'><i class='fa fa-floppy-o' aria-hidden='true'></i></td>" +
                "</tr>";
        });
        $("#bodytabla").empty()
        $("#bodytabla").append(cont)

        $("#bodytabla tr td #estatusrep").change(function(){
            $(this).addClass('selected').siblings().removeClass('selected');
            let textarea=$(this).parent().closest('td').siblings().find('textarea');
            if($(this).val()==="LIBERADO"){
				textarea.attr('readonly',false);
				textarea.focus();
            }
            else{
                textarea.empty()
				textarea.attr('readonly',true);
            }
        })
        $("#btnGuardarcambios").click(function(){
            let updatereporte={}
            updatereporte.folio=$(this).parent().siblings('td:first').html()
            updatereporte.observaciones2=$(this).parent().closest('td').siblings().find('textarea').val()
            updatereporte.estatus=$(this).parent().closest('td').siblings().find('select').val()

            if(updatereporte.estatus==="LIBERADO"){
                if(updatereporte.observaciones2&&updatereporte.estatus){
                    $(this).parent().parent().remove()
                    ipcRenderer.send('guardarcambios',updatereporte)
                }
            }
            else{
                if(updatereporte.estatus){
                    $(this).parent().parent().remove()
                    ipcRenderer.send('guardarcambios',updatereporte)
                }
            }
        })
    }
})

ipcRenderer.on('guardarcambiosresult',(event,resultado)=>{
})

ipcRenderer.on('guardareporteresult',(event,result)=>{
    $('#Confirmaregistro').modal('toggle');
    let bodymodal=$("#modalbody");
    bodymodal.empty()
    if(result){
        console.log('registro confirmado')
        let contentconfirmed=`<h5>El registro se guardó correctamente y podrá ser visto desde la página.</h5>
        <i class="fa fa-check-circle" aria-hidden="true"></i>`
        bodymodal.append(contentconfirmed)
    }
    else{
        console.log('faltan campos por llenar')
        let contenterror=`<h5>El registro no fue guardado, se deben llenar todos los campos.</h5>
        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>`
        $("#titulomodal").text("Error en el registro.")
        let botonmodal=$("#botonmodal")
        botonmodal.removeClass('btn-success')
        botonmodal.addClass('btn-warning')
        let button = document.getElementById("botonmodal")
        button.setAttribute("onclick", "cerrarmodal()")
        bodymodal.append(contenterror)
    }
})