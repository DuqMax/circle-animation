const canvas = document.getElementById("circle");
const ctx = canvas.getContext("2d");
const text = document.getElementById("position");
const speedText = document.getElementById("speed");

const limit = 360;
const ray = 150;

let index = 0;
let direction = 1; 
let speed = 1;

let loopActive = false;

const minusBtn = document.getElementById("decrease");
const plusBtn = document.getElementById("increase");
const loopBtn = document.getElementById("loop");

minusBtn.addEventListener("click", () => {
    if (speed > 0.25) {
        speed -= 0.25;
    }
    if (speed <= 0.25) {
        minusBtn.style.cursor = "default";
        minusBtn.style.backgroundColor = "#ccc";
    }

    plusBtn.style.cursor = "pointer";
    plusBtn.style.backgroundColor = "rgb(240, 141, 12)";
});

plusBtn.addEventListener("click", () => {
    if (speed < 5) {
        speed += 0.25;
    }
    if (speed >= 5) {
        plusBtn.style.cursor = "default";
        plusBtn.style.backgroundColor = "#ccc";
    }

    minusBtn.style.cursor = "pointer";
    minusBtn.style.backgroundColor = "rgb(240, 141, 12)";
});

loopBtn.addEventListener("click", () => {
    if (loopActive) {
        loopActive = false;
        loopBtn.style.backgroundColor = "rgb(240, 141, 12)";
    } else {
        loopActive = true;
        loopBtn.style.backgroundColor = "#80ed99";
    }
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let angle = (index / limit) * (2 * Math.PI);

    ctx.beginPath();
    ctx.arc(200, 200, ray, 0, 2 * Math.PI);
    ctx.strokeStyle = "cyan";
    ctx.lineWidth = 5;
    ctx.fillStyle = "#004e89";
    ctx.fill();
    ctx.stroke();

    const xPos = 200 + Math.cos(angle) * ray;
    const yPos = 200 + Math.sin(angle) * ray;

    ctx.beginPath();
    ctx.arc(xPos, yPos, 25, 0, 2 * Math.PI);
    ctx.fillStyle = "#ff6b35";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(xPos, yPos);
    ctx.strokeStyle = "#efefd0";
    ctx.stroke();
    
    if (loopActive) {
        index = (index + direction * speed) % limit;
        if (index <= 0) index += limit;
    } else {
        index += direction * speed; 
        if (index >= limit || index <= 0) {
            direction *= -1; 
        }
    }

    text.innerText = `Angle: ${Math.round(index)}º`;
    speedText.innerText = `Speed: ${speed.toFixed(2)}`;

    requestAnimationFrame(draw);
}

draw();
