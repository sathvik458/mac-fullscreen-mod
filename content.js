// content.js
// Find <video> tags and zoom them so a 16:9 video fills a 16:10 Mac screen.
//
// Why 1.1111? 16/9 = 1.7778 and 16/10 = 1.6. To make the video as TALL
// as the screen we have to grow it by 1.7778 / 1.6 = 1.1111 on the Y axis.
// I scale both axes by the same factor and let the sides go slightly off
// screen - that way it does not look stretched.

console.log("mac-full-screen-scale: content script loaded");

var SCALE_FACTOR = 1.1111;

function findVideos() {
  return document.querySelectorAll("video");
}

function scaleVideo(v) {
  // do not scale twice
  if (v.dataset.macScaled === "1") {
    return;
  }
  v.style.transform = "scale(" + SCALE_FACTOR + ")";
  v.style.transformOrigin = "center center";
  v.dataset.macScaled = "1";
  console.log("mac-full-screen-scale: scaled a video");
}

function scaleAll() {
  var videos = findVideos();
  for (var i = 0; i < videos.length; i = i + 1) {
    scaleVideo(videos[i]);
  }
}

// only scale when the page is in fullscreen, otherwise it looks weird
document.addEventListener("fullscreenchange", function () {
  if (document.fullscreenElement) {
    scaleAll();
  }
});

// also keep trying in case a video loads late
var tries = 0;
var timer = setInterval(function () {
  tries = tries + 1;
  if (document.fullscreenElement) {
    scaleAll();
  }
  if (tries > 30) {
    clearInterval(timer);
  }
}, 1000);
