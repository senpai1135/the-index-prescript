const SAIKAI_CHANCE = 0.08;
const SAIKAI_PITY_AFTER = 40;
const SAIKAI_YT_ID = 'h0djuhl97Kw';
const YT_LYRIC_OFFSET = 0;
const YT_LOAD_TIMEOUT_MS = 8000;
const SOURCE_PROBE_MS = 2500;
const SAIKAI_LEAD_IN_MS = 1800;
const SAIKAI_STALL_MS = 20000;
const SAIKAI_MAX_MS = 20 * 60 * 1000;
const LINE_SCRAMBLE_MS = 700;
const SAIKAI_INTRO = "[ TRANSMISSION: SAIKAI ]";

const ECHO_CHANCE = 0.3;
const ECHO_DISCLAIMER_BIAS = 0.2;
const IDLE_WATCH_MS = 10 * 60 * 1000;
const IMPATIENT_TAPS = 10;
const IMPATIENT_GAP_MS = 2000;
const SWIPE_MIN_PX = 40;
const KONAMI_STEP_MS = 3000;
const MIRROR_STAY_MS = 5 * 60 * 1000;
const MIRROR_STAY_LONG_MS = 30 * 60 * 1000;
const IDLE_LONG_MS = 30 * 60 * 1000;

const SAIKAI_BEAT_MS = 2000;
const SAIKAI_STALE_MS = 15000;

const ZOOM_CLOSE_AT = 3;
const ZOOM_MAX_AT = 4.9;

const RELOAD_WINDOW_MS = 60 * 1000;
const RELOAD_GOAL = 5;
const RELOAD_LOG_MS = 2 * 60 * 1000;
const RELOAD_GOAL_LONG = 10;
const ABSENCE_NOTICE_MS = 10 * 60 * 1000;
const ABSENCE_GOAL_MS = 30 * 60 * 1000;

const MISSING_ASSET_GLITCH = true;

const REVEAL_WATCHDOG_MS = 20000;
const BUSY_WATCHDOG_MS = 45000;
const MAX_LOCK_MS = 48 * 60 * 60 * 1000;

const glitchChars = "¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß◢◣◤◥■□▲△▼▽";

const SCRAMBLE_END = 1.41;
const REVEAL_START = 1.43;

const ASSETS = { normalImg: 'assets/img/index.png', evilImg: 'assets/img/evil_index.png' };
const TAP_THRESHOLD = 7;
const TAP_RESET_MS = 1500;
const TRANSFORM_MS = 1100;
const SWAP_AT_MS = 600;

const FALLBACK_LOGO = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none" stroke="#e8f6ff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M22 64a38 38 0 1 0 76 0"/><path d="M30 66a30 30 0 0 0 60 0" stroke-opacity=".55"/>' +
    '<path d="M60 70V36"/><path d="M60 40c4 0 6 3 6 6v24"/>' +
    '<path d="M47 74c0-7 6-10 13-10s13 3 13 10v10c0 8-6 12-13 12s-13-4-13-12z"/>' +
    '<g fill="#2f9bff" stroke="#8fd0ff" stroke-width="1.6"><ellipse cx="60" cy="19" rx="4.5" ry="9"/>' +
    '<ellipse cx="60" cy="19" rx="4.5" ry="9" transform="rotate(72 60 28)"/><ellipse cx="60" cy="19" rx="4.5" ry="9" transform="rotate(144 60 28)"/>' +
    '<ellipse cx="60" cy="19" rx="4.5" ry="9" transform="rotate(216 60 28)"/><ellipse cx="60" cy="19" rx="4.5" ry="9" transform="rotate(288 60 28)"/></g></svg>'
);

const tapQuips = {
    normal: ["", "Please do not poke the Index.", "The Index felt that.", "This is not part of the Will.", "Stop. It is starting to shake.", "Last warning. Something is looking back."],
    evil:   ["", "The glass is warm.", "The mirror hums.", "Hold steady.", "It is smiling now.", "One more, and the glass lets go."]
};

const loadModule = (fn) => fn().catch(err => {
    console.warn('[Index] A module failed to load. Using its fallback.', err);
    return null;
});

const [willsMod, lyricsMod, achMod] = await Promise.all([
    loadModule(() => import('./prescripts.js')),
    loadModule(() => import('./lyrics.js')),
    loadModule(() => import('./achievements.js'))
]);

const cd0 = { value: 0, unit: 'seconds' };
function cleanPool(list, fallback) {
    const ok = Array.isArray(list) ? list.filter(p => p && typeof p.text === 'string' && p.text.trim()) : [];
    return ok.length ? ok : fallback;
}
function cleanLines(list, fallback) {
    const ok = Array.isArray(list) ? list.filter(s => typeof s === 'string' && s.trim()) : [];
    return ok.length ? ok : [fallback];
}

const prescripts = cleanPool(willsMod?.prescripts, [{ text: "The Index is silent. Proceed as you see fit.", cooldown: cd0 }]);
const mirrorPrescripts = cleanPool(willsMod?.mirrorPrescripts, [{ text: "Be kind to someone today.", cooldown: cd0 }]);
const holidayPools = {};
for (const name of ['halloween', 'christmas', 'valentine', 'aprilfools', 'newyear']) {
    holidayPools[name] = {
        normal: cleanPool(willsMod?.holidayWills?.[name]?.normal, []),
        evil: cleanPool(willsMod?.holidayWills?.[name]?.evil, [])
    };
}
const holidayDisclaimerPools = {};
for (const name of ['halloween', 'christmas', 'valentine', 'aprilfools', 'newyear']) {
    const lines = (side) => {
        const list = willsMod?.holidayDisclaimers?.[name]?.[side];
        return Array.isArray(list) ? list.filter(t => typeof t === 'string' && t.trim()) : [];
    };
    holidayDisclaimerPools[name] = { normal: lines('normal'), evil: lines('evil') };
}
const HOLIDAY_DISCLAIMER_CHANCE = 0.55;
const saikaiPrescripts = {
    normal: willsMod?.saikaiPrescripts?.normal ?? { text: "A transmission is incoming. Do not look away. Do not request another Will until it has ended.", cooldown: cd0, special: 'saikai' },
    evil: willsMod?.saikaiPrescripts?.evil ?? { text: "Sit with me for a little while. Put everything else down. Listen until the very end.", cooldown: cd0, special: 'saikai' }
};
const disclaimers = cleanLines(willsMod?.disclaimers, "The Index accepts no responsibility for anything.");
const mirrorDisclaimers = cleanLines(willsMod?.mirrorDisclaimers, "The glass is warm. This is normal.");
const SAIKAI_LRC = typeof lyricsMod?.SAIKAI_LRC === 'string' ? lyricsMod.SAIKAI_LRC : '';

const adaptWillText = typeof willsMod?.adaptWillText === 'function' ? willsMod.adaptWillText : (t) => t;
function showable(text) {
    try { const out = adaptWillText(text); return (typeof out === 'string' && out.trim()) ? out : text; }
    catch (err) { return text; }
}
const interruptLines = {
    normal: { started: "The transmission was cut. The Index noticed who left.", pending: "You left before it began. The Index had already started to speak." },
    evil: { started: "You left in the middle of the song. The glass kept humming without you.", pending: "You left before the song began. The mirror is still waiting." },
    ...(willsMod?.interruptLines || {})
};
const interruptDisclaimers = {
    normal: "The Index does not forget who closed the door during the transmission.",
    evil: "The mirror held the last note for you. It will not hold it forever.",
    ...(willsMod?.interruptDisclaimers || {})
};
const zoomLines = (Array.isArray(willsMod?.zoomLines) ? willsMod.zoomLines : [
    { at: 2, text: "Closer." }, { at: 3, text: "The Index can feel your breath on the glass." },
    { at: 4, text: "This is much too close. It is looking back." }, { at: 4.9, text: "There is nothing left to see. Only you, in the glass." }
]).filter(l => l && Number.isFinite(l.at) && typeof l.text === 'string').sort((a, b) => a.at - b.at);

const pairMap = { normal: new Map(), evil: new Map() };
['normal', 'evil'].forEach(side => {
    const texts = new Set((side === 'evil' ? mirrorPrescripts : prescripts).map(p => p.text));
    const list = willsMod?.disclaimerPairs?.[side];
    if (!Array.isArray(list)) return;
    list.forEach(pair => {
        if (!pair || typeof pair.disclaimer !== 'string' || !Array.isArray(pair.wills)) return;
        const wills = pair.wills.filter(t => texts.has(t));
        if (wills.length) pairMap[side].set(pair.disclaimer, wills);
    });
});

const timeWills = (Array.isArray(willsMod?.timeWills) ? willsMod.timeWills : []).filter(t =>
    t && typeof t.id === 'string' && /^\d{1,2}:\d{2}$/.test(t.at) && Number(t.minutes) > 0 && t.normal?.text && t.evil?.text);

const SEALED_KEYS = new Set(achMod?.SEAL_KEYS || []);
let integrity = { inspect() {}, seal() {} };

const memStore = new Map();
const staleKeys = new Set();
const rawStore = {
    get(key) {
        if (!staleKeys.has(key)) {
            try {
                const v = localStorage.getItem(key);
                if (v !== null) return v;
            } catch (e) { }
        }
        return memStore.has(key) ? memStore.get(key) : null;
    },
    set(key, value) {
        memStore.set(key, String(value));
        try { localStorage.setItem(key, String(value)); staleKeys.delete(key); } catch (e) { staleKeys.add(key); }
    },
    remove(key) {
        memStore.delete(key);
        try { localStorage.removeItem(key); staleKeys.delete(key); } catch (e) { staleKeys.add(key); }
    }
};
const store = {
    get(key, fallback) {
        try {
            const v = rawStore.get(key);
            if (v === null) return fallback;
            return JSON.parse(v) ?? fallback;
        } catch (e) { return fallback; }
    },
    set(key, value) {
        const sealed = SEALED_KEYS.has(key);
        if (sealed) integrity.inspect();
        try { rawStore.set(key, JSON.stringify(value)); } catch (e) { }
        if (sealed) integrity.seal();
    }
};
const numberOf = (v) => { const n = Number(v); return Number.isFinite(n) ? n : 0; };

const el = (id, tag = 'div') => document.getElementById(id) || document.createElement(tag);
const display = el('prescriptDisplay');
const button = el('generateBtn', 'button');
const logo = el('indexLogo', 'img');
const logoContainer = el('logoContainer');
const mainContainer = el('mainContainer');
const tapHint = el('tapHint');
const favicon = el('favicon', 'link');
const sfx = el('beeperSfx', 'audio');
const song = el('saikaiSfx', 'audio');
const disclaimerEl = el('disclaimer');

let animationFrameId;
let targetSentence = "";
let canonicalSentence = "";
let lastSentence = "";
let audioEndTime = 3.00;
let frameCount = 0;
let countdownInterval;

