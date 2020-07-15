const{BrowserWindow,app} = require('electron');
const{ipcMain}= require('electron');
const{Menu} = require('electron');

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
        mainwindow.webContents.openDevTools()
    mainwindow.loadFile('frnt/views/capturareportes.html')
    mainwindow.on('closed', () => { mainwindow = null })
    mainwindow.once('ready-to-show', () => {
        mainwindow.show();
        mainwindow.maximize();
    })

}

function requerirIpc() {
     require('./bck/ipc/capturareportes.js');
     ventanaMain();
}