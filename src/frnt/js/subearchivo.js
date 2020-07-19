// const { ipcRenderer } = require('electron');

function abrirsubearchivo(){
    $("#modalbody").append(
        `<form>
        <div class="form-group">
          <label for="exampleFormControlFile1">Example file input</label>
          <input type="file" class="form-control-file" id="exampleFormControlFile1">
        </div>
      </form>`)

        $("#titulomodal").text("Subir archivo con registros de puntos de venta.")
        let button = document.getElementById("botonmodal")
        button.setAttribute("onclick", "cerrarmodal()")
        bodymodal.append(contenterror)
}
