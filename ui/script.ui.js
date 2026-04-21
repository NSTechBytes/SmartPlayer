const jsonData = ipcRenderer.invoke("get-json-data");
let style = jsonData.style;
let scale = jsonData.scale;

function applyStyle(style) {
    ui.removeElements(); // Clears everything
    if (style == 1) {
        style1();
    }
    else if (style == 2) {
        style2();
    }
    else if (style == 3) {
        style3();
    }
    else if (style == 4) {
        style4();
    }
    else if (style == 5) {
        style5();
    }
}

applyStyle(style);

function style1() {
    ui.beginUpdate();
    ui.addShape({
        id: "background",
        type: "rectangle",
        width: (450 * scale),
        height: (280 * scale),
        radius: 12,
        fillColor: "rgba(46, 68, 75, 0.7)"
    });


    // Song title text
    ui.addText({
        id: "song-title",
        text: "---",
        fontColor: "rgb(255, 255, 255)",
        fontFace: "Segoe UI",
        textAlign: "center",
        fontSize: (24 * scale),
        fontWeight: 700,
        x: ((450 * scale) / 2),
        y: (20 * scale),
        width: ((450 * scale) - 70 * scale),
        textClip: "ellipsis"
    });

    // Song artist text
    ui.addText({
        id: "song-artist",
        text: "---",
        fontColor: "rgb(255, 255, 255)",
        fontFace: "Segoe UI",
        textAlign: "center",
        fontSize: (20 * scale),
        x: ((450 * scale) / 2),
        y: (ui.getElementProperty("song-title", "y") + 50 * scale),
        width: ((450 * scale) - 70 * scale)
    });

    // song progress bar
    ui.addBar({
        id: "song-progress-bar",
        x: (450 - 380) / 2 * scale,
        y: (ui.getElementProperty("song-artist", "y") + 50 * scale),
        width: ((450 * scale) - 70 * scale),
        height: (6 * scale),
        value: 1,
        barColor: "rgba(0, 154, 255, 1)",
        backgroundColor: "rgba(89, 108, 113, 1)",
        backgroundColorRadius: (4 * scale),
        barCornerRadius: (4 * scale),
        onLeftMouseUp: (e) => {
            const pct = Math.max(0, Math.min(100, e?.__offsetXPercent ?? 0));
            ipcRenderer.send("media-seek", pct);
        }
    });

    ui.addText({
        id: "position-text",
        text: "00:00",
        fontColor: "rgb(255, 255, 255)",
        fontFace: "Segoe UI",
        textAlign: "left",
        fontSize: (14 * scale),
        x: (32 * scale),
        y: (ui.getElementProperty("song-progress-bar", "y") + ui.getElementProperty("song-progress-bar", "height") + 10 * scale),
    });

    ui.addText({
        id: "duration-text",
        text: "00:00",
        fontColor: "rgb(255, 255, 255)",
        fontFace: "Segoe UI",
        textAlign: "right",
        fontSize: (14 * scale),
        x: ((450 * scale) - 32 * scale),
        y: (ui.getElementProperty("song-progress-bar", "y") + ui.getElementProperty("song-progress-bar", "height") + 10 * scale),
    });

    ui.addShape({
        id: "previous-bg-shape",
        type: "ellipse",
        x: ((450 * scale) / 2 - 120 * scale),
        y: (ui.getElementProperty("duration-text", "y") + ui.getElementProperty("duration-text", "height") + 20 * scale),
        width: (50 * scale),
        height: (50 * scale),
        fillColor: "rgba(70, 91, 98, 0.8)",
        strokeWidth: 0,
        onMouseOver: function () {
            ui.setElementProperties("previous-bg-shape", { fillColor: "rgba(90, 115, 125, 0.9)" });
        },
        onMouseLeave: function () {
            ui.setElementProperties("previous-bg-shape", { fillColor: "rgba(70, 91, 98, 0.8)" });
        },
        onLeftMouseUp: () => {
            ipcRenderer.send("media-control", "previous");
        }
    });

    ui.addImage({
        id: "previous-png",
        x: ((450 * scale) / 2 - 120 * scale + 15 * scale),
        y: (ui.getElementProperty("duration-text", "y") + ui.getElementProperty("duration-text", "height") + 20 * scale + 15 * scale),
        width: (20 * scale),
        height: (20 * scale),
        path: "./assets/previous.png",
        onLeftMouseUp: () => {
            ipcRenderer.send("media-control", "previous");
        }
    });

    ui.addShape({
        id: "next-bg-shape",
        type: "ellipse",
        x: ((450 * scale) / 2 + 70 * scale),
        y: (ui.getElementProperty("duration-text", "y") + ui.getElementProperty("duration-text", "height") + 20 * scale),
        width: (50 * scale),
        height: (50 * scale),
        fillColor: "rgba(70, 91, 98, 0.8)",
        strokeWidth: 0,
        onMouseOver: function () {
            ui.setElementProperties("next-bg-shape", { fillColor: "rgba(90, 115, 125, 0.9)" });
        },
        onMouseLeave: function () {
            ui.setElementProperties("next-bg-shape", { fillColor: "rgba(70, 91, 98, 0.8)" });
        },
        onLeftMouseUp: () => {
            ipcRenderer.send("media-control", "next");
        }
    });

    ui.addImage({
        id: "next-png",
        x: ((450 * scale) / 2 + 70 * scale + 15 * scale),
        y: (ui.getElementProperty("duration-text", "y") + ui.getElementProperty("duration-text", "height") + 20 * scale + 15 * scale),
        width: (20 * scale),
        height: (20 * scale),
        path: "./assets/next.png",
        onLeftMouseUp: () => {
            ipcRenderer.send("media-control", "next");
        }
    });

    ui.addShape({
        id: "playpause-bg-shape",
        type: "ellipse",
        x: ((450 * scale) / 2 - 40 * scale),
        y: (ui.getElementProperty("duration-text", "y") + ui.getElementProperty("duration-text", "height") + 10 * scale),
        width: (80 * scale),
        height: (80 * scale),
        fillColor: "rgba(0, 140, 255, 0.46)",
        strokeWidth: 0,
        onMouseOver: function () {
            ui.setElementProperties("playpause-bg-shape", { fillColor: "rgba(0, 160, 255, 0.6)" });
        },
        onMouseLeave: function () {
            ui.setElementProperties("playpause-bg-shape", { fillColor: "rgba(0, 140, 255, 0.46)" });
        },
        onLeftMouseUp: () => {
            ipcRenderer.send("media-control", "playpause");
        }
    });

    ui.addImage({
        id: "playpause-png",
        x: ((450 * scale) / 2 - 40 * scale + 25 * scale),
        y: (ui.getElementProperty("duration-text", "y") + ui.getElementProperty("duration-text", "height") + 10 * scale + 25 * scale),
        width: (30 * scale),
        height: (30 * scale),
        path: "./assets/play.png",
        onLeftMouseUp: () => {
            ipcRenderer.send("media-control", "playpause");
        }
    });

    ui.endUpdate();
}