let isEvil = false;
let normalImgMissing = false;
let evilImgMissing = false;
let busy = false;
let busySince = 0;
let blocked = false;
let pendingSaikai = false;
let revealCooldownMs = 0;
let pendingTimeWill = null;
let holdText = false;
let saikaiSession = false;
let saikaiActive = false;
let revealing = false;
let revealMode = 'normal';
let revealWatchdog;
let tapCount = 0;
let season = null;
let tapTimer;

function setBusy(on) {
    busy = on;
    busySince = on ? Date.now() : 0;
}

const idleText = () => isEvil
    ? "Click below to see what the mirror wants to tell you."
    : "Click below to receive the Will of the Prescript.";
const doneText = () => isEvil
    ? "The mirror is quiet. Click below to look again."
    : "The evaluation is complete. Click below to receive the Will.";
const lockLabel = () => isEvil ? "THE MIRROR WAITS" : "EVALUATING PROXY EXECUTION";

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


function playAchievementSound(a) {
    const ctx = getAudioCtx();
    if (!ctx || !audioBus) return;
    const root = isEvil ? 392 : 523.25;
    const chord = isEvil ? [1, 1.189, 1.498, 1.782] : [1, 1.26, 1.498, 2];
    chord.forEach((m, i) => {
        const f = root * m;
        const at = i * 0.085;
        playTone(ctx, { type: 'sine', from: f, start: at, dur: 1.1, gain: 0.09, attack: 0.004 });
        ping(ctx, { freq: f, start: at, dur: 0.7, gain: 0.05 });
    });
    noiseBurst(ctx, { start: 0.02, dur: 0.35, attack: 0.01, gain: 0.05, type: 'highpass', freq: 7000 });

    if (a && (a.hard || a.secret)) {
        playTone(ctx, { type: 'sine', from: root / 4, start: 0, dur: 1.4, gain: 0.16, attack: 0.02 });
    }
    if (a && a.hard) {
        [2.5, 3, 4].forEach((m, i) => ping(ctx, { freq: root * m, start: 0.4 + i * 0.1, dur: 0.6, gain: 0.04 }));
    }
}

function playWarningSound(n) {
    const ctx = getAudioCtx();
    if (!ctx || !audioBus) return;
    playTone(ctx, { type: 'sawtooth', from: 130, to: 62, dur: 0.9, gain: 0.12, attack: 0.01, lp: 700 });
    [0, 0.2, 0.4].slice(0, n && n.severe ? 3 : 2).forEach((t, i) => {
        playTone(ctx, { type: 'square', from: i % 2 ? 330 : 440, start: t, dur: 0.12, gain: 0.05, attack: 0.002, lp: 1800 });
    });
    const bursts = n && n.severe ? 9 : 4;
    for (let i = 0; i < bursts; i++) {
        noiseBurst(ctx, { start: 0.03 + i * 0.07, dur: 0.02 + Math.random() * 0.03, attack: 0.001, gain: 0.12, type: 'bandpass', freq: 800 + Math.random() * 5000, q: 4 });
    }
}

function safely(fn) {
    try { fn(); } catch (err) { console.log('[Index] Sound skipped.', err); }
}

const noAchievements = { unlock() { return false; }, evaluate() {}, toggle() {}, has() { return false; } };
let ach = noAchievements;
try {
    if (achMod && typeof achMod.createAchievements === 'function') {
        ach = achMod.createAchievements({
            store,
            pools: { normal: prescripts, evil: mirrorPrescripts, time: timeWills.map(t => t.id) },
            disclaimers: { normal: disclaimers, evil: mirrorDisclaimers },
            playSound: (a) => safely(() => (a && (a.warn || a.forbidden)) ? playWarningSound(a) : playAchievementSound(a)),
            onTamper: (info) => setTimeout(() => reactToTamper(info), 0)
        });
    }
    if (typeof ach.inspect === 'function') integrity = { inspect: ach.inspect, seal: ach.seal };
} catch (err) {
    console.warn('[Index] Achievements could not start. The game continues without them.', err);
    ach = noAchievements;
}

function reactToTamper() {
    safely(() => playWarningSound({ severe: true }));
    glitchBurst(3400);
    holdMessage(isEvil
        ? "The glass noticed. It will not say anything. It only wants you to know."
        : "[ THE RECORDS HAVE BEEN ALTERED ] The Index remembers what you earned. And what you did not.", 4500);
}

const currentMode = () => isEvil ? 'evil' : 'normal';
const lockKey = (mode) => `prescript_lock_until_${mode}`;
const textKey = (mode) => `last_prescript_text_${mode}`;
const UNIT_MS = { seconds: 1000, minutes: 60 * 1000, hours: 60 * 60 * 1000 };

function cooldownToMs(cooldown) {
    if (cooldown && typeof cooldown.until === 'string') {
        const m = cooldown.until.match(/^(\d{1,2}):(\d{2})$/);
        if (m) {
            const now = new Date();
            const target = new Date(now);
            target.setHours(Number(m[1]), Number(m[2]), 0, 0);
            if (cooldown.tomorrow) target.setDate(target.getDate() + 1);
            else if (target <= now) target.setDate(target.getDate() + 1);
            return Math.max(0, target - now);
        }
    }
    const value = Number(cooldown?.value);
    const unit = UNIT_MS[cooldown?.unit];
    return value > 0 && unit ? value * unit : 0;
}

function clearLock(mode) {
    rawStore.remove(lockKey(mode));
    rawStore.remove(textKey(mode));
}

function getRemainingTime(mode = currentMode()) {
    const lockUntil = rawStore.get(lockKey(mode));
    if (!lockUntil) return 0;
    const remaining = parseInt(lockUntil, 10) - Date.now();
    if (!Number.isFinite(remaining) || remaining > MAX_LOCK_MS) {
        clearLock(mode);
        return 0;
    }
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
    const currentPrescript = rawStore.get(textKey(mode)) || "Execute your given assignment.";
    if (!blocked && !holdText) display.innerText = `${currentPrescript}\n\n[ ${lockLabel()}: ${formatTime(remainingMs)} ]`;

    if (countdownInterval) clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        const currentRemaining = getRemainingTime(mode);
        if (currentRemaining <= 0) {
            clearInterval(countdownInterval);
            clearLock(mode);
            if (currentMode() === mode) {
                button.disabled = blocked;
                if (!blocked && !saikaiSession) display.innerText = doneText();
            }
        } else if (!saikaiSession && !blocked && !holdText && currentMode() === mode) {
            display.innerText = `${currentPrescript}\n\n[ ${lockLabel()}: ${formatTime(currentRemaining)} ]`;
        }
    }, 1000);
}

function onReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once: true });
    else fn();
}

onReady(() => {
    rawStore.remove('prescript_lock_until');
    rawStore.remove('last_prescript_text');

    const remaining = getRemainingTime();
    if (remaining > 0) startUiLockout(remaining);
});

const deckKey = (mode) => `prescript_deck_${mode}`;
const seenKey = (mode) => `index_seen_${mode}`;
const poolFor = (mode) => mode === 'evil' ? mirrorPrescripts : prescripts;

function shuffled(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function getSeen(mode) {
    const v = store.get(seenKey(mode), []);
    return new Set(Array.isArray(v) ? v : []);
}

function loadDeck(mode, pool) {
    const saved = store.get(deckKey(mode), null);
    if (!Array.isArray(saved)) return [];
    const valid = new Set(pool.map(p => p.text));
    return saved.filter(t => valid.has(t));
}

function saveDeck(mode, deck) {
    store.set(deckKey(mode), deck);
}

function peekPrescript(mode) {
    const pool = poolFor(mode);
    const seen = getSeen(mode);
    let deck = loadDeck(mode, pool);

    const inDeck = new Set(deck);
    const missing = [...new Set(pool.map(p => p.text))].filter(t => !seen.has(t) && !inDeck.has(t));
    if (missing.length) deck = deck.concat(missing);

    if (deck.length === 0) {
        deck = shuffled(pool.map(p => p.text));
        if (deck.length > 1 && deck[0] === lastSentence) {
            const swap = 1 + Math.floor(Math.random() * (deck.length - 1));
            [deck[0], deck[swap]] = [deck[swap], deck[0]];
        }
    }
    saveDeck(mode, deck);

    const unseen = deck.filter(t => !seen.has(t));
    const calm = calmLeft(mode) > 0;
    const free = (list) => list.filter(t => lockMsOf(mode, t) === 0);
    let choices = unseen.length ? unseen : deck;
    if (calm) {
        const f = free(choices);
        if (f.length) choices = f;
        else { const g = free(deck); if (g.length) choices = g; }
    }
    let text = unseen.length ? choices[Math.floor(Math.random() * choices.length)] : choices[0];
    if (!calm && unseen.length > 1 && lockMsOf(mode, text) >= HEAVY_LOCK_MS && Math.random() < 0.5) {
        const lighter = choices.filter(t => lockMsOf(mode, t) < HEAVY_LOCK_MS);
        if (lighter.length) text = lighter[Math.floor(Math.random() * lighter.length)];
    }
    return pool.find(p => p.text === text) || pool[0];
}

function commitPrescript(mode, text) {
    const deck = loadDeck(mode, poolFor(mode));
    const i = deck.indexOf(text);
    if (i >= 0) deck.splice(i, 1);
    saveDeck(mode, deck);
}

const dayNumber = (d = new Date()) => Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);

function bumpStreak() {
    const today = dayNumber();
    const st = store.get('index_streak', {}) || {};
    if (st.last === today) return;
    const count = st.last === today - 1 ? numberOf(st.count) + 1 : 1;
    store.set('index_streak', { last: today, count, best: Math.max(numberOf(st.best), count) });
}

function bumpDaily() {
    const today = dayNumber();
    const d = store.get('index_daily', {}) || {};
    const count = d.day === today ? numberOf(d.count) + 1 : 1;
    store.set('index_daily', { day: today, count });
}

const visitSides = new Set();
let recentWills = [];

