"use strict";

window.addEventListener("DOMContentLoaded", init);

const HTML = {};

function init() {
  console.log("init");
  //bruger valgte en farve
  HTML.selected = document.querySelector("#selected");
  //bruger valgte et tema
  HTML.harmonies = document.querySelector("form");
  HTML.ana = document.querySelector("#ana");
  HTML.mono = document.querySelector("#mono");
  HTML.triad = document.querySelector("#triad");
  HTML.complet = document.querySelector("#complet");
  HTML.shades = document.querySelector("#shades");
  //All color boxes
  HTML.box = document.querySelectorAll("#container > div.box");
  HTML.box0 = document.querySelector("#container > div.box.color0");
  HTML.box1 = document.querySelector("#container > div.box.color1");
  HTML.box2 = document.querySelector("#container > div.box.color2");
  HTML.box3 = document.querySelector("#container > div.box.color3");
  HTML.box4 = document.querySelector("#container > div.box.color4");

  //All inputs fields
  HTML.hexinput0 = document.querySelector("#hexinput0");
  HTML.hexinput1 = document.querySelector("#hexinput1");
  HTML.hexinput2 = document.querySelector("#hexinput2");
  HTML.hexinput3 = document.querySelector("#hexinput3");
  HTML.hexinput4 = document.querySelector("#hexinput4");

  HTML.hslinput0 = document.querySelector("#hslinput0");
  HTML.hslinput1 = document.querySelector("#hslinput1");
  HTML.hslinput2 = document.querySelector("#hslinput2");
  HTML.hslinput3 = document.querySelector("#hslinput3");
  HTML.hslinput4 = document.querySelector("#hslinput4");

  HTML.rgbinput0 = document.querySelector("#rgbinput0");
  HTML.rgbinput1 = document.querySelector("#rgbinput1");
  HTML.rgbinput2 = document.querySelector("#rgbinput2");
  HTML.rgbinput3 = document.querySelector("#rgbinput3");
  HTML.rgbinput4 = document.querySelector("#rgbinput4");

  action();
  getColor();
}

function action() {
  console.log("action");
  HTML.selected.addEventListener("input", getColor);
  HTML.harmonies.addEventListener("change", getHarmony);
}

function getColor() {
  console.log("getColor");
  //calls and receives information
  let hvalue = selectedHEXinput();
  const hexuse = usableHex(hvalue);
  const rgb = convertRGB(hexuse.r, hexuse.g, hexuse.b);
  const hsl = convertRGBtoHSL(rgb.r, rgb.g, rgb.b);
  showColorBox(hsl.h, hsl.s, hsl.l);

  const currentRGB = getRGBcurrent(setTheColor);
  showRGBinput(
    currentRGB.rgb0,
    currentRGB.rgb1,
    currentRGB.rgb2,
    currentRGB.rgb3,
    currentRGB.rgb4
  );
  const currentHSL = getHSLCurrent();
  showHSLinput(
    currentHSL.hsl0,
    currentHSL.hsl1,
    currentHSL.hsl2,
    currentHSL.hsl3,
    currentHSL.hsl4
  );
  const currentHEX = getHEXCurrent();
  showHEXinput(
    currentHEX.hex0,
    currentHEX.hex1,
    currentHEX.hex2,
    currentHEX.hex3,
    currentHEX.hex4
  );
}

function selectedHEXinput() {
  const selectedColor = HTML.selected.value;
  return selectedColor;
}
function getHarmony() {
  console.log("getHarmony");
  let harmony;
  //in the case of each harmony is chosen
  //use data-set to get the right input
  if (HTML.ana.checked) {
    let harmony = "ana";
    setTheColor(harmony);
  } else if (HTML.mono.checked) {
    let harmony = "mono";
    setTheColor(harmony);
  } else if (HTML.triad.checked) {
    let harmony = "triad";
    setTheColor(harmony);
  } else if (HTML.complet.checked) {
    let harmony = "comp";
    setTheColor(harmony);
  } else if (HTML.shades.checked) {
    let harmony = "shades";
    setTheColor(harmony);
  }
  getColor();
}
function setTheColor(harmony) {
  console.log("setTheColor");
  HTML.box0.dataset.color = "b0" + harmony;
  HTML.box1.dataset.color = "b1" + harmony;
  HTML.box2.dataset.color = "b2" + harmony;
  HTML.box3.dataset.color = "b3" + harmony;
  HTML.box4.dataset.color = "b4" + harmony;
}

function usableHex(hvalue) {
  //split the chosen hex value/string into 3 strings
  let r = hvalue.substring(1, 3);
  let g = hvalue.substring(3, 5);
  let b = hvalue.substring(5, 6 + 1);
  const rgb = { r, g, b };
  return rgb;
}
function convertRGB(r, g, b) {
  r = parseInt(r, 16);
  g = parseInt(g, 16);
  b = parseInt(b, 16);

  const rgbCalculated = { r, g, b };
  return rgbCalculated;
}

