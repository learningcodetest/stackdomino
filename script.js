const scene = document.querySelector('.scene');
const resetBtn = document.querySelector('.reset-btn');
const totalDominoes = 25;
const dominoes = [];
const FALL_PROBABILITY = 0.8; // 80% chance each domino falls

// Create dominoes
for (let i = 0; i < totalDominoes; i++) {
    const domino = document.createElement('div');
    domino.classList.add('domino');
    const width = 20 + i * 5;
    const height = 50 + i * 10;
    domino.style.width = `${width}px`;
    domino.style.height = `${height}px`;
    domino.style.left = `${i * 30}px`;
    domino.style.transform = `translateZ(-${i * 50}px)`; // Initial front view
    scene.appendChild(domino);
    dominoes.push(domino);
}

// Add click event to first domino
const firstDomino = dominoes[0];
firstDomino.addEventListener('click', () => {
    firstDomino.classList.add('wobbling');
    setTimeout(() => {
        firstDomino.classList.remove('wobbling');
        startChainReaction();
    }, 3500); // Wobble for 3.5 seconds
});

// Determine how many dominoes will fall
function determineFallCount() {
    let count = 1; // First domino always falls
    for (let i = 1; i < totalDominoes; i++) {
        if (Math.random() < FALL_PROBABILITY) {
            count++;
        } else {
            break;
        }
    }
    return count;
}

// Start the chain reaction
function startChainReaction() {
    const fallCount = determineFallCount();
    dominoes.slice(0, fallCount).forEach((domino, index) => {
        setTimeout(() => {
            domino.classList.add('fallen');
            if (index === 2 && fallCount > 3) {
                transitionToSideView();
            }
            if (index === fallCount - 1) {
                showResetButton();
            }
        }, index * 200); // 200ms delay between each fall
    });
}

// Transition to side view
function transitionToSideView() {
    scene.style.transition = 'transform 2s ease';
    scene.style.transform = 'rotateY(45deg)';
    dominoes.forEach((domino, i) => {
        domino.style.transform = `translateX(${i * 30}px) translateZ(0)`;
    });
}

// Show reset button
function showResetButton() {
    resetBtn.style.display = 'block';
}

// Reset the game
resetBtn.addEventListener('click', () => {
    resetBtn.style.display = 'none';
    scene.style.transform = 'rotateY(0deg)';
    dominoes.reverse().forEach((domino, index) => {
        setTimeout(() => {
            domino.classList.remove('fallen');
            domino.style.transform = `translateZ(-${(totalDominoes - 1 - index) * 50}px)`;
            if (index === dominoes.length - 1) {
                dominoes.reverse(); // Restore original order
            }
        }, index * 200);
    });
});