function style2() {
    ui.beginUpdate();
    ui.addShape({
        id: "background",
        type: "rectangle",
        width: (350 * scale),
        height: (480 * scale),
        radius: 12,
        fillColor: "rgba(18, 18, 18, 1)"
    });

    ui.addImage({
        id: "cover-image-dummy",
        width: (350 * scale),
        height: (200 * scale),
        path: "./assets/cover.png",
    });

    ui.addImage({
        id: "cover-image",
        width: (350 * scale),
        height: (200 * scale),
        path: "./assets/cover.png",
        preserveAspectRatio: "preserve",
    });

    // Song title text
    ui.addText({
        id: "song-title",
        text: "---",
        fontColor: "rgb(255, 255, 255)",
        fontFace: "Segoe UI",
        textAlign: "left",
        fontSize: (20 * scale),
        fontWeight: 700,
        x: (10 * scale),
        y: (ui.getElementProperty("cover-image", "y") + ui.getElementProperty("cover-image", "height") + 30 * scale),
        width: ((350 * scale) - 10 * scale),
        textClip: "ellipsis"
    });

    // Song artist text
    ui.addText({
        id: "song-artist",
        text: "---",
        fontColor: "rgb(255, 255, 255)",
        fontFace: "Segoe UI",
        textAlign: "left",
        fontSize: (15 * scale),
        x: (10 * scale),
        y: (ui.getElementProperty("song-title", "y") + 30 * scale),
        width: ((350 * scale) - 10 * scale)
    });

    // Song progress bar
    ui.addBar({
        id: "song-progress-bar",
        x: (10 * scale),
        y: (ui.getElementProperty("song-artist", "y") + 60 * scale),
        width: ((350 * scale) - 20 * scale),
        height: (4 * scale),
        value: 1,
        barColor: "#1DB954",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backgroundColorRadius: (2 * scale),
        barCornerRadius: (2 * scale),
        onLeftMouseUp: (e) => {
            const pct = Math.max(0, Math.min(100, e?.__offsetXPercent ?? 0));
            ipcRenderer.send("media-seek", pct);
        }
    });

    // Position text
    ui.addText({
        id: "position-text",
        text: "00:00",
        fontColor: "#1DB954",
        fontFace: "Segoe UI",
        textAlign: "left",
        fontSize: (12 * scale),
        x: (10 * scale),
        y: (ui.getElementProperty("song-progress-bar", "y") + ui.getElementProperty("song-progress-bar", "height") + 15 * scale),
    });

    // Duration text
    ui.addText({
        id: "duration-text",
        text: "00:00",
        fontColor: "#1DB954",
        fontFace: "Segoe UI",
        textAlign: "right",
        fontSize: (12 * scale),
        x: ((350 * scale) - 10 * scale),
        y: (ui.getElementProperty("song-progress-bar", "y") + ui.getElementProperty("song-progress-bar", "height") + 15 * scale),
    });

    // Previous button
    ui.addShape({
        id: "previous-bg-shape",
        type: "ellipse",
        x: ((350 * scale) / 2 - 100 * scale),
        y: (ui.getElementProperty("duration-text", "y") + 40 * scale),
        width: (45 * scale),
        height: (45 * scale),
        fillColor: "rgba(29, 185, 84, 0.2)",
        strokeWidth: 0,
        onMouseOver: function () {
            ui.setElementProperties("previous-bg-shape", { fillColor: "rgba(29, 185, 84, 0.4)" });
        },
        onMouseLeave: function () {
            ui.setElementProperties("previous-bg-shape", { fillColor: "rgba(29, 185, 84, 0.2)" });
        },
        onLeftMouseUp: () => {
            ipcRenderer.send("media-control", "previous");
        }
    });

    ui.addImage({
        id: "previous-png",
        x: ((350 * scale) / 2 - 100 * scale + 12 * scale),
        y: (ui.getElementProperty("duration-text", "y") + 40 * scale + 12 * scale),
        width: (21 * scale),
        height: (21 * scale),
        path: "./assets/previous.png",
        onLeftMouseUp: () => {
            ipcRenderer.send("media-control", "previous");
        }
    });

    // Next button
    ui.addShape({
        id: "next-bg-shape",
        type: "ellipse",
        x: ((350 * scale) / 2 + 55 * scale),
        y: (ui.getElementProperty("duration-text", "y") + 40 * scale),
        width: (45 * scale),
        height: (45 * scale),
        fillColor: "rgba(29, 185, 84, 0.2)",
        strokeWidth: 0,
        onMouseOver: function () {
            ui.setElementProperties("next-bg-shape", { fillColor: "rgba(29, 185, 84, 0.4)" });
        },
        onMouseLeave: function () {
            ui.setElementProperties("next-bg-shape", { fillColor: "rgba(29, 185, 84, 0.2)" });
        },
        onLeftMouseUp: () => {
            ipcRenderer.send("media-control", "next");
        }
    });

    ui.addImage({
        id: "next-png",
        x: ((350 * scale) / 2 + 55 * scale + 12 * scale),
        y: (ui.getElementProperty("duration-text", "y") + 40 * scale + 12 * scale),
        width: (21 * scale),
        height: (21 * scale),
        path: "./assets/next.png",
        onLeftMouseUp: () => {
            ipcRenderer.send("media-control", "next");
        }
    });

    // Play/Pause button
    ui.addShape({
        id: "playpause-bg-shape",
        type: "ellipse",
        x: ((350 * scale) / 2 - 35 * scale),
        y: (ui.getElementProperty("duration-text", "y") + 30 * scale),
        width: (70 * scale),
        height: (70 * scale),
        fillColor: "#1DB954",
        strokeWidth: 0,
        onMouseOver: function () {
            ui.setElementProperties("playpause-bg-shape", { fillColor: "#1ED760" });
        },
        onMouseLeave: function () {
            ui.setElementProperties("playpause-bg-shape", { fillColor: "#1DB954" });
        },
        onLeftMouseUp: () => {
            ipcRenderer.send("media-control", "playpause");
        }
    });

    ui.addImage({
        id: "playpause-png",
        x: ((350 * scale) / 2 - 35 * scale + 20 * scale),
        y: (ui.getElementProperty("duration-text", "y") + 30 * scale + 20 * scale),
        width: (30 * scale),
        height: (30 * scale),
        path: "./assets/play.png",
        onLeftMouseUp: () => {
            ipcRenderer.send("media-control", "playpause");
        }
    });
    ui.endUpdate();
}

