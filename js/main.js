const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 620;

const playerImage = new Image();
playerImage.src = 'assets/shadow_dog.png';

const spriteWidth = 575;
const spriteHeight = 523;

let frameX = 0;
let frameY = 0;

let gameFrame = 0;
const staggerFrames = 5;

const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'hit',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'attack',
        frames: 7,
    },
    {
        name: 'bark',
        frames: 7,
    },
    {
        name: 'pain',
        frames: 12,
    },
    {
        name: 'death',
        frames: 4,
    },
];


const spriteAnimations = [];


animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});


let playerState = 'idle';

document.getElementById('animationState').addEventListener('change', function(e) {
    playerState = e.target.value;
});

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteAnimations[playerState].loc[position].x;
    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    gameFrame++;
    requestAnimationFrame(animate);
};

playerImage.onload = animate;

