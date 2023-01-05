function getKeyPos(key) {
    switch (key) {
        case 'q': return [270, 300];
        case 'w': return [395, 300];
        case 'e': return [520, 300];
        case 'r': return [645, 300];
        case 't': return [770, 300];
        case 'y': return [895, 300];
        case 'u': return [1020, 300];
        case 'i': return [1145, 300];
        case 'o': return [1270, 300];
        case 'p': return [1395, 300];
        case '[': return [1520, 300];
        case '{': return [1520, 300];
        case ']': return [1645, 300];
        case '}': return [1645, 300];

        case 'a': return [300, 460];
        case 's': return [425, 460];
        case 'd': return [550, 460];
        case 'f': return [675, 460];
        case 'g': return [800, 460];
        case 'h': return [925, 460];
        case 'j': return [1050, 460];
        case 'k': return [1175, 460];
        case 'l': return [1300, 460];
        case ';': return [1425, 460];
        case "'": return [1550, 460];
        case ':': return [1425, 460];
        case '"': return [1550, 460];

        case 'z': return [350, 620];
        case 'x': return [475, 620];
        case 'c': return [600, 620];
        case 'v': return [725, 620];
        case 'b': return [850, 620];
        case 'n': return [975, 620];
        case 'm': return [1100, 620];
        case ',': return [1225, 620];
        case '.': return [1350, 620];
        case '/': return [1475, 620];
        case '<': return [1225, 620];
        case '>': return [1350, 620];
        case '?': return [1475, 620];

        case '`': return [70, 140];
        case '1': return [195, 140];
        case '2': return [320, 140];
        case '3': return [445, 140];
        case '4': return [570, 140];
        case '5': return [695, 140];
        case '6': return [820, 140];
        case '7': return [945, 140];
        case '8': return [1070, 140];
        case '9': return [1195, 140];
        case '0': return [1320, 140];
        case '-': return [1445, 140];
        case '=': return [1570, 140];
        case '\\': return [1695, 140];
        case '~': return [70, 140];
        case '!': return [195, 140];
        case '@': return [320, 140];
        case '#': return [445, 140];
        case '$': return [570, 140];
        case '%': return [695, 140];
        case '^': return [820, 140];
        case '&': return [945, 140];
        case '*': return [1070, 140];
        case '(': return [1195, 140];
        case ')': return [1320, 140];
        case '_': return [1445, 140];
        case '+': return [1570, 140];
        case '|': return [1695, 140];

        case ' ': return [840, 780];

        default: return null;
    } 
  }


// Set up canvas
const canvas = document.getElementById("sketch-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

let x0, y0, x1, y1;
let idx = 0;

let colorIdx = 0;
function randomizeColor() {
    // colorIdx += 1;
    // if (colorIdx > 8) colorIdx = 0;
    colorIdx = Math.floor(Math.random() * 10);
    switch (colorIdx) {
        case 0: return '#669900';
        case 1: return '#99cc33';
        case 2: return '#ccee66';
        case 3: return '#006699';
        case 4: return '#3399cc';
        case 5: return '#990066';
        case 6: return '#cc3399';
        case 7: return '#ff6600';
        case 8: return '#ff9900';
        case 9: return '#ffcc00';
    }
}
var randomColor = randomizeColor();

function drawBoundary() {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.rect(10, 10, canvas.width, canvas.height);
    // console.log(`Window size: ${window.screen.width}, ${window.screen.height}`);
    // console.log(`Canvas size: ${canvas.width}, ${canvas.height}`);
    ctx.strokeStyle = "#222222";
    ctx.fillStyle = '#222222';
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(x0, y0, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawLine() {
    ctx.beginPath();
    ctx.strokeStyle = randomColor;
    // console.log(randomColor);
    ctx.lineWidth = 4;
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.closePath();
}

// setInterval(draw, 10);
drawBoundary(); 

// Handle text
let text = "";
let typed = "";
let last_char = ''

const textSpan = document.querySelector("#text-main");
textSpan.innerHTML = text;
const textOverlay = document.querySelector('#text-overlay');

document.addEventListener('keydown', (event) => {
    // console.log(`Pressed: ${event.key}`);
    
    if (event.key === 'Backspace') {
        typed = typed.substring(0, typed.length - 1);
        idx -= 1;
    }
    else {
        // Draw line
        if (event.key === ' ') {
            randomColor = randomizeColor();
        }
        
        let keyPos = getKeyPos(event.key.toLowerCase());
        if (keyPos !== null){
            if (typed.length > 0) {
                // console.log(`Drawing ${typed.charAt(idx)} to ${event.key}`)
                x0 = getKeyPos(typed.charAt(idx).toLowerCase())[0];
                y0 = getKeyPos(typed.charAt(idx).toLowerCase())[1];
                x1 = getKeyPos(event.key.toLowerCase())[0];
                y1 = getKeyPos(event.key.toLowerCase())[1];
    
                drawLine();
                idx += 1;
            }
    
            typed += event.key;
        }
    }
    textOverlay.innerHTML = typed;
});