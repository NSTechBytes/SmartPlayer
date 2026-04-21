import { addon, widgetWindow } from "novadesk";
import { json } from "system";

const jsonData = json.read("./config.json");

ipcMain.handle("get-json-data", (event, payload) => {
  return jsonData;
});

var smartPlayerWindow = new widgetWindow({
    id: "smartPlayerWindow",
    script: "ui/script.ui.js",
    backgroundColor: "rgba(10,10,10,0.5)",
});

smartPlayerWindow.setContextMenu([
  { text: "Refresh", action: () => smartPlayerWindow.refresh() },
]);

const blurBehind = addon.load(path.join(__addonsPath, "blurbehind"));
const hwnd = String(smartPlayerWindow.getHandle());
blurBehind.apply(hwnd, "blurbehind", "round");

const nowPlaying = addon.load(path.join(__addonsPath, "nowplaying"));

// Handle media control commands from UI
ipcMain.on("media-control", (event, action) => {
  switch (action) {
    case "play":
      nowPlaying.play();
      break;
    case "pause":
      nowPlaying.pause();
      break;
    case "playpause":
      nowPlaying.playPause();
      break;
    case "stop":
      nowPlaying.stop();
      break;
    case "next":
      nowPlaying.next();
      break;
    case "previous":
      nowPlaying.previous();
      break;
  }
});

// Handle seek command from progress bar click
ipcMain.on("media-seek", (event, percent) => {
  nowPlaying.setPosition(percent, true);
});

var nowPlayingTimer = setInterval(() => {
  const stats = nowPlaying.stats();
  ipcMain.send("now-playing-update", stats);
}, 1000);

smartPlayerWindow.on("close", () => {
  clearInterval(nowPlayingTimer);
});
