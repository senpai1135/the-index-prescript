const prescripts = [
    { text: "Eat a potato raw. Do not peel it. Do not make eye contact with anyone while doing so.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "High-five the next person who asks you a serious question.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Buy a single banana and leave it on your neighbor's doorstep with no context.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "The next time you open the fridge, state your full name and purpose out loud to the milk.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Walk into a room, turn around completely three times, and leave without saying a word.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "For the next 10 minutes, you must refer to your phone exclusively as 'The device of doom.'", cooldown: { value: 10, unit: 'minutes' } },
    { text: "Whisper 'it is time' to a houseplant.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Point at a random object and gasp dramatically. Do not explain why.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Apologize to the next inanimate object you collide with, and wait for its response.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Stare intensely at the third step of the nearest staircase for exactly 90 seconds.", cooldown: { value: 90, unit: 'seconds' } },
    { text: "Hop on your left foot precisely five times before entering any convenience store.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Drink your next beverage using a spoon. Do not spill a single drop.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Tie your left shoe with your right hand, and your right shoe with your left hand.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Carry an empty cardboard box with you for the next three hours. Treat it with utmost care.", cooldown: { value: 3, unit: 'hours' } },
    { text: "The next time someone says 'Hello', reply with 'The forecast has changed' and walk away.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Hum a cheerful tune while maintaining an entirely blank, expressionless face.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "For the next hour, you must walk sideways like a crab whenever you are in a hallway.", cooldown: { value: 1, unit: 'hours' } },
    { text: "Place a single coin on your head. If it falls, you must remain still for two minutes.", cooldown: { value: 2, unit: 'minutes' } },
    { text: "Point at the nearest light fixture and state its color in a dramatic whisper.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Bow deeply to the next cat you see. If it meows, your instruction is complete.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Wear one sock inside out today. Do not correct it under any circumstance.", cooldown: { value: 12, unit: 'hours' } },
    { text: "When opening your next door, knock on it twice from the inside before stepping out.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Read the last text message you received backward, out loud, to an empty corner.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Eat your next meal entirely with your non-dominant hand while blindfolded.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Write the letter 'X' on a piece of paper, fold it four times, and drop it in a trash can.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Within the next 4 hours, count every window on the building to your left. Do not look back.", cooldown: { value: 4, unit: 'hours' } },
    { text: "Before the next bell rings, exchange your left shoe with someone else's right shoe.", cooldown: { value: 1, unit: 'hours' } },
    { text: "Walk exactly 44 paces north, turn 90 degrees clockwise, and blink three times.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Stand perfectly still for 180 seconds when the clock strikes a multiple of five.", cooldown: { value: 180, unit: 'seconds' } },
    { text: "Do not look at any mirrors or reflective surfaces until the sun fully sets.", cooldown: { value: 6, unit: 'hours' } },
    { text: "At exactly 3:15 PM, tear a blank piece of paper into seven equal strips.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Spend the next 10 minutes whispering your deepest secret to the nearest wall.", cooldown: { value: 10, unit: 'minutes' } },
    { text: "Leave a glass half-filled with lukewarm water on the exact center of your table.", cooldown: { value: 1, unit: 'hours' } },
    { text: "Do not speak any words containing the letter 'E' for the next fifteen minutes.", cooldown: { value: 15, unit: 'minutes' } },
    { text: "Look at the palm of your right hand for 2 minutes. Seek the lines that were not there yesterday.", cooldown: { value: 2, unit: 'minutes' } },
    { text: "Open your window exactly two inches and leave it that way until a bird flies past.", cooldown: { value: 2, unit: 'hours' } },
    { text: "Trace the outline of your front door with your index finger before leaving the house.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Sit on the floor and count to one hundred backwards. Do not skip any numbers.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Place a drop of ink on your left wrist and let it dry naturally.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Walk backward through the next threshold you cross, then sigh deeply.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Before tomorrow noon, you must hand a blank piece of paper to a complete stranger.", cooldown: { value: 12, unit: 'hours' } },
    { text: "Look at the sky. If you see a cloud shaped like an eye, close your eyes for 30 seconds.", cooldown: { value: 30, unit: 'seconds' } },
    { text: "The next time you hear a phone ring, hold your breath for precisely seven seconds.", cooldown: { value: 7, unit: 'seconds' } },
    { text: "Draw a circle on the ground with a piece of chalk or your shoe. Stand in it for a minute.", cooldown: { value: 1, unit: 'minutes' } },
    { text: "When someone asks you for the time, give them the exact time, but add three hours to it.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Greet the next person you see by their full name, even if you do not know them.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Carry a single paperclip in your right hand. Do not let go of it until you return home.", cooldown: { value: 4, unit: 'hours' } },
    { text: "The next time you see a red car, you must instantly change the direction you are walking.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Whisper 'The Index has spoken' to the next piece of mail you receive.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Stack three random objects on top of each other. Leave them there for the next passerby.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Before you sleep tonight, face the corner of your room and nod exactly three times.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Tap your fingers on the table in a 3-3-2 rhythm for the next two minutes.", cooldown: { value: 2, unit: 'minutes' } },
    { text: "Do not use your thumb on your left hand for the next thirty minutes.", cooldown: { value: 30, unit: 'minutes' } },
    { text: "The next time you wash your hands, use only cold water and count to forty out loud.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Look at the nearest clock. Add the numbers together. Take that many steps forward.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Put a small piece of paper inside your left shoe and walk with it for the rest of the day.", cooldown: { value: 6, unit: 'hours' } },
    { text: "Spin around once in a clockwise circle before answering any phone call.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "When you finish reading this, do not look at your screen for the next sixty seconds.", cooldown: { value: 60, unit: 'seconds' } },
    { text: "Within the next 22 hours, breathe normally and eat a bag of your favorite food.", cooldown: { value: 22, unit: 'hours' } },
    { text: "Before the next sunrise, open your door exactly three inches and leave it there for ten minutes.", cooldown: { value: 10, unit: 'minutes' } },
    { text: "Within the next 3 hours, look at the sky and blink exactly 45 times.", cooldown: { value: 3, unit: 'hours' } },
    { text: "Walk backward for 30 paces the next time you cross a threshold.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Drink a glass of water exactly 7 minutes after you read this command.", cooldown: { value: 7, unit: 'minutes' } },
    { text: "Before tomorrow afternoon, write down the name of the third person you speak to and shred it.", cooldown: { value: 12, unit: 'hours' } }
];

prescripts.push(
    { text: "The Index has reviewed your browser history and has no further questions. Proceed as normal.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "The Index has been informed that the potato has forgiven you. Go in peace.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Remain calm. This prescript was approved by the same committee that approved the banana.", cooldown: { value: 0, unit: 'seconds' } }
);

const mirrorPrescripts = [
    { text: "Call your mom. Tell her you love her.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Call your mom and stay on the line for at least five minutes. Let her talk.", cooldown: { value: 5, unit: 'minutes' } },
    { text: "Be kind to someone today who does not expect it. Do not wait to be asked.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Text a friend you haven't spoken to in a while. Ask how they are, and mean it.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Hold the door for the next stranger. Smile if you can.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Drink a glass of water. You have been taking care of everyone except yourself.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Give someone a sincere, specific compliment. Do not explain why.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Thank someone who never hears it enough.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Forgive yourself for one small thing. Right now. Out loud, if you need to.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Take a slow breath. Unclench your shoulders. You are doing better than you think.", cooldown: { value: 30, unit: 'seconds' } },
    { text: "Leave a kind note somewhere a stranger will find it.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Ask someone about their day, then actually listen to the answer.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Hug someone you love today. If you can't, tell them you wish you could.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Check in on the friend who always checks in on everyone else.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Let someone go ahead of you in line. Say nothing. Just nod.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Tell someone you are proud of them. Today.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Text someone: 'I'm glad you exist.' Then put your phone down.", cooldown: { value: 0, unit: 'seconds' } },
    { text: "Put one honest hour into resting. The world will still be there afterward.", cooldown: { value: 1, unit: 'hours' } }
];

const SAIKAI_CHANCE = 0.08;
const SAIKAI_YT_ID = 'h0djuhl97Kw';
const YT_LYRIC_OFFSET = 0;
const YT_LOAD_TIMEOUT_MS = 8000;
const SOURCE_PROBE_MS = 2500;
const SAIKAI_LEAD_IN_MS = 1800;
const LINE_SCRAMBLE_MS = 700;
const SAIKAI_INTRO = "[ TRANSMISSION: SAIKAI ]";
const saikaiPrescripts = {
    normal: {
        text: "A transmission is incoming. Do not look away. Do not request another Will until it has ended.",
        cooldown: { value: 0, unit: 'seconds' },
        special: 'saikai'
    },
    evil: {
        text: "Sit with me for a little while. Put everything else down. Listen until the very end.",
        cooldown: { value: 0, unit: 'seconds' },
        special: 'saikai'
    }
};
const glitchChars = "¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß◢◣◤◥■□▲△▼▽";
const SCRAMBLE_END = 1.41;
const REVEAL_START = 1.43;
const ASSETS = { normalImg: 'assets/img/index.png', evilImg: 'assets/img/evil_index.png' };
const TAP_THRESHOLD = 7;
const TAP_RESET_MS = 1500;
const TRANSFORM_MS = 1100;
const SWAP_AT_MS = 600;
const tapQuips = {
    normal: ["", "Please do not poke the Index.", "The Index felt that.", "This is not part of the Will.", "Stop. It is starting to shake.", "Last warning. Something is looking back."],
    evil:   ["", "The glass is warm.", "The mirror hums.", "Hold steady.", "It is smiling now.", "One more, and the glass lets go."]
};
const display = document.getElementById('prescriptDisplay');
const button = document.getElementById('generateBtn');
const logo = document.getElementById('indexLogo');
const logoContainer = document.getElementById('logoContainer');
const mainContainer = document.getElementById('mainContainer');
const tapHint = document.getElementById('tapHint');
const favicon = document.getElementById('favicon');
const sfx = document.getElementById('beeperSfx');
const song = document.getElementById('saikaiSfx');

let animationFrameId;
let targetSentence = "";
let lastSentence = "";
let audioEndTime = 3.00;
let frameCount = 0;
let countdownInterval;
let isEvil = false;
let evilImgMissing = false;
let busy = false;
let blocked = false;
let pendingSaikai = false;
let tapCount = 0;
let tapTimer;

const idleText = () => isEvil
    ? "Click below to see what the mirror wants to tell you."
    : "Click below to receive the Will of the Prescript.";
const doneText = () => isEvil
    ? "The mirror is quiet. Click below to look again."
    : "The evaluation is complete. Click below to receive the Will.";
const lockLabel = () => isEvil ? "THE MIRROR WAITS" : "EVALUATING PROXY EXECUTION";
const currentMode = () => isEvil ? 'evil' : 'normal';
const lockKey = (mode) => `prescript_lock_until_${mode}`;
const textKey = (mode) => `last_prescript_text_${mode}`;

function getRemainingTime(mode = currentMode()) {
    const lockUntil = localStorage.getItem(lockKey(mode));
    if (!lockUntil) return 0;
    const remaining = parseInt(lockUntil) - Date.now();
    return remaining > 0 ? remaining : 0;
}

function formatTime(ms) {
    const totalSecs = Math.floor(ms / 1000);
    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;

    if (hours > 0) return `${hours}h ${mins}m ${secs}s`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
}

function startUiLockout(remainingMs) {
    const mode = currentMode();
    button.disabled = true;
    const currentPrescript = localStorage.getItem(textKey(mode)) || "Execute your given assignment.";
    display.innerText = `${currentPrescript}\n\n[ ${lockLabel()}: ${formatTime(remainingMs)} ]`;

    if (countdownInterval) clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        const currentRemaining = getRemainingTime(mode);
        if (currentRemaining <= 0) {
            clearInterval(countdownInterval);
            localStorage.removeItem(lockKey(mode));
            localStorage.removeItem(textKey(mode));
            if (currentMode() === mode) {
                button.disabled = blocked;
                display.innerText = doneText();
            }
        } else if (!saikaiActive && currentMode() === mode) {
            display.innerText = `${currentPrescript}\n\n[ ${lockLabel()}: ${formatTime(currentRemaining)} ]`;
        }
    }, 1000);
}

window.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('prescript_lock_until');
    localStorage.removeItem('last_prescript_text');

    const remaining = getRemainingTime();
    if (remaining > 0) {
        startUiLockout(remaining);
    }
});