function trackWill(mode, text, info = {}) {
    const seen = getSeen(mode);
    if (!info.holiday) {
        seen.add(text);
        store.set(seenKey(mode), [...seen]);
    }
    store.set('index_total', numberOf(store.get('index_total', 0)) + 1);
    bumpStreak();
    bumpDaily();

    const stamp = new Date();
    const hour = stamp.getHours();
    if (hour === 3 && stamp.getMinutes() === 33) ach.unlock('witching');
    if (stamp.getDay() === 5 && stamp.getDate() === 13) ach.unlock('friday13');
    const month = stamp.getMonth(), dom = stamp.getDate(), minute = stamp.getMinutes();
    if (month === 9 && dom === 31) ach.unlock('halloween');
    if (month === 11 && dom === 25) ach.unlock('christmas');
    if (month === 0 && dom === 1) ach.unlock('newyear');
    if (month === 11 && dom === 31) ach.unlock('nye');
    if (month === 1 && dom === 14) ach.unlock('valentine');
    if (month === 3 && dom === 1) ach.unlock('aprilfools');
    if (month === 1 && dom === 29) ach.unlock('leapday');
    if (hour % 12 === 11 && minute === 11) ach.unlock('wish1111');
    if (hour === 0 && minute === 0) ach.unlock('midnight');

    visitSides.add(mode);
    sinceSaikaiMem[mode] += 1;
    const nowMs = Date.now();
    recentWills = recentWills.filter(t => nowMs - t <= 30000);
    recentWills.push(nowMs);
    if (recentWills.length >= 5) ach.unlock('rapid5');
    if (visitSides.size >= 2) ach.unlock('two_faced');
    if (info.patient) ach.unlock('patient');
    if (numberOf(info.cooldownMs) >= 12 * 60 * 60 * 1000) ach.unlock('heavy_hand');
    if (hour < 4) ach.unlock('night_owl');
    else if (hour < 7) ach.unlock('early_bird');
    if (info.timeWill) ach.unlock('time_will');
    if (mode === 'evil') {
        if (info.timeWill) ach.unlock('mirror_time');
        if (/\bmom\b/i.test(text)) ach.unlock('mirror_mom');
    }
    if (info.echo) {
        ach.unlock('echo');
        if (mode === 'evil') ach.unlock('echo_mirror');
        if (info.cooldownMs >= 5 * 60 * 1000) ach.unlock('echo_timed');
        const echoes = store.get('index_echoes', []);
        const key = `${mode}|${lastDisclaimer}`;
        if (!echoes.includes(key)) store.set('index_echoes', [...echoes, key]);
        const sides = store.get('index_echo_sides', []);
        if (!sides.includes(mode)) store.set('index_echo_sides', [...sides, mode]);
        store.set('index_echo_run', numberOf(store.get('index_echo_run', 0)) + 1);
    } else {
        store.set('index_echo_run', 0);
    }
    if (info.timeWillId) {
        const ids = store.get('index_timewills', []);
        if (!ids.includes(info.timeWillId)) store.set('index_timewills', [...ids, info.timeWillId]);
    }

    ach.evaluate({ faceless: normalImgMissing && evilImgMissing });
}

function activeTimeWill(mode) {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    const today = dayNumber(now);
    for (const t of timeWills) {
        const [h, m] = t.at.split(':').map(Number);
        const start = h * 60 + m;
        if (minutes < start || minutes >= start + Number(t.minutes)) continue;
        const key = `index_timewill_${t.id}_${mode}`;
        if (store.get(key, -1) === today) continue;
        const will = t[mode];
        if (will && typeof will.text === 'string') return { id: t.id, key, today, will };
    }
    return null;
}

function pickEchoWill(mode) {
    let wills = pairMap[mode].get(lastDisclaimer);
    if (wills && calmLeft(mode) > 0) wills = wills.filter(t => lockMsOf(mode, t) === 0);
    if (!wills || !wills.length || Math.random() >= ECHO_CHANCE) return null;
    const seen = getSeen(mode);
    const unseen = wills.filter(t => !seen.has(t));
    const choices = unseen.length ? unseen : wills;
    const text = choices[Math.floor(Math.random() * choices.length)];
    return poolFor(mode).find(p => p.text === text) || null;
}

const HEAVY_LOCK_MS = 6 * 60 * 60 * 1000;
const calmKey = (mode) => `index_calm_${mode}`;
const calmLeft = (mode) => Math.max(0, Math.floor(numberOf(rawStore.get(calmKey(mode)))));
const calmFor = (ms) => ms >= 60 * 60 * 1000 ? 3 : ms >= 10 * 60 * 1000 ? 2 : 1;
function lockMsOf(mode, text) {
    const p = poolFor(mode).find(x => x.text === text);
    return p ? cooldownToMs(p.cooldown) : 0;
}

const SAIKAI_MIN_GAP = 12;
const SAIKAI_DROUGHT = 20;
const sinceSaikaiMem = { normal: Infinity, evil: Infinity };
let pendingPity = false;
let patientEarned = false;
const HOLIDAY_CHANCE = 0.4;
let pendingHoliday = false;
let lastHolidayText = '';
function pickHolidayWill(mode) {
    if (!season) return null;
    const list = (holidayPools[season] || {})[mode] || [];
    if (!list.length || Math.random() >= HOLIDAY_CHANCE) return null;
    let choices = list;
    if (calmLeft(mode) > 0) {
        const free = list.filter(w => cooldownToMs(w.cooldown) === 0);
        if (free.length) choices = free;
    }
    const key = `index_holiday_seen_${season}_${mode}_${new Date().getFullYear()}`;
    const saved = readFlag(key);
    let seenToday = Array.isArray(saved) ? saved : [];
    let fresh = choices.filter(w => !seenToday.includes(w.text) && w.text !== lastHolidayText);
    if (!fresh.length) {
        seenToday = seenToday.filter(t => !choices.some(w => w.text === t));
        fresh = choices.filter(w => w.text !== lastHolidayText);
        if (!fresh.length) fresh = choices;
    }
    const pick = fresh[Math.floor(Math.random() * fresh.length)];
    lastHolidayText = pick.text;
    rawStore.set(key, JSON.stringify([...seenToday, pick.text]));
    return { ...pick, holiday: true };
}
function saikaiGapOk(mode) {
    const total = numberOf(store.get('index_total', 0));
    const at = rawStore.get(`index_saikai_at_${mode}`);
    let sinceStored = Infinity;
    if (at !== null) { const d = total - numberOf(at); sinceStored = d < 0 ? Infinity : d; }
    return Math.min(sinceStored, sinceSaikaiMem[mode]) >= SAIKAI_MIN_GAP;
}

function saikaiChance(misses) {
    if (SAIKAI_CHANCE >= 1 || misses >= SAIKAI_PITY_AFTER) return 1;
    return SAIKAI_CHANCE + (1 - SAIKAI_CHANCE) * Math.pow(misses / SAIKAI_PITY_AFTER, 3);
}

button.addEventListener('click', () => {
    if (busy || getRemainingTime() > 0) return;

    setBusy(true);
    button.disabled = true;
    getAudioCtx();

    try {
        receiveWill();
    } catch (err) {
        console.error('[Index] The Will could not be delivered.', err);
        clearSaikaiLive();
        revealing = false;
        clearTimeout(revealWatchdog);
        cancelAnimationFrame(animationFrameId);
        applyGlitchState(false);
        display.innerText = idleText();
        setBusy(false);
        button.disabled = blocked || getRemainingTime() > 0;
    }
});

function receiveWill() {
    const mode = currentMode();
    revealMode = mode;

    const missKey = `index_saikai_miss_${mode}`;
    const misses = numberOf(store.get(missKey, 0));
    let selectedObj;
    pendingTimeWill = null;
    pendingPity = false;
    pendingHoliday = false;
    if (saikaiGapOk(mode) && Math.random() < saikaiChance(misses)) {
        selectedObj = saikaiPrescripts[mode];
        pendingPity = misses >= SAIKAI_DROUGHT;
        store.set(missKey, 0);
        rawStore.set(`index_saikai_at_${mode}`, numberOf(store.get('index_total', 0)));
        sinceSaikaiMem[mode] = 0;
    } else {
        const timed = activeTimeWill(mode);
        if (timed) {
            selectedObj = { ...timed.will, timeWill: true };
            pendingTimeWill = timed;
        } else {
            const holiday = pickHolidayWill(mode);
            if (holiday) { selectedObj = holiday; pendingHoliday = true; }
            else selectedObj = pickEchoWill(mode) || peekPrescript(mode);
        }
        store.set(missKey, misses + 1);
    }

    pendingSaikai = selectedObj.special === 'saikai';
    if (pendingSaikai) {
        prepareSaikaiSource();
        markSaikaiLive('pending', mode);
    }
    canonicalSentence = selectedObj.text;
    lastSentence = selectedObj.text;
    targetSentence = showable(selectedObj.text);

    const cooldownMs = cooldownToMs(selectedObj.cooldown);
    revealCooldownMs = cooldownMs;
    patientEarned = false;
    if (selectedObj.special !== 'saikai') {
        const left = calmLeft(mode);
        if (cooldownMs > 0) rawStore.set(calmKey(mode), calmFor(cooldownMs));
        else if (left > 0) rawStore.set(calmKey(mode), left - 1);
        patientEarned = numberOf(rawStore.get(`index_lastlock_${mode}`)) >= 60 * 60 * 1000;
        rawStore.set(`index_lastlock_${mode}`, cooldownMs);
    }
    if (cooldownMs > 0) {
        rawStore.set(lockKey(mode), Date.now() + cooldownMs);
        rawStore.set(textKey(mode), targetSentence);
    }

    try { sfx.pause(); sfx.currentTime = 0; } catch (e) { }
    frameCount = 0;
    revealing = true;
    clearTimeout(revealWatchdog);
    revealWatchdog = setTimeout(forceFinishReveal, REVEAL_WATCHDOG_MS);

    let started = false;
    const go = (duration) => {
        if (started || !revealing) return;
        started = true;
        audioEndTime = duration;
        animationFrameId = requestAnimationFrame(syncSequenceToAudio);
    };
    try {
        Promise.resolve(sfx.play())
            .then(() => go(Number.isFinite(sfx.duration) && sfx.duration > 0 ? sfx.duration : 3.00))
            .catch(err => {
                console.log("Audio pipeline blocked by environment. Sequence running visually.", err);
                go(3.00);
            });
    } catch (err) {
        go(3.00);
    }
    setTimeout(() => go(3.00), 2500);
}

function forceFinishReveal() {
    if (!revealing) return;
    console.warn('[Index] Reveal watchdog fired. Finishing the Will.');
    cancelAnimationFrame(animationFrameId);
    display.innerText = targetSentence;
    applyGlitchState(false);
    finishReveal();
}


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
    if (!revealing) return;
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
    if (!revealing) return;
    revealing = false;
    clearTimeout(revealWatchdog);

    if (pendingSaikai) {
        pendingSaikai = false;
        ach.unlock('saikai_found');
        if (pendingPity) { pendingPity = false; ach.unlock('saikai_pity'); }
        setTimeout(startSaikai, SAIKAI_LEAD_IN_MS);
        return;
    }

    if (!pendingHoliday) commitPrescript(revealMode, canonicalSentence);
    const timed = pendingTimeWill;
    pendingTimeWill = null;
    if (timed) store.set(timed.key, timed.today);
    const echo = !pendingHoliday && (pairMap[revealMode].get(lastDisclaimer) || []).includes(canonicalSentence);
    trackWill(revealMode, canonicalSentence, { timeWill: !!timed, timeWillId: timed && timed.id, echo, cooldownMs: revealCooldownMs, patient: patientEarned, holiday: pendingHoliday });
    pendingHoliday = false;

    const remaining = getRemainingTime();
    if (remaining > 0) {
        startUiLockout(remaining);
    } else {
        button.disabled = blocked;
    }
    setBusy(false);
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

