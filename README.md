# YouTube player without glass

**Version:** 1.0.1

**Author:** Bogdan Pryvalov

---

## Summary

This Chrome extension removes the translucent "glass" effect from the YouTube player and replaces several built-in control icons with a simpler, old-style UI. It also provides custom SVG icons for volume, playback skip, settings, size/fullscreen toggles and subtitles to match the extension's visual language.

The extension runs as a content script on `https://*.youtube.com/*` pages and only changes the player UI visually — it does not alter playback behavior or network requests.

---

## Key features

* Removes YouTube's glass/translucent effect on the player controls.
* Adds left and right side backgrounds beside the control bar for a solid look.
* Reorders left controls (swap previous / play placement) to fit the old style.
* Replaces built-in control icons with custom SVG icons (mute/unmute, prev/next track, settings, theater/default size, fullscreen, subtitles on/off).
* Observes DOM mutations to react to YouTube's dynamic UI updates and keeps icons in sync with control state.

---

## Files included

* `manifest.json` — Chrome extension manifest (Manifest V3).
* `contentScript.js` — The main script that injects styles, replaces icons and observes the DOM.
* `content.css` — Optional CSS file to tweak visuals (not required but recommended).
* `assets/` — Directory for images and other web accessible resources (icons, GIFs, etc.).

---

## Installation (developer / unpacked)

1. Build or prepare the extension folder with `manifest.json`, `contentScript.js`, `content.css` and the `assets/` folder.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right).
4. Click **Load unpacked** and select your extension folder.
5. Visit `https://www.youtube.com/` and open a video to see the new controls.

> Note: The extension targets the YouTube front-end DOM structure. YouTube UI changes might require updates to selectors or mutation handling.

---

## Usage

The extension automatically runs on every YouTube page (matching `https://*.youtube.com/*`) and replaces controls on page load and when the player UI mutates. No user action is required.

If you want to temporarily disable it, either disable the extension from `chrome://extensions/` or modify the `matches` pattern in `manifest.json`.

---

## Development notes

* The script uses `MutationObserver` to handle YouTube's dynamic DOM updates. If you notice icons not updating correctly, check the element selectors and the observer configuration.
* Key selector constants to look at in `contentScript.js`:

    * `CONTROL_CLASS` — the player control container (e.g. `.ytp-chrome-controls`).
    * `LEFT_CONTROLS_CLASS`, `PLAY_BUTTON_CLASS`, `PREV_BUTTON_CLASS` etc. — used to find and reorder elements.
    * `ATTRIBUTE_TOOLTIP_SELECTOR` — used to read tooltip labels for volume/size/fullscreen state. If YouTube changes their tooltip attribute, you may need to update this.
* The script adds classes `olds` and `old-control-style` to processed control containers to avoid duplicate processing.

---

## Troubleshooting

* **Icons not replaced or flickering**

    * Make sure the extension is loaded and `contentScript.js` runs on the page (check DevTools -> Sources).
    * YouTube often changes class names and structures; open the Player DOM in DevTools and verify the selectors used in the script.

* **Controls overlap or layout breaks**

    * Inspect injected style rules (the script appends two `div`s to create side backgrounds). If the page layout changed, adjust `SIDE_BACKGROUND_STYLES` in `contentScript.js`.

* **Extension doesn't run on certain YouTube pages**

    * Confirm the page URL matches the manifest `matches` pattern (try `https://www.youtube.com/*`).

---

## Privacy & Safety

This extension only modifies client-side UI elements and does not collect, send or persist user data. It does not alter network requests, cookies, or storage. The only resources exposed via `web_accessible_resources` are images/GIFs used by the extension UI.

---

## License

Specify a license (e.g., MIT) in the repository root. Example `LICENSE` file content for MIT:

```
MIT License

Copyright (c) 2025 Bogdan Pryvalov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction.
```

---

## Changelog

* **1.0.1** — Initial public release (icons, reordering, background bars, mutation observers)

---

## FAQ

**Q: Will this extension affect video playback or performance?**
A: No. It only performs light DOM manipulations and observes the UI. The performance impact is minimal but depends on the number of MutationObservers active on the page. Keep changes lean and disconnect observers when not needed.

**Q: What if YouTube changes their control structure?**
A: Update selectors in `contentScript.js` (constants at the top) and adjust the mutation observer logic as needed.

---

If you want, I can also:

* Produce a compact `content.css` with suggested styles for the modified controls.
* Prepare a `build` script or a small `package.json` for easier packaging.
