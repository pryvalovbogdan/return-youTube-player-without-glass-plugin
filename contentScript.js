const PROCESSED_CLASS = 'olds';
const MODIFIED_CLASS = 'modified-old-version';
const OLD_CONTROL_CLASS = 'old-control-style';

const CONTROL_CLASS = '.ytp-chrome-controls';
const LEFT_CONTROLS_CLASS = '.ytp-left-controls';
const PLAY_BUTTON_CLASS = '.ytp-play-button';
const PREV_BUTTON_CLASS = '.ytp-prev-button';
const NEXT_BUTTON_CLASS = '.ytp-next-button';
const VOLUME_ICON_CLASS = '.ytp-volume-icon';
const SETTINGS_BUTTON_CLASS = '.ytp-settings-button';
const SIZE_BUTTON_CLASS = '.ytp-size-button';
const FULLSCREEN_BUTTON_CLASS = '.ytp-fullscreen-button';
const SUBTITLES_BUTTON_CLASS = '.ytp-subtitles-button';
const SECONDARY_PAGE_SELECTOR = '#content';
const ATTRIBUTE_TOOLTIP_SELECTOR = 'data-title-no-tooltip';

const SOUND_ATTR = 'Mute';
const SIZE_ATTR = 'Default view';
const FULL_SCREEN_ATTR = 'Full screen';

const MAX_ITERATIONS = 3;
let interval = null;
let currentIteration = 0;

const SVG_HEADER = '<svg class="no-padding" height="100%" viewBox="0 0 36 36" width="100%"';
const SIDE_BACKGROUND_STYLES = 'position: absolute; width: 12px; height: 100%; background: black; ';

