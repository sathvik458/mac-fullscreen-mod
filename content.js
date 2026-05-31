// content.js
// Reads settings from chrome.storage and scales <video> tags in fullscreen.

console.log("mac-full-screen-scale: content script loaded");

var settings = {
  enabled: true,
  preset: "1.1111"
};

function loadSettings(done) {
  chrome.storage.local.get(["enabled", "preset"], function (data) {
    if (data.enabled !== undefined) { settings.enabled = data.enabled; }
    if (data.preset) { settings.preset = data.preset; }
    done();
  });
}

function scaleVideo(v) {
  if (!settings.enabled) {
    v.style.transform = "";
    return;
  }
  v.style.transform = "scale(" + settings.preset + ")";
  v.style.transformOrigin = "center center";
}

function scaleAll() {
  var videos = document.querySelectorAll("video");
  for (var i = 0; i < videos.length; i = i + 1) {
    scaleVideo(videos[i]);
  }
}

// run when fullscreen changes
document.addEventListener("fullscreenchange", function () {
  if (document.fullscreenElement) {
    loadSettings(scaleAll);
  } else {
    scaleAll(); // will clear transform when disabled
  }
});

// keep an eye on late-loading videos
var tries = 0;
var timer = setInterval(function () {
  tries = tries + 1;
  if (document.fullscreenElement) {
    loadSettings(scaleAll);
  }
  if (tries > 30) { clearInterval(timer); }
}, 1000);

// react when popup changes settings
chrome.storage.onChanged.addListener(function () {
  loadSettings(scaleAll);
});
