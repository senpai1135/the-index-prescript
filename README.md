# 🧭 THE INDEX : PRESCRIPT GENERATOR
*"Execute the Will of the Prescript without question."*

[Overview](#-system-overview) • [Features](#-key-features) • [Mechanics](#-prescript-mechanics) • [Achievements](#-achievements) • [Structure](#-directory-structure) • [Secrets](#-secrets) • [Configuration](#-configuration) • [Security](#-security-protocols) • [Fallbacks](#-fallbacks) • [Deployment](#-deployment--installation)

---

## 👁️ System Overview

Inspired by the dark lore of **Library of Ruina**, **The Index** is a terminal-grade web interface designed to decrypt and relay inescapable divine mandates (*Prescripts*) directly to Proxies in real-time.

Built with low-overhead native technologies (plain HTML, CSS and ES modules, no dependencies), the application implements high-frequency text-scrambling frame loops, frame-perfect audio synchronization, temporal lockout algorithms, a 50-entry achievement system, and active anti-tamper security layers to maintain the integrity of the City's divine order.

```text
 [ THE INDEX ] ───( ENCRYPTED TRANSMISSION )───> [ PROXY TERMINAL ]
       │                                                 │
       ├── Decryption Wavefront Syncing ─────────────────┤
       ├── Real-time UI Lockout / Cooldown Engine ───────┤
       ├── Achievement Ledger (sealed save data) ────────┤
       └── Anti-Tamper DevTool Intercepts ───────────────┘

```
## ✨ Key Features
### 📡 Synchronized Audio-Visual Decryption
 * **Wavefront Text Scrambling:** Custom JavaScript execution using requestAnimationFrame continuously interpolates ASCII/Glitch character matrix layers (¡¢£¤¥...◢◣◤◥) before locking into the target decree.
 * **Audio-Paced Modulation:** The text reveal animation scales dynamically to match the precise audio duration (sfx.duration) of the terminal's hardware beeper. If the audio cannot play, the same sequence runs visually.
### ⏳ Temporal Duty Locking (localStorage)
 * **Will Enforcers:** Certain Prescripts come bound with enforced execution windows (seconds, minutes, or hours). **When a Will states a length of time, its cooldown matches it exactly.**
 * **Clock-Bound Locks:** Some Wills lock until a time of day ("At exactly 3:15 PM...", "Before tomorrow noon...") instead of for a fixed length.
 * **Two Independent Sides:** The Index and the mirror each keep their own cooldown.
 * **State Persistence:** UI locks persist through page reloads and browser restarts until the evaluation phase completes. The clock keeps running while the page is closed.
### 🎲 Smart Randomizer
 * **Shuffle Deck per Side:** Wills are drawn from a saved, shuffled deck, so nothing repeats until the whole side has been seen.
 * **Unseen First:** Wills you have never received are drawn before any repeat, so completing a side takes exactly as many draws as it has Wills.
 * **Nothing Lost:** A Will is only taken off the deck once it has fully revealed, so refreshing mid-reveal costs nothing. Wills added to `prescripts.js` later join the deck automatically.
 * **Saikai Pity:** The hidden transmission is rare, but its chance climbs per side until it is guaranteed.
### 🕰️ Time-of-Day Wills
Receive a Will inside one of these windows (your own clock, 15 minutes each) and the Index delivers a Will bound to that moment instead, once per day per side:

| Window | Time |
|---|---|
| Midnight | 00:00 |
| Dawn | 06:00 |
| Noon | 12:00 |
| Three-Fifteen | 15:15 |
| Nine | 21:00 |

### 📎 Fine Print
Disclaimers are not all noise. **30 of them are tied to a specific Will** (19 on the Index, 11 in the mirror). While one is on screen, the Will it is about has a boosted chance of being your next one.

### 🏆 Achievement Ledger
**50 achievements**, shown on a trophy card with progress counters, a "new" dot that clears when the card is opened, a toast and a chime on every unlock, and a rarer fanfare for the hard ones. The list lives in its own module (`js/achievements.js`), icons included. See [Achievements](#-achievements).

### 🛡️ Proxy Defense Protocol
 * **Context Interception:** Right-click context menus (and long-press on phones) are globally intercepted and neutralized.
 * **Inspect Intercepts:** F12, Ctrl+Shift+I/J/C, Ctrl+U and the Mac equivalents are fully trapped.
 * **Active Debugger Traps:** High-frequency performance-delta loops detect browser Developer Tools and block the transmission. Closing the tools restores the terminal.
 * **Sealed Records:** Saved progress is protected by a checksum, so editing it from the developer tools is noticed.

## 📜 Prescript Mechanics
When the terminal initializes, decrees are randomized based on past execution history and categorized into distinct behavioral tiers:
| Tier | Classification | Example Mandate |
|---|---|---|
| **01** | **Absurd Rituals** | *"Eat a potato raw. Do not peel it. Do not make eye contact with anyone."* |
| **02** | **Tactical Enigmas** | *"Walk exactly 44 paces north, turn 90 degrees clockwise, and blink three times."* |
| **03** | **Ominous Decrees** | *"Look at the palm of your right hand. Seek the lines that were not there yesterday."* |
| **04** | **Temporal Mandates** | *"For the next 10 minutes, you must refer to your phone exclusively as 'The device of doom.'"* |

The pools currently hold **97 Wills** for the Index and **46** for the mirror, **31** and **14** disclaimers, and **5** time-of-day Wills.

### ⏱️ Cooldown Forms
Every Will in `js/prescripts.js` carries a `cooldown`:

| Form | Meaning |
|---|---|
| `{ value: 10, unit: 'minutes' }` | Lock for exactly that long (`seconds`, `minutes` or `hours`) |
| `{ until: '15:15' }` | Lock until the next 3:15 PM on the player's clock |
| `{ until: '12:00', tomorrow: true }` | Lock until tomorrow's noon |
| `{ value: 0, unit: 'seconds' }` | No lock |

**Rule of thumb:** if the text says "spend 5 minutes", the cooldown is 5 minutes.

### 🔍 Decryption Log Payload Sample
```json
{
  "transmission_id": "0x8F4A2",
  "text": "Before the next bell rings, exchange your left shoe with someone else's right shoe.",
  "cooldown": {
    "value": 1,
    "unit": "hours"
  },
  "status": "EVALUATING_PROXY_EXECUTION"
}

```
### ✍️ Adding Your Own
 * **A Will:** push `{ text, cooldown }` onto `prescripts` (or `mirrorPrescripts`) in `js/prescripts.js`. It joins existing players' decks automatically.
 * **A disclaimer:** add a string to `disclaimers` / `mirrorDisclaimers`.
 * **A paired disclaimer:** add `{ disclaimer, wills: [...] }` to `disclaimerPairs`. Every Will text must match an existing Will exactly.
 * **A time-of-day Will:** add an entry to `timeWills` with an `at` time, a `minutes` window and a version for each side.
 * **An achievement:** add an entry to `ACHIEVEMENTS` (and an icon to `ICONS`) in `js/achievements.js`, then unlock it with `ach.unlock('id')` or from `evaluate()`.

## 🏆 Achievements
**50 achievements** (16 visible from the start, 34 secret until earned). Progress shows on the card where it makes sense (`12/25`). ★ marks the rare ones.

| Achievement | How to earn it |
|---|---|
| First Will | Receive your first Will. |
| Dutiful Proxy | Receive 25 Wills. |
| Steadfast Proxy | Receive 50 Wills. |
| Unwavering Proxy | Receive 75 Wills. |
| Tireless Proxy | Receive 100 Wills. |
| Fulfilled Proxy | Receive every Will of the Index. |
| Kind Reflection | Receive every Will of the mirror. |
| Both Sides of the Glass | Complete every Will on both sides. |
| Busy Day | Receive 5 Wills in a single day. |
| Long Day | Receive 10 Wills in a single day. |
| Endless Day | Receive 20 Wills in a single day. |
| The Index Never Sleeps ★ | Receive 30 Wills in a single day. |
| Daily Duty | Receive a Will 3 days in a row. |
| Weekly Duty | Receive a Will 7 days in a row. |
| Read Every Clause ★ | See every disclaimer of the Index. |
| Please Do Not Poke | Poke the Index three times in a row. |

<details>
<summary>Spoilers: all secret achievements</summary>

Secret achievements show as `???` with a cryptic hint until earned.

| Achievement | How to earn it |
|---|---|
| Night Owl | Receive a Will between midnight and 4 AM. |
| Early Bird | Receive a Will between 4 AM and 7 AM. |
| Right on Schedule | Receive a Will bound to the time of day. |
| The Fine Print | Receive the Will that the disclaimer on screen was about. |
| The Glass Reads Back | Be foretold by the mirror's fine print. |
| Both Margins | Be foretold on both sides of the glass. |
| Binding Clause | Be foretold a Will that locks you for 5 minutes or more. |
| Careful Reader | Be foretold by 3 different disclaimers. |
| Fine Print Scholar ★ | Be foretold by 7 different disclaimers. |
| Twice Told | Be foretold on two Wills in a row. |
| Every Reflection | See every disclaimer of the mirror. |
| Keeper of Hours | Receive all five time-of-day Wills. |
| Duet | Hear Saikai from both sides of the glass. |
| Impatient Proxy | Press Receive Will 10 times while it is locked. |
| The Watcher | Watch the Index for 10 minutes without touching anything. |
| Unauthorized Input | Enter the old code. Keys: up up down down left right left right B A. Touch: swipe the same, then tap twice. |
| Through the Glass | Discover the mirror world. |
| Back to the Index | Return from the mirror. |
| Restless Reflection | Cross the glass six times. |
| Gentle Habit | Receive 10 different Wills of the mirror. |
| Stay Awhile | Stay on the mirror side for 5 minutes. |
| Gentle Hour | Receive a time-of-day Will from the mirror. |
| Call Your Mom | Receive the mirror's call-your-mom Will. |
| Incoming Transmission | Receive the hidden transmission. |
| Hidden Transmission | Listen to Saikai until the end. |
| The Mirror Sings | Listen to Saikai from the mirror side. |
| Dead Air | Lose the transmission before it could play. |
| Trophy Polisher | Tap the trophy 15 times in a row. |
| Signal Lost | Lose your connection to the Index. |
| Curious Proxy | Try to look behind the Index. |
| Caught Peeking ★ | Open the developer tools. |
| Missing Piece ★ | Remove one of the Index's insignia. |
| Behind the Curtain | Follow the designer's link in the footer. |
| Faceless ★ | Receive a Will after both insignia are gone. |

</details>

## 📂 Directory Structure
```text
├── 📂 assets/
│   ├── 📂 audio/
│   │   ├── 🔊 beeper.mp3      # Terminal hardware audio modulation sync
│   │   └── 🎵 saikai.mp3      # Hidden transmission, optional local copy (see Secrets)
│   └── 📂 img/
│       ├── 🖼️ index.png       # Insignia & iconography layers
│       └── 🪞 evil_index.png  # The reflection
├── 📂 css/
│   └── 🎨 styles.css           # Monochromatic CRT scanline styling, glowing filters, glitch effects
├── 📂 js/
│   ├── ⚡ main.js              # Engine (ES module): animation, audio sync, locks, randomizer, Saikai, security
│   ├── 🏆 achievements.js      # Achievement list, icons, unlock logic, trophy card, toasts, sealed records
│   ├── 📜 prescripts.js        # Every Will, mirror Will, time-of-day Will and disclaimer
│   └── 🎵 lyrics.js            # Timestamped (LRC) lyrics for the hidden transmission
├── 📄 index.html              # ARIA-accessible Proxy interface shell
└── 📄 README.md               # Transmission manual

```
## 🪞 Secrets
<details>
<summary>Spoilers: hidden transmissions</summary>

* **The Mirror:** Tap the insignia 7 times in a row. It shakes harder with every tap, then flips into `evil_index.png`. It is not truly evil: it is a mirror, and its prescripts are kind ones (call your mom, be kind to someone). Tap 7 times again to flip back. Each side has its own cooldowns and its own disclaimers.
* **Saikai:** Any Will, normal or mirror, has a small chance (`SAIKAI_CHANCE` in `main.js`) to be a hidden transmission, and the chance climbs until it is guaranteed after `SAIKAI_PITY_AFTER` draws on one side. The song plays with glitching, time-synced lyrics, and the button stays locked until it ends. If `assets/audio/saikai.mp3` exists it plays locally; if the file is missing (e.g. the hosted site or a fresh clone), or refuses to play, it falls back to the YouTube video set in `SAIKAI_YT_ID`. If neither can play, or the song freezes, the transmission is lost. Set `SAIKAI_CHANCE` to `1` to test it.
* **Lyrics:** Paste LRC-format lyrics into `js/lyrics.js`. A timestamp with no text clears the screen for instrumental breaks. If the YouTube version is offset from the mp3, adjust `YT_LYRIC_OFFSET` (seconds) in `main.js`.
* **Missing Insignia:** Delete `assets/img/index.png` or `evil_index.png` and the Index notices: a warning on screen, a warning toast, and the whole site starts glitching without rest. Delete both and it gets much worse. The game itself keeps working: a drawn insignia takes the place of the missing picture, and Wills are still delivered. Set `MISSING_ASSET_GLITCH` to `false` to keep the warning and achievements but turn the glitching off. Reduced-motion settings turn it off automatically.
* **The Old Code:** On a keyboard, up up down down left right left right B A. On a phone, swipe the same eight directions, then tap twice. It triggers a short burst of the glitch.
* **Time and Habits:** Wills received at night, at dawn, on consecutive days, or many times in one day are noticed. Pressing a locked button too many times, or watching the Index in silence for ten minutes, is noticed as well.
* **Fine Print:** When the disclaimer on screen is about the Will you receive, the Index "foretold" it. Some achievements care how often, and on which side.

</details>

## ⚙️ Configuration
Tunables sit at the top of `js/main.js`:

| Constant | Default | Purpose |
|---|---|---|
| `SAIKAI_CHANCE` | `0.08` | Base chance that a draw is the hidden transmission (`1` to test) |
| `SAIKAI_PITY_AFTER` | `40` | Draws on one side after which Saikai is guaranteed |
| `SAIKAI_YT_ID` | `h0djuhl97Kw` | YouTube fallback for the transmission |
| `YT_LYRIC_OFFSET` | `0` | Seconds to nudge lyric timing on the YouTube version |
| `ECHO_CHANCE` | `0.3` | Chance the Will matching the on-screen disclaimer comes next |
| `ECHO_DISCLAIMER_BIAS` | `0.2` | Chance a new disclaimer is one that has a paired Will |
| `IDLE_WATCH_MS` | `10 min` | Untouched time that is noticed |
| `IMPATIENT_TAPS` | `10` | Presses on a locked button that are noticed |
| `MIRROR_STAY_MS` | `5 min` | Time on the mirror side that is noticed |
| `MISSING_ASSET_GLITCH` | `true` | Glitch the site when an insignia file is missing |
| `TAP_THRESHOLD` | `7` | Taps on the insignia needed to flip it |

## 🔒 Security Protocols
The Proxy Terminal features built-in security intercepts to prevent tampering with divine orders:
```javascript
// Active Memory Inspection Trap
setInterval(() => {
    try {
        const start = performance.now();
        debugger; // Interrupts unauthorized inspection
        const end = performance.now();
        // Blocks the transmission while the tools are open, restores it when they close
        setBlocked(end - start > 100);
    } catch (err) { /* the trap must never throw */ }
}, 500);

```
 * **Inspect Intercepts:** F12, Ctrl+Shift+I/J/C, Ctrl+U, right-click and long-press are blocked, and noticed.
 * **Sealed Records:** Progress (achievements and counters) is protected by a checksum that is verified before every write, every 1.5 seconds, on focus and on tab changes. Records edited from the developer tools do not match their seal and are noticed. Saves from before the seal existed are adopted as honest.
 * **Scope:** These layers deter casual tampering. Nothing that runs in a browser can fully stop someone who reads the source, so treat them as part of the experience, not as real security.

## 🧱 Fallbacks
The page keeps working when something is missing or blocked:

| If this fails... | ...the Index does this |
|---|---|
| `prescripts.js`, `lyrics.js` or `achievements.js` fails to load | Built-in minimal Wills, no lyrics, or no achievements; the page still runs |
| `localStorage` is blocked (private mode, full quota) | Falls back to in-memory storage for the session |
| A saved lock is corrupt or impossibly long | The lock is discarded |
| The beeper audio will not play | The reveal runs visually without it |
| A reveal never completes | A watchdog force-finishes it after 20 seconds |
| The button gets stuck "busy" | A watchdog releases it |
| `saikai.mp3` is missing or will not play | Falls back to YouTube |
| YouTube is blocked or offline, or the song freezes | The transmission ends cleanly as lost |
| `index.png` / `evil_index.png` are missing | A drawn insignia (and favicon) takes over |
| Web Audio is unavailable | Sound effects are skipped |
| JavaScript is off, or the browser is too old for modules | A short message explains why |

## 🚀 Deployment & Installation
### Local Execution
 1. **Clone repository:**
   ```bash
   git clone https://github.com/senpai1135/the-index-prescript.git
   
   ```
 2. **Launch Terminal:**
   ES modules do not load from `file://`, so serve the folder: `python3 -m http.server` (or VS Code Live Server), then open `http://localhost:8000`. GitHub Pages works as-is.
### 🏛️ The Will must be fulfilled.
Designed & Engineered by **senpai1135**
*Library of Ruina is the intellectual property of Project Moon. This project is a non-commercial tribute.*
