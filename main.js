const { app, BrowserWindow, globalShortcut } = require('electron');

let win;
let hidden;
function makeWindow(){
  win = new BrowserWindow({
    fullscreen: true,
    frame: false,
    transparent: true,
    resizable: false
  });
  win.hide();
  hidden = true;
  win.loadFile('index.html');
}

app.on('ready', () => {
  makeWindow();
  globalShortcut.register('Control+O', () => {
    if(hidden){
      win.show();
      hidden = false;
    } else {
      win.hide();
      hidden = true;
    }
  });

  globalShortcut.register('Ctrl+S', () => {
    app.exit();
  })
  
});