function getRGBcurrent() {
  console.log("getRGBcurrent");
  const b0rgb = getComputedStyle(HTML.box0);
  const b1rgb = getComputedStyle(HTML.box1);
  const b2rgb = getComputedStyle(HTML.box2);
  const b3rgb = getComputedStyle(HTML.box3);
  const b4rgb = getComputedStyle(HTML.box4);

  const rgb0 = b0rgb.backgroundColor;
  const rgb1 = b1rgb.backgroundColor;
  const rgb2 = b2rgb.backgroundColor;
  const rgb3 = b3rgb.backgroundColor;
  const rgb4 = b4rgb.backgroundColor;

  const currentRGB = { rgb0, rgb1, rgb2, rgb3, rgb4 };
  return currentRGB;
}

function getHEXCurrent(rgb0, rgb1, rgb2, rgb3, rgb4) {
  console.log("getHEXCurrent");
  const hex0 = convertRGBtoHEXstr(rgb0);
  const hex1 = convertRGBtoHEXstr(rgb1);
  const hex2 = convertRGBtoHEXstr(rgb2);
  const hex3 = convertRGBtoHEXstr(rgb3);
  const hex4 = convertRGBtoHEXstr(rgb4);

  const currentHEX = { hex0, hex1, hex2, hex3, hex4 };
  return currentHEX;
}

function getHSLCurrent(hex0, hex1, hex2, hex3, hex4) {
  console.log("getHSLCurrent");
  const hsl0 = convertHEXtoHSL(hex0);
  const hsl1 = convertHEXtoHSL(hex1);
  const hsl2 = convertHEXtoHSL(hex2);
  const hsl3 = convertHEXtoHSL(hex3);
  const hsl4 = convertHEXtoHSL(hex4);

  const currentHSL = { hsl0, hsl1, hsl2, hsl3, hsl4 };
  return currentHSL;
}

function showColorBox(h, s, l) {
  console.log("showColor");
  HTML.box0.style.setProperty("--hue", h);
  HTML.box1.style.setProperty("--hue", h);
  HTML.box2.style.setProperty("--hue", h);
  HTML.box3.style.setProperty("--hue", h);
  HTML.box4.style.setProperty("--hue", h);
}
function showHEXinput(hex0, hex1, hex2, hex3, hex4) {
  console.log("showHEXInput");
  HTML.hexinput0.value = hex0;
  HTML.hexinput1.value = hex1;
  HTML.hexinput2.value = hex2;
  HTML.hexinput3.value = hex3;
  HTML.hexinput4.value = hex4;
}
function showRGBinput(rgb0, rgb1, rgb2, rgb3, rgb4) {
  console.log("showRGBinput");
  HTML.rgbinput0.value = rgb0;
  HTML.rgbinput1.value = rgb1;
  HTML.rgbinput2.value = rgb2;
  HTML.rgbinput3.value = rgb3;
  HTML.rgbinput4.value = rgb4;
}
function showHSLinput(hsl0, hsl1, hsl2, hsl3, hsl4) {
  HTML.hslinput0.value = hsl0;
  HTML.hslinput1.value = hsl1;
  HTML.hslinput2.value = hsl2;
  HTML.hslinput3.value = hsl3;
  HTML.hslinput4.value = hsl4;
}

// BLACK BOXES - convertions of between different color codes

function convertRGBtoHEXstr(rgb) {
  console.log("convertRGBtoHEXstr");
  //baseret på https://css-tricks.com/converting-color-spaces-in-javascript/

  // Choose correct separator
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb
    .substring(4)
    .split(")")[0]
    .split(sep);

  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}

function convertHEXtoHSL(H) {
  let extention = /^#([\da-f]{3}){1,2}$/i;
  if (extention.test(H)) {
    // Convert hex to RGB first
    let r = 0,
      g = 0,
      b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    h = parseInt(h, 10);
    s = parseInt(h, 10);
    l = parseInt(h, 10);

    return "hsl(" + h + "," + s + "%," + l + "%)";
  }
}

function convertRGBtoHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  let h, s, l;
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    //if red is max
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    //if green is max
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    //if blue is max
    h = 60 * (4 + (r - g) / (max - min));
  }
  //make negative hues positive behind 360 degrees
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
  //change h,s,l to numbers
  h = parseInt(h);
  s = parseInt(s);
  l = parseInt(l);
  //change 3 values into object instead of string
  const hsl = { h, s, l };
  return hsl;
}

// function convertHEXtoRGB() {
//   //baseret på https://css-tricks.com/converting-color-spaces-in-javascript/
//   let colorPicked = HTML.selected.value;

//   //hex value with 6 digits
//   if (colorPicked.length == 7) {
//     //0x is used to convert hex values
//     r = "0x" + colorPicked[1] + colorPicked[2];
//     g = "0x" + colorPicked[3] + colorPicked[4];
//     b = "0x" + colorPicked[5] + colorPicked[6];
//   }

//   return `${+r}, ${+g}, ${+b}`;
// }