const deckKey = (mode) => `prescript_deck_${mode}`;

function shuffled(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function loadDeck(mode, pool) {
    try {
        const saved = JSON.parse(localStorage.getItem(deckKey(mode)));
        if (Array.isArray(saved)) {
            const valid = new Set(pool.map(p => p.text));
            return saved.filter(t => valid.has(t));
        }
    } catch (e) {  }
    return [];
}

function saveDeck(mode, deck) {
    try { localStorage.setItem(deckKey(mode), JSON.stringify(deck)); } catch (e) { /* ignore */ }
}

function drawPrescript(mode) {
    const pool = mode === 'evil' ? mirrorPrescripts : prescripts;
    let deck = loadDeck(mode, pool);

    if (deck.length === 0) {
        deck = shuffled(pool.map(p => p.text));
        if (deck.length > 1 && deck[0] === lastSentence) {
            const swap = 1 + Math.floor(Math.random() * (deck.length - 1));
            [deck[0], deck[swap]] = [deck[swap], deck[0]];
        }
    }

    const text = deck.shift();
    saveDeck(mode, deck);
    return pool.find(p => p.text === text);
}

button.addEventListener('click', () => {
    if (busy || getRemainingTime() > 0) return;

    busy = true;
    button.disabled = true;

    let selectedObj;
    if (Math.random() < SAIKAI_CHANCE) {
        selectedObj = isEvil ? saikaiPrescripts.evil : saikaiPrescripts.normal;
    } else {
        selectedObj = drawPrescript(currentMode());
    }

    pendingSaikai = selectedObj.special === 'saikai';
    if (pendingSaikai) prepareSaikaiSource();
    targetSentence = selectedObj.text;
    lastSentence = selectedObj.text;

    let cooldownMs = 0;
    if (selectedObj.cooldown.unit === 'hours') cooldownMs = selectedObj.cooldown.value * 60 * 60 * 1000;
    if (selectedObj.cooldown.unit === 'minutes') cooldownMs = selectedObj.cooldown.value * 60 * 1000;
    if (selectedObj.cooldown.unit === 'seconds') cooldownMs = selectedObj.cooldown.value * 1000;

    if (cooldownMs > 0) {
        localStorage.setItem(lockKey(currentMode()), Date.now() + cooldownMs);
        localStorage.setItem(textKey(currentMode()), targetSentence);
    }

    sfx.pause();
    sfx.currentTime = 0;
    frameCount = 0;

    sfx.play().then(() => {
        audioEndTime = sfx.duration || 3.00;
        animationFrameId = requestAnimationFrame(syncSequenceToAudio);
    }).catch(err => {
        console.log("Audio pipeline blocked by environment. Sequence running visually.", err);
        audioEndTime = 3.00;
        animationFrameId = requestAnimationFrame(syncSequenceToAudio);
    });
});

function getGlitchChar(index, currentText) {
    if (frameCount % 4 === 0 || !currentText[index] || currentText[index] === " ") {
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }
    return currentText[index];
}

function applyGlitchState(on) {
    display.classList.toggle('glitching', on);
    logo.classList.toggle('glitching', on);
    logo.style.transform = on
        ? `translate(${Math.random() * 6 - 3}px, ${Math.random() * 6 - 3}px)`
        : 'none';
}

let normalNextBurst = 0;
let normalBurstUntil = 0;

function syncSequenceToAudio() {
    let time = sfx.currentTime || (frameCount * 0.016);
    let currentOutput = "";
    const len = targetSentence.length;
    const previousText = display.innerText;
    const now = performance.now();
    frameCount++;

    if (frameCount === 1) {
        normalBurstUntil = 0;
        normalNextBurst = now + 300;
    }

    if (time < SCRAMBLE_END) {
        applyGlitchState(true);
        for (let i = 0; i < len; i++) {
            currentOutput += (targetSentence[i] === " ") ? " " : getGlitchChar(i, previousText);
        }
    }
    else if (time >= SCRAMBLE_END && time < REVEAL_START) {
        applyGlitchState(false);
        for (let i = 0; i < len; i++) {
            currentOutput += (targetSentence[i] === " ") ? " " : getGlitchChar(i, previousText);
        }
    }
    else if (time >= REVEAL_START && time < audioEndTime) {
        if (now >= normalNextBurst) {
            normalBurstUntil = now + 120 + Math.random() * 180;
            normalNextBurst = normalBurstUntil + 150 + Math.random() * 300;
        }
        const bursting = now < normalBurstUntil;
        applyGlitchState(bursting);

        let progress = (time - REVEAL_START) / (audioEndTime - REVEAL_START);
        let waveFront = Math.floor(len * progress);

        for (let i = 0; i < len; i++) {
            if (targetSentence[i] === " ") {
                currentOutput += " ";
            } else if (i < waveFront) {
                if ((i > waveFront - 5 && Math.random() < 0.3) || (bursting && Math.random() < 0.2)) {
                    currentOutput += getGlitchChar(i, previousText);
                } else {
                    currentOutput += targetSentence[i];
                }
            } else {
                currentOutput += getGlitchChar(i, previousText);
            }
        }
    }
    else {
        currentOutput = targetSentence;
        applyGlitchState(false);
    }

    display.innerText = currentOutput;

    const isAudioActive = !sfx.paused && !sfx.ended && sfx.currentTime > 0;
    if ((isAudioActive || time < audioEndTime) && currentOutput !== targetSentence) {
        animationFrameId = requestAnimationFrame(syncSequenceToAudio);
    } else {
        display.innerText = targetSentence;
        applyGlitchState(false);
        cancelAnimationFrame(animationFrameId);
        finishReveal();
    }
}

function finishReveal() {
    if (pendingSaikai) {
        pendingSaikai = false;
        setTimeout(startSaikai, SAIKAI_LEAD_IN_MS);
        return;
    }

    const remaining = getRemainingTime();
    if (remaining > 0) {
        startUiLockout(remaining);
    } else {
        button.disabled = blocked;
    }
    busy = false;
}

function parseLrc(raw) {
    const out = [];
    String(raw).split(/\r?\n/).forEach(line => {
        const m = line.match(/^\s*\[(\d+):(\d{1,2})(?:[.:](\d{1,3}))?\]\s*(.*)$/);
        if (!m) return;
        const frac = m[3] ? parseFloat('0.' + m[3]) : 0;
        out.push({ time: parseInt(m[1], 10) * 60 + parseInt(m[2], 10) + frac, text: m[4].trim() });
    });
    return out.sort((a, b) => a.time - b.time);
}

const lyrics = (typeof SAIKAI_LRC !== 'undefined') ? parseLrc(SAIKAI_LRC) : [];

let saikaiActive = false;
let lyricFrame;
let lyricFrames = 0;
let lyricIndex = -2;
let lineText = "";
let lineStart = 0;
let lastOut = "";
let nextBurstAt = 0;
let burstUntil = 0;

function randGlitch() {
    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
}

function scheduleBurst(from) {
    nextBurstAt = from + 2500 + Math.random() * 3500;
}

let songSource = null;
let sourcePromise = null;
let ytPlayer = null;
let ytApiPromise = null;

function probeLocalSong() {
    return new Promise(resolve => {
        if (song.error) return resolve(false);
        if (song.readyState >= 1) return resolve(true);

        let done = false;
        const finish = (ok) => {
            if (done) return;
            done = true;
            clearTimeout(timer);
            song.removeEventListener('loadedmetadata', onOk);
            song.removeEventListener('error', onFail);
            resolve(ok);
        };
        const onOk = () => finish(true);
        const onFail = () => finish(false);
        const timer = setTimeout(() => finish(false), SOURCE_PROBE_MS);
        song.addEventListener('loadedmetadata', onOk);
        song.addEventListener('error', onFail);
        if (song.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) song.load();
    });
}

function loadYouTubeApi() {
    if (ytApiPromise) return ytApiPromise;
    ytApiPromise = new Promise((resolve, reject) => {
        if (window.YT && window.YT.Player) return resolve();
        const prev = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
            if (typeof prev === 'function') prev();
            resolve();
        };
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.onerror = () => { ytApiPromise = null; reject(new Error('YouTube API blocked')); };
        document.head.appendChild(tag);
    });
    return ytApiPromise;
}

