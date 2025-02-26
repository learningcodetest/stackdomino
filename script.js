const scene = document.querySelector('.scene');
const resetBtn = document.querySelector('.reset-btn');
const rows = 3; // Three rows of dominoes
const dominoesPerRow = 7; // Seven dominoes per row
const dominoes = [];
const dominoWidth = 20; // Fixed width for all dominoes
const baseHeight = 100; // Starting height of the smallest domino
const heightIncrement = 10; // Height increase per domino
const gap = 5; // Small gap for realistic spacing

// Create dominoes with fixed width and increasing height
for (let row = 0; row < rows; row++) {
    const rowDominoes = [];
    for (let i = 0; i < dominoesPerRow; i++) {
        const dominoIndex = row * dominoesPerRow + i; // Unique index (0 to 20)
        const domino = document.createElement('div');
        domino.classList.add('domino');
        const height = baseHeight + dominoIndex * heightIncrement; // Height increases
        domino.style.width = `${dominoWidth}px`; // Consistent width
        domino.style.height = `${height}px`; // Increasing height
        domino.style.left = `${i * (dominoWidth + gap)}px`; // Position with small gap
        domino.style.bottom = `${row * (baseHeight + 150)}px`; // Row spacing
        scene.appendChild(domino);
        rowDominoes.push(domino);
    }
    dominoes.push(rowDominoes);
}

// Start chain reaction when clicking the first domino
const firstDomino = dominoes[0][0];
firstDomino.addEventListener('click', () => {
    firstDomino.classList.add('wobbling');
    setTimeout(() => {
        firstDomino.classList.remove('wobbling');
        startChainReaction();
    }, 1000); // Wobble for 1 second before falling
});

// Trigger the chain reaction
function startChainReaction() {
    fallRow(0, 0, 1); // Start with first row, left to right
}

// Handle falling sequence for each row
function fallRow(row, start, direction) {
    const rowDominoes = dominoes[row];
    const indices = direction === 1 ? 
        [...Array(rowDominoes.length).keys()] : // Left to right
        [...Array(rowDominoes.length).keys()].reverse(); // Right to left
    indices.forEach((i, index) => {
        setTimeout(() => {
            rowDominoes[i].classList.add('fallen');
            if (index === indices.length - 1 && row < rows - 1) {
                const nextRow = row + 1;
                const nextDirection = direction * -1; // Alternate direction
                setTimeout(() => fallRow(nextRow, 0, nextDirection), 200);
            } else if (row === rows - 1 && index === indices.length - 1) {
                showResetButton();
            }
        }, index * 200); // Delay between each fall
    });
}

// Display reset button after completion
function showResetButton() {
    resetBtn.style.display = 'block';
}

// Reset the animation
resetBtn.addEventListener('click', () => {
    resetBtn.style.display = 'none';
    dominoes.forEach(row => {
        row.forEach(domino => {
            domino.classList.remove('fallen');
        });
    });
});
