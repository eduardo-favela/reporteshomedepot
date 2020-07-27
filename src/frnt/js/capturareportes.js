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