let ytReadyPromise = null;

function createYouTubePlayer() {
    if (ytReadyPromise) return ytReadyPromise;
    ytReadyPromise = loadYouTubeApi().then(() => new Promise((resolve, reject) => {
        ytPlayer = new YT.Player('ytPlayer', {
            width: 200,
            height: 200,
            videoId: SAIKAI_YT_ID,
            playerVars: { controls: 0, disablekb: 1, fs: 0, rel: 0, playsinline: 1, modestbranding: 1 },
            events: {
                onReady: () => resolve(ytPlayer),
                onStateChange: onYtStateChange,
                onError: () => {
                    if (saikaiActive) endSaikai(false);
                    else reject(new Error('YouTube player error'));
                }
            }
        });
    }));
    ytReadyPromise.catch(() => { ytReadyPromise = null; });
    return ytReadyPromise;
}

function withTimeout(promise, ms) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('Timed out')), ms);
        promise.then(
            v => { clearTimeout(timer); resolve(v); },
            e => { clearTimeout(timer); reject(e); }
        );
    });
}

function onYtStateChange(e) {
    if (!saikaiActive || songSource !== 'youtube') return;
    if (e.data === YT.PlayerState.ENDED) {
        endSaikai(true);
    } else if (e.data === YT.PlayerState.PAUSED) {
        ytPlayer.playVideo();
    }
}

