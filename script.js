const container = document.querySelector('.container');
const btn = document.querySelector('button');


let startBlocks = 16;

function drawGrid(blocks) {
    container.innerHTML = '';
    container.style.setProperty('--number-of-items', blocks);
    
    for (let i = 0; i < blocks * blocks; i++) {
        let childDiv = document.createElement('div');
        childDiv.classList.add('sketch');
        container.appendChild(childDiv);
    }
}

drawGrid(startBlocks);
etchASketch();

btn.addEventListener('click', () => {
    while (true) {
        let squares = Number(prompt('How many squares per side?'));
        
        if (Number.isInteger(squares) && squares <= 100 && squares > 1) {
            drawGrid(squares);
            etchASketch();
            return 1;
        }
        alert('Please enter a valid integer between 2 and 100.');
    }
});


function etchASketch() {
    const div = document.querySelector('.container');

    div.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('sketch')) {
            e.target.classList.add('etch');
        }
    })
}
