// content.js
// This script runs on every webpage. For now it just tries to
// find the <video> tags on the page so I know it actually works.

console.log("mac-full-screen-scale: content script loaded");

// look for videos right away
function findVideos() {
  var videos = document.querySelectorAll("video");
  console.log("mac-full-screen-scale: found " + videos.length + " video(s)");
  return videos;
}

findVideos();

// some sites (like YouTube) load the video after the page is ready,
// so check again a few times.
var tries = 0;
var timer = setInterval(function () {
  tries = tries + 1;
  var videos = findVideos();
  if (videos.length > 0 || tries > 10) {
    clearInterval(timer);
  }
}, 1000);
