const { ipcRenderer } = require('electron');
ipcRenderer.send('conexion', '')
ipcRenderer.send('getpventas','')

let opciones={

    url: "../../puntosventa.json",
  
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
        onChooseEvent: function() {
            let nombrepventa=$("#pventa").val().toString();
            ipcRenderer.send('getplazatipomaq',nombrepventa)
        }
    },
    theme:"square"
  };

$("#pventa").easyAutocomplete(opciones);

ipcRenderer.on('getplazatipomaqresult',(event,infopventa)=>{
    console.log(infopventa);
    $("#plaza").empty()
    $("#tipomaq").empty()
    $("#ruta").empty()
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
    console.log(reporte)
    ipcRenderer.send('guardareporte',reporte)
}
function limpiar(){
    $("#plaza").clear()
    $("#tipomaq").clear()
    $("#ruta").clear()
    $("#observaciones").clear()
    $("#tiporeporta").clear()
    $("#aquienreporta").clear()
    $("#telefono").clear()
    $("#quienreporta").clear()
    $("#npventa").clear()
    $("#pventa").clear()
    $("#quienreporta").focus()
}