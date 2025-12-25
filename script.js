const startScreen = document.getElementById("startScreen");
const mainContent = document.getElementById("mainContent");
const loveText = document.getElementById("loveText");       // Countdown container
const finalMessage = document.getElementById("finalMessage"); // Long message container
const clickMeBtn = document.getElementById("confettiBtn");

const longMessage = `Happy Monthsary, My everything! 
I just want you to know how much you mean to me. 
Every moment with you is precious, and I am so grateful for your love, your kindness, and the way you love me. 
I love you more than words can ever express, and I am so lucky to have you in my life. 
Thank you for being you, my everything. 💖`;

const finalText = "Iloveyousomuchieeee My everything! 💖";

// Typing effect
function typeText(element, message, speed = 15, callback = null) { // faster typing
    let index = 0;
    function type() {
        if (index < message.length) {
            element.textContent += message.charAt(index);
            index++;
            setTimeout(type, speed);
        } else if (callback) { 
        }
    }
    type();
}

// ------------------ Floating Hearts ------------------
const heartsCanvas = document.getElementById('heartsCanvas');
const heartsCtx = heartsCanvas.getContext('2d');
heartsCanvas.width = window.innerWidth;
heartsCanvas.height = window.innerHeight;

let hearts = [];
let heartsAnimating = false;

function createHearts(count = 150) {
    hearts = [];
    for (let i = 0; i < count; i++) {
        hearts.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 20 + 10,
            speed: Math.random() * 1 + 0.5,
            opacity: Math.random() * 0.5 + 0.5
        });
    }
}

function drawHearts() {
    heartsCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    hearts.forEach(heart => {
        heartsCtx.fillStyle = `rgba(255,105,180,${heart.opacity})`;
        heartsCtx.beginPath();
        const x = heart.x, y = heart.y, s = heart.size;
        heartsCtx.moveTo(x, y);
        heartsCtx.bezierCurveTo(x, y - s/2, x - s, y - s/2, x - s, y);
        heartsCtx.bezierCurveTo(x - s, y + s/2, x, y + s/1.2, x, y + s);
        heartsCtx.bezierCurveTo(x, y + s/1.2, x + s, y + s/2, x + s, y);
        heartsCtx.bezierCurveTo(x + s, y - s/2, x, y - s/2, x, y);
        heartsCtx.fill();
    });
    updateHearts();
}

function updateHearts() {
    hearts.forEach(h => {
        h.y -= h.speed;
        h.x += Math.sin(h.y * 0.01);
        if (h.y < -50) {
            h.y = window.innerHeight + 50;
            h.x = Math.random() * window.innerWidth;
        }
    });
}

function animateHearts() {
    if (!heartsAnimating) return;
    drawHearts();
    requestAnimationFrame(animateHearts);
}

// ------------------ Countdown to Jan 8 12:00AM ------------------
function startMonthsaryCountdown() {
    const countdownInterval = setInterval(() => {
        const now = new Date();
        let year = now.getFullYear();

        // If today is past Jan 8 already, countdown for next year
        if (now.getMonth() > 0 || (now.getMonth() === 0 && now.getDate() > 8)) {
            year += 1;
        }

        // Target: January 8, 12:00 AM
        const nextMonthsary = new Date(year, 0, 8, 0, 0, 0); 

        const diff = nextMonthsary - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        if (diff > 0) {
            loveText.textContent = `Countdown to our Anniversary: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            clearInterval(countdownInterval);

            // When countdown finishes go to next page automatically
            loveText.textContent = `Happy Anniversary My everything!💖`;
            window.location.href = "nextPage.html"; 
        }
    }, 1000);
}



// ------------------ Start Screen ------------------
startScreen.addEventListener('click', () => {
    startScreen.style.transition = "opacity 1s ease";
    startScreen.style.opacity = 0;

    setTimeout(() => {
        startScreen.style.display = 'none';
        mainContent.style.display = 'block';
        document.body.style.background = "linear-gradient(135deg, #ff9a9e, #fad0c4)";

        heartsAnimating = true;
        createHearts();
        animateHearts();

        // Start countdown
        startMonthsaryCountdown(0, 8);

        // Show Click Me button after 2 seconds
        setTimeout(() => {
            clickMeBtn.style.display = "inline-block";
        }, 2000);

    }, 1000);
});

// ------------------ Click Me button ------------------
clickMeBtn.addEventListener('click', () => {
    clickMeBtn.style.display = "none";

    // Show long romantic message first
    typeText(finalMessage, longMessage, 15, () => {
        // After long message finishes, type final short message
        setTimeout(() => {
            const shortMsg = document.createElement("p");
            shortMsg.style.marginTop = "20px";
            mainContent.appendChild(shortMsg);
            typeText(shortMsg, finalText, 15);
        }, 1000); // 1 second pause
    });
});
