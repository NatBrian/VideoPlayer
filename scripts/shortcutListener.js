var shortcutBool = false;

// shortcut div box ON/OFF when mouse hover
document.getElementById("shortcutEnable").onmouseover = function() {mouseOver()};
document.getElementById("shortcutEnable").onmouseout = function() {mouseOut()};

function mouseOver() {
  document.getElementById("shortcutEnable").style.background = "#00ff00";
  document.getElementById("shortcutEnable").innerHTML = "ON";
  shortcutBool = true;
}

function mouseOut() {
  document.getElementById("shortcutEnable").style.background = "#ff3300";
  document.getElementById("shortcutEnable").innerHTML = "OFF";
  shortcutBool = false;
}