function prepareSaikaiSource() {
    sourcePromise = probeLocalSong().then(hasLocal => {
        if (hasLocal) {
            songSource = 'local';
            return 'local';
        }
        songSource = 'youtube';
        return withTimeout(createYouTubePlayer(), YT_LOAD_TIMEOUT_MS).then(() => 'youtube');
    }).catch(err => {
        console.log("Saikai has no playable source (no local mp3, YouTube unavailable).", err);
        songSource = null;
        return null;
    });
    return sourcePromise;
}

function getSongTime() {
    if (songSource === 'youtube' && ytPlayer && typeof ytPlayer.getCurrentTime === 'function') {
        return (ytPlayer.getCurrentTime() || 0) + YT_LYRIC_OFFSET;
    }
    return song.currentTime;
}

function beginLyrics() {
    saikaiActive = true;
    lyricIndex = -2;
    lastOut = "";
    scheduleBurst(performance.now());
    lyricFrame = requestAnimationFrame(lyricLoop);
}

function startSaikai() {
    display.classList.add('lyric-mode');
    document.body.classList.add('transmitting');
    display.innerText = SAIKAI_INTRO;

    (sourcePromise || prepareSaikaiSource()).then(source => {
        if (source === 'local') {
            song.currentTime = 0;
            return song.play().then(beginLyrics);
        }
        if (source === 'youtube') {
            ytPlayer.seekTo(0, true);
            ytPlayer.playVideo();
            return new Promise((resolve, reject) => {
                const started = Date.now();
                const wait = setInterval(() => {
                    const st = ytPlayer.getPlayerState && ytPlayer.getPlayerState();
                    if (st === YT.PlayerState.PLAYING) {
                        clearInterval(wait);
                        resolve();
                    } else if (Date.now() - started > 6000) {
                        clearInterval(wait);
                        reject(new Error('YouTube playback was blocked'));
                    }
                }, 100);
            }).then(beginLyrics);
        }
        throw new Error('No source');
    }).catch(err => {
        console.log("Saikai could not play.", err);
        endSaikai(false);
    });
}

