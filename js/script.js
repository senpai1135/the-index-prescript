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

const glitchChars = "¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß◢◣◤◥■□▲△▼▽";

const SCRAMBLE_END = 1.41;
const REVEAL_START = 1.43;

const display = document.getElementById('prescriptDisplay');
const button = document.getElementById('generateBtn');
const logo = document.getElementById('indexLogo');
const sfx = document.getElementById('beeperSfx');

let animationFrameId;
let targetSentence = "";
let lastSentence = "";
let audioEndTime = 3.00;
let frameCount = 0;
let countdownInterval;

function getRemainingTime() {
    const lockUntil = localStorage.getItem('prescript_lock_until');
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
    button.disabled = true;
    const currentPrescript = localStorage.getItem('last_prescript_text') || "Execute your given assignment.";
    display.innerText = `${currentPrescript}\n\n[ EVALUATING PROXY EXECUTION: ${formatTime(remainingMs)} ]`;
    
    if (countdownInterval) clearInterval(countdownInterval);
    
    countdownInterval = setInterval(() => {
        const currentRemaining = getRemainingTime();
        if (currentRemaining <= 0) {
            clearInterval(countdownInterval);
            button.disabled = false;
            display.innerText = "The evaluation is complete. Click below to receive the Will.";
            localStorage.removeItem('prescript_lock_until');
            localStorage.removeItem('last_prescript_text');
        } else {
            display.innerText = `${currentPrescript}\n\n[ EVALUATING PROXY EXECUTION: ${formatTime(currentRemaining)} ]`;
        }
    }, 1000);
}

window.addEventListener('DOMContentLoaded', () => {
    const remaining = getRemainingTime();
    if (remaining > 0) {
        startUiLockout(remaining);
    }
});

button.addEventListener('click', () => {
    if (getRemainingTime() > 0) return;
    
    button.disabled = true;
    
    const filteredPrescripts = prescripts.filter(p => p.text !== lastSentence);
    const selectedObj = filteredPrescripts[Math.floor(Math.random() * filteredPrescripts.length)];
    
    targetSentence = selectedObj.text;
    lastSentence = selectedObj.text;
    
    let cooldownMs = 0;
    if (selectedObj.cooldown.unit === 'hours') cooldownMs = selectedObj.cooldown.value * 60 * 60 * 1000;
    if (selectedObj.cooldown.unit === 'minutes') cooldownMs = selectedObj.cooldown.value * 60 * 1000;
    if (selectedObj.cooldown.unit === 'seconds') cooldownMs = selectedObj.cooldown.value * 1000;

    if (cooldownMs > 0) {
        localStorage.setItem('prescript_lock_until', Date.now() + cooldownMs);
        localStorage.setItem('last_prescript_text', targetSentence);
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

function syncSequenceToAudio() {
    let time = sfx.currentTime || (frameCount * 0.016); // Fallback clock if audio completely broke
    let currentOutput = "";
    const len = targetSentence.length;
    const previousText = display.innerText;
    frameCount++;

    if (time < SCRAMBLE_END) {
        logo.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        for (let i = 0; i < len; i++) {
            currentOutput += (targetSentence[i] === " ") ? " " : getGlitchChar(i, previousText);
        }
    } 
    else if (time >= SCRAMBLE_END && time < REVEAL_START) {
        logo.style.transform = 'none';
        for (let i = 0; i < len; i++) {
            currentOutput += (targetSentence[i] === " ") ? " " : getGlitchChar(i, previousText);
        }
    } 
    else if (time >= REVEAL_START && time < audioEndTime) {
        logo.style.transform = 'none';
        let progress = (time - REVEAL_START) / (audioEndTime - REVEAL_START); 
        let waveFront = Math.floor(len * progress);

        for (let i = 0; i < len; i++) {
            if (targetSentence[i] === " ") {
                currentOutput += " ";
            } else if (i < waveFront) {
                if (i > waveFront - 5 && Math.random() < 0.3) {
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
        logo.style.transform = 'none';
    }

    display.innerText = currentOutput;

    const isAudioActive = !sfx.paused && !sfx.ended && sfx.currentTime > 0;
    if ((isAudioActive || time < audioEndTime) && currentOutput !== targetSentence) {
        animationFrameId = requestAnimationFrame(syncSequenceToAudio);
    } else {
        display.innerText = targetSentence;
        cancelAnimationFrame(animationFrameId);
        
        const remaining = getRemainingTime();
        if (remaining > 0) {
            startUiLockout(remaining);
        } else {
            button.disabled = false;
        }
    }
}

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
        display.innerText = "TRANSMISSION BLOCKED: DEV TOOLS DETECTED.";
        button.disabled = true;
    }
}, 500);
