const container = document.querySelector('.container');
const clear = document.querySelector('#clear');
const changeSize = document.querySelector('#change-size');
const rainbow = document.querySelector('#rainbow');
const shade = document.querySelector('#shade');

let rainbowOn = false;
let shadeOn = false;
let gridSize = 16;

function drawGrid(blocks) {
    container.innerHTML = '';
    container.style.setProperty('--number-of-items', blocks);
    
    for (let i = 0; i < blocks * blocks; i++) {
        let childDiv = document.createElement('div');
        childDiv.classList.add('sketch');
        container.appendChild(childDiv);
    }
}

function clearGrid() {
    const childDivs = document.querySelectorAll('.sketch');

    childDivs.forEach(div => {
        let shade = div.dataset.shade;
        let shadeClass = `shade-${shade}`;
        div.classList.remove('etch', shadeClass);
        div.style.removeProperty('--sketch-color');
        delete div.dataset.shade});
}

drawGrid(gridSize);

function getInput() {
    do {
        gridSize = prompt('How many squares per side?');
        if (gridSize === null) {
            return;
        }
        gridSize = Number(gridSize);
        if (Number.isInteger(gridSize) && gridSize <= 100 && gridSize > 1) {
            drawGrid(gridSize);
            return;
        }
        alert('Please enter a valid integer between 2 and 100.');
    } while (true);
}


changeSize.addEventListener('click', () => getInput());
rainbow.addEventListener('click', () => {
    rainbowOn = !rainbowOn;
    rainbow.classList.toggle('selected');
});
clear.addEventListener('click', clearGrid);
shade.addEventListener('click', () => {
    shadeOn = !shadeOn;
    shade.classList.toggle('selected');
});

container.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('sketch')) {
        let color = rainbowOn ? randomColor() : 'black';
        changeColor(color, e.target);
        if (shadeOn) {
            shadeBlock(e.target);
        }
        e.target.classList.add('etch');
    }
})


function shadeBlock(block) {
    if (Number(block.dataset.shade) === 100) {
        return;
    } else if (block.dataset.shade) {
        let currentShade = block.dataset.shade;
        block.classList.remove(`shade-${currentShade}`);
    
        let newShade = Number(currentShade) + 10;
        block.dataset.shade = newShade;
        block.classList.add(`shade-${newShade}`)
    } else {
        block.dataset.shade = '10';
        block.classList.add('shade-10');
    }
}

function randomColor() {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
}

function changeColor(color, e) {
    e.style.setProperty('--sketch-color', color);
}
