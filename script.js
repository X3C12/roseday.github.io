// Background Music Control
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.querySelector('.music-icon');
let isPlaying = false;

// Set music to start at 15 seconds
bgMusic.currentTime = 15;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicIcon.textContent = '🔇';
        musicToggle.classList.remove('playing');
        isPlaying = false;
    } else {
        bgMusic.play();
        musicIcon.textContent = '🔊';
        musicToggle.classList.add('playing');
        isPlaying = true;
    }
});

// Auto-play attempt (some browsers block this)
window.addEventListener('load', () => {
    bgMusic.currentTime = 25;
    bgMusic.play().then(() => {
        musicIcon.textContent = '🔊';
        musicToggle.classList.add('playing');
        isPlaying = true;
    }).catch(() => {
        // Auto-play blocked, user needs to click
        console.log('Auto-play blocked. Click the music button to play.');
    });
});

// Falling Petals
function createPetal() {
    const petalsContainer = document.getElementById('petalsContainer');
    const petal = document.createElement('div');
    petal.classList.add('petal');
    
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (Math.random() * 8 + 7) + 's';
    petal.style.animationDelay = Math.random() * 3 + 's';
    petal.style.width = (Math.random() * 10 + 12) + 'px';
    petal.style.height = (Math.random() * 12 + 15) + 'px';
    
    petalsContainer.appendChild(petal);
    
    setTimeout(() => {
        petal.remove();
    }, 15000);
}

// Create petals continuously
setInterval(createPetal, 400);

// Initial petals
for (let i = 0; i < 30; i++) {
    setTimeout(createPetal, i * 150);
}

// Enter Button
const enterBtn = document.getElementById('enterBtn');
const welcomeScreen = document.getElementById('welcomeScreen');
const mainContent = document.getElementById('mainContent');

enterBtn.addEventListener('click', () => {
    // Create petal explosion
    for (let i = 0; i < 80; i++) {
        setTimeout(createPetal, i * 15);
    }
    
    // Hide welcome screen and show main content
    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
        mainContent.classList.add('active');
        startCountdown();
    }, 600);
});

// Live Countdown Timer
let countdownInterval;
const startDate = new Date('2024-08-29T06:30:00'); // December 28, 2025

function startCountdown() {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date();
    const diff = now - startDate;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Screen Navigation
let currentScreen = 1;

// Reasons for each petal (customize these!)
const petalReasons = [
    "Your beautiful smile that lights up my entire world 😊",
    "The way you care for me and make me feel loved 💕",
    "Your kindness and the way you treat everyone ✨",
    "How you make every moment we spend together magical 🌟",
    "Your amazing laugh that makes my heart skip a beat 💫",
    "The way you understand me like no one else does 💖",
    "Your beautiful eyes that I could get lost in forever",
    "Everything about you - you're simply perfect! 🎀"
];

let pickedPetals = 0;
let totalPetals = 8;

function pickPetal(petalElement) {
    if (petalElement.classList.contains('picked')) {
        return;
    }
    
    const reasonIndex = parseInt(petalElement.getAttribute('data-reason'));
    const reason = petalReasons[reasonIndex];
    
    petalElement.classList.add('picked');
    pickedPetals++;
    
    document.getElementById('reasonText').textContent = reason;
    document.getElementById('petalsLeft').textContent = 
        (totalPetals - pickedPetals) + ' petals remaining';
    
    for (let i = 0; i < 15; i++) {
        setTimeout(createPetal, i * 50);
    }
    
    if (pickedPetals === totalPetals) {
        setTimeout(() => {
            document.getElementById('reasonText').textContent = 
                "You've discovered all the reasons! You're everything to me! 💖";
            document.getElementById('petalsLeft').textContent = 
                "All petals picked! 🌹";
        }, 1000);
    }
}

function goToScreen(screenNumber) {
    const currentScreenEl = document.getElementById(`screen${currentScreen}`);
    const nextScreenEl = document.getElementById(`screen${screenNumber}`);
    const dots = document.querySelectorAll('.dot');
    
    // Exit current screen
    currentScreenEl.classList.remove('active');
    currentScreenEl.classList.add('exit');
    
    // Update dots
    dots[currentScreen - 1].classList.remove('active');
    dots[screenNumber - 1].classList.add('active');
    
    // Enter next screen
    setTimeout(() => {
        currentScreenEl.classList.remove('exit');
        nextScreenEl.classList.add('active');
        currentScreen = screenNumber;
        
        // Create petal burst
        for (let i = 0; i < 30; i++) {
            setTimeout(createPetal, i * 40);
        }
    }, 600);
}

// Dot Navigation
document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToScreen(index + 1);
    });
});

