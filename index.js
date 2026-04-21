import { addon, widgetWindow } from "novadesk";
import { json } from "system";

let jsonData = json.read("./config.json");

ipcMain.handle("get-json-data", (event, payload) => {
  return jsonData;
});

var smartPlayerWindow = new widgetWindow({
  id: "smartPlayerWindow",
  script: "ui/script.ui.js",
  backgroundColor: "rgba(10,10,10,0.5)",
});

// ============================================================================
// Context Menu with Scale & Style submenus
// ============================================================================

function buildContextMenu() {
  const scaleOptions = [0.75, 1, 1.25];
  const styleOptions = [1, 2, 3, 4, 5];

  const scaleItems = scaleOptions.map((s) => ({
    text: s + "x",
    checked: jsonData.scale === s,
    action: () => {
      jsonData.scale = s;
      json.write("./config.json", jsonData);
      ipcMain.send("update-settings", jsonData);
      buildContextMenu();
    },
  }));

  const styleItems = styleOptions.map((st) => ({
    text: "Style " + st,
    checked: jsonData.style === st,
    action: () => {
      jsonData.style = st;
      json.write("./config.json", jsonData);
      ipcMain.send("update-settings", jsonData);
      buildContextMenu();
    },
  }));

  smartPlayerWindow.setContextMenu([
    { text: "Scale", items: scaleItems },
    { text: "Style", items: styleItems },
    { type: "separator" },
    { text: "Refresh", action: () => smartPlayerWindow.refresh() },
  ]);
}

buildContextMenu();

const blurBehind = addon.load(path.join(__addonsPath, "blurbehind"));
const hwnd = String(smartPlayerWindow.getHandle());
blurBehind.apply(hwnd, "acrylic", "round");

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

// Audio Level addon for visualizer bars
const audioLevel = addon.load(path.join(__addonsPath, "audiolevel"));

const audioStatsOptions = {
  port: "output",
  fftSize: 1024,
  fftOverlap: 512,
  bands: 4,
  rmsGain: 120,
  fftAttack: 50,
  fftDecay: 200,
  sensitivity: 100
};

var audioLevelTimer = setInterval(() => {
  const data = audioLevel.stats(audioStatsOptions);
  if (data) {
    ipcMain.send("audio-data", data);
  }
}, 33);

smartPlayerWindow.on("close", () => {
  clearInterval(nowPlayingTimer);
  clearInterval(audioLevelTimer);
});
