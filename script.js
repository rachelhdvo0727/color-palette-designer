"use strict";

window.addEventListener("DOMContentLoaded", init);

const HTML = {};
let r = 0,
    g = 0,
    b = 0;

function init() {
    HTML.selected = document.querySelector("#selected");
    HTML.boxes = document.querySelector("#container > div.box");
    HTML.hexinput = document.querySelector("#hexinput");
    HTML.hslinput = document.querySelector("#hslinput");
    HTML.rgbinput = document.querySelector("#rgbinput");

    HTML.selected.addEventListener("input", showColor);
}

function showColor() {
    const color = HTML.selected.value;
    document.querySelector("#container > div.box").style.backgroundColor = color;
    HTML.hexinput.value = color;
    HTML.rgbinput.value = convertHEXtoRGB();
    HTML.hslinput.value = convertRGBtoHSL();
}

function convertHEXtoRGB() {
    //baseret på https://css-tricks.com/converting-color-spaces-in-javascript/
    let color = HTML.selected.value;
    const input = color;

    // 3 digits
    if (input.length == 4) {
        r = "0x" + input[1] + input[1];
        g = "0x" + input[2] + input[2];
        b = "0x" + input[3] + input[3];

        // 6 digits
    } else if (input.length == 7) {
        r = "0x" + input[1] + input[2];
        g = "0x" + input[3] + input[4];
        b = "0x" + input[5] + input[6];
    }

    return "(" + +r + "," + +g + "," + +b + ")";
}

function convertRGBtoHSL() {
    let red = r / 255;
    let green = g / 255;
    let blue = b / 255;

    let h, s, l;

    const min = Math.min(red, green, blue);
    const max = Math.max(red, green, blue);

    if (max === min) {
        h = 0;
    } else
    if (max === red) {
        h = 60 * (0 + (green - blue) / (max - min));
    } else
    if (max === green) {
        h = 60 * (2 + (blue - red) / (max - min));
    } else
    if (max === blue) {
        h = 60 * (4 + (red - green) / (max - min));
    }

    if (h < 0) {
        h = h + 360;
    }

    l = (min + max) / 2;

    if (max === 0 || min === 1) {
        s = 0;
    } else {
        s = (max - l) / (Math.min(l, 1 - l));
    }
    // multiply s and l by 100 to get the value in percent, rather than [0,1]
    s *= 100;
    l *= 100;
    h = Math.floor(h);
    s = Math.floor(s);
    l = Math.floor(l);
    //console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
    return `${h},${s}%, ${l}%`;
}