function lyricLoop(now) {
    if (!saikaiActive) return;
    lyricFrames++;
    const t = getSongTime();

    let idx = -1;
    for (let i = lyrics.length - 1; i >= 0; i--) {
        if (lyrics[i].time <= t) { idx = i; break; }
    }
    if (idx !== lyricIndex) {
        lyricIndex = idx;
        lineText = idx === -1 ? SAIKAI_INTRO : (lyrics[idx].text || "· · ·");
        lineStart = now;
        burstUntil = now + 350;
    }

    if (now >= nextBurstAt) {
        burstUntil = now + 180 + Math.random() * 220;
        scheduleBurst(burstUntil);
    }
    const bursting = now < burstUntil;
    applyGlitchState(bursting);

    const progress = Math.min(1, (now - lineStart) / LINE_SCRAMBLE_MS);
    const revealed = Math.floor(lineText.length * progress);
    let out = "";
    for (let i = 0; i < lineText.length; i++) {
        const ch = lineText[i];
        if (ch === " ") {
            out += " ";
        } else if (i >= revealed) {
            const keep = lastOut[i];
            out += (lyricFrames % 3 === 0 || !keep || keep === " ") ? randGlitch() : keep;
        } else if (bursting && Math.random() < 0.3) {
            out += randGlitch();
        } else {
            out += ch;
        }
    }
    lastOut = out;
    display.innerText = out;

    lyricFrame = requestAnimationFrame(lyricLoop);
}

