const USER_URL = `http://localhost:3000/users`
const SCORE_URL = `http://localhost:3000/scores`
const LEADERBOARD_URL = `http://localhost:3000/leaderboards`


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
})


// Logout
document.getElementById("logout").addEventListener("click", () => {
    location.reload()
})


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
            let postScore = score
            score = 0
            scoreElement.innerText = score;
            addScoreToUser(userData, postScore)
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
    document.getElementById("cpu-choice").style.display = "none";
    document.getElementById("user-choice").style.display = "none";
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


// User's Choice Buttons
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
    static #instances = [];

    constructor(name, score) {
        this.name = name;
        this.score = score;
        User.#instances.push(this);

        fetch(LEADERBOARD_URL, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify(this),
        });
    }

    static filterRequest(objs) {

        let table = document.getElementById("filter-table")
        let tr = document.createElement("tr");
        let th = document.createElement("th")
        tr.appendChild(th);
        th.innerText = "Scores above 0";
        table.appendChild(tr);

        for(let i = 0; i < objs.length; i++){
            let row = document.createElement("tr");
            let rowInfoName = document.createElement("td");
            rowInfoName.innerText = objs[i].attributes.name;
            let rowInfoScore = document.createElement("td");
            rowInfoScore.innerText = objs[i].attributes.score;
            row.appendChild(rowInfoName);
            row.appendChild(rowInfoScore);
            table.appendChild(row);
        }

    }

    static instances() {
        return User.#instances;
    }
}


// Leaderboard
function updateLeaderboard(){
    fetch(LEADERBOARD_URL)
        .then((resp) => resp.json())
        .then((d) => sortLB(d.data));
}

fetch(LEADERBOARD_URL)
    .then(resp => resp.json())
    .then(d => sortLB(d.data));

function sortLB(data) {
    let s = data.sort(function (a, b) {
        return b.attributes.score - a.attributes.score;
    });
    showLeaderboard(s)
}


function showLeaderboard(d) {
    let data = d;
    let count = 1;
    data.forEach(function(u){
        document.getElementById(`num-${count}`).innerText = u.attributes.name;
        document.getElementById(`num-${count}-score`).innerText = u.attributes.score;
        count += 1
    });
}


let filterButton = document.querySelector("#filter")

let filterCount = 2;
let clicked = 3;
// filterButton.addEventListener("click", () => {
//     fetch(LEADERBOARD_URL)
//         .then(resp => resp.json())
//         .then(leaderboards => {
//             let objs = leaderboards.data.filter((data) => data.attributes.score > 0)
//             User.filterRequest(objs)
//         //     if(filterCount % 2 === 0){
//         //         document.getElementById("filter-table").style.display = "none";
//         //         document.querySelector("#filter-table").remove()
//         //     } else {
//         //         User.filterRequest(objs);
//         //         document.getElementById("filter-table").style.display = "block";
//         //         console.log(objs);
//         //     }
//         })
//         // filterCount += 1;
// })


filterButton.addEventListener("click", () => {

    if(clicked % 2 === 0 ){
        document.getElementById("filter-table").style.display = 'none';
    } else if(clicked > 3 && clicked % 2 !== 0){
        document.getElementById("filter-table").style.display = "table";
    } else {
        fetch(LEADERBOARD_URL)
            .then((resp) => resp.json())
            .then((leaderboards) => {
            let objs = leaderboards.data.filter(
                (data) => data.attributes.score > 0
            );
                User.filterRequest(objs);
            });
    }

    clicked += 1
})
