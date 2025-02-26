const scene = document.querySelector('.scene');
const resetBtn = document.querySelector('.reset-btn');
const rows = 3;
const dominoesPerRow = 10;
const dominoes = [];
const baseWidth = 20;
const baseHeight = 100;
const rowSpacing = 150; // Vertical spacing between rows
const dominoSpacing = 40; // Horizontal spacing between dominoes

// Create dominoes for each row
for (let row = 0; row < rows; row++) {
    const rowDominoes = [];
    for (let i = 0; i < dominoesPerRow; i++) {
        const domino = document.createElement('div');
        domino.classList.add('domino');
        const width = baseWidth + (row * 5) + (i * 2);
        const height = baseHeight + (row * 10) + (i * 5);
        domino.style.width = `${width}px`;
        domino.style.height = `${height}px`;
        domino.style.left = `${i * dominoSpacing}px`;
        domino.style.bottom = `${row * rowSpacing}px`;
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
    const indices = direction === 1 ? [...Array(rowDominoes.length).keys()] : [...Array(rowDominoes.length).keys()].reverse();
    indices.forEach((i, index) => {
        setTimeout(() => {
            rowDominoes[i].classList.add('fallen');
            if (index === indices.length - 1) {
                if (row < rows - 1) {
                    const nextRow = row + 1;
                    const nextStart = direction === 1 ? rowDominoes.length - 1 : 0;
                    const nextDirection = direction * -1; // Alternate direction
                    fallRow(nextRow, nextStart, nextDirection);
                } else {
                    showResetButton();
                }
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
