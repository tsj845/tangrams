const { app, BrowserWindow } = require("electron");
const join_path = require("path").join;

app.whenReady().then(() => {
    app.on("window-all-closed", app.quit);
    let win = new BrowserWindow({"webPreferences":{"contextIsolation":false,"nodeIntegration":true}});
    win.loadFile("./front/index.html").then(()=>win.show);
});