function endSaikai(completed) {
    saikaiActive = false;
    cancelAnimationFrame(lyricFrame);
    display.classList.remove('lyric-mode', 'glitching');
    logo.classList.remove('glitching');
    document.body.classList.remove('transmitting');
    logo.style.transform = 'none';

    song.pause();
    if (ytPlayer && typeof ytPlayer.stopVideo === 'function') ytPlayer.stopVideo();
    sourcePromise = null;
    songSource = null;

    if (completed) {
        display.innerText = isEvil
            ? "Thank you for staying. You may go now."
            : "The transmission is complete. You may proceed.";
    } else {
        display.innerText = "The transmission was lost. You may proceed.";
    }

    busy = false;
    button.disabled = blocked;
}

song.addEventListener('ended', () => { if (saikaiActive && songSource === 'local') endSaikai(true); });
song.addEventListener('error', () => { if (saikaiActive && songSource === 'local') endSaikai(false); });
song.addEventListener('pause', () => {
    if (saikaiActive && songSource === 'local' && !song.ended) song.play().catch(() => {});
});

const preloadEvil = new Image();
preloadEvil.onerror = () => { evilImgMissing = true; };
preloadEvil.src = ASSETS.evilImg;

function setLogoImage(evil) {
    const useEvilFile = evil && !evilImgMissing;
    const src = useEvilFile ? ASSETS.evilImg : ASSETS.normalImg;
    logo.classList.toggle('evil-fallback', evil && evilImgMissing);
    logo.src = src;
    logo.alt = evil ? "The Index, reflected" : "The Index Logo";
    favicon.href = src;
}

logo.addEventListener('error', () => {
    if (isEvil && !evilImgMissing) {
        evilImgMissing = true;
        setLogoImage(true);
    }
});

function setMode(evil) {
    isEvil = evil;
    document.body.classList.toggle('evil', evil);
    setLogoImage(evil);
    button.textContent = "Receive Will";
    document.title = evil ? "The Index - Mirror" : "The Index - Prescript Generator";

    if (countdownInterval) clearInterval(countdownInterval);
    const remaining = getRemainingTime();
    if (remaining > 0) {
        startUiLockout(remaining);
    } else {
        display.innerText = evil
            ? "You tapped the glass. The mirror looks back at you."
            : "The mirror fades. The Index returns.";
    }
}

function showHint(text) {
    tapHint.textContent = text;
}

function shakeLogo(n) {
    logo.style.setProperty('--shake', `${1 + n * 1.5}px`);
    logo.style.setProperty('--tilt', `${0.8 + n * 0.9}deg`);
    logo.classList.remove('tap-shake');
    void logo.offsetWidth;
    logo.classList.add('tap-shake');
}

logo.addEventListener('animationend', (e) => {
    if (e.animationName === 'tapShake') logo.classList.remove('tap-shake');
});

let audioCtx = null;
let audioBus = null;
let noiseBuf = null;
const NOISE_LEN = 3;