function style3() {
    ui.beginUpdate();

    ui.addShape({
        id: "background",
        type: "rectangle",
        width: (350 * scale),
        height: (480 * scale),
        radius: 12,
        fillColor: "rgba(224, 229, 236, 1)"
    });

    ui.addShape({
        id: "cover-container",
        type: "ellipse",
        x: ((350 * scale - 220 * scale) / 2),
        width: (220 * scale),
        height: (220 * scale),
        y: (20 * scale),
        fillColor: "rgba(5, 6, 6, 1)"
    });

    ui.addImage({
        id: "cover-image",
        width: (220 * scale),
        height: (220 * scale),
        path: "./assets/cover-white.png",
        container: "cover-container",
    });

    // Song title text
    ui.addText({
        id: "song-title",
        text: "---",
        fontColor: "rgba(20, 20, 20, 1)",
        fontFace: "Segoe UI",
        textAlign: "center",
        fontSize: (20 * scale),
        fontWeight: 700,
        x: ((350 * scale) / 2),
        y: (20 * scale + 220 * scale + 20 * scale),
        width: ((350 * scale) - 40 * scale),
        textClip: "ellipsis"
    });

    // Song artist text
    ui.addText({
        id: "song-artist",
        text: "---",
        fontColor: "rgba(80, 80, 80, 1)",
        fontFace: "Segoe UI",
        textAlign: "center",
        fontSize: (15 * scale),
        x: ((350 * scale) / 2),
        y: (ui.getElementProperty("song-title", "y") + 30 * scale),
        width: ((350 * scale) - 40 * scale),
        textClip: "ellipsis"
    });

    // Song progress bar
    ui.addBar({
        id: "song-progress-bar",
        x: (350 - 290) / 2 * scale,
        y: (ui.getElementProperty("song-artist", "y") + 50 * scale),
        width: (290 * scale),
        height: (6 * scale),
        value: 1,
        barColor: "rgba(0, 120, 255, 1)",
        backgroundColor: "rgba(200, 205, 212, 1)",
        backgroundColorRadius: (4 * scale),
        barCornerRadius: (4 * scale),
        onLeftMouseUp: (e) => {
            const pct = Math.max(0, Math.min(100, e?.__offsetXPercent ?? 0));
            ipcRenderer.send("media-seek", pct);
        }
    });

    // Position text
    ui.addText({
        id: "position-text",
        text: "00:00",
        fontColor: "rgba(100, 100, 100, 1)",
        fontFace: "Segoe UI",
        textAlign: "left",
        fontSize: (12 * scale),
        x: (32 * scale),
        y: (ui.getElementProperty("song-progress-bar", "y") + 15 * scale),
    });

    // Duration text
    ui.addText({
        id: "duration-text",
        text: "00:00",
        fontColor: "rgba(100, 100, 100, 1)",
        fontFace: "Segoe UI",
        textAlign: "right",
        fontSize: (12 * scale),
        x: ((350 * scale) - 32 * scale),
        y: (ui.getElementProperty("song-progress-bar", "y") + 15 * scale),
    });

    // Previous button
    ui.addShape({
        id: "previous-bg-shape",
        type: "ellipse",
        x: ((350 * scale) / 2 - 100 * scale),
        y: (ui.getElementProperty("duration-text", "y") + 40 * scale),
        width: (45 * scale),
        height: (45 * scale),
        fillColor: "rgba(0, 120, 255, 0.1)",
        strokeWidth: 0,
        onMouseOver: function () {
            ui.setElementProperties("previous-bg-shape", { fillColor: "rgba(0, 120, 255, 0.2)" });
        },
        onMouseLeave: function () {
            ui.setElementProperties("previous-bg-shape", { fillColor: "rgba(0, 120, 255, 0.1)" });
        },
        onLeftMouseUp: () => {
            ipcRenderer.send("media-control", "previous");
        }
    });

    ui.addImage({
        id: "previous-png",
        x: ((350 * scale) / 2 - 100 * scale + 12 * scale),
        y: (ui.getElementProperty("duration-text", "y") + 40 * scale + 12 * scale),
        width: (21 * scale),
        height: (21 * scale),
        path: "./assets/previous.png",
        onLeftMouseUp: () => {
            ipcRenderer.send("media-control", "previous");
        }
    });

    // Play/Pause button
    ui.addShape({
        id: "playpause-bg-shape",
        type: "ellipse",
        x: ((350 * scale) / 2 - 35 * scale),
        y: (ui.getElementProperty("duration-text", "y") + 27.5 * scale),
        width: (70 * scale),
        height: (70 * scale),
        fillColor: "rgba(0, 120, 255, 1)",
        strokeWidth: 0,
        onMouseOver: function () {
            ui.setElementProperties("playpause-bg-shape", { fillColor: "rgba(0, 140, 255, 1)" });
        },
        onMouseLeave: function () {
            ui.setElementProperties("playpause-bg-shape", { fillColor: "rgba(0, 120, 255, 1)" });
        },
        onLeftMouseUp: () => {
            ipcRenderer.send("media-control", "playpause");
        }
    });

    ui.addImage({
        id: "playpause-png",
        x: ((350 * scale) / 2 - 35 * scale + 20 * scale),
        y: (ui.getElementProperty("duration-text", "y") + 27.5 * scale + 20 * scale),
        width: (30 * scale),
        height: (30 * scale),
        path: "./assets/play.png",
        onLeftMouseUp: () => {
            ipcRenderer.send("media-control", "playpause");
        }
    });

    // Next button
    ui.addShape({
        id: "next-bg-shape",
        type: "ellipse",
        x: ((350 * scale) / 2 + 55 * scale),
        y: (ui.getElementProperty("duration-text", "y") + 40 * scale),
        width: (45 * scale),
        height: (45 * scale),
        fillColor: "rgba(0, 120, 255, 0.1)",
        strokeWidth: 0,
        onMouseOver: function () {
            ui.setElementProperties("next-bg-shape", { fillColor: "rgba(0, 120, 255, 0.2)" });
        },
        onMouseLeave: function () {
            ui.setElementProperties("next-bg-shape", { fillColor: "rgba(0, 120, 255, 0.1)" });
        },
        onLeftMouseUp: () => {
            ipcRenderer.send("media-control", "next");
        }
    });

    ui.addImage({
        id: "next-png",
        x: ((350 * scale) / 2 + 55 * scale + 12 * scale),
        y: (ui.getElementProperty("duration-text", "y") + 40 * scale + 12 * scale),
        width: (21 * scale),
        height: (21 * scale),
        path: "./assets/next.png",
        onLeftMouseUp: () => {
            ipcRenderer.send("media-control", "next");
        }
    });

    ui.endUpdate();
}

