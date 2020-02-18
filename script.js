"use strict";

window.addEventListener("DOMContentLoaded", init);

const HTML = {};
let red = 0,
  green = 0,
  blue = 0;

function init() {
  HTML.selected = document.querySelector("#selected");
  HTML.boxes = document.querySelector("#container > div.box");
  HTML.inputHEX = document.querySelector("#hexinput");
  HTML.inputHSL = document.querySelector("#hslinput");
  HTML.inputRGB = document.querySelector("#rgbinput");

  HTML.selected.addEventListener("input", showColor);
}

function showColor() {
  const color = HTML.selected.value;
  document.querySelector("#container > div.box").style.backgroundColor = color;
  HTML.inputHEX.value = color;
  HTML.inputRGB.value = convertHEXtoRGB();
  HTML.inputHSL.value = convertRGBtoHSL();
}

function convertHEXtoRGB() {
  //baseret på https://css-tricks.com/converting-color-spaces-in-javascript/
  let color = HTML.selected.value;
  let input = color;

  //hex value with 6 digits
  if (input.length == 7) {
    //0x is used to convert hex values
    red = "0x" + input[1] + input[2];
    green = "0x" + input[3] + input[4];
    blue = "0x" + input[5] + input[6];
  }

  return `${+red}, ${+green},${+blue}`;
}

function convertRGBtoHSL() {
  let r = red / 255;
  let g = green / 255;
  let b = blue / 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === blue) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;
  //round values up
  h = Math.floor(h);
  s = Math.floor(s);
  l = Math.floor(l);
  //console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  return `${h},${s}%, ${l}%`;
}
