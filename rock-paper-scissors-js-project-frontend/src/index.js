console.log("testing...");

const USER_URL = `http://localhost:3000/users`
const SCORE_URL = `http://localhost:3000/scores`


// Which User Interface?
let signIn = false
document.getElementById("interface-scope").style.display = 'none';
document.getElementById("sign-in-scope").style.display = 'block';

// Username
let username = document.getElementById("username")
let userData;

function userInterface(signedIn) {
    if (signedIn) {
        document.getElementById("interface-scope").style.display = 'block';
        document.getElementById("sign-in-scope").style.display = 'none';
    } else {
        document.getElementById("interface-scope").style.display = 'none';
        document.getElementById("sign-in-scope").style.display = 'block';
    }
}

let name;
// Sign In User Interface
document.getElementById("submit").addEventListener("click", () => {
    signIn = true
    userInterface(signIn)
    name = document.getElementById("name").value
    fetch(USER_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(name)
    })
    .then(resp => resp.json())
    .then(data => {
        username.innerText = data.name[0].toUpperCase() + data.name.slice(1)
        userData = data;
        userBestScore(userData)
    })
    // fetch(USER_URL)
    //   .then((resp) => resp.json())
    //   .then((data) => leaderBoard(data));
})


// Logout
document.getElementById("logout").addEventListener("click", () => {
    // signIn = false
    // userInterface(signIn)
    location.reload()
})


const BACKEND_URL = 'http://localhost:3000';
fetch(`${BACKEND_URL}/test`)
    .then(response => response.json())
    .then(parsedResponse => console.log(parsedResponse));


document.getElementById("cpu-choice").style.display = 'none';
document.getElementById("user-choice").style.display = 'none';
let scoreElement = document.getElementById("score");
let score = parseInt(scoreElement.innerText);
function userChoice(choice){
    let cpuChoiceArray = ["rock", "paper", "scissors"]
    let cpuElement = document.getElementById("cpu-choice")

    let spot = document.getElementById("user-choice")
    spot.src = `images/${choice}.jpg`

    let cpuChoice = cpuChoiceArray[Math.floor(Math.random() * cpuChoiceArray.length)];

    spot.style.display = 'block';


    setTimeout(() => {
        cpuElement.src = `images/${cpuChoice}.jpg`
        cpuElement.style.display = 'block';
    }, 1000);

    setTimeout(() => {
        if (choice === "rock" && cpuChoice === "scissors") {
            scoreElement.innerText = score += 1;
        } else if (choice === "paper" && cpuChoice === "rock") {
            scoreElement.innerText = score += 1;
        } else if (choice === "scissors" && cpuChoice === "paper") {
            scoreElement.innerText = score += 1;
        } else if (choice === cpuChoice) {
            scoreElement.innerText = score;
        } else {
            addScoreToUser(userData, score)
            score = 0;
            scoreElement.innerText = score;
        }
        spot.style.display = 'none';
        cpuElement.style.display = 'none';
    }, 2000);
}


let classUser;
function addScoreToUser(userData, score){
    fetch(`http://localhost:3000/users/${userData.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(score)
    })
    classUser = new User(name, score);
    console.log(User.length);
}

// Get user's best score
function userBestScore(udata){
    fetch(`http://localhost:3000/users/${udata.id}`)
        .then(resp => resp.json())
        .then(data => data.included.forEach(pushScores))
}


let scores = []
let bestScore;

function pushScores(score){
    scores.push(score.attributes.score)
    bestScore = Math.max(...scores)
    document.getElementById("best-score").innerText = bestScore
}


// Leaderboard
// function leaderBoard(data){
//     console.log("Hello");
//     let d = data
//     console.log(d.data);
// }

const rock = document.getElementById("rock-button")
rock.addEventListener("click", () => {
    userChoice("rock")
})

const paper = document.getElementById("paper-button")
paper.addEventListener("click", () => {
    userChoice("paper")
})

const scissors = document.getElementById("scissors-button")
scissors.addEventListener("click", () => {
    userChoice("scissors")
})

class User {

    constructor(name, score){
        this.name = name
        this.score = score
        userInstances.push(this)
    }

}