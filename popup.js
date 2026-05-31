// popup.js
// Saves user choices in chrome.storage so the content script can read them.

var enabledBox = document.getElementById("enabled");
var presetBox  = document.getElementById("preset");

// load saved values on open
chrome.storage.local.get(["enabled", "preset"], function (data) {
  if (data.enabled === undefined) {
    enabledBox.checked = true;
  } else {
    enabledBox.checked = data.enabled;
  }
  if (data.preset) {
    presetBox.value = data.preset;
  }
});

// save when the user changes anything
function save() {
  chrome.storage.local.set({
    enabled: enabledBox.checked,
    preset: presetBox.value
  });
}

enabledBox.addEventListener("change", save);
presetBox.addEventListener("change", save);
