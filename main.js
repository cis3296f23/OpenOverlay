/**
 * main javascript file to start the app and create a new window as well as quit the app
 */

const { app, BrowserWindow, ipcMain } = require("electron");

let win;

const createWindow = () => {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 1800,
    height: 1200,
    frame: false, // Comment or remove this line to enable the default window frame
    icon: "components/images/OO_Icon.png",
  });

  win.loadFile("index.html");

  // Uncomment the following line if you want to keep the frameless window draggable
  // win.webContents.on("did-finish-load", () => { win.setTitle("Your Title"); });

  win.on("closed", () => {
    win = null;
  });
};

app.whenReady().then(() => {
  createWindow();

  ipcMain.on("close-app", () => {
    app.quit();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