const svgs = {
    volumeMuted: `<div class="${MODIFIED_CLASS} Mute" style="display: contents">${SVG_HEADER}> <path d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z" fill="#fff"></path></svg></div>`,
    volumeUnmuted: `<div class="${MODIFIED_CLASS} Unmute" style="display: contents">${SVG_HEADER}> <use class="ytp-svg-shadow" xlink:href="#ytp-id-17"></use><path class="ytp-svg-fill" d="m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z" id="ytp-id-17"></path></svg></div>`,

    nextTrack: `<div class="next-track-wrapper">${SVG_HEADER}> <path class="ytp-svg-fill" d="M 12,24 20.5,18 12,12 V 24 z M 22,12 v 12 h 2 V 12 h -2 z" id="ytp-id-13"></path></svg></div>`,
    prevTrack: `<div class="next-track-wrapper">${SVG_HEADER}> <path class="ytp-svg-fill" d="m 12,12 h 2 v 12 h -2 z m 3.5,6 8.5,6 V 12 z" id="ytp-id-11"></path></svg></div>`,

    settings: `<div style="display: contents">${SVG_HEADER}> <path d="m 23.94,18.78 c .03,-0.25 .05,-0.51 .05,-0.78 0,-0.27 -0.02,-0.52 -0.05,-0.78 l 1.68,-1.32 c .15,-0.12 .19,-0.33 .09,-0.51 l -1.6,-2.76 c -0.09,-0.17 -0.31,-0.24 -0.48,-0.17 l -1.99,.8 c -0.41,-0.32 -0.86,-0.58 -1.35,-0.78 l -0.30,-2.12 c -0.02,-0.19 -0.19,-0.33 -0.39,-0.33 l -3.2,0 c -0.2,0 -0.36,.14 -0.39,.33 l -0.30,2.12 c -0.48,.2 -0.93,.47 -1.35,.78 l -1.99,-0.8 c -0.18,-0.07 -0.39,0 -0.48,.17 l -1.6,2.76 c -0.10,.17 -0.05,.39 .09,.51 l 1.68,1.32 c -0.03,.25 -0.05,.52 -0.05,.78 0,.26 .02,.52 .05,.78 l -1.68,1.32 c -0.15,.12 -0.19,.33 -0.09,.51 l 1.6,2.76 c .09,.17 .31,.24 .48,.17 l 1.99,-0.8 c .41,.32 .86,.58 1.35,.78 l .30,2.12 c .02,.19 .19,.33 .39,.33 l 3.2,0 c .2,0 .36,-0.14 .39,-0.33 l .30,-2.12 c .48,-0.2 .93,-0.47 1.35,-0.78 l 1.99,.8 c .18,.07 .39,0 .48,-0.17 l 1.6,-2.76 c .09,-0.17 .05,-0.39 -0.09,-0.51 l -1.68,-1.32 0,0 z m -5.94,2.01 c -1.54,0 -2.8,-1.25 -2.8,-2.8 0,-1.54 1.25,-2.8 2.8,-2.8 1.54,0 2.8,1.25 2.8,2.8 0,1.54 -1.25,2.8 -2.8,2.8 l 0,0 z" fill="#fff" id="ytp-id-19"></path></svg></div>`,

    sizeDefault: `<div class="${MODIFIED_CLASS} Default-view" style="display: contents">${SVG_HEADER}> <path d="m 26,13 0,10 -16,0 0,-10 z m -14,2 12,0 0,6 -12,0 0,-6 z" fill="#fff" fill-rule="evenodd" id="ytp-id-100"></path></svg></div>`,
    sizeTheater: `<div class="${MODIFIED_CLASS} Theater-mode" style="display: contents">${SVG_HEADER}> <path d="m 28,11 0,14 -20,0 0,-14 z m -18,2 16,0 0,10 -16,0 0,-10 z" fill="#fff" fill-rule="evenodd" id="ytp-id-29"></path></svg></div>`,

    fullScreen: `<div class="${MODIFIED_CLASS} Full-screen" style="display: contents">${SVG_HEADER}> <g class="ytp-fullscreen-button-corner-0"><path class="ytp-svg-fill" d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z" id="ytp-id-120"></path></g><g class="ytp-fullscreen-button-corner-1"><path class="ytp-svg-fill" d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z" id="ytp-id-121"></path></g><g class="ytp-fullscreen-button-corner-2"><path class="ytp-svg-fill" d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z" id="ytp-id-122"></path></g><g class="ytp-fullscreen-button-corner-3"><path class="ytp-svg-fill" d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z" id="ytp-id-123"></path></g></svg></div>`,
    exitFullScreen: `<div class="${MODIFIED_CLASS} Exit-full-screen" style="display: contents">${SVG_HEADER}> <g class="ytp-fullscreen-button-corner-2"><path class="ytp-svg-fill" d="m 14,14 -4,0 0,2 6,0 0,-6 -2,0 0,4 0,0 z" id="ytp-id-112"></path></g><g class="ytp-fullscreen-button-corner-3"><path class="ytp-svg-fill" d="m 22,14 0,-4 -2,0 0,6 6,0 0,-2 -4,0 0,0 z" id="ytp-id-113"></path></g><g class="ytp-fullscreen-button-corner-0"><path class="ytp-svg-fill" d="m 20,26 2,0 0,-4 4,0 0,-2 -6,0 0,6 0,0 z" id="ytp-id-114"></path></g><g class="ytp-fullscreen-button-corner-1"><path class="ytp-svg-fill" d="m 10,22 4,0 0,4 2,0 0,-6 -6,0 0,2 0,0 z" id="ytp-id-115"></path></g></svg></div>`,

    subtitlesOn: `<div class="${MODIFIED_CLASS} true" style="display: contents">${SVG_HEADER} fill-opacity="1"><path d="M11,11 C9.89,11 9,11.9 9,13 L9,23 C9,24.1 9.89,25 11,25 L25,25 C26.1,25 27,24.1 27,23 L27,13 C27,11.9 26.1,11 25,11 L11,11 Z M17,17 L15.5,17 L15.5,16.5 L13.5,16.5 L13.5,19.5 L15.5,19.5 L15.5,19 L17,19 L17,20 C17,20.55 16.55,21 16,21 L13,21 C12.45,21 12,20.55 12,20 L12,16 C12,15.45 12.45,15 13,15 L16,15 C16.55,15 17,15.45 17,16 L17,17 L17,17 Z M24,17 L22.5,17 L22.5,16.5 L20.5,16.5 L20.5,19.5 L22.5,19.5 L22.5,19 L24,19 L24,20 C24,20.55 23.55,21 23,21 L20,21 C19.45,21 19,20.55 19,20 L19,16 C19,15.45 19.45,15 20,15 L23,15 C23.55,15 24,15.45 24,16 L24,17 L24,17 Z" fill="#fff" id="ytp-id-18"></path></svg></div>`,
    subtitlesOff: `<div class="${MODIFIED_CLASS} false" style="display: contents">${SVG_HEADER} fill-opacity="0.3"><path d="M11,11 C9.89,11 9,11.9 9,13 L9,23 C9,24.1 9.89,25 11,25 L25,25 C26.1,25 27,24.1 27,23 L27,13 C27,11.9 26.1,11 25,11 L11,11 Z M17,17 L15.5,17 L15.5,16.5 L13.5,16.5 L13.5,19.5 L15.5,19.5 L15.5,19 L17,19 L17,20 C17,20.55 16.55,21 16,21 L13,21 C12.45,21 12,20.55 12,20 L12,16 C12,15.45 12.45,15 13,15 L16,15 C16.55,15 17,15.45 17,16 L17,17 L17,17 Z M24,17 L22.5,17 L22.5,16.5 L20.5,16.5 L20.5,19.5 L22.5,19.5 L22.5,19 L24,19 L24,20 C24,20.55 23.55,21 23,21 L20,21 C19.45,21 19,20.55 19,20 L19,16 C19,15.45 19.45,15 20,15 L23,15 C23.55,15 24,15.45 24,16 L24,17 L24,17 Z" fill="#fff" id="ytp-id-17"></path></svg></div>`,
};

const secondaryPage = document.querySelector(SECONDARY_PAGE_SELECTOR);

