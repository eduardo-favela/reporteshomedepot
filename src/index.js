const setupEvents = require('./../installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}

const{BrowserWindow,app,BrowserView,dialog, nativeImage} = require('electron');
const{ipcMain}= require('electron');
const{Menu} = require('electron');
const xlsxj = require("xlsx-to-json");
const url = require('url')
const path = require('path')
const JsonFile = require("edit-json-file");
// include node fs module
const fs = require('fs');

//Variables de ventana.
let mainwindow;
let login;


ipcMain.on('conectionerr',async(event,arg)=>{
    const options = {
        type: 'warning',
        buttons: ['Ok'],
        title: 'No hay conexión',
        message: 'No fue posible conectar con la base de datos, verificar conexión a la VPN',
    };
    dialog.showMessageBoxSync(null, options);
    app.quit()
})

function ventanaLogin() {

    Menu.setApplicationMenu(null);
    login = new BrowserWindow({
            width: 800,
            height: 600,
            icon: nativeImage.createFromPath(path.join(__dirname,'/icons/logo.ico')),
            transparent: true,
            webPreferences: {
                nodeIntegration: true
            },
            show: false,
            frame: false
        })
        /* login.webContents.openDevTools() */
    login.loadFile('src/frnt/views/login.html')
    login.on('closed', () => { login = null })
    login.once('ready-to-show', () => { login.show() })

}

/* async function eliminararchivo(){
        // delete file named 'sample.txt'
        await fs.unlink(path.join(__dirname, 'puntosventa.json'), function (err) {
        if (err){
            if (err.code === 'ENOENT') {
                console.log("No se pudo eliminar el archivo antiguo porque no existe.")
                requerirIpc();
            }
        }
        else{
        // if no error, file has been deleted successfully
        console.log('Archivo antiguo de puntos de venta eliminado!');
        requerirIpc();
        }
    });
} */
app.on('ready',ventanaMain)
process.on("uncaughtException", (err) => {
    console.log(err);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainwindow===null) {
        ventanaMain();
    }
})

async function ventanaMain() {
    Menu.setApplicationMenu(null);
    mainwindow = new BrowserWindow({
            width: 1200,
            height: 1000,
            icon: nativeImage.createFromPath(path.join(__dirname,'/icons/logo.ico')),
            webPreferences: {
                nodeIntegration: true,
                nodeIntegrationInWorker: false,
                webviewTag: true
            },
            show: false
        })
        requerirIpc()
        //await eliminararchivo()
        //mainwindow.webContents.openDevTools()
        mainwindow.loadURL(
        url.format({
            pathname: path.join(__dirname, 'frnt/views/capturareportes.html'),
            protocol: 'file:',
            slashes: true
        }))
    mainwindow.on('closed', () => { mainwindow = null })
    mainwindow.once('ready-to-show', () => {
        mainwindow.show();
        mainwindow.maximize();
    })

}

function actualizararchivopv(){
    try {
        let file = JsonFile(`${__dirname}/puntosventa.json`);
        if (file.toObject()[0]!=undefined){
            requerirIpc()
        }
        else{
            xlsxj({
                input: path.join(__dirname, 'VendingHomeDepot.xlsx'), 
                output: path.join(__dirname, 'puntosventa.json')
              }, function(err, result) {
                if(err) {
                  console.log(err);
                }else {
                    requerirIpc()
                }
              });
        }
    } catch (err) {
        console.log(err)
    }
}

function requerirIpc() {

     require('./bck/ipc/capturareportes.js');

}
