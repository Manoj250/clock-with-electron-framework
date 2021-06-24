const {
    app,
    BrowserWindow,
    ipcMain,
    Menu,
    nativeImage,
    Tray,
} = require("electron");
const path = require("path");
const Store = require("electron-store");

const store = new Store({
    tF: true,
    dR: true,
    pos: "C",
    fCT: "#00ff11",
    fCD: "#ff0000",
    fST: 90,
    fSD: 50,
    fFT: "Rockwell",
    fFD: "Rockwell",
    fWT: 900,
    fWD: 900,
});


if (require("electron-squirrel-startup")) {
    app.quit();
}

const createWindow = () => {
    var image = nativeImage.createFromPath(__dirname + "/assets/clock.ico");
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        icon: image,
        show:false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });
    mainWindow.setMenuBarVisibility(false);

    mainWindow.loadFile(path.join(__dirname, "html/index.html"));
    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
    })
    // mainWindow.webContents.openDevTools();
};

var secondWindow = null;
const createSecondWindow = () => {
    
    data = {
        tF:  store.get('tF'),
        dR:  store.get('dR'),
        pos: store.get('pos'),
        fCT: store.get('fCT'),
        fCD: store.get('fCD'),
        fST: store.get('fST'),
        fSD: store.get('fSD'),
        fFT: store.get('fFT'),
        fFD: store.get('fFD'),
        fWT: store.get('fWT'),
        fWD: store.get('fWD')
    };
    secondWindow = new BrowserWindow({
        width: 800,
        height: 600,
        transparent: true,
        frame: false,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            skipTaskbar: true,
            focusable: false,
        },
    });
    secondWindow.setSkipTaskbar(true);
    secondWindow.setIgnoreMouseEvents(true);

    secondWindow.loadFile(path.join(__dirname, "html/secondwindow.html"));
    secondWindow.setMenuBarVisibility(false);
    secondWindow.isFullScreenable(false);
    secondWindow.isClosable(false);
    // Open the DevTools.
    // secondWindow.webContents.openDevTools();
    secondWindow.once("ready-to-show", () => {
        secondWindow.maximize();
        secondWindow.show();
        secondWindow.webContents.send("settings",data);
    });
};

app.on("ready",createTrayIcon);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});



let tray = null;
function createTray() {
    const icon = path.join(__dirname, "/assets/clock.ico"); // required.
    const trayicon = nativeImage.createFromPath(icon);
    tray = new Tray(trayicon.resize({ width: 16 }));
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Settings",
            click: () => {
                createWindow();
            },
        },
        {
            label: "Quit",
            click: () => {
                app.quit();
            },
        },
    ]);

    tray.setContextMenu(contextMenu);
}

function createTrayIcon() {
    createSecondWindow();
    if (!tray) {
        createTray();
    }
}

ipcMain.on("recieved-settings", (event, arg) => {
    secondWindow.webContents.send("settings", arg);
    store.set(arg);
});

const exeName = path.basename(process.execPath);

app.setLoginItemSettings({
    openAtLogin: true,
    path: process.execPath,
    args: [
        "--processStart",
        `"${exeName}"`,
        "--process-start-args",
        `"--hidden"`,
    ],
});