const lyrics = parseLrc(SAIKAI_LRC);

let lyricFrame;
let lyricFrames = 0;
let lyricIndex = -2;
let lineText = "";
let lineStart = 0;
let lastOut = "";
let nextBurstAt = 0;
let burstUntil = 0;
let saikaiCap;
let lastSongT = -1;
let lastSongMove = 0;
let offlineTimer;

const SAIKAI_LIVE_KEY = 'index_saikai_live';
const SAIKAI_CUT_KEY = 'index_saikai_cut';
let saikaiLive = null;
let saikaiBeat = null;

function readFlag(key) {
    try { const v = rawStore.get(key); return v ? JSON.parse(v) : null; } catch (e) { return null; }
}
function writeLive() {
    if (!saikaiLive) return;
    rawStore.set(SAIKAI_LIVE_KEY, JSON.stringify({ side: saikaiLive.side, phase: saikaiLive.phase, beat: Date.now() }));
}
function markSaikaiLive(phase, side = currentMode()) {
    saikaiLive = { side, phase };
    writeLive();
    clearInterval(saikaiBeat);
    saikaiBeat = setInterval(writeLive, SAIKAI_BEAT_MS);
}
function clearSaikaiLive() {
    saikaiLive = null;
    clearInterval(saikaiBeat);
    rawStore.remove(SAIKAI_LIVE_KEY);
}
function writeSaikaiCut() {
    if (!saikaiLive) return;
    rawStore.set(SAIKAI_CUT_KEY, JSON.stringify({ side: saikaiLive.side, phase: saikaiLive.phase, t: Date.now() }));
}

function consumeSaikaiCut() {
    const cut = readFlag(SAIKAI_CUT_KEY);
    const live = readFlag(SAIKAI_LIVE_KEY);
    const okSide = (o) => o && (o.side === 'normal' || o.side === 'evil');
    let hit = null;
    if (okSide(cut)) hit = cut;
    else if (okSide(live) && Date.now() - numberOf(live.beat) > SAIKAI_STALE_MS) hit = live;
    if (cut) rawStore.remove(SAIKAI_CUT_KEY);
    if (hit) rawStore.remove(SAIKAI_LIVE_KEY);
    return hit;
}

function cutLine(side, phase) {
    const set = interruptLines[side] || interruptLines.normal;
    return (phase === 'pending' ? set.pending : set.started) || set.started || "The transmission was cut.";
}

let bootMsg = null;
const bootSay = (text, ms) => { if (!bootMsg) bootMsg = { text, ms }; };

function applySaikaiCut(hit) {
    const side = hit.side === 'evil' ? 'evil' : 'normal';
    ach.unlock(side === 'evil' ? 'saikai_cut_mirror' : 'saikai_cut');
    ach.evaluate();
    glitchBurst(2800);
    bootSay(cutLine(side, hit.phase), 7500);
}

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
        try {
            if (song.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) song.load();
        } catch (e) { finish(false); }
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
                    if (saikaiSession) endSaikai(false);
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
    if (!saikaiSession || songSource !== 'youtube') return;
    if (e.data === YT.PlayerState.ENDED) {
        endSaikai(true);
    } else if (e.data === YT.PlayerState.PAUSED) {
        try { ytPlayer.playVideo(); } catch (err) { }
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
    if (!saikaiSession) return;
    saikaiActive = true;
    lyricIndex = -2;
    lastOut = "";
    lastSongT = -1;
    lastSongMove = performance.now();
    scheduleBurst(performance.now());
    if (saikaiLive) { saikaiLive.phase = 'started'; writeLive(); }
    lyricFrame = requestAnimationFrame(lyricLoop);
}

function waitForYouTubePlaying(ms) {
    return new Promise((resolve, reject) => {
        const started = Date.now();
        const wait = setInterval(() => {
            const st = ytPlayer && ytPlayer.getPlayerState && ytPlayer.getPlayerState();
            if (st === YT.PlayerState.PLAYING) {
                clearInterval(wait);
                resolve();
            } else if (!saikaiSession || Date.now() - started > ms) {
                clearInterval(wait);
                reject(new Error('YouTube playback was blocked'));
            }
        }, 100);
    });
}

async function startSaikai() {
    saikaiSession = true;
    display.classList.add('lyric-mode');
    document.body.classList.add('transmitting');
    display.innerText = SAIKAI_INTRO;
    clearTimeout(saikaiCap);
    saikaiCap = setTimeout(() => endSaikai(false), SAIKAI_MAX_MS);

    try {
        let source = await (sourcePromise || prepareSaikaiSource());
        if (!saikaiSession) return;

        if (source === 'local') {
            try {
                song.currentTime = 0;
                await song.play();
                songSource = 'local';
                beginLyrics();
                return;
            } catch (err) {
                console.log("Local Saikai refused to play. Trying YouTube.", err);
                source = 'youtube';
                songSource = 'youtube';
            }
        }

        if (source === 'youtube') {
            await withTimeout(createYouTubePlayer(), YT_LOAD_TIMEOUT_MS);
            if (!saikaiSession) return;
            ytPlayer.seekTo(0, true);
            ytPlayer.playVideo();
            await waitForYouTubePlaying(6000);
            beginLyrics();
            return;
        }

        throw new Error('No source');
    } catch (err) {
        console.log("Saikai could not play.", err);
        endSaikai(false);
    }
}

function lyricLoop(now) {
    if (!saikaiActive) return;
    lyricFrames++;
    const t = getSongTime();

    if (t !== lastSongT) {
        lastSongT = t;
        lastSongMove = now;
    } else if (now - lastSongMove > SAIKAI_STALL_MS) {
        endSaikai(false);
        return;
    }

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

function endSaikai(completed, reason) {
    if (!saikaiSession) return;
    saikaiSession = false;
    saikaiActive = false;
    clearTimeout(saikaiCap);
    clearTimeout(offlineTimer);
    clearSaikaiLive();
    cancelAnimationFrame(lyricFrame);
    display.classList.remove('lyric-mode', 'glitching');
    logo.classList.remove('glitching');
    document.body.classList.remove('transmitting');
    logo.style.transform = 'none';

    try { song.pause(); } catch (e) { }
    try { if (ytPlayer && typeof ytPlayer.stopVideo === 'function') ytPlayer.stopVideo(); } catch (e) { }
    sourcePromise = null;
    songSource = null;

    if (completed) {
        ach.unlock('saikai');
        store.set('index_saikai_plays', numberOf(store.get('index_saikai_plays', 0)) + 1);
        const sides = store.get('index_saikai_sides', []);
        const side = isEvil ? 'evil' : 'normal';
        if (!sides.includes(side)) store.set('index_saikai_sides', [...sides, side]);
        ach.evaluate();
        if (isEvil) ach.unlock('saikai_mirror');
        display.innerText = isEvil
            ? "Thank you for staying. You may go now."
            : "The transmission is complete. You may proceed.";
    } else if (reason === 'cut') {
        const side = isEvil ? 'evil' : 'normal';
        ach.unlock(side === 'evil' ? 'saikai_cut_mirror' : 'saikai_cut');
        ach.evaluate();
        display.innerText = cutLine(side, 'started');
    } else {
        ach.unlock('saikai_lost');
        display.innerText = navigator.onLine === false
            ? "The signal was lost. The transmission could not reach you. You may proceed."
            : "The transmission was lost. You may proceed.";
    }

    setBusy(false);
    button.disabled = blocked || getRemainingTime() > 0;
}

song.addEventListener('ended', () => { if (saikaiActive && songSource === 'local') endSaikai(true); });
song.addEventListener('error', () => { if (saikaiActive && songSource === 'local') endSaikai(false); });
song.addEventListener('pause', () => {
    if (saikaiActive && songSource === 'local' && !song.ended) song.play().catch(() => {});
});

document.addEventListener('visibilitychange', () => { lastSongMove = performance.now(); });

window.addEventListener('pagehide', (e) => {
    try {
        writeSaikaiCut();
        flushPlay();
        if (!e.persisted) {
            rawStore.remove(HIDDEN_KEY);
            try { localStorage.removeItem(tabKey); } catch (x) { }
        }
    } catch (err) { }
});
window.addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    beatTab();
    rawStore.remove(SAIKAI_CUT_KEY);
    if (saikaiSession) endSaikai(false, 'cut');
    else if (saikaiLive) clearSaikaiLive();
});

let wasOffline = navigator.onLine === false;
window.addEventListener('online', () => {
    if (!wasOffline) return;
    wasOffline = false;
    ach.unlock('online_again');
    holdMessage(isEvil ? "The glass found you again. It was never gone." : "[ SIGNAL RESTORED ] The Index kept your place.", 3200);
});
window.addEventListener('offline', () => {
    wasOffline = true;
    ach.unlock('offline');
    if (saikaiSession && songSource === 'youtube') {
        clearTimeout(offlineTimer);
        offlineTimer = setTimeout(() => { if (navigator.onLine === false) endSaikai(false); }, 8000);
    }
});

function probeImage(src) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
    });
}

function setLogoImage(evil) {
    if (season === 'aprilfools') evil = !evil;
    let src;
    let mirrored = false;
    if (evil) {
        if (!evilImgMissing) src = ASSETS.evilImg;
        else { src = normalImgMissing ? FALLBACK_LOGO : ASSETS.normalImg; mirrored = true; }
    } else {
        src = normalImgMissing ? FALLBACK_LOGO : ASSETS.normalImg;
    }
    logo.classList.toggle('evil-fallback', mirrored);
    if (logo.getAttribute('src') !== src) logo.src = src;
    logo.alt = evil ? "The Index, reflected" : "The Index Logo";
    favicon.type = src.startsWith('data:') ? 'image/svg+xml' : 'image/png';
    favicon.href = src;
    if (season && SEASONS[season]) { favicon.type = 'image/svg+xml'; favicon.href = SEASONS[season].icon; }
}

logo.addEventListener('error', () => {
    const current = logo.getAttribute('src');
    if (current === FALLBACK_LOGO) return;
    if (current === ASSETS.evilImg) evilImgMissing = true;
    else normalImgMissing = true;
    setLogoImage(isEvil);
    refreshAssetState();
});

function setMode(evil) {
    isEvil = evil;
    mirrorMs = 0;
    mirrorLongFired = false;
    store.set('index_flips', numberOf(store.get('index_flips', 0)) + 1);
    ach.unlock(evil ? 'mirror' : 'return');
    ach.evaluate();
    rollDisclaimer();
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
    for (const el of (adornEl ? [logo, adornEl] : [logo])) {
        el.style.setProperty('--shake', `${1 + n * 1.5}px`);
        el.style.setProperty('--tilt', `${0.8 + n * 0.9}deg`);
        el.classList.remove('tap-shake');
        void el.offsetWidth;
        el.classList.add('tap-shake');
    }
}