function buildBus(ctx) {
    const input = ctx.createGain();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 6;
    comp.attack.value = 0.003;
    comp.release.value = 0.2;
    const master = ctx.createGain();
    master.gain.value = 0.8;

    const irLen = Math.floor(ctx.sampleRate * 1.4);
    const ir = ctx.createBuffer(2, irLen, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
        const d = ir.getChannelData(ch);
        for (let i = 0; i < irLen; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / irLen, 3);
    }
    const conv = ctx.createConvolver();
    conv.buffer = ir;
    const wetLp = ctx.createBiquadFilter();
    wetLp.type = 'lowpass';
    wetLp.frequency.value = 5000;
    const wet = ctx.createGain();
    wet.gain.value = 0.28;

    input.connect(comp);
    input.connect(conv);
    conv.connect(wetLp);
    wetLp.connect(wet);
    wet.connect(comp);
    comp.connect(master);
    master.connect(ctx.destination);
    return { input };
}

function getAudioCtx() {
    try {
        if (!audioCtx) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return null;
            audioCtx = new AC();
            audioBus = buildBus(audioCtx);
        }
        if (audioCtx.state === 'suspended') audioCtx.resume();
        return audioCtx;
    } catch (e) {
        return null;
    }
}

function getNoiseBuf(ctx) {
    if (!noiseBuf) {
        const len = Math.floor(ctx.sampleRate * NOISE_LEN);
        noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
        const d = noiseBuf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    }
    return noiseBuf;
}

function noiseBurst(ctx, { start = 0, dur = 0.1, attack = 0.002, gain = 0.2, type = 'bandpass', freq = 4000, endFreq, q = 1 }) {
    const t0 = ctx.currentTime + start;
    const src = ctx.createBufferSource();
    src.buffer = getNoiseBuf(ctx);
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.Q.value = q;
    f.frequency.setValueAtTime(freq, t0);
    if (endFreq) f.frequency.exponentialRampToValueAtTime(endFreq, t0 + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + Math.min(attack, dur * 0.9));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(f);
    f.connect(g);
    g.connect(audioBus.input);
    src.start(t0, Math.random() * (NOISE_LEN - dur - 0.1));
    src.stop(t0 + dur + 0.05);
}

function playTone(ctx, { type = 'sine', from, to, start = 0, dur = 0.3, gain = 0.15, attack = 0.01, lp }) {
    const t0 = ctx.currentTime + start;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(from, t0);
    if (to) osc.frequency.exponentialRampToValueAtTime(to, t0 + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + Math.min(attack, dur * 0.9));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    let node = osc;
    if (lp) {
        const f = ctx.createBiquadFilter();
        f.type = 'lowpass';
        f.frequency.value = lp;
        osc.connect(f);
        node = f;
    }
    node.connect(g);
    g.connect(audioBus.input);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
}

function ping(ctx, { freq, start = 0, dur = 0.25, gain = 0.03 }) {
    [1, 2.76, 5.4].forEach((m, i) => {
        playTone(ctx, { type: 'sine', from: freq * m, start, dur: dur / (1 + i * 0.6), gain: gain / (1 + i), attack: 0.001 });
    });
}

function glassCrack(ctx, start = 0, intensity = 1) {
    const k = Math.max(0.1, Math.min(1, intensity));
    noiseBurst(ctx, { start, dur: 0.015, attack: 0.001, gain: 0.45 * k, type: 'highpass', freq: 2500 });
    noiseBurst(ctx, { start, dur: 0.06, attack: 0.001, gain: 0.3 * k, type: 'lowpass', freq: 500 });

    const n = 3 + Math.round(6 * k);
    for (let i = 0; i < n; i++) {
        noiseBurst(ctx, {
            start: start + 0.012 + Math.random() * 0.22 * (0.4 + k),
            dur: 0.008 + Math.random() * 0.02,
            attack: 0.0008,
            gain: (0.12 + Math.random() * 0.16) * k,
            type: 'bandpass',
            freq: 3000 + Math.random() * 5500,
            q: 2.5
        });
    }

    const pings = 1 + Math.round(2 * k);
    for (let i = 0; i < pings; i++) {
        ping(ctx, { freq: 1800 + Math.random() * 1200, start: start + Math.random() * 0.08, dur: 0.18 + Math.random() * 0.25, gain: 0.025 * k });
    }
}

function steam(ctx, start = 0, dur = 1.6, level = 1) {
    noiseBurst(ctx, { start, dur, attack: 0.12, gain: 0.22 * level, type: 'highpass', freq: 3800 });
    noiseBurst(ctx, { start, dur: dur * 0.9, attack: 0.18, gain: 0.14 * level, type: 'bandpass', freq: 3200, endFreq: 1400, q: 0.6 });
    noiseBurst(ctx, { start, dur: dur * 0.7, attack: 0.1, gain: 0.12 * level, type: 'lowpass', freq: 700 });
    for (let i = 0; i < 4; i++) {
        noiseBurst(ctx, {
            start: start + 0.25 + Math.random() * (dur - 0.4),
            dur: 0.06 + Math.random() * 0.08,
            attack: 0.01,
            gain: 0.1 * level,
            type: 'highpass',
            freq: 4500
        });
    }
}

