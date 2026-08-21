# 🧭 THE INDEX : PRESCRIPT GENERATOR
*"Execute the Will of the Prescript without question."*

[Overview](#-system-overview) • [Features](#-key-features) • [Mechanics](#-prescript-mechanics) • [Structure](#-directory-structure) • [Security](#-security-protocols) • [Deployment](#-deployment)

---

## 👁️ System Overview

Inspired by the dark lore of **Library of Ruina**, **The Index** is a terminal-grade web interface designed to decrypt and relay inescapable divine mandates (*Prescripts*) directly to Proxies in real-time.

Built with low-overhead native technologies, the application implements high-frequency text-scrambling frame loops, frame-perfect audio synchronization, temporal lockout algorithms, and active anti-tamper security layers to maintain the integrity of the City's divine order.

```text
 [ THE INDEX ] ───( ENCRYPTED TRANSMISSION )───> [ PROXY TERMINAL ]
       │                                                 │
       ├── Decryption Wavefront Syncing ─────────────────┤
       ├── Real-time UI Lockout / Cooldown Engine ───────┤
       └── Anti-Tamper DevTool Intercepts ───────────────┘

```
## ✨ Key Features
### 📡 Synchronized Audio-Visual Decryption
 * **Wavefront Text Scrambling:** Custom JavaScript execution using requestAnimationFrame continuously interpolates ASCII/Glitch character matrix layers (¡¢£¤¥...◢◣◤◥) before locking into the target decree.
 * **Audio-Paced Modulation:** The text reveal animation scales dynamically to match the precise audio duration (sfx.duration) of the terminal's hardware beeper.
### ⏳ Temporal Duty Locking (localStorage)
 * **Will Enforcers:** Certain Prescripts come bound with enforced execution windows (seconds, minutes, or hours).
 * **State Persistence:** UI locks persist through page reloads and browser restarts until the evaluation phase completes.
### 🛡️ Proxy Defense Protocol
 * **Context Interception:** Right-click context menus are globally intercepted and neutralized.
 * **Inspect Intercepts:** F12, Ctrl+Shift+I/J, and Ctrl+U short-circuits are fully trapped.
 * **Active Debugger Traps:** High-frequency performance-delta loops detect browser Developer Tools and immediately force-sever the transmission stream.
## 📜 Prescript Mechanics
When the terminal initializes, decrees are randomized based on past execution history and categorized into distinct behavioral tiers:
| Tier | Classification | Example Mandate |
|---|---|---|
| **01** | **Absurd Rituals** | *"Eat a potato raw. Do not peel it. Do not make eye contact with anyone."* |
| **02** | **Tactical Enigmas** | *"Walk exactly 44 paces north, turn 90 degrees clockwise, and blink three times."* |
| **03** | **Ominous Decrees** | *"Look at the palm of your right hand. Seek the lines that were not there yesterday."* |
| **04** | **Temporal Mandates** | *"For the next 10 minutes, you must refer to your phone exclusively as 'The device of doom.'"* |
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
## 📂 Directory Structure
```text
├── 📂 assets/
│   ├── 📂 audio/
│   │   └── 🔊 beeper.mp3      # Terminal hardware audio modulation sync
│   └── 📂 img/
│       └── 🖼️ index.png       # Insignia & iconography layers
├── 📂 css/
│   └── 🎨 style.css           # Monochromatic CRT scanline styling & glowing filters
├── 📂 js/
│   └── ⚡ script.js            # Engine code (scramble animation, audio sync, locks)
├── 📄 index.html              # ARIA-accessible Proxy interface shell
└── 📄 README.md               # Transmission manual

```
## 🔒 Security Protocols
The Proxy Terminal features built-in security intercepts to prevent tampering with divine orders:
```javascript
// Active Memory Inspection Trap
setInterval(() => {
    const start = performance.now();
    debugger; // Interrupts unauthorized inspection
    const end = performance.now();
    if (end - start > 100) {
        display.innerText = "TRANSMISSION BLOCKED: DEV TOOLS DETECTED.";
        button.disabled = true;
    }
}, 500);

```
## 🚀 Deployment & Installation
### Local Execution
 1. **Clone repository:**
   ```bash
   git clone [https://github.com/senpai1135/the-index-prescript.git](https://github.com/senpai1135/the-index-prescript.git)
   
   ```
 2. **Launch Terminal:**
   Open index.html directly in any modern browser.
### 🏛️ The Will must be fulfilled.
Designed & Engineered by **senpai1135**
*Library of Ruina is the intellectual property of Project Moon. This project is a non-commercial tribute.*