logo.addEventListener('animationend', (e) => {
    if (e.animationName === 'tapShake') logo.classList.remove('tap-shake');
});



let mirrorMs = 0;
let mirrorLongFired = false;
setInterval(() => {
    if (!isEvil || document.hidden) return;
    mirrorMs += 1000;
    if (mirrorMs >= MIRROR_STAY_MS) ach.unlock('mirror_stay');
    if (mirrorMs >= MIRROR_STAY_LONG_MS && !mirrorLongFired) {
        mirrorLongFired = true;
        ach.unlock('mirror_stay30');
        holdMessage("Thirty minutes in the glass. The reflection has started to wonder which of you is the real one.", 6000);
    }
}, 1000);

function flipLogo() {
    safely(() => playFlipSound(!isEvil));
    setBusy(true);
    button.disabled = true;
    logo.classList.remove('tap-shake');
    logo.classList.add('transforming');
    if (adornEl) adornEl.classList.add('transforming');
    logoContainer.classList.add('transforming');
    mainContainer.classList.add('flicker');

    setTimeout(() => {
        try { setMode(!isEvil); } catch (err) { console.error('[Index] The flip failed.', err); }
    }, SWAP_AT_MS);

    setTimeout(() => {
        logo.classList.remove('transforming');
        if (adornEl) adornEl.classList.remove('transforming');
        logoContainer.classList.remove('transforming');
        mainContainer.classList.remove('flicker');
        setBusy(false);
        button.disabled = blocked || getRemainingTime() > 0;
    }, TRANSFORM_MS);
}

logo.addEventListener('click', () => {
    if (Date.now() < suppressLogoClickUntil) return;
    if (busy) return;
    getAudioCtx();

    tapCount++;
    clearTimeout(tapTimer);
    const pokes = numberOf(store.get('index_pokes', 0)) + 1;
    store.set('index_pokes', pokes);
    if (pokes >= 100) ach.unlock('poke_100');

    if (tapCount >= TAP_THRESHOLD) {
        tapCount = 0;
        showHint("");
        flipLogo();
        return;
    }

    if (tapCount >= 3) ach.unlock('poke');
    tapTimer = setTimeout(() => { tapCount = 0; showHint(""); }, TAP_RESET_MS);
    shakeLogo(tapCount);
    safely(() => playTapCrack(tapCount));
    const quips = isEvil ? tapQuips.evil : tapQuips.normal;
    showHint(quips[tapCount - 1] || "");
});

let assetLevel = 0;
let corruptTimer;
const prefersReducedMotion = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

function ensureEl(id, className, parent = document.body) {
    let node = document.getElementById(id);
    if (!node) {
        node = document.createElement('div');
        node.id = id;
        node.className = className;
        node.setAttribute('aria-hidden', 'true');
        parent.appendChild(node);
    }
    return node;
}

function refreshAssetState() {
    const level = (normalImgMissing ? 1 : 0) + (evilImgMissing ? 1 : 0);
    if (level === assetLevel) return;
    const rose = level > assetLevel;
    assetLevel = level;

    const body = document.body;
    body.classList.toggle('corrupt-1', MISSING_ASSET_GLITCH && level === 1);
    body.classList.toggle('corrupt-2', MISSING_ASSET_GLITCH && level >= 2);

    const warning = ensureEl('assetWarning', 'asset-warning');
    const veil = ensureEl('glitchVeil', 'glitch-veil');
    veil.hidden = !MISSING_ASSET_GLITCH || level === 0;

    if (level === 0) {
        warning.hidden = true;
        clearTimeout(corruptTimer);
        return;
    }

    const which = [normalImgMissing && ASSETS.normalImg, evilImgMissing && ASSETS.evilImg].filter(Boolean).join(', ');
    console.warn(`[Index] Missing insignia: ${which}`);
    warning.removeAttribute('aria-hidden');
    warning.setAttribute('role', 'alert');
    warning.classList.toggle('severe', level >= 2);
    warning.innerHTML = level >= 2
        ? '[ CRITICAL: THE INDEX HAS NO FACE LEFT ]<small>The Will continues regardless.</small>'
        : (normalImgMissing
            ? '[ WARNING: THE INDEX HAS LOST ITS FACE ]<small>Something is missing. The Will continues.</small>'
            : '[ WARNING: THE MIRROR HAS LOST ITS REFLECTION ]<small>Something is missing. The Will continues.</small>');
    warning.hidden = false;

    if (rose) {
        ach.notice({
            icon: level >= 2 ? 'ghost' : 'brokenFrame',
            label: level >= 2 ? 'Critical warning' : 'Warning',
            title: level >= 2 ? 'Every insignia is gone' : (normalImgMissing ? 'The Index lost its face' : 'The mirror lost its reflection'),
            severe: level >= 2
        });
    }
    ach.unlock('missing_piece');

    if (MISSING_ASSET_GLITCH) corruptLoop();
}

function corruptLoop() {
    clearTimeout(corruptTimer);
    if (assetLevel === 0 || !MISSING_ASSET_GLITCH) return;
    const hard = assetLevel >= 2;
    const wait = hard ? 180 + Math.random() * 520 : 2500 + Math.random() * 3500;
    corruptTimer = setTimeout(() => { corruptOnce(hard); corruptLoop(); }, wait);
}

function corruptOnce(hard) {
    if (document.hidden || busy || revealing || saikaiSession || prefersReducedMotion()) return;
    const original = display.innerText;
    if (!original) return;
    const rate = hard ? 0.28 : 0.1;
    let out = '';
    for (const ch of original) {
        out += (ch === ' ' || ch === '\n' || Math.random() > rate) ? ch : randGlitch();
    }
    display.innerText = out;
    const written = display.innerText;
    setTimeout(() => { if (display.innerText === written) display.innerText = original; }, 70 + Math.random() * 120);
}

const footerLink = document.querySelector('.footer a');
if (footerLink) {
    ['click', 'auxclick'].forEach(type => footerLink.addEventListener(type, () => ach.unlock('credits')));
}

let holdBase = "";
function holdMessage(text, ms) {
    if (busy || revealing || saikaiSession || blocked) return false;
    const previous = holdText ? holdBase : display.innerText;
    holdBase = previous;
    holdText = true;
    display.innerText = text;
    if (ms) {
        const written = display.innerText;
        setTimeout(() => {
            holdText = false;
            if (display.innerText === written) display.innerText = previous;
        }, ms);
    }
    return true;
}

let idleMs = 0;
let idleFired = false;
let idleLongFired = false;
function wake() {
    idleMs = 0;
    idleLongFired = false;
    if (idleFired) {
        idleFired = false;
        holdText = false;
    }
}
['pointerdown', 'pointermove', 'keydown', 'touchstart', 'wheel'].forEach(type =>
    window.addEventListener(type, wake, { passive: true }));

setInterval(() => {
    if (document.hidden) return;
    idleMs += 1000;
    if (idleMs >= IDLE_WATCH_MS && !idleFired) {
        idleFired = true;
        ach.unlock('idle');
        holdMessage(isEvil
            ? "Ten quiet minutes. Thank you for sitting with me."
            : "Ten minutes. You did not look away. Neither did the Index.");
    }
    if (idleMs >= IDLE_LONG_MS && !idleLongFired) {
        idleLongFired = true;
        ach.unlock('idle30');
        holdMessage(isEvil
            ? "Thirty minutes of watching. The glass is no longer sure who is the reflection."
            : "Thirty minutes. The Index has begun to wonder who is watching whom.");
    }
}, 1000);

let impatientCount = 0;
let lastImpatient = 0;
let impatientHintTimer;
const impatientQuips = { 3: "The Will is not yet fulfilled.", 6: "Patience is also a duty.", 9: "The Index is watching you press." };

document.addEventListener('pointerdown', (e) => {
    if (!button.disabled || blocked || busy || getRemainingTime() <= 0) return;
    const r = button.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;

    const now = Date.now();
    impatientCount = (now - lastImpatient > IMPATIENT_GAP_MS) ? 1 : impatientCount + 1;
    lastImpatient = now;

    if (impatientQuips[impatientCount]) {
        showHint(impatientQuips[impatientCount]);
        clearTimeout(impatientHintTimer);
        impatientHintTimer = setTimeout(() => showHint(''), 2000);
    }
    if (impatientCount >= IMPATIENT_TAPS) {
        impatientCount = 0;
        ach.unlock('impatient');
    }
}, true);

let burstTimer;
function glitchBurst(ms) {
    if (prefersReducedMotion()) return;
    const veil = ensureEl('glitchVeil', 'glitch-veil');
    veil.hidden = false;
    document.body.classList.add('glitch-burst');
    clearTimeout(burstTimer);
    burstTimer = setTimeout(() => {
        document.body.classList.remove('glitch-burst');
        if (assetLevel === 0 || !MISSING_ASSET_GLITCH) veil.hidden = true;
    }, ms);
}

function playGlitchBurstSound() {
    const ctx = getAudioCtx();
    if (!ctx || !audioBus) return;
    playTone(ctx, { type: 'sawtooth', from: 90, to: 45, dur: 0.9, gain: 0.1, attack: 0.01, lp: 500 });
    for (let i = 0; i < 10; i++) {
        noiseBurst(ctx, { start: i * 0.09, dur: 0.03 + Math.random() * 0.05, attack: 0.001, gain: 0.1, type: 'bandpass', freq: 600 + Math.random() * 5000, q: 5 });
    }
}

const KONAMI = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
let konamiStep = 0;
let konamiTimer;

function konamiFeed(token) {
    clearTimeout(konamiTimer);
    if (token === KONAMI[konamiStep]) konamiStep++;
    else konamiStep = token === KONAMI[0] ? 1 : 0;

    if (konamiStep >= KONAMI.length) {
        konamiStep = 0;
        ach.unlock('konami');
        if (isEvil) ach.unlock('konami_mirror');
        glitchBurst(2600);
        safely(playGlitchBurstSound);
        holdMessage(isEvil
            ? "The glass flickers. That was not meant to be found."
            : "[ UNAUTHORIZED INPUT ACCEPTED ] The Index grants no extra lives.", 3200);
        return;
    }
    if (konamiStep > 0) konamiTimer = setTimeout(() => { konamiStep = 0; }, KONAMI_STEP_MS);
}

const KEY_TOKENS = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', b: 'b', B: 'b', a: 'a', A: 'a' };
document.addEventListener('keydown', (e) => {
    const token = KEY_TOKENS[e.key];
    if (token) konamiFeed(token);
});

let touchStart = null;
document.addEventListener('touchstart', (e) => {
    const inCard = e.target && e.target.closest && e.target.closest('.ach-panel');
    touchStart = (e.touches.length === 1 && !inCard) ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
}, { passive: true });
document.addEventListener('touchend', (e) => {
    if (!touchStart || !e.changedTouches.length) return;
    const dx = e.changedTouches[0].clientX - touchStart.x;
    const dy = e.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE_MIN_PX) {
        if (konamiStep === 8) konamiFeed('b');
        else if (konamiStep === 9) konamiFeed('a');
        return;
    }
    konamiFeed(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
}, { passive: true });

function isInspectCombo(e) {
    const k = (e.key || '').toLowerCase();
    const c = e.code || '';
    const ctrl = e.ctrlKey || e.metaKey;
    return (
        e.key === 'F12' ||
        (ctrl && e.shiftKey && (k === 'i' || k === 'j' || k === 'c' || c === 'KeyI' || c === 'KeyJ' || c === 'KeyC')) ||
        (ctrl && (k === 'u' || c === 'KeyU')) ||
        (e.metaKey && e.altKey && (c === 'KeyI' || c === 'KeyJ' || c === 'KeyC' || c === 'KeyU'))
    );
}

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (Date.now() < suppressPeekUntil) return;
    ach.unlock('peek');
});
document.addEventListener('keydown', (e) => {
    if (isInspectCombo(e)) {
        e.preventDefault();
        ach.unlock('peek');
    }
});

const PEEK_TAPS = 7;
const PEEK_GAP_MS = 1500;
let peekTaps = 0;
let lastPeekTap = 0;
let peekHintTimer;
disclaimerEl.addEventListener('click', () => {
    const now = Date.now();
    peekTaps = (now - lastPeekTap > PEEK_GAP_MS) ? 1 : peekTaps + 1;
    lastPeekTap = now;
    if (peekTaps === 4) {
        showHint(isEvil ? "The fine print has something behind it." : "The fine print is not just print.");
        clearTimeout(peekHintTimer);
        peekHintTimer = setTimeout(() => { if (tapCount === 0) showHint(''); }, 2200);
    }
    if (peekTaps >= PEEK_TAPS) {
        peekTaps = 0;
        ach.unlock('devtools');
        glitchBurst(2200);
        safely(playGlitchBurstSound);
        holdMessage(isEvil
            ? "You looked behind the glass. There is nothing there but you."
            : "[ INSPECTION NOTED ] You did not need the tools. The Index saw you looking.", 3600);
    }
});

function setBlocked(on) {
    if (blocked === on) return;
    blocked = on;
    if (on) {
        if (!saikaiSession) display.innerText = "TRANSMISSION BLOCKED: DEV TOOLS DETECTED.";
        button.disabled = true;
        ach.unlock('devtools');
    } else if (!busy) {
        const remaining = getRemainingTime();
        if (remaining > 0) {
            startUiLockout(remaining);
        } else {
            display.innerText = idleText();
            button.disabled = false;
        }
    }
}

setInterval(() => {
    try {
        const start = performance.now();
        debugger;
        const end = performance.now();
        setBlocked(end - start > 100);
    } catch (err) { }
}, 500);

setInterval(() => {
    if (busy && !revealing && !saikaiSession && Date.now() - busySince > BUSY_WATCHDOG_MS) {
        console.warn('[Index] Busy watchdog fired. Releasing the button.');
        setBusy(false);
        button.disabled = blocked || getRemainingTime() > 0;
    }
}, 5000);

let lastDisclaimer = store.get('index_last_disclaimer', '');

function pickHolidayDisclaimer(mode, always = false) {
    if (!season) return null;
    const list = (holidayDisclaimerPools[season] || {})[mode] || [];
    if (!list.length || (!always && Math.random() >= HOLIDAY_DISCLAIMER_CHANCE)) return null;
    const fresh = list.filter(t => t !== lastDisclaimer);
    const from = fresh.length ? fresh : list;
    return from[Math.floor(Math.random() * from.length)];
}

function rollDisclaimer(animate = true) {
    const holidayLine = pickHolidayDisclaimer(isEvil ? 'evil' : 'normal');
    if (holidayLine) {
        lastDisclaimer = holidayLine;
        if (!animate) { disclaimerEl.textContent = holidayLine; return; }
        disclaimerEl.classList.add('out');
        setTimeout(() => { disclaimerEl.textContent = holidayLine; disclaimerEl.classList.remove('out'); }, 450);
        return;
    }
    let pool = isEvil ? mirrorDisclaimers : disclaimers;
    const paired = [...pairMap[isEvil ? 'evil' : 'normal'].keys()];
    const seenKeyD = `index_disc_seen_${isEvil ? 'evil' : 'normal'}`;
    const seenD = store.get(seenKeyD, []);
    const unseenD = pool.filter(d => !seenD.includes(d));
    if (paired.length && Math.random() < ECHO_DISCLAIMER_BIAS) pool = paired;
    else if (unseenD.length && Math.random() < 0.7) pool = unseenD;
    let next;
    do { next = pool[Math.floor(Math.random() * pool.length)]; } while (next === lastDisclaimer && pool.length > 1);
    lastDisclaimer = next;
    store.set('index_last_disclaimer', next);
    if (!seenD.includes(next)) {
        store.set(seenKeyD, [...seenD, next]);
        ach.evaluate();
    }
    if (!animate) { disclaimerEl.textContent = next; return; }
    disclaimerEl.classList.add('out');
    setTimeout(() => { disclaimerEl.textContent = next; disclaimerEl.classList.remove('out'); }, 450);
}

if (logo.complete && logo.getAttribute('src') && logo.naturalWidth === 0) normalImgMissing = true;
Promise.all([probeImage(ASSETS.normalImg), probeImage(ASSETS.evilImg)]).then(([normalOk, evilOk]) => {
    normalImgMissing = !normalOk;
    evilImgMissing = !evilOk;
    setLogoImage(isEvil);
    refreshAssetState();
});
if (normalImgMissing) { setLogoImage(false); refreshAssetState(); }

setInterval(() => integrity.inspect(), 1500);
document.addEventListener('visibilitychange', () => integrity.inspect());
window.addEventListener('focus', () => integrity.inspect());

rollDisclaimer(false);
ach.evaluate();
if (navigator.onLine === false) ach.unlock('offline');

const cutHit = (() => { try { return consumeSaikaiCut(); } catch (err) { return null; } })();
if (cutHit) {
    const side = cutHit.side === 'evil' ? 'evil' : 'normal';
    lastDisclaimer = interruptDisclaimers[side] || lastDisclaimer;
    disclaimerEl.textContent = lastDisclaimer;
    applySaikaiCut(cutHit);
}

function wasReload() {
    try {
        const nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
        if (nav && nav.type) return nav.type === 'reload';
        if (performance.navigation) return performance.navigation.type === 1;
    } catch (e) { }
    return false;
}
const reloadQuips = {
    3: "Again? The Index has not changed. You keep arriving.",
    5: "Refreshing will not make the Index speak faster.",
    8: "The Index is starting to enjoy this. Please stop.",
    10: "Ten times. The Index has stopped pretending this is normal."
};
(function trackReload() {
    if (!wasReload()) return;
    const now = Date.now();
    const old = readFlag('index_reload_log');
    const log = (Array.isArray(old) ? old : []).filter(t => now - numberOf(t) < RELOAD_LOG_MS);
    log.push(now);
    rawStore.set('index_reload_log', JSON.stringify(log));
    store.set('index_reloads', numberOf(store.get('index_reloads', 0)) + 1);
    if (log.filter(t => now - t < RELOAD_WINDOW_MS).length >= RELOAD_GOAL) ach.unlock('refresher');
    if (log.length >= RELOAD_GOAL_LONG) ach.unlock('refresher10');
    ach.evaluate();
    if (reloadQuips[log.length]) bootSay(reloadQuips[log.length], 4000);
})();

const HIDDEN_KEY = 'index_hidden_at';
let hiddenAt = 0;
let saikaiHiddenAt = 0;
function welcomeBack(awayMs, say = holdMessage) {
    if (awayMs >= ABSENCE_GOAL_MS) ach.unlock('absence');
    if (awayMs >= ABSENCE_NOTICE_MS) {
        say(isEvil
            ? `You were gone for ${formatTime(awayMs)}. The glass did not look away once.`
            : `You were gone for ${formatTime(awayMs)}. The Index counted every second.`, 5000);
    }
}
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        hiddenAt = Date.now();
        rawStore.set(HIDDEN_KEY, hiddenAt);
        if (saikaiSession) saikaiHiddenAt = hiddenAt;
        flushPlay();
    } else {
        const away = hiddenAt ? Date.now() - hiddenAt : 0;
        hiddenAt = 0;
        rawStore.remove(HIDDEN_KEY);
        if (away > 0) welcomeBack(away);
        if (saikaiSession && saikaiHiddenAt && Date.now() - saikaiHiddenAt >= 8000) ach.unlock('saikai_bg');
        saikaiHiddenAt = 0;
        applySeason(true);
    }
});
(() => {
    const left = numberOf(rawStore.get(HIDDEN_KEY));
    rawStore.remove(HIDDEN_KEY);
    if (left > 0 && !document.hidden) welcomeBack(Date.now() - left, bootSay);
})();


let pendingPlay = 0;
let sessionMs = 0;
function flushPlay() {
    if (pendingPlay < 1000) return;
    const add = pendingPlay;
    pendingPlay = 0;
    store.set('index_playtime', numberOf(store.get('index_playtime', 0)) + add);
    ach.evaluate();
}
setInterval(() => {
    if (document.hidden) return;
    pendingPlay += 1000;
    sessionMs += 1000;
    if (sessionMs >= 60 * 60 * 1000) ach.unlock('long_session');
    if (pendingPlay >= 30000) flushPlay();
}, 1000);

(function visitBook() {
    const today = dayNumber();
    const days = store.get('index_days', []);
    const list = Array.isArray(days) ? days : [];
    if (!list.includes(today)) store.set('index_days', [...list, today].slice(-400));

    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        const year = new Date().getFullYear();
        const std = Math.max(new Date(year, 0, 1).getTimezoneOffset(), new Date(year, 6, 1).getTimezoneOffset());
        const prev = readFlag('index_tz');
        if (tz && prev && prev.tz && prev.tz !== tz && numberOf(prev.std) !== std) {
            if (ach.unlock('traveler')) bootSay("The sun is in a different place. The Index noticed that you are far from where you were.", 6000);
        }
        if (tz) rawStore.set('index_tz', JSON.stringify({ tz, std }));
    } catch (err) { }
})();

