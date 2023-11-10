const { app, BrowserWindow, ipcMain } = require("electron");
let win;
const createWindow = () => {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 1600,
    height: 1200,
    frame: false,
  });

  win.loadFile("index.html");
  win.on("closed", function () {
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
