const { ipcRenderer } = require("electron");
const fs = require("fs");

function gatherData() {
    document.getElementById("tejas").play();
    timeFormat = document.querySelector('input[name="tFormat"]:checked').value;
    dateRequired = document.querySelector(
        'input[name="dRequired"]:checked'
    ).value;
    position = document.querySelector('input[name="position"]:checked').value;
    fontColorTime = document.getElementById("fColor").value;
    fontColorDate = document.getElementById("fColorDate").value;
    fontSizeTime = document.getElementById("FontSizeTime").value;
    fontSizeDate = document.getElementById("FontSizeDate").value;
    fontFamilyTime = document.querySelector(
        'input[name="fFamilyTime"]:checked'
    ).value;
    fontFamilyDate = document.querySelector(
        'input[name="fFamilyDate"]:checked'
    ).value;
    fontWeightTime = document.getElementById("FontWeightTime").value;
    fontWeightDate = document.getElementById("FontWeightDate").value;

    data = {
        tF: timeFormat,
        dR: dateRequired,
        pos: position,
        fCT: fontColorTime,
        fCD: fontColorDate,
        fST: fontSizeTime,
        fSD: fontSizeDate,
        fFT: fontFamilyTime,
        fFD: fontFamilyDate,
        fWT: fontWeightTime,
        fWD: fontWeightDate,
    };
    ipcRenderer.send("recieved-settings",data);
}

function resetData() {
    document.getElementById("manoj").play()
    data = {
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
    };
    ipcRenderer.send("recieved-settings", data);
}