// Restart Journey
function restartJourney() {
    const currentScreenEl = document.getElementById(`screen${currentScreen}`);
    const dots = document.querySelectorAll('.dot');
    
    // Hide current screen
    currentScreenEl.classList.remove('active');
    
    // Reset dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[0].classList.add('active');
    
    // Reset to welcome screen
    setTimeout(() => {
        mainContent.classList.remove('active');
        welcomeScreen.classList.remove('hidden');
        currentScreen = 1;
        document.getElementById('screen1').classList.add('active');
        
        // Reset picked petals
        pickedPetals = 0;
        document.querySelectorAll('.pick-petal').forEach(petal => {
            petal.classList.remove('picked');
        });
        document.getElementById('reasonText').textContent = 
            "Pick a petal to see why you're special! 💖";
        document.getElementById('petalsLeft').textContent = 
            totalPetals + ' petals remaining';
        
        // Create massive petal explosion
        for (let i = 0; i < 100; i++) {
            setTimeout(createPetal, i * 10);
        }
    }, 600);
}

// Click Sparkle Effect
document.addEventListener('click', (e) => {
    createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '8px';
    sparkle.style.height = '8px';
    sparkle.style.background = 'white';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.boxShadow = '0 0 15px white';
    sparkle.style.animation = 'sparkleEffect 0.8s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 800);
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleEffect {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(4) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Animate elements on screen change
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }, index * 100);
        }
    });
});

// Add fade in animation
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(fadeInStyle);

// Observe animated elements
setTimeout(() => {
    const animatedElements = document.querySelectorAll('.reason-box, .timeline-item, .gallery-item');
    animatedElements.forEach(item => {
        item.style.opacity = '0';
        observer.observe(item);
    });
}, 1000);

// Button hover effects
document.querySelectorAll('.nav-btn, .quiz-option').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        for (let i = 0; i < 8; i++) {
            setTimeout(createPetal, i * 80);
        }
    });
});

// Prevent zoom on mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add touch support
document.addEventListener('touchstart', function() {}, {passive: true});

// Yes/No Proposal Logic
function handleYes() {
    // Create massive heart explosion
    for (let i = 0; i < 100; i++) {
        setTimeout(createPetal, i * 10);
    }
    
    // Navigate to final screen
    setTimeout(() => {
        goToScreen(7);
    }, 800);
}

// No button escape logic
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
let noBtnMoveCount = 0;

function moveNoButton() {
    const btnRect = noBtn.getBoundingClientRect();
    
    let randomX, randomY;
    
    // Calculate random position anywhere on screen with margins
    const margin = 50;
    randomX = margin + Math.random() * (window.innerWidth - btnRect.width - margin * 2);
    randomY = margin + Math.random() * (window.innerHeight - btnRect.height - margin * 2);
    
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transform = 'none';
    
    noBtnMoveCount++;
    
    // Change text after a few moves
    if (noBtnMoveCount === 3) {
        noBtn.textContent = 'Come on... 😅';
    } else if (noBtnMoveCount === 5) {
        noBtn.textContent = 'Really? 🥺';
    } else if (noBtnMoveCount === 7) {
        noBtn.textContent = 'Please? 💔';
    } else if (noBtnMoveCount > 8) {
        noBtn.textContent = 'Just say Yes! 💕';
    }
}

if (noBtn) {
    noBtn.addEventListener('mouseenter', moveNoButton);
    noBtn.addEventListener('click', moveNoButton);
    noBtn.addEventListener('touchstart', moveNoButton);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (mainContent.classList.contains('active')) {
        if (e.key === 'ArrowRight' && currentScreen < 7) {
            goToScreen(currentScreen + 1);
        } else if (e.key === 'ArrowLeft' && currentScreen > 1) {
            goToScreen(currentScreen - 1);
        }
    }
});

// Add swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (mainContent.classList.contains('active')) {
        if (touchEndX < touchStartX - 50 && currentScreen < 7) {
            // Swipe left - next screen
            goToScreen(currentScreen + 1);
        }
        if (touchEndX > touchStartX + 50 && currentScreen > 1) {
            // Swipe right - previous screen
            goToScreen(currentScreen - 1);
        }
    }
}

// Animate countdown numbers
function animateNumber(element, target) {
    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// Add pulse effect to active elements
setInterval(() => {
    const activeScreen = document.querySelector('.content-screen.active');
    if (activeScreen) {
        const heading = activeScreen.querySelector('.screen-heading');
        if (heading) {
            heading.style.transform = 'scale(1.05)';
            setTimeout(() => {
                heading.style.transform = 'scale(1)';
            }, 200);
        }
    }
}, 3000);

console.log('🌹 Rose Day Website Loaded! Made with love ❤️');
