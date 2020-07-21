const setupEvents = require('./../installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}

const{BrowserWindow,app} = require('electron');
const{ipcMain}= require('electron');
const{Menu} = require('electron');
const xlsxj = require("xlsx-to-json");
const url = require('url')
const path = require('path')

app.whenReady().then(requerirIpc)

process.on("uncaughtException", (err) => {
    console.log(err);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    ventanaMain();
})

function ventanaMain() {

    Menu.setApplicationMenu(null);
    mainwindow = new BrowserWindow({
            width: 1200,
            height: 1000,
            icon: __dirname + "/icons/logo.ico",
            webPreferences: {
                nodeIntegration: true,
                nodeIntegrationInWorker: false,
                webviewTag: true
            },
            show: false
        })
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
        const JsonFile = require("edit-json-file");
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
     ventanaMain()
}