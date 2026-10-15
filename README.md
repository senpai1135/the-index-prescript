# 🧭 THE INDEX : PRESCRIPT GENERATOR
*"Execute the Will of the Prescript without question."*

[Overview](#-system-overview) • [Features](#-key-features) • [Mechanics](#-prescript-mechanics) • [Achievements](#-achievements) • [Structure](#-directory-structure) • [Security](#-security-protocols) • [Fallbacks](#-fallbacks) • [Deployment](#-deployment--installation)

---

## 👁️ System Overview

Inspired by the dark lore of **Library of Ruina**, **The Index** is a terminal-grade web interface designed to decrypt and relay inescapable divine mandates (*Prescripts*) directly to Proxies in real-time.

Built with low-overhead native technologies (plain HTML, CSS and ES modules, no dependencies), the application implements high-frequency text-scrambling frame loops, frame-perfect audio synchronization, temporal lockout algorithms, a 100-entry achievement system, and active anti-tamper security layers to maintain the integrity of the City's divine order.

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
 * **Breathing Room:** After a Will that locks you, the next few draws favor Wills with no lock, and very long locks come up less often. Nobody should have to wait out a lock only to be locked again right away.
### 📱 Device-Aware Wording
Wills that mention a device adapt to the one you are holding: *phone*, *tablet*, *Mac*, *PC*, *Chromebook* or *computer*. If the device cannot be identified, the Will says *device*. Saved progress is never affected, because the Will's original text stays its identity.
### 🕰️ A Sense of Time
The Index keeps track of your own clock. Some Wills belong to particular moments of the day, and the Index notices the date, too. It dresses up for certain days of the year, and it has more to say on them.
### 📎 Fine Print
Disclaimers are not all noise. Read them carefully.
### 🏆 Achievement Ledger
**100 achievements**, shown on a trophy card with progress counters, a "new" dot that clears when the card is opened, a toast and a chime on every unlock, and a rarer fanfare for the hard ones. The list lives in its own module (`js/achievements.js`), icons included. See [Achievements](#-achievements).

### 🛡️ Proxy Defense Protocol
 * **Context Interception:** Right-click context menus (and long-press on phones) are intercepted.
 * **Inspect Intercepts:** The usual inspect shortcuts are trapped, and the developer tools are noticed.
 * **Sealed Records:** Saved progress is protected by a checksum, so editing it from the developer tools is noticed. Saves from older versions are upgraded quietly.

## 📜 Prescript Mechanics
When the terminal initializes, decrees are randomized based on past execution history and categorized into distinct behavioral tiers:
| Tier | Classification | Example Mandate |
|---|---|---|
| **01** | **Absurd Rituals** | *"Eat a potato raw. Do not peel it. Do not make eye contact with anyone."* |
| **02** | **Tactical Enigmas** | *"Walk exactly 44 paces north, turn 90 degrees clockwise, and blink three times."* |
| **03** | **Ominous Decrees** | *"Look at the palm of your right hand. Seek the lines that were not there yesterday."* |
| **04** | **Temporal Mandates** | *"For the next 10 minutes, you must refer to your phone exclusively as 'The device of doom.'"* |

The pools currently hold **121 Wills** for the Index and **121** for the mirror, **34** and **16** disclaimers, and a handful of Wills that are bound to a moment rather than a pool. Special days add their own Wills and fine print on top of that. They are received like any other Will, but they are not part of the collection, so finishing a side never depends on catching one.

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
 * **A device-specific version of a Will:** add it to `deviceWills`, keyed by the Will's original text. Anything not listed simply swaps "your phone" for the player's device.
 * **A special-day Will or disclaimer:** add it to `holidayWills` / `holidayDisclaimers` under the day's name.
 * **An achievement:** add an entry to `ACHIEVEMENTS` (and an icon to `ICONS`) in `js/achievements.js`, then unlock it with `ach.unlock('id')` or from `evaluate()`.

Keep every Will's wording and cooldown in agreement, and make sure no two Wills share the same text.

## 🏆 Achievements
**100 achievements**: 18 are visible from the start and the other 82 stay secret until they are earned. Progress shows on the card where it makes sense (`12/25`), and the hardest ones get a rarer fanfare.

A few of the visible ones:

| Achievement | How to earn it |
|---|---|
| First Will | Receive your first Will. |
| Dutiful Proxy | Receive 25 Wills. |
| Weekly Duty | Receive a Will 7 days in a row. |
| Fulfilled Proxy | Receive every Will of the Index. |
| Kind Reflection | Receive every Will of the mirror. |
| Please Do Not Poke | Poke the Index three times in a row. |

The rest you will have to find. Some come from time, some from habit, some from curiosity, and a few from places you were told not to look. Every secret has a cryptic hint on the card, and they are designed to be earnable on a computer or on a phone.

## 📂 Directory Structure
```text
├── 📂 assets/
│   ├── 📂 audio/
│   │   └── 🔊 beeper.mp3      # Terminal hardware audio modulation sync
│   └── 📂 img/
│       ├── 🖼️ index.png       # Insignia & iconography layers
│       └── 🪞 evil_index.png  # The reflection
├── 📂 css/
│   └── 🎨 styles.css           # Monochromatic CRT scanline styling, glowing filters, glitch effects, seasonal looks
├── 📂 js/
│   ├── ⚡ main.js              # Engine (ES module): animation, audio sync, locks, randomizer, achievements triggers, security
│   ├── 🏆 achievements.js      # Achievement list, icons, unlock logic, trophy card, toasts, sealed records
│   ├── 📜 prescripts.js        # Every Will, disclaimer and special-day line
│   └── 🎵 lyrics.js            # Optional extras
├── 📄 index.html              # ARIA-accessible Proxy interface shell
└── 📄 README.md               # Transmission manual
```
Some things in the Index are not listed here on purpose.

## 🔒 Security Protocols
The Proxy Terminal features built-in security intercepts to deter tampering with divine orders:
 * **Inspect Intercepts:** The usual shortcuts and menus are blocked, and noticed.
 * **Sealed Records:** Progress (achievements and counters) is protected by a checksum that is verified before writes and on focus. Records edited from the developer tools do not match their seal and are noticed. Older saves are recognised and upgraded without complaint.
 * **Scope:** These layers deter casual tampering. Nothing that runs in a browser can fully stop someone who reads the source, so treat them as part of the experience, not as real security.

## 🧱 Fallbacks
The page keeps working when something is missing or blocked:

| If this fails... | ...the Index does this |
|---|---|
| `prescripts.js`, `lyrics.js` or `achievements.js` fails to load | Built-in minimal Wills, no extras, or no achievements; the page still runs |
| `localStorage` is blocked (private mode, full quota) | Falls back to in-memory storage for the session. A failed write never lets an older saved value be read back as current. |
| A saved lock is corrupt or impossibly long | The lock is discarded |
| The beeper audio will not play | The reveal runs visually without it |
| A reveal never completes | A watchdog force-finishes it after 20 seconds |
| The button gets stuck "busy" | A watchdog releases it |
| An insignia image is missing | A drawn insignia (and favicon) takes over |
| The device cannot be identified | Wills say "device" instead of naming one |
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
