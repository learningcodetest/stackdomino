const scene = document.querySelector('.scene');
const resetBtn = document.querySelector('.reset-btn');
const rows = 3;
const dominoesPerRow = 7; // 3 rows * 7 dominoes = 21 total
const dominoes = [];
const baseWidth = 20; // Starting width for the smallest domino
const baseHeight = 100; // Starting height for the smallest domino
const sizeIncrement = 5; // Size increase per domino
const gap = 40; // Gap between dominoes
const rowGap = 150; // Gap between rows

// Create dominoes with unique sizes and positions
for (let row = 0; row < rows; row++) {
    const rowDominoes = [];
    for (let i = 0; i < dominoesPerRow; i++) {
        const dominoIndex = row * dominoesPerRow + i; // Unique index from 0 to 20
        const domino = document.createElement('div');
        domino.classList.add('domino');
        const width = baseWidth + dominoIndex * sizeIncrement;
        const height = baseHeight + dominoIndex * sizeIncrement;
        domino.style.width = `${width}px`;
        domino.style.height = `${height}px`;
        domino.style.left = `${i * (width + gap)}px`; // Horizontal position with gap
        domino.style.bottom = `${row * (baseHeight + rowGap)}px`; // Vertical position with row gap
        scene.appendChild(domino);
        rowDominoes.push(domino);
    }
    dominoes.push(rowDominoes);
}

// Add click event to the first domino in the first row
const firstDomino = dominoes[0][0];
firstDomino.addEventListener('click', () => {
    firstDomino.classList.add('wobbling');
    setTimeout(() => {
        firstDomino.classList.remove('wobbling');
        startChainReaction();
    }, 1000); // Wobble for 1 second before falling
});

// Start the chain reaction
function startChainReaction() {
    fallRow(0, 0, 1); // Start with first row, left to right
}

// Fall sequence for a row
function fallRow(row, start, direction) {
    const rowDominoes = dominoes[row];
    const indices = direction === 1 ? 
        [...Array(rowDominoes.length).keys()] : 
        [...Array(rowDominoes.length).keys()].reverse();
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
        }, index * 200);
    });
}

// Show the reset button
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