function chargeUp(ctx, dur) {
    noiseBurst(ctx, { dur, attack: dur - 0.04, gain: 0.3, type: 'lowpass', freq: 80, endFreq: 380 });
    playTone(ctx, { type: 'sine', from: 45, to: 120, dur, gain: 0.16, attack: dur - 0.05 });

    const n = 12;
    for (let i = 0; i < n; i++) {
        const p = i / n;
        const at = dur * Math.pow(p, 0.6);
        noiseBurst(ctx, { start: at, dur: 0.01, attack: 0.001, gain: 0.05 + 0.2 * p, type: 'highpass', freq: 3000 + Math.random() * 3000 });
        if (i % 3 === 2) ping(ctx, { freq: 1900 + Math.random() * 1000, start: at, dur: 0.15, gain: 0.012 + 0.02 * p });
    }
}

function evilHit(ctx, t) {
    playTone(ctx, { type: 'sine', from: 95, to: 28, start: t, dur: 1.0, gain: 0.55, attack: 0.004 });
    playTone(ctx, { type: 'sine', from: 220, to: 110, start: t, dur: 0.15, gain: 0.2, attack: 0.002 });
    noiseBurst(ctx, { start: t, dur: 0.5, attack: 0.002, gain: 0.4, type: 'lowpass', freq: 320, endFreq: 90 });
    playTone(ctx, { type: 'sawtooth', from: 55, start: t, dur: 1.3, gain: 0.1, attack: 0.05, lp: 220 });
    playTone(ctx, { type: 'sawtooth', from: 58.3, start: t, dur: 1.3, gain: 0.1, attack: 0.05, lp: 220 });
    for (let i = 0; i < 7; i++) {
        noiseBurst(ctx, {
            start: t + 0.04 + i * 0.045 + Math.random() * 0.03,
            dur: 0.012 + Math.random() * 0.03,
            attack: 0.001,
            gain: 0.14,
            type: 'bandpass',
            freq: 600 + Math.random() * 5400,
            q: 4
        });
    }
}

function playTapCrack(n) {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const k = Math.min(1, 0.25 + n * 0.12);
    glassCrack(ctx, 0, k);
    if (n >= 3) {
        noiseBurst(ctx, { start: 0.02, dur: 0.18, attack: 0.02, gain: 0.05 * k, type: 'bandpass', freq: 240, q: 10 });
    }
}

function playFlipSound(toEvil) {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const swap = SWAP_AT_MS / 1000;

    chargeUp(ctx, swap);

    if (toEvil) {
        evilHit(ctx, swap);
    } else {
        glassCrack(ctx, swap, 1);
        glassCrack(ctx, swap + 0.11, 0.6);
        playTone(ctx, { type: 'sine', from: 120, to: 60, start: swap, dur: 0.25, gain: 0.2, attack: 0.003 });
        steam(ctx, swap + 0.12, 1.6, 1);
    }
}

function flipLogo() {
    playFlipSound(!isEvil);
    busy = true;
    button.disabled = true;
    logo.classList.remove('tap-shake');
    logo.classList.add('transforming');
    logoContainer.classList.add('transforming');
    mainContainer.classList.add('flicker');

    setTimeout(() => setMode(!isEvil), SWAP_AT_MS);

    setTimeout(() => {
        logo.classList.remove('transforming');
        logoContainer.classList.remove('transforming');
        mainContainer.classList.remove('flicker');
        busy = false;
        button.disabled = blocked || getRemainingTime() > 0;
    }, TRANSFORM_MS);
}

logo.addEventListener('click', () => {
    if (busy) return;
    getAudioCtx();

    tapCount++;
    clearTimeout(tapTimer);

    if (tapCount >= TAP_THRESHOLD) {
        tapCount = 0;
        showHint("");
        flipLogo();
        return;
    }

    tapTimer = setTimeout(() => { tapCount = 0; showHint(""); }, TAP_RESET_MS);
    shakeLogo(tapCount);
    playTapCrack(tapCount);
    const quips = isEvil ? tapQuips.evil : tapQuips.normal;
    showHint(quips[tapCount - 1] || "");
});

document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "i" || e.key === "j")) ||
        (e.ctrlKey && (e.key === "U" || e.key === "u"))
    ) {
        e.preventDefault();
    }
});

setInterval(() => {
    const start = performance.now();
    debugger;
    const end = performance.now();
    if (end - start > 100) {
        blocked = true;
        display.innerText = "TRANSMISSION BLOCKED: DEV TOOLS DETECTED.";
        button.disabled = true;
    }
}, 500);