function clockWentBack() {
    const fresh = ach.unlock('clock_back');
    if (fresh) holdMessage("The clock moved backward. The Index keeps its own time.", 5000);
    return fresh;
}
const clockBase = { date: Date.now(), perf: performance.now() };
function clockTick() {
    const now = Date.now();
    const drift = (now - clockBase.date) - (performance.now() - clockBase.perf);
    if (drift < -120000) {
        clockBase.date = now;
        clockBase.perf = performance.now();
        clockWentBack();
    }
    rawStore.set('index_clock', now);
    applySeason(true);
}
{
    const lastClock = numberOf(rawStore.get('index_clock'));
    if (lastClock > 0 && Date.now() < lastClock - 10 * 60 * 1000) {
        if (ach.unlock('clock_back')) bootSay("The clock moved backward. The Index keeps its own time.", 5000);
    }
    rawStore.set('index_clock', Date.now());
    setInterval(clockTick, 5000);
}

const TAB_PREFIX = 'index_tab_';
const tabId = Math.random().toString(36).slice(2, 10);
const tabKey = TAB_PREFIX + tabId;
const TAB_BEAT_MS = 4000;
const TAB_FRESH_MS = 12000;
function beatTab() { try { localStorage.setItem(tabKey, String(Date.now())); } catch (err) { } }
function twinTabs() {
    if (ach.unlock('twin_tabs')) holdMessage("The Index is open somewhere else too. It does not mind. It is everywhere.", 5000);
}
function otherTabAlive() {
    try {
        const now = Date.now();
        let alive = false;
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const k = localStorage.key(i);
            if (!k || !k.startsWith(TAB_PREFIX) || k === tabKey) continue;
            const age = now - Number(localStorage.getItem(k));
            if (age < TAB_FRESH_MS) alive = true;
            else if (age > 60000) localStorage.removeItem(k);
        }
        return alive;
    } catch (err) { return false; }
}
if (otherTabAlive() && ach.unlock('twin_tabs')) bootSay("The Index is open somewhere else too. It does not mind. It is everywhere.", 5000);
beatTab();
setInterval(beatTab, TAB_BEAT_MS);
try {
    if (typeof BroadcastChannel === 'function') {
        const channel = new BroadcastChannel('index_tabs');
        channel.onmessage = (e) => {
            const m = e && e.data;
            if (!m || m.from === tabId) return;
            if (m.type === 'hello') channel.postMessage({ type: 'here', from: tabId });
            twinTabs();
        };
        channel.postMessage({ type: 'hello', from: tabId });
    }
} catch (err) { }
window.addEventListener('storage', (e) => {
    if (e.key && e.key.startsWith(TAB_PREFIX) && e.key !== tabKey && e.newValue) twinTabs();
});

const SECRET_WORDS = new Set(['#mirror', '#saikai', '#index', '#will', '#prescript', '#senpai']);
function checkHash() {
    const word = String(location.hash || '').toLowerCase();
    if (SECRET_WORDS.has(word) && ach.unlock('secret_link')) holdMessage("You knew where to look. The Index did not say a word.", 4500);
}
checkHash();
window.addEventListener('hashchange', checkHash);

try {
    const dark = window.matchMedia('(prefers-color-scheme: dark)');
    const onTheme = () => {
        rawStore.set('index_scheme', dark.matches ? 'dark' : 'light');
        if (ach.unlock('theme_flip')) holdMessage("The light changed. The Index did not. It was already dark here.", 4500);
    };
    const scheme = dark.matches ? 'dark' : 'light';
    const before = rawStore.get('index_scheme');
    if (before && before !== scheme && ach.unlock('theme_flip')) bootSay("The light has changed since you were last here. The Index noticed.", 5000);
    rawStore.set('index_scheme', scheme);
    if (dark.addEventListener) dark.addEventListener('change', onTheme);
    else if (dark.addListener) dark.addListener(onTheme);
} catch (err) { }

const shapeNow = () => (window.innerWidth >= window.innerHeight ? 'wide' : 'tall');
let lastShape = shapeNow();
let shapeTurns = 0;
let shapeTimer;
function checkShape() {
    const now = shapeNow();
    if (now === lastShape) return;
    lastShape = now;
    if (++shapeTurns >= 8) ach.unlock('rotate');
}
window.addEventListener('resize', () => { clearTimeout(shapeTimer); shapeTimer = setTimeout(checkShape, 200); });
window.addEventListener('orientationchange', () => setTimeout(checkShape, 350));

const heldKeys = new Map();
const isModifierKey = (code) => /^(Shift|Control|Alt|Meta|OS|CapsLock|Fn)/.test(code);
function handsCheck(count) {
    if (count >= 3) ach.unlock('many_hands');
    if (count >= 5) ach.unlock('five_hands');
}
document.addEventListener('keydown', (e) => {
    const code = e.code || e.key;
    if (e.repeat || !code || isModifierKey(code) || e.metaKey) return;
    const now = Date.now();
    heldKeys.set(code, now);
    let n = 0;
    heldKeys.forEach(t => { if (now - t <= 1500) n++; });
    handsCheck(n);
});
document.addEventListener('keyup', (e) => { heldKeys.delete(e.code || e.key); });
window.addEventListener('blur', () => heldKeys.clear());
document.addEventListener('touchstart', (e) => handsCheck(e.touches ? e.touches.length : 0), { passive: true });

const GRAB_HOLD_MS = 280;
const GRAB_SLOP_PX = 10;
const DRAG_PX = 150;
const SPIN_DEGREES = 720;
let grab = null;
let carryX = 0;
let carryY = 0;
let suppressPeekUntil = 0;
let suppressLogoClickUntil = 0;
const clampNum = (v, lo, hi) => Math.min(Math.max(v, lo), Math.max(lo, hi));

function setCarry(x, y) {
    carryX = x;
    carryY = y;
    logoContainer.style.translate = `${x}px ${y}px`;
}
function currentCarry() {
    try {
        const t = getComputedStyle(logoContainer).translate;
        if (t && t !== 'none') {
            const [a, b] = t.split(' ').map(parseFloat);
            if (Number.isFinite(a)) return { x: a, y: Number.isFinite(b) ? b : 0 };
        }
    } catch (err) { }
    return { x: carryX, y: carryY };
}
function liftInsignia(g) {
    if (g.grabbed) return;
    g.grabbed = true;
    logoContainer.classList.remove('returning');
    logoContainer.classList.add('held');
    try { if (navigator.vibrate) navigator.vibrate(12); } catch (err) { }
    clearTimeout(tapTimer);
    tapCount = 0;
    showHint(isEvil ? "Do not move the glass." : "Please put the Index down.");
}
function endGrab() {
    if (!grab) return;
    const g = grab;
    grab = null;
    clearTimeout(g.timer);
    try { logo.releasePointerCapture(g.id); } catch (err) { }
    if (!g.grabbed) return;
    suppressLogoClickUntil = Date.now() + 450;
    suppressPeekUntil = Date.now() + 900;
    logoContainer.classList.remove('held');
    logoContainer.classList.add('returning');
    setCarry(0, 0);
    showHint('');
    setTimeout(() => logoContainer.classList.remove('returning'), 700);
    if (g.freshDrag) holdMessage(isEvil ? "You moved the glass. It will remember where it stood." : "Please do not move the Index. It was standing there first.", 4500);
    else if (g.freshSpin) holdMessage("Round and round. The Index is dizzy.", 4000);
}
logo.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (grab) return;
    const at = currentCarry();
    const r = logoContainer.getBoundingClientRect();
    grab = {
        id: e.pointerId, startX: e.clientX, startY: e.clientY, origin: at,
        home: { left: r.left - at.x, right: r.right - at.x, top: r.top - at.y, bottom: r.bottom - at.y },
        grabbed: false, maxDist: 0, turned: 0, lastX: e.clientX, lastY: e.clientY, lastV: null,
        dragSeen: false, freshDrag: false, freshSpin: false, timer: 0
    };
    suppressPeekUntil = Date.now() + 1500;
    const mine = grab;
    grab.timer = setTimeout(() => { if (grab === mine) liftInsignia(mine); }, GRAB_HOLD_MS);
    try { logo.setPointerCapture(e.pointerId); } catch (err) { }
});
logo.addEventListener('pointermove', (e) => {
    if (!grab || e.pointerId !== grab.id) return;
    const dx = e.clientX - grab.startX;
    const dy = e.clientY - grab.startY;
    if (!grab.grabbed) {
        if (Math.hypot(dx, dy) < GRAB_SLOP_PX) return;
        liftInsignia(grab);
    }
    const x = clampNum(grab.origin.x + dx, -grab.home.left, window.innerWidth - grab.home.right);
    const y = clampNum(grab.origin.y + dy, -grab.home.top, window.innerHeight - grab.home.bottom);
    setCarry(x, y);
    grab.maxDist = Math.max(grab.maxDist, Math.hypot(x - grab.origin.x, y - grab.origin.y));
    const vx = e.clientX - grab.lastX;
    const vy = e.clientY - grab.lastY;
    if (Math.hypot(vx, vy) >= 6) {
        if (grab.lastV) grab.turned += Math.atan2(grab.lastV.x * vy - grab.lastV.y * vx, grab.lastV.x * vx + grab.lastV.y * vy) * 180 / Math.PI;
        grab.lastV = { x: vx, y: vy };
        grab.lastX = e.clientX;
        grab.lastY = e.clientY;
    }
    if (grab.maxDist >= DRAG_PX && !grab.dragSeen) {
        grab.dragSeen = true;
        if (ach.unlock('drag_logo')) grab.freshDrag = true;
    }
    if (Math.abs(grab.turned) >= SPIN_DEGREES) {
        grab.turned = 0;
        if (ach.unlock('rotate')) grab.freshSpin = true;
    }
});
for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    logo.addEventListener(type, (e) => { if (grab && e.pointerId === grab.id) endGrab(); });
}
window.addEventListener('blur', endGrab);

const LIGHTS_HOLD_MS = 1500;
let lightsHold = null;
let lightsOff = false;
function cancelLights() {
    if (lightsHold) { clearTimeout(lightsHold.timer); lightsHold = null; }
}
function toggleLights() {
    lightsOff = !lightsOff;
    document.body.classList.toggle('lights-off', lightsOff);
    const fresh = ach.unlock('theme_flip');
    holdMessage(lightsOff
        ? (isEvil ? "The glass went dark. It sees you better this way." : "The lights are out. The Index does not need them.")
        : (isEvil ? "The glass lit up again. It was never really dark." : "The lights are back. The Index pretends it did not notice."), fresh ? 4500 : 2500);
}
document.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const el = e.target;
    if (el && el.closest && el.closest('button, a, input, .ach-panel, .logo-container, .disclaimer')) return;
   cancelLights();
    lightsHold = { id: e.pointerId, x: e.clientX, y: e.clientY, timer: setTimeout(() => { lightsHold = null; toggleLights(); }, LIGHTS_HOLD_MS) };
});
document.addEventListener('pointermove', (e) => {
    if (lightsHold && e.pointerId === lightsHold.id && Math.hypot(e.clientX - lightsHold.x, e.clientY - lightsHold.y) > 14) cancelLights();
});
document.addEventListener('pointerup', cancelLights);
document.addEventListener('pointercancel', cancelLights);