function style4() {
    ui.beginUpdate();

    // Background
    ui.addShape({
        id: "background",
        type: "rectangle",
        width: (450 * scale),
        height: (180 * scale),
        radius: 12,
        fillColor: "rgba(10,10,10,0.2)"
    });

    // Cover container (rounded square)
    ui.addShape({
        id: "cover-container",
        type: "rectangle",
        x: (12 * scale),
        y: (12 * scale),
        width: (156 * scale),
        height: (156 * scale),
        radius: 12,
    });

    ui.addImage({
        id: "cover-image",
        width: (156 * scale),
        height: (156 * scale),
        path: "./assets/cover.png",
        container: "cover-container",
    });

    // Right section center: (180 + (450 - 180) / 2) = 315
    const rightCenter = 315 * scale;

    // Song title text
    ui.addText({
        id: "song-title",
        text: "---",
        fontColor: "rgb(255, 255, 255)",
        fontFace: "Segoe UI",
        textAlign: "center",
        fontSize: (20 * scale),
        fontWeight: 700,
        x: rightCenter,
        y: (25 * scale),
        width: (250 * scale),
        textClip: "ellipsis"
    });

    // Song artist text
    ui.addText({
        id: "song-artist",
        text: "---",
        fontColor: "rgba(255, 255, 255, 0.8)",
        fontFace: "Segoe UI",
        textAlign: "center",
        fontSize: (16 * scale),
        x: rightCenter,
        y: (60 * scale),
        width: (250 * scale),
        textClip: "ellipsis"
    });

    // Controls
    const buttonY = 100 * scale;

    // Previous button
    ui.addShape({
        id: "previous-bg-shape",
        type: "ellipse",
        x: (rightCenter - 90 * scale),
        y: buttonY + 5 * scale,
        width: (40 * scale),
        height: (40 * scale),
        fillColor: "rgba(255, 255, 255, 0.1)",
        strokeWidth: 0,
        onMouseOver: () => ui.setElementProperties("previous-bg-shape", { fillColor: "rgba(255, 255, 255, 0.2)" }),
        onMouseLeave: () => ui.setElementProperties("previous-bg-shape", { fillColor: "rgba(255, 255, 255, 0.1)" }),
        onLeftMouseUp: () => ipcRenderer.send("media-control", "previous")
    });
    ui.addImage({
        id: "previous-png",
        path: "./assets/previous.png",
        x: (rightCenter - 90 * scale + 10 * scale),
        y: (buttonY + 15 * scale),
        width: (20 * scale),
        height: (20 * scale),
        onLeftMouseUp: () => ipcRenderer.send("media-control", "previous")
    });

    // Play/Pause button
    ui.addShape({
        id: "playpause-bg-shape",
        type: "ellipse",
        x: (rightCenter - 25 * scale),
        y: buttonY,
        width: (50 * scale),
        height: (50 * scale),
        fillColor: "rgba(255, 255, 255, 0.2)",
        strokeWidth: 0,
        onMouseOver: () => ui.setElementProperties("playpause-bg-shape", { fillColor: "rgba(255, 255, 255, 0.3)" }),
        onMouseLeave: () => ui.setElementProperties("playpause-bg-shape", { fillColor: "rgba(255, 255, 255, 0.2)" }),
        onLeftMouseUp: () => ipcRenderer.send("media-control", "playpause")
    });
    ui.addImage({
        id: "playpause-png",
        path: "./assets/play.png",
        x: (rightCenter - 25 * scale + 12.5 * scale),
        y: (buttonY + 12.5 * scale),
        width: (25 * scale),
        height: (25 * scale),
        onLeftMouseUp: () => ipcRenderer.send("media-control", "playpause")
    });

    // Next button
    ui.addShape({
        id: "next-bg-shape",
        type: "ellipse",
        x: (rightCenter + 50 * scale),
        y: buttonY + 5 * scale,
        width: (40 * scale),
        height: (40 * scale),
        strokeWidth: 0,
        fillColor: "rgba(255, 255, 255, 0.1)",
        onMouseOver: () => ui.setElementProperties("next-bg-shape", { fillColor: "rgba(255, 255, 255, 0.2)" }),
        onMouseLeave: () => ui.setElementProperties("next-bg-shape", { fillColor: "rgba(255, 255, 255, 0.1)" }),
        onLeftMouseUp: () => ipcRenderer.send("media-control", "next")
    });
    ui.addImage({
        id: "next-png",
        path: "./assets/next.png",
        x: (rightCenter + 50 * scale + 10 * scale),
        y: (buttonY + 15 * scale),
        width: (20 * scale),
        height: (20 * scale),
        onLeftMouseUp: () => ipcRenderer.send("media-control", "next")
    });

    // Progress Section
    const progressY = 155 * scale;
    ui.addText({
        id: "position-text",
        text: "00:00",
        fontColor: "rgba(255, 255, 255, 0.9)",
        fontSize: (12 * scale),
        x: (180 * scale + 10 * scale),
        y: progressY,
        textAlign: "left"
    });

    ui.addText({
        id: "duration-text",
        text: "00:00",
        fontColor: "rgba(255, 255, 255, 0.9)",
        fontSize: (12 * scale),
        x: (450 * scale - 10 * scale),
        y: progressY,
        textAlign: "right"
    });

    ui.addBar({
        id: "song-progress-bar",
        x: (180 * scale + 10 * scale),
        y: (progressY + 18 * scale),
        width: (450 * scale - 180 * scale - 20 * scale),
        height: (4 * scale),
        value: 1,
        barColor: "rgba(46, 240, 122, 1)",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        backgroundColorRadius: (2 * scale),
        barCornerRadius: (2 * scale),
        onLeftMouseUp: (e) => {
            const pct = Math.max(0, Math.min(100, e?.__offsetXPercent ?? 0));
            ipcRenderer.send("media-seek", pct);
        }
    });

    ui.endUpdate();
}

