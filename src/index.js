const {app}= require('electron');
const{BrowserWindow} = require('electron');
const{ipcMain}= require('electron');
const{Menu} = require('electron');

app.on('ready', ventanaMain)

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
        mainwindow.webContents.openDevTools()
    mainwindow.loadFile('frnt/views/capturareportes.html')
    mainwindow.on('closed', () => { mainwindow = null })
    mainwindow.once('ready-to-show', () => {
        mainwindow.show();
        mainwindow.maximize();
    })

}

// function requerirIpc() {
//     require('./bk/ipc/login');
//     require('./bk/ipc/modulos');
//     require('./bk/ipc/usuario');
//     require('./bk/ipc/inicio');
// }