function seasonNow(d = new Date()) {
    const month = d.getMonth(), day = d.getDate();
    if (month === 9 && day === 31) return 'halloween';
    if (month === 11 && (day === 24 || day === 25)) return 'christmas';
    if (month === 1 && day === 14) return 'valentine';
    if (month === 3 && day === 1) return 'aprilfools';
    if ((month === 11 && day === 31) || (month === 0 && day === 1)) return 'newyear';
    return null;
}
const emojiIcon = (e) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;
const SEASONS = {
    halloween: {
        icon: emojiIcon('\u{1F383}'),
        hat: '<svg viewBox="0 0 100 100"><path d="M8 84Q50 98 92 84Q86 74 70 72L58 16Q54 6 48 12L34 70Q14 74 8 84Z" fill="#1d0f2e" stroke="#ff8a1f" stroke-width="2.5" stroke-linejoin="round"/><path d="M33 66Q52 75 70 68L68 57Q51 66 35 58Z" fill="#ff8a1f"/><rect x="47" y="57" width="9" height="11" rx="1" fill="#1d0f2e" stroke="#ffd36b" stroke-width="2"/></svg>',
        hello: ["Happy Halloween. The Index has dressed for the occasion.", "Happy Halloween. The glass is wearing a mask. It is hard to say which of you is."],
        fine: "The Index accepts no liability for ghosts, witches, or candy that mysteriously disappears.",
        fx: 'ember'
    },
    christmas: {
        icon: emojiIcon('\u{1F384}'),
        hat: '<svg viewBox="0 0 100 100"><path d="M10 78C12 40 36 14 64 18C84 22 94 38 92 54C82 46 70 52 66 66L66 78Z" fill="#d6262c" stroke="#8f1217" stroke-width="2" stroke-linejoin="round"/><rect x="6" y="68" width="66" height="18" rx="9" fill="#f6f6f6" stroke="#cfcfcf" stroke-width="1.5"/><circle cx="90" cy="56" r="9" fill="#f6f6f6" stroke="#cfcfcf" stroke-width="1.5"/></svg>',
        hello: ["Merry Christmas. The Index has been good this year. It cannot vouch for you.", "Merry Christmas. The mirror left a warm light on for you."],
        fine: "The Index checked its list twice. It is not saying what it found.",
        fx: 'snow'
    },
    valentine: {
        icon: emojiIcon('\u{1F496}'),
        hat: '<svg viewBox="0 0 100 100"><path d="M50 84C18 62 8 40 24 24C36 13 48 19 50 30C52 19 64 13 76 24C92 40 82 62 50 84Z" fill="#ff4d88" stroke="#b01e55" stroke-width="2" stroke-linejoin="round"/><path d="M30 34C32 28 38 26 42 29" fill="none" stroke="#ffd0e2" stroke-width="3"/></svg>',
        hello: ["Happy Valentine's Day. The Index has been practicing affection. Results may vary.", "Happy Valentine's Day. The glass wants you to know someone is glad you exist."],
        fine: "The Index accepts no responsibility for crushes, confessions or sudden poetry.",
        fx: 'heart'
    },
    aprilfools: {
        icon: emojiIcon('\u{1F921}'),
        hat: '<svg viewBox="0 0 100 100"><path d="M12 80C6 54 8 32 14 16C24 34 34 48 42 60C44 40 47 24 50 10C53 24 56 40 58 60C66 48 76 34 86 16C92 32 94 54 88 80Z" fill="#7a3ff0" stroke="#3f1a9a" stroke-width="2" stroke-linejoin="round"/><path d="M42 60C44 40 47 24 50 10C53 24 56 40 58 60Z" fill="#ff9f1c"/><rect x="8" y="70" width="84" height="16" rx="8" fill="#ffd23f" stroke="#b8860b" stroke-width="1.5"/><circle cx="14" cy="14" r="6" fill="#ffd23f" stroke="#b8860b" stroke-width="1.5"/><circle cx="50" cy="8" r="6" fill="#ffd23f" stroke="#b8860b" stroke-width="1.5"/><circle cx="86" cy="14" r="6" fill="#ffd23f" stroke="#b8860b" stroke-width="1.5"/></svg>',
        hello: ["Happy April Fools' Day. The Index and the mirror have swapped faces. Nothing else is wrong. Probably.", "Happy April Fools' Day. The glass has borrowed the Index's face. It insists nothing is different."],
        fine: "The Index is not lying today. It is only rearranging the truth.",
        fx: 'confetti',
        colors: ['#ff4d6d', '#ffd23f', '#3ddc84', '#4dabff', '#b266ff', '#ff9f1c']
    },
    newyear: {
        icon: emojiIcon('\u{1F386}'),
        hat: '<svg viewBox="0 0 100 100"><path d="M50 10L82 82L18 82Z" fill="#ffcf4d" stroke="#b8860b" stroke-width="2" stroke-linejoin="round"/><path d="M38 52L62 52L66 62L34 62Z" fill="#ff5d8f"/><path d="M28 74L72 74L76 82L24 82Z" fill="#ff5d8f"/><circle cx="50" cy="9" r="7" fill="#f6f6f6" stroke="#cfcfcf" stroke-width="1.5"/></svg>',
        hello: ["Happy New Year. The Index has counted down so you did not have to.", "Happy New Year. The glass has been waiting for this one all year."],
        fine: "The Index makes no promises about resolutions. It only keeps score.",
        fx: 'confetti',
        colors: ['#ffd166', '#fff6dd', '#ff5d8f', '#c9d6ff', '#7ee8c1']
    }
};
let adornEl = null;
let fxEl = null;
function buildSeasonDecor(next) {
    if (adornEl && adornEl.remove) adornEl.remove();
    if (fxEl && fxEl.remove) fxEl.remove();
    adornEl = fxEl = null;
    if (!next) return;
    adornEl = document.createElement('div');
    adornEl.className = 'season-adorn';
    adornEl.setAttribute('aria-hidden', 'true');
    adornEl.innerHTML = SEASONS[next].hat;
    adornEl.addEventListener('animationend', (e) => { if (e.animationName === 'tapShake') adornEl.classList.remove('tap-shake'); });
    (logo.parentElement || document.body).appendChild(adornEl);
    fxEl = document.createElement('div');
    const cfg = SEASONS[next];
    fxEl.className = `season-fx fx-${cfg.fx || 'snow'}`;
    fxEl.setAttribute('aria-hidden', 'true');
    const palette = Array.isArray(cfg.colors) && cfg.colors.length ? cfg.colors : null;
    for (let i = 0; i < 22; i++) {
        const dot = document.createElement('i');
        dot.style.setProperty('--x', `${(Math.random() * 100).toFixed(1)}%`);
        dot.style.setProperty('--d', `${(7 + Math.random() * 9).toFixed(1)}s`);
        dot.style.setProperty('--w', `${(-Math.random() * 14).toFixed(1)}s`);
        dot.style.setProperty('--s', `${(0.2 + Math.random() * 0.4).toFixed(2)}rem`);
        if (palette) dot.style.setProperty('--c', palette[i % palette.length]);
        fxEl.appendChild(dot);
    }
    document.body.appendChild(fxEl);
}
function applySeason(announce) {
    let next = null;
    try { next = seasonNow(); } catch (err) { }
    if (next === season) return;
    season = next;
    for (const name of Object.keys(SEASONS)) document.body.classList.toggle(`season-${name}`, next === name);
    buildSeasonDecor(next);
    setLogoImage(isEvil);
    if (announce && next) {
        glitchBurst(1400);
        holdMessage(SEASONS[next].hello[isEvil ? 1 : 0], 5500);
    }
}
applySeason(false);
if (season) {
    bootSay(SEASONS[season].hello[0], 5500);
    if (!cutHit) {
        lastDisclaimer = pickHolidayDisclaimer('normal', true) || SEASONS[season].fine;
        disclaimerEl.textContent = lastDisclaimer;
    }
}

if (bootMsg) holdMessage(bootMsg.text, bootMsg.ms);

const baseDpr = window.devicePixelRatio || 1;
const isTouchScreen = () => { try { return window.matchMedia('(pointer: coarse)').matches; } catch (e) { return false; } };

function currentZoom() {
    try {
        const vv = window.visualViewport;
        const pinch = vv && Number(vv.scale) > 0 ? Number(vv.scale) : 1;
        let browser = (window.devicePixelRatio || 1) / baseDpr;
        if (!isTouchScreen() && window.outerWidth > 0 && window.innerWidth > 0) {
            browser = Math.max(browser, window.outerWidth / window.innerWidth);
        }
        if (!Number.isFinite(browser) || browser < 1) browser = 1;
        return pinch * Math.min(browser, 5.2);
    } catch (e) { return 1; }
}

function logoAtCenter() {
    try {
        const r = logo.getBoundingClientRect();
        const vv = window.visualViewport;
        const cx = (vv ? vv.offsetLeft + vv.width / 2 : window.innerWidth / 2);
        const cy = (vv ? vv.offsetTop + vv.height / 2 : window.innerHeight / 2);
        return cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom;
    } catch (e) { return false; }
}

let zoomShown = 0;
let zoomFrame = 0;
let zoomHintTimer;
function zoomCheck() {
    zoomFrame = 0;
    const z = currentZoom();
    if (z < 1.5) { zoomShown = 0; return; }

    let level = 0;
    zoomLines.forEach((l, i) => { if (z >= l.at) level = i + 1; });
    if (level > zoomShown) {
        zoomShown = level;
        if (tapCount === 0 && !busy) {
            showHint(zoomLines[level - 1].text);
            clearTimeout(zoomHintTimer);
            zoomHintTimer = setTimeout(() => { if (tapCount === 0) showHint(''); }, 3500);
        }
    }
    if (z >= ZOOM_CLOSE_AT) {
        if (!ach.has('zoom_close')) ach.unlock('zoom_close');
        if (!ach.has('zoom_eye') && logoAtCenter()) ach.unlock('zoom_eye');
    }
    if (z >= ZOOM_MAX_AT && !ach.has('zoom_max')) {
        ach.unlock('zoom_max');
        glitchBurst(1400);
        holdMessage(isEvil
            ? "You cannot get any closer. The glass is fogging up."
            : "You cannot get any closer. The Index respects that. Barely.", 3500);
    }
}
const queueZoomCheck = () => { if (!zoomFrame) zoomFrame = requestAnimationFrame(zoomCheck); };
window.addEventListener('resize', queueZoomCheck);
if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', queueZoomCheck);
    window.visualViewport.addEventListener('scroll', queueZoomCheck);
}
queueZoomCheck();

window.addEventListener('unhandledrejection', (e) => console.warn('[Index] Unhandled rejection.', e.reason));
