let tiporeporte="Vending"
let tiporeportemodal=""
const { ipcRenderer } = require('electron');
ipcRenderer.send('conexion', '')
ipcRenderer.on('errorconexion', (event, data) => {ipcRenderer.send('conectionerr','')})
ipcRenderer.send('getpventas',tiporeporte)
ipcRenderer.send('getanomalias','')


ipcRenderer.on('getpventasksnacksresult',(event,pventas)=>{
    let options={
        data: pventas,

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
                let nombrepventa=$("#pventaksnacks").val().toString();
                ipcRenderer.send('getplazatipomaq',nombrepventa,tiporeporte)
            }
        },
        theme:"square"
    };
    $("#pventaksnacks").easyAutocomplete(options);
})

ipcRenderer.on('getpventasresult',(event,pventas)=>{

    let opciones={

        data: pventas,

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
                ipcRenderer.send('getplazatipomaq',nombrepventa,tiporeporte)
            }
        },
        theme:"square"
    };

    $("#pventa").easyAutocomplete(opciones);
})

$(document).ready(function(){
    $(".easy-autocomplete.eac-square").css("width","100%");
    $("#pventa, #pventaksnacks")
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

    $('#myTab a').on('click', function (e) {
        $("#tiporeportefolio").val("seleccionar")
        $("#folioreporte").val("")
        $("#tiporeportemodal").val("seleccionar")
        $("#fecha2").val("")
        $("#fecha1").val("")
        $("#headtabla").empty()
        $("#headtabla").append(`<tr class="inform">
                                  <th scope="col">Folio</th>
                                  <th scope="col">Punto de venta</th>
                                  <th scope="col">Fecha del reporte</th>
                                  <th scope="col">Telefono</th>
                                  <th scope="col">Estatus</th>
                                  <th scope="col">Persona que reportó</th>
                                  <th scope="col">Observaciones</th>
                                  <th scope="col"></th>
                                </tr>`)
        $("#bodytabla").empty()
        $("#bodytabla").append("<tr><td><p>No hay registros para mostrar</p></td></tr>")
        e.preventDefault()
        $(this).tab('show')
      })
}
ipcRenderer.on('getplazatipomaqresult',(event,infopventa)=>{
    /* console.log(infopventa); */
    if(tiporeporte=="Vending"){
        $("#plaza").empty()
        $("#tipomaq").empty()
        $("#ruta").empty()
        $("#npventa").empty()
        $("#npventa").val(infopventa.pventa)
        $("#ruta").val(infopventa.ruta)
        $("#plaza").val(infopventa.plaza)
        $("#tipomaq").val(infopventa.tipomaq)
    }
    else if(tiporeporte=="Kiosko"){
        $("#plazaksnacks").empty()
        $("#rutaksnacks").empty()
        $("#npventaksnacks").empty()
        $("#tipoksnacks").empty()
        $("#npventaksnacks").val(infopventa.pventa)
        $("#rutaksnacks").val(infopventa.ruta)
        $("#plazaksnacks").val(infopventa.plaza)
        $("#tipoksnacks").val(infopventa.tipomaq)
    }
})

function guardar(){
    let reporte={}
    if(tiporeporte==='Vending'){
        reporte.plaza=$("#plaza").val().toString().toUpperCase()
        reporte.tipomaq=$("#tipomaq").val().toString().toUpperCase()
        reporte.ruta=$("#ruta").val().toString().toUpperCase()
        reporte.observaciones=$("#observaciones").val().toString().toUpperCase()
        reporte.tiporeporta=$("#tiporeporta").val().toString().toUpperCase()
        reporte.aquienreporta=$("#aquienreporta").val().toString().toUpperCase()
        reporte.telefono=$("#telefono").val().toString().toUpperCase()
        reporte.quienreporta=$("#quienreporta").val().toString().toUpperCase()
        reporte.npventa=$("#npventa").val().toString().toUpperCase()
        if($("#pventa").val().toString()!=""){
            reporte.pventa=$("#pventa").val().toString().split('_')[1].toUpperCase()
        }
    }
    else if(tiporeporte==='Kiosko'){
        reporte.plaza=$("#plazaksnacks").val().toString().toUpperCase()
        reporte.tipomaq=$("#tipoksnacks").val().toString().toUpperCase()
        reporte.ruta=$("#rutaksnacks").val().toString().toUpperCase()
        reporte.observaciones=$('#deptoksnacks').val().toString().toUpperCase()+"&"+
        $("#observacionesksnacks").val().toString().toUpperCase()
        reporte.anomalia=$("#tipoanomaliaksnacks").val()
        reporte.tiporeporta=$("#tiporeportaksnacks").val().toString().toUpperCase()
        reporte.aquienreporta=$("#aquienreportaksnacks").val().toString().toUpperCase()
        reporte.telefono=$("#telefonoksnacks").val().toString().toUpperCase()
        reporte.quienreporta=$("#quienreportaksnacks").val().toString().toUpperCase()
        reporte.npventa=$("#npventaksnacks").val().toString().toUpperCase()
        if($("#pventaksnacks").val().toString()!=""){
            reporte.pventa=$("#pventaksnacks").val().toString().split('_')[1].toUpperCase()
        }
    }
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
    $("#plazaksnacks").val("")
    $("#tipoksnacks").val("")
    $("#tipoanomaliaksnacks").val("seleccionar")
    $("#rutaksnacks").val("")
    $("#observacionesksnacks").val("")
    $("#tiporeportaksnacks").val("seleccionar");
    $("#aquienreportaksnacks").val("")
    $("#telefonoksnacks").val("")
    $("#quienreportaksnacks").val("")
    $("#npventaksnacks").val("")
    $("#pventaksnacks").val("")
    $('#deptoksnacks').val("seleccionar")
    $("#quienreportaksnacks").focus()
    $("#tiporeportefolio").val("seleccionar")
    $("#folioreporte").val("")
    $("#tiporeportemodal").val("seleccionar")
    $("#fecha2").val("")
    $("#fecha1").val("")
}

function cambiodepto(){
    let departamento=$('#deptoksnacks').val().toString()
    let cantidadchar=(255-((departamento.length)+1))
    $('#observacionesksnacks').attr('maxlength',cantidadchar)
}

function consultareportes(){
    if($("#fecha1").val()&&$("#fecha2").val()&&$('#tiporeportemodal').val()!="seleccionar"){
        
        $("#bodytabla").empty()
        $("#bodytabla").append(`<tr><td colspan=8><div class="spinner-border text-info" role="status">
        <span class="sr-only">Loading...</span>
      </div></td></tr>`)        

        let parametrosreportes={}
        parametrosreportes.fecha1=$("#fecha1").val().toString()
        parametrosreportes.fecha2=$("#fecha2").val().toString()+" 23:59:00"
        parametrosreportes.tiporeportes=$('#tiporeportemodal').val().toString()
        tiporeportemodal=parametrosreportes.tiporeportes
        console.log(parametrosreportes)
        ipcRenderer.send('consultareportes',parametrosreportes)
    }
}

function buscareporte(){
    let data={}
    data.folio=$('#folioreporte').val()
    data.tiporeporte=$('#tiporeportefolio').val().toString()
    if(data.folio!=""&&data.tiporeportefolio!=""){
        ipcRenderer.send('buscareportefolio',data)
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

function onlyNumberKey(evt) { 
          
    // Only ASCII charactar in that range allowed 
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode 
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) 
        return false; 
    return true; 
} 

function cambiotiporeporte(){
    limpiar()
    tiporeporte=$("#tiporeporte").val().toString()
    /* console.log(tiporeporte) */
    if(tiporeporte=="Vending"){
        $('#formkiosko').css("display","none")
        $('#formvending').show()
        ipcRenderer.send('getpventas',tiporeporte)
    }
    else if(tiporeporte=="Kiosko"){
        $('#formvending').css("display","none")
        $('#formkiosko').show()
        ipcRenderer.send('getpventasksnacks',tiporeporte)
    }
}

function tablavending(){
    let headtabla=$('#headtabla')            
                let contentheadtabla=`<tr class="inform">
                                    <th scope="col">Folio</th>
                                    <th scope="col">Punto de venta</th>
                                    <th scope="col">Fecha del reporte</th>
                                    <th scope="col">Telefono</th>
                                    <th scope="col">Estatus</th>
                                    <th scope="col">Persona que reportó</th>
                                    <th scope="col">Observaciones</th>
                                    <th scope="col"></th>
                                    </tr>`
                headtabla.empty()
                headtabla.append(contentheadtabla)
}

function tablakiosko(){
    let headtabla=$('#headtabla')            
    let contentheadtabla=`<tr class="inform">
                        <th scope="col">Folio</th>
                        <th scope="col">Punto de venta</th>
                        <th scope="col">Fecha del reporte</th>
                        <th scope="col">Estatus</th>
                        <th scope="col">Departamento</th>
                        <th scope="col">Persona que reportó</th>
                        <th scope="col">Observaciones</th>
                        <th scope="col">Observaciones de liberación</th>
                        <th scope="col"></th>
                        </tr>`
    headtabla.empty()
    headtabla.append(contentheadtabla)
}

ipcRenderer.on('getanomaliasresult',(event,anomalias)=>{
    let selectanomalia=$('#tipoanomaliaksnacks')
    selectanomalia.empty()
    selectanomalia.append(`<option selected value="seleccionar">Seleccionar...</option>`)
    let content=""
    $.each(anomalias, function(i, r) {
        content+=`<option value=${r.id}>${r.anomalia}</option>`
    })
    /* console.log(anomalias) */
    selectanomalia.append(content)
})


ipcRenderer.on('consultareportesresult',(event,respuesta)=>{
    let result=respuesta.reportes
    if(result){
        let opcionestatus=""
        if(respuesta.tipo=="Vending"){
            tablavending()
            let cont=""
            $.each(result, function(i, r) {
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
                    "<td><button class='btn btn-success btnGuardarcambios' type='button'><i class='fa fa-floppy-o' aria-hidden='true'></i></td>" +
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
            $(".btnGuardarcambios").click(function(){
                let updatereporte={}
                updatereporte.folio=$(this).parent().siblings('td:first').html()
                updatereporte.observaciones2=$(this).parent().closest('td').siblings().find('textarea').val()
                updatereporte.estatus=$(this).parent().closest('td').siblings().find('select').val()
                updatereporte.tiporeporte="Vending"

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
        else if(respuesta.tipo=="Kiosko"){
            tablakiosko()
            let cont=""
            let depto=""
            let observaciones2=""
            $.each(result, function(i, r) {
                if(r.estatus==="PENDIENTE"){
                    opcionestatus="REPORTADO"
                    observaciones2=`<textarea type='text' placeholder='Observaciones 
                    de liberación de reporte' class='observacionesliberacion' readonly></textarea>`
                }
                else if(r.estatus==="REPORTADO"){
                    opcionestatus="PENDIENTE"
                    observaciones2=`<textarea type='text' placeholder='Observaciones 
                    de liberación de reporte' class='observacionesliberacion' readonly></textarea>`
                }
                else if(r.estatus==="LIBERADO"){
                    observaciones2=`<p class='observacionesliberacion'>${r.observaciones2}<p>`
                }
                if(r.depto){
                    depto=`<p>${r.depto}<p>`
                }
                else{
                    depto=`<select id='depto' class='departamentoselect'>                   
                                <option selected value="seleccionar">Seleccionar...</option>
                                <option>Sistemas</option>
                                <option>Mantenimiento</option>
                            </select>`
                }
                cont += `<tr>
                <td>${r.folio}</td>
                <td>${r.puntoventa}</td>
                <td>${r.fechatomarep}</td>
                <td>
                    <select id='estatusrep' class='estatusreporteselect'>
                        <option>${opcionestatus}</option>
                        <option selected value=${r.estatus}>${r.estatus}</option>
                        <option>LIBERADO</option>
                    </select>
                </td>
                <td>${depto}</td>
                <td>${r.quienreporta}</td>
                <td><p class='observaciones1'>${r.observaciones}<p></td>
                <td>${observaciones2}</td>
                <td><button class='btn btn-success btnGuardarcambios' type='button'>
                <i class='fa fa-floppy-o' aria-hidden='true'></i></td>
                </tr>`;
            });
            $("#bodytabla").empty()
            $("#bodytabla").append(cont)

            $("#bodytabla tr td #estatusrep").change(function(){
                $(this).addClass('selected').siblings().removeClass('selected');
                let textarea=$(this).parent().closest('td').siblings().find('textarea.observacionesliberacion');
                if($(this).val()==="LIBERADO"){
                    textarea.attr('readonly',false);
                    textarea.focus();
                }
                else{
                    textarea.empty()
                    textarea.attr('readonly',true);
                }
            })

            $(".btnGuardarcambios").click(function(){
                let updatereporte={}
                updatereporte.folio=$(this).parent().siblings('td:first').html()
                updatereporte.observaciones=$(this).parent().closest('td').siblings().find('p.observaciones1').html().toString().toUpperCase()
                updatereporte.departamento=$(this).parent().closest('td').siblings().find('select.departamentoselect').val().toString().toUpperCase()
                updatereporte.estatus=$(this).parent().closest('td').siblings().find('select.estatusreporteselect').val().toString().toUpperCase()
                updatereporte.tiporeporte="Kiosko"
                updatereporte.observaciones2=$(this).parent().closest('td').siblings().find('textarea.observacionesliberacion').val()

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
    }
})

ipcRenderer.on('guardarcambiosresult',(event,resultado)=>{})

ipcRenderer.on('guardareporteresult',(event,result)=>{
    $('#Confirmaregistro').modal('toggle');
    let bodymodal=$("#modalbody");
    bodymodal.empty()
    if(result){
        console.log('registro confirmado')
        let contentconfirmed=`<h5>El registro se guardó correctamente y podrá ser visto desde la página.</h5>
        <i class="fa fa-check-circle" aria-hidden="true"></i>`
        bodymodal.append(contentconfirmed)
        let botonmodal=$("#botonmodal")
        botonmodal.removeClass('btn-warning')
        botonmodal.addClass('btn-success')
    }
    else{
        console.log('faltan campos por llenar')
        let contenterror=`<h5>El registro no fue guardado, se deben llenar todos los campos.</h5>
        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>`
        bodymodal.append(contenterror)
        $("#titulomodal").text("Error en el registro.")
        let botonmodal=$("#botonmodal")
        botonmodal.removeClass('btn-success')
        botonmodal.addClass('btn-warning')
        let button = document.getElementById("botonmodal")
        button.setAttribute("onclick", "cerrarmodal()")
    }
})

ipcRenderer.on('exportareportesexcelresult',(event,respuesta)=>{
    $("#spinnerexport").empty()
    exportexcelmodal();
    $('#Confirmaregistro').modal('toggle');
    let bodymodal=$("#modalbody");
    bodymodal.empty()
    console.log(respuesta)
    if(respuesta){
        let contentconfirmed=`<h5>El archivo se generó correctamente</h5>
        <i class="fa fa-check-circle" aria-hidden="true"></i>`
        bodymodal.append(contentconfirmed)
        let botonmodal=$("#botonmodal")
        botonmodal.removeClass('btn-warning')
        botonmodal.addClass('btn-success')
    }
    else{
        let contenterror=`<h5>Ocurrió un error al generar el archivo</h5>
        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>`
        bodymodal.append(contenterror)
        $("#titulomodal").text("Error")
        let botonmodal=$("#botonmodal")
        botonmodal.removeClass('btn-success')
        botonmodal.addClass('btn-warning')
        let button = document.getElementById("botonmodal")
        button.setAttribute("onclick", "cerrarmodal()")
    }
})

ipcRenderer.on('buscareportefolioresult',(event,r)=>{
    
    if(r){
        let opcionestatus=""
            if(r.tipo=="Vending"){
                r=r.reportes[0]
                let observaciones2=""
                let selectestatus=""
                if(r.estatus==="PENDIENTE"){
                    opcionestatus="REPORTADO"
                    observaciones2=`<textarea type='text' placeholder='Observaciones 
                    de liberación de reporte' class='observacionesliberacion' readonly></textarea>`
                    selectestatus=`<select id='estatusrep'>
                    <option>${opcionestatus}</option>
                    <option selected value=${r.estatus}>${r.estatus}</option>
                    <option>LIBERADO</option>
                </select>`
                }
                else if(r.estatus==="REPORTADO"){
                    opcionestatus="PENDIENTE"
                    observaciones2=`<textarea type='text' placeholder='Observaciones 
                    de liberación de reporte' class='observacionesliberacion' readonly></textarea>`
                    selectestatus=`<select id='estatusrep'>
                    <option>${opcionestatus}</option>
                    <option selected value=${r.estatus}>${r.estatus}</option>
                    <option>LIBERADO</option>
                </select>`
                }
                else if(r.estatus==="LIBERADO"){
                    observaciones2=`<p class='observacionesliberacion'>${r.observaciones2}<p>`
                    selectestatus=`<p class='departamentoselect'>${r.estatus}<p>`
                }
                tablavending()
                let cont = `<tr>
                <td>${r.folio}</td>
                <td>${r.puntoventa}</td>
                <td>${r.fechatomarep}</td>
                <td>${r.telefono}</td>
                <td>${selectestatus}</td>
                <td> ${r.quienreporta}</td>
                <td>${observaciones2}</td>
                <td><button class='btn btn-success btnGuardarcambios' type='button'>
                <i class='fa fa-floppy-o' aria-hidden='true'></i></td>
                </tr>`;
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
                $(".btnGuardarcambios").click(function(){
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
            else if(r.tipo=="Kiosko"){
                tablakiosko()
                let cont=""
                let depto=""
                let dep=""
                let observaciones2=""
                let selectestatus=""
                r=r.reportes
                $.each(r, function(i, r) {
                    if(r.estatus==="PENDIENTE"){
                        opcionestatus="REPORTADO"
                        observaciones2=`<textarea type='text' placeholder='Observaciones 
                        de liberación de reporte' class='observacionesliberacion' readonly></textarea>`
                        selectestatus=`<select id='estatusrep' class='estatusreporteselect'>
                        <option>${opcionestatus}</option>
                        <option selected value=${r.estatus}>${r.estatus}</option>
                        <option>LIBERADO</option>
                    </select>`
                    }
                    else if(r.estatus==="REPORTADO"){
                        opcionestatus="PENDIENTE"
                        observaciones2=`<textarea type='text' placeholder='Observaciones 
                        de liberación de reporte' class='observacionesliberacion' readonly></textarea>`
                        selectestatus=`<p class='departamentoselect'>${r.estatus}<p>`
                        selectestatus=`<select id='estatusrep' class='estatusreporteselect'>
                        <option>${opcionestatus}</option>
                        <option selected value=${r.estatus}>${r.estatus}</option>
                        <option>LIBERADO</option>
                    </select>`
                    }
                    else if(r.estatus==="LIBERADO"){
                        observaciones2=`<p class='observacionesliberacion'>${r.observaciones2}<p>`
                        selectestatus=`<p class='departamentoselect'>${r.estatus}<p>`
                    }
                    if(r.depto){
                        depto=`<p class='departamentoselect'>${r.depto}<p>`
                        dep='p'
                    }
                    else{
                        depto=`<select id='depto' class='departamentoselect'>                   
                                    <option selected value="seleccionar">Seleccionar...</option>
                                    <option>Sistemas</option>
                                    <option>Mantenimiento</option>
                                </select>`
                        dep='select'
                    }
                    cont += `<tr>
                    <td>${r.folio}</td>
                    <td>${r.puntoventa}</td>
                    <td>${r.fechatomarep}</td>
                    <td>${selectestatus}</td>
                    <td>${depto}</td>
                    <td>${r.quienreporta}</td>
                    <td><p class='observaciones1'>${r.observaciones}<p></td>
                    <td>${observaciones2}</td>
                    <td><button class='btn btn-success btnGuardarcambios' type='button'>
                    <i class='fa fa-floppy-o' aria-hidden='true'></i></td>
                    </tr>`;
                });
                $("#bodytabla").empty()
                $("#bodytabla").append(cont)
    
                $("#bodytabla tr td #estatusrep").change(function(){
                    $(this).addClass('selected').siblings().removeClass('selected');
                    let textarea=$(this).parent().closest('td').siblings().find('textarea.observacionesliberacion');
                    if($(this).val()==="LIBERADO"){
                        textarea.attr('readonly',false);
                        textarea.focus();
                    }
                    else{
                        textarea.empty()
                        textarea.attr('readonly',true);
                    }
                })
    
                $(".btnGuardarcambios").click(function(){
                    let updatereporte={}
                    updatereporte.folio=$(this).parent().siblings('td:first').html()
                    updatereporte.observaciones=$(this).parent().closest('td').siblings().find('p.observaciones1').html().toString().toUpperCase()
                    updatereporte.departamento=$(this).parent().closest('td').siblings().find(dep+'.departamentoselect').val().toString().toUpperCase()
                    updatereporte.estatus=$(this).parent().closest('td').siblings().find('select.estatusreporteselect').val().toString().toUpperCase()
                    updatereporte.tiporeporte="Kiosko"
                    updatereporte.observaciones2=$(this).parent().closest('td').siblings().find('textarea.observacionesliberacion').val()
    
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
    }
    else{
        continuarcapturarep()
        $('#Confirmaregistro').modal('toggle');
        let bodymodal=$("#modalbody");
        bodymodal.empty()
        let contenterror=`<h5>El registro no existe.</h5>
        <i class="fa fa-times-circle" aria-hidden="true"></i>`
        bodymodal.append(contenterror)
        $("#titulomodal").text("Error en el registro.")
        let botonmodal=$("#botonmodal")
        botonmodal.removeClass('btn-success')
        botonmodal.removeClass('btn-info')
        botonmodal.removeClass('btn-warning')
        botonmodal.addClass('btn-danger')
        let button = document.getElementById("botonmodal")
        button.setAttribute("onclick", "cerrarmodal()")
    }
})

function exportexcelmodal(){$('#exportareportesmodal').modal('toggle')}
function exprepexcel(){
    let fecha=$('#fechaexprep').val().toString()
    $("#spinnerexport").append(`<tr><td colspan=8><div class="spinner-border text-info" role="status">
        <span class="sr-only">Loading...</span>
      </div></td></tr>`)
    ipcRenderer.send('exportareportesexcel',fecha)
}

