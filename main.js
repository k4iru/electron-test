const path = require("path");
const { app, BrowserWindow, contextBridge } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadFile("index.html");
  //win.webContents.openDevTools();
}

// on ready launch window
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// on window close exit app except on macOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