function style5() {
    ui.beginUpdate();

    // Background - Deep navy/purple
    ui.addShape({
        id: "background",
        type: "rectangle",
        width: (380 * scale),
        height: (640 * scale),
        fillColor: "rgba(35, 33, 72, 1)",
        strokeWidth: 0
    });

    // Cover Art container
    ui.addShape({
        id: "cover-container",
        type: "rectangle",
        x: (20 * scale),
        y: (20 * scale),
        width: (340 * scale),
        height: (340 * scale),
        radius: 20,
        strokeWidth: 0
    });

    ui.addImage({
        id: "cover-image",
        width: (340 * scale),
        height: (340 * scale),
        path: "./assets/cover.png",
        container: "cover-container",
    });

    // Song Info (Centered)
    const centerX = 190 * scale;

    ui.addText({
        id: "song-title",
        text: "---",
        fontColor: "rgb(255, 255, 255)",
        fontFace: "Segoe UI",
        textAlign: "center",
        fontSize: (26 * scale),
        fontWeight: 700,
        x: centerX,
        y: (380 * scale),
        width: (340 * scale),
        textClip: "ellipsis"
    });

    ui.addText({
        id: "song-artist",
        text: "---",
        fontColor: "rgba(255, 255, 255, 0.6)",
        fontFace: "Segoe UI",
        textAlign: "center",
        fontSize: (18 * scale),
        x: centerX,
        y: (415 * scale),
        width: (340 * scale),
        textClip: "ellipsis"
    });

    // Progress Bar (Neon Magenta)
    ui.addBar({
        id: "song-progress-bar",
        x: (30 * scale),
        y: (460 * scale),
        width: (320 * scale),
        height: (4 * scale),
        value: 1,
        barColor: "rgba(255, 0, 255, 1)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backgroundColorRadius: (2 * scale),
        barCornerRadius: (2 * scale),
        onLeftMouseUp: (e) => {
            const pct = Math.max(0, Math.min(100, e?.__offsetXPercent ?? 0));
            ipcRenderer.send("media-seek", pct);
        }
    });

    // Time Labels
    ui.addText({
        id: "position-text",
        text: "0:00",
        fontColor: "rgba(255, 255, 255, 0.5)",
        fontSize: (13 * scale),
        x: (30 * scale),
        y: (475 * scale),
        textAlign: "left"
    });

    ui.addText({
        id: "duration-text",
        text: "0:00",
        fontColor: "rgba(255, 255, 255, 0.5)",
        fontSize: (13 * scale),
        x: (350 * scale),
        y: (475 * scale),
        textAlign: "right"
    });

    // Controls Section
    const controlsY = 505 * scale;

    // Previous Button
    ui.addShape({
        id: "previous-bg-shape",
        type: "ellipse",
        x: (centerX - 110 * scale),
        y: (controlsY + 10 * scale),
        width: (50 * scale),
        height: (50 * scale),
        fillColor: "rgba(255, 255, 255, 0.1)",
        strokeWidth: 0,
        onLeftMouseUp: () => ipcRenderer.send("media-control", "previous")
    });
    ui.addImage({
        id: "previous-png",
        path: "./assets/Previous.png",
        x: (centerX - 110 * scale + 15 * scale),
        y: (controlsY + 25 * scale),
        width: (20 * scale),
        height: (20 * scale),
        onLeftMouseUp: () => ipcRenderer.send("media-control", "previous")
    });

    // Play/Pause Button (Neon Glow)
    // Outer glow
    ui.addShape({
        id: "playpause-glow",
        type: "ellipse",
        x: (centerX - 45 * scale),
        y: (controlsY - 5 * scale),
        width: (90 * scale),
        height: (90 * scale),
        fillColor: "rgba(255, 0, 255, 0.2)",
        strokeWidth: 0
    });

    ui.addShape({
        id: "playpause-bg-shape",
        type: "ellipse",
        x: (centerX - 40 * scale),
        y: controlsY,
        width: (80 * scale),
        height: (80 * scale),
        fillColor: "rgba(180, 0, 255, 1)",
        strokeWidth: 0,
        onLeftMouseUp: () => ipcRenderer.send("media-control", "playpause")
    });

    ui.addImage({
        id: "playpause-png",
        path: "./assets/Play.png",
        x: (centerX - 40 * scale + 25 * scale),
        y: (controlsY + 25 * scale),
        width: (30 * scale),
        height: (30 * scale),
        onLeftMouseUp: () => ipcRenderer.send("media-control", "playpause")
    });

    // Next Button
    ui.addShape({
        id: "next-bg-shape",
        type: "ellipse",
        x: (centerX + 60 * scale),
        y: (controlsY + 10 * scale),
        width: (50 * scale),
        height: (50 * scale),
        fillColor: "rgba(255, 255, 255, 0.1)",
        strokeWidth: 0,
        onLeftMouseUp: () => ipcRenderer.send("media-control", "next")
    });
    ui.addImage({
        id: "next-png",
        path: "./assets/Next.png",
        x: (centerX + 60 * scale + 15 * scale),
        y: (controlsY + 25 * scale),
        width: (20 * scale),
        height: (20 * scale),
        onLeftMouseUp: () => ipcRenderer.send("media-control", "next")
    });

    // Decorative neon bars
    for (let i = 0; i < 4; i++) {
        ui.addShape({
            id: `decorative-bar-${i}`,
            type: "rectangle",
            x: (centerX - 26 * scale + (i * 15 * scale)),
            y: (controlsY + 115 * scale),
            width: (8 * scale),
            height: (12 * scale),
            radius: 4,
            strokeWidth: 0,
            fillColor: "rgba(255, 0, 255, 1)"
        });
    }

    ui.endUpdate();
}
ipcRenderer.on("now-playing-update", (event, data) => {

    // console.log(JSON.stringify(data, null, 2))
    ui.beginUpdate();
    // Update song title
    if (data.title) {
        ui.setElementProperties("song-title", { text: data.title });
    }

    // Update song artist
    if (data.artist) {
        ui.setElementProperties("song-artist", { text: data.artist });
    }

    // Update cover image
    if (data.thumbnail) {
        ui.setElementProperties("cover-image", { path: data.thumbnail });
    }

    // Update progress bar
    if (data.progress !== undefined) {
        ui.setElementProperties("song-progress-bar", { value: data.progress / 100 });
    }

    // Update position text
    if (data.position !== undefined) {
        const positionMinutes = Math.floor(data.position / 60);
        const positionSeconds = data.position % 60;
        const positionText = `${positionMinutes.toString().padStart(2, '0')}:${positionSeconds.toString().padStart(2, '0')}`;
        ui.setElementProperties("position-text", { text: positionText });
    }

    // Update duration text
    if (data.duration !== undefined) {
        const durationMinutes = Math.floor(data.duration / 60);
        const durationSeconds = data.duration % 60;
        const durationText = `${durationMinutes.toString().padStart(2, '0')}:${durationSeconds.toString().padStart(2, '0')}`;
        ui.setElementProperties("duration-text", { text: durationText });
    }

    // Update play/pause icon based on state (1 = playing, 2 = paused)
    if (data.state !== undefined) {
        const playPausePath = data.state === 1 ? "./assets/pause.png" : "./assets/play.png";
        ui.setElementProperties("playpause-png", { path: playPausePath });
    }
    ui.endUpdate();
});

ipcRenderer.on("audio-data", function (event, data) {
    if (style !== 5) return; // Only process if we are currently in style5

    if (data.bands) {
        ui.beginUpdate();
        const baseCenterY = 505 * scale; // controlsY
        const floorY = baseCenterY + 127 * scale; // Original y (130) + original height (12)
        const maxBarHeight = 30 * scale;
        const minBarHeight = 2 * scale;

        for (let i = 0; i < 4; i++) {
            let v = i < data.bands.length ? data.bands[i] : 0;
            let h = Math.max(minBarHeight, v * maxBarHeight);
            let y = floorY - h;

            ui.setElementProperties(`decorative-bar-${i}`, { height: h, y: y });
        }
        ui.endUpdate();
    }
});