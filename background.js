// background.js
// Listens for the Cmd+Shift+F hotkey and flips the enabled setting.

chrome.commands.onCommand.addListener(function (command) {
  if (command !== "toggle-scale") { return; }

  chrome.storage.local.get(["enabled"], function (data) {
    var next = !data.enabled;
    chrome.storage.local.set({ enabled: next });
    console.log("mac-full-screen-scale: toggled to " + next);
  });
});
