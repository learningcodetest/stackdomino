const scene = document.querySelector('.scene');
const resetBtn = document.querySelector('.reset-btn');
const totalDominoes = 25;
const dominoes = [];

// Create dominoes
for (let i = 0; i < totalDominoes; i++) {
    const domino = document.createElement('div');
    domino.classList.add('domino');
    domino.style.left = `${i * 60}px`;
    scene.appendChild(domino);
    dominoes.push(domino);
}

// Set initial scene transform for front view
scene.style.transform = 'rotateY(30deg)';

// Add click event to first domino
const firstDomino = dominoes[0];
firstDomino.addEventListener('click', () => {
    firstDomino.classList.add('wobbling');
    setTimeout(() => {
        firstDomino.classList.remove('wobbling');
        startChainReaction();
    }, 3500); // Wobble for 3.5 seconds
});

// Start the chain reaction
function startChainReaction() {
    dominoes.forEach((domino, index) => {
        setTimeout(() => {
            domino.classList.add('fallen');
            if (index === 2) transitionToSideView();
            if (index === dominoes.length - 1) showResetButton();
        }, index * 200);
    });
}

// Transition to side view
function transitionToSideView() {
    scene.style.transition = 'transform 2s ease';
    scene.style.transform = 'rotateY(90deg)';
}

// Show reset button
function showResetButton() {
    resetBtn.style.display = 'block';
}

// Reset the game
resetBtn.addEventListener('click', () => {
    resetBtn.style.display = 'none';
    scene.style.transition = 'transform 2s ease';
    scene.style.transform = 'rotateY(30deg)';
    dominoes.reverse().forEach((domino, index) => {
        setTimeout(() => {
            domino.classList.remove('fallen');
            if (index === dominoes.length - 1) dominoes.reverse(); // Restore order
        }, index * 200);
    });
});
