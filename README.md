# Mac Full Screen Scale

A tiny Chrome extension that scales 16:9 videos (YouTube, Netflix,
JioHotstar) so they fill the 16:10 Mac display. No more thick black
bars - feels like the bezels just got thinner.

## How it works
Mac laptops have a 16:10 screen, most videos are 16:9. The math:
  16/9 / 16/10 = 1.1111
So the script applies `transform: scale(1.1111)` to the `<video>`
element when the tab goes fullscreen. A tiny bit of the sides gets
cropped, top and bottom black bars disappear.

## Install (dev mode)
1. `git clone` this repo.
2. Open `chrome://extensions` in Chrome.
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and pick the project folder.
5. Pin the extension and open a YouTube video.
6. Press `F` (or the fullscreen button) on the video.

## Controls
- Click the extension icon for the popup.
- Toggle scaling, or pick a preset zoom.
- Hotkey: `Cmd+Shift+F` to flip on/off.

## Built in steps
- step 1: manifest + readme
- step 2: content script that finds video tags
- step 3: actual scaling math
- step 4: popup UI with toggle + preset
- step 5: hotkey + this readme

## Notes
- Tested on YouTube and JioHotstar. Netflix uses DRM video which
  resists CSS transforms - your mileage may vary.
- If the video looks stretched, switch the preset to 1.00x in the
  popup.
