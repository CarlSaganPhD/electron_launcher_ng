const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let win; // Declare win here so it can be accessed in different scopes

const createWindow = () => {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "scripts/preload2.js"),
    },
  });

  win.loadFile("base.html");
  win.webContents.openDevTools(); // You can open DevTools here
};

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong");
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
    // Open DevTools here if you want it to open on 'activate'
    // win.webContents.openDevTools(); 
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("navigate", (event, endpoint) => {
  let focusedWindow = BrowserWindow.getFocusedWindow();
  console.log(`Navigating to ${endpoint}.html`);
  focusedWindow.loadFile(`${endpoint}.html`);
});
