const settingBtn = document.getElementById('setting-btn');
const settings = document.getElementById('settings');
const difficaultyEl = document.getElementById('difficaulty');
const word = document.getElementById('word');
const text = document.getElementById('text');
const timeEl = document.getElementById('time');
const settingForm = document.getElementById('setting-form');
const scoreEl = document.getElementById('score');
const endGameContainer = document.getElementById('end-game-container');

// Random Word
let randomWord;

// words array
const words =[
    'book',
    'test',
    'pen',
    'flower',
    'computer' , 
    'mobile',
    'smartPhone',
    'computer'
];

// Score 
let score = 0;

// time
let time = 10;

// defficulty
let defficulty = localStorage.getItem('defficulty') !== null ? localStorage.getItem('defficulty'): 'medium';


// Update the select
difficaultyEl.value = localStorage.getItem('defficulty') !== null ? localStorage.getItem('defficulty'): 'medium';

// Update time variable
const timeInterval = setInterval(updateTime , 1000);

// Get Raondom Word
function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
}

// Pay Attention to text

text.focus();

// Add To Dom
function addWordToDom(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// Update Score
function updateScore(){
    score ++;
    scoreEl.innerHTML = score;
}

// update Time
function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';

    if(time === 0){
        clearInterval(timeInterval);
        gameOver();
    }
}


// GameOver
function gameOver(){
    endGameContainer.innerHTML =
    `
    <h1>Time is run out</h1>
    <p>Your Final Score is ${score}</p>
    <button onclick="location.reload()">reload</button>
    `;

    endGameContainer.style.display = 'flex';
}



// Add Events
// Add event to text
text.addEventListener('input', ()=>{
    const insertedTex = text.value;
    if(insertedTex === randomWord){
        addWordToDom();
        updateScore();
        text.value = "";

        // Condation according the level of game
        if(defficulty === 'hard'){
            time += 2;
        } else if(defficulty === 'medium'){
            time += 4;
        } else {
            time += 5;
        }

    }
})

// Settings Even
settingBtn.addEventListener('click' , ()=> settings.classList.toggle('hide'))


// Setting Form

settingForm.addEventListener('change' , e =>{
    defficulty = e.target.value;
    localStorage.setItem('defficulty' , defficulty);
    text.focus();
})


// Calling Add To Dom
addWordToDom();