const setupButtonObserver = (btn, getNewHtml, getStateAttribute, childList = false) => {
    if (!btn) return;

    const observerCallback = () => {
        const stateAttr = getStateAttribute(btn);
        const svg = btn.querySelector(`.${MODIFIED_CLASS}`);
        const stateClass = stateAttr.replace(/\s/g, '-');

        if (svg && svg.classList.contains(stateClass)) {
            return;
        }

        btn.innerHTML = getNewHtml(btn);

        const newSvg = btn.querySelector(`.${MODIFIED_CLASS}`);
        if(newSvg) {
            newSvg.classList.add(MODIFIED_CLASS);
            newSvg.classList.add(stateClass);
        }
    };

    btn.innerHTML = getNewHtml(btn);

    const observer = new MutationObserver(observerCallback);

    observer.observe(btn, {
        attributes: true,
        childList,
    });
};

const handleAttachIconBasedOnTooltipAtr = (item, className, svgLeft, svgRight, attr, childList) => {
    const soundBtn = item.querySelector(className);
    if (!soundBtn) return;

    const getHtml = (btn) => {
        const isMuted = btn.getAttribute(ATTRIBUTE_TOOLTIP_SELECTOR) === attr;
        return isMuted ? svgLeft : svgRight;
    };

    const getStateAttr = (btn) => btn.getAttribute(ATTRIBUTE_TOOLTIP_SELECTOR);
    setupButtonObserver(soundBtn, getHtml, getStateAttr, childList);
}

const handleSubtitlesButton = (item) => {
    const subtitlesBtn = item.querySelector(SUBTITLES_BUTTON_CLASS);
    if (!subtitlesBtn) return;

    const getHtml = (btn) => {
        const isSubtitlesOn = btn.getAttribute('aria-pressed') === 'true';
        return isSubtitlesOn ? svgs.subtitlesOn : svgs.subtitlesOff;
    };

    const getStateAttr = (btn) => btn.getAttribute('aria-pressed');
    setupButtonObserver(subtitlesBtn, getHtml, getStateAttr);
};

const modifyControls = (item) => {
    if (item.classList.contains(PROCESSED_CLASS)) {
        return;
    }

    const bgLeft = document.createElement('div');
    bgLeft.style.cssText = SIDE_BACKGROUND_STYLES + 'left: -12px;';
    const bgRight = document.createElement('div');
    bgRight.style.cssText = SIDE_BACKGROUND_STYLES + 'right: -12px;';

    item.append(bgLeft);
    item.append(bgRight);
    item.classList.add(PROCESSED_CLASS);
    item.classList.add(OLD_CONTROL_CLASS);

    const leftControls = item.querySelector(LEFT_CONTROLS_CLASS);
    const playBtn = item.querySelector(PLAY_BUTTON_CLASS);
    const prevBtn = item.querySelector(PREV_BUTTON_CLASS);

    if (leftControls && playBtn && prevBtn) {
        leftControls.replaceChild(playBtn, prevBtn);
        leftControls.insertBefore(prevBtn, playBtn);
    }

    const nextBtn = item.querySelector(NEXT_BUTTON_CLASS);

    if (nextBtn) {
        nextBtn.innerHTML = svgs.nextTrack;
    }

    if (prevBtn) {
        prevBtn.innerHTML = svgs.prevTrack;
    }

    const settingsBtn = item.querySelector(SETTINGS_BUTTON_CLASS);

    if (settingsBtn) {
        settingsBtn.innerHTML = svgs.settings;
    }

    handleAttachIconBasedOnTooltipAtr(item, VOLUME_ICON_CLASS, svgs.volumeMuted, svgs.volumeUnmuted, SOUND_ATTR, true);
    handleAttachIconBasedOnTooltipAtr(item, SIZE_BUTTON_CLASS, svgs.sizeDefault, svgs.sizeTheater, SIZE_ATTR, false);
    handleAttachIconBasedOnTooltipAtr(item, FULLSCREEN_BUTTON_CLASS, svgs.fullScreen, svgs.exitFullScreen, FULL_SCREEN_ATTR, false);
    handleSubtitlesButton(item);
};

const callback = (mutationsList, observer) => {
    const controls = document.querySelectorAll(CONTROL_CLASS);

    if (controls.length > 0) {
        controls.forEach(modifyControls);

        observer.disconnect();
    }
};

function startProcessingPlugin(contentProp) {
    const content = contentProp || document.querySelector(SECONDARY_PAGE_SELECTOR);

    if (!content) {
        if (!interval) {
            interval = setInterval(() => {
                currentIteration++;
                const newContent = document.querySelector(SECONDARY_PAGE_SELECTOR);

                if (newContent) {
                    startProcessingPlugin(newContent);
                    clearInterval(interval);
                    return;
                }

                if (currentIteration >= MAX_ITERATIONS) {
                    clearInterval(interval);
                }
            }, 500);
        }
        return;
    }

    const initialControls = content.querySelectorAll(CONTROL_CLASS);

    if (initialControls.length > 0) {
        initialControls.forEach(modifyControls);
    }

    const config = { attributes: false, childList: true, subtree: true };
    const observer = new MutationObserver(callback);

    observer.observe(content, config);

    if (initialControls.length > 0) {
        observer.disconnect();
    }
}

startProcessingPlugin();