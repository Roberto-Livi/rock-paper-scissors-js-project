console.log("testing...");


// Which User Interface?
let signIn = false
document.getElementById("interface-scope").style.display = 'none';
document.getElementById("sign-in-scope").style.display = 'block';

function userInterface(signedIn) {
    if (signedIn) {
        document.getElementById("interface-scope").style.display = 'block';
        document.getElementById("sign-in-scope").style.display = 'none';
    } else {
        document.getElementById("interface-scope").style.display = 'none';
        document.getElementById("sign-in-scope").style.display = 'block';
    }
}

// Sign In
document.getElementById("submit").addEventListener("click", () => {
    signIn = true
    userInterface(signIn)
    let name = document.getElementById("name").value
    console.log(name);
})


// Logout
document.getElementById("logout").addEventListener("click", () => {
    signIn = false
    userInterface(signIn)
})



const BACKEND_URL = 'http://localhost:3000';
fetch(`${BACKEND_URL}/test`)
    .then(response => response.json())
    .then(parsedResponse => console.log(parsedResponse));


function userChoice(choice){
    let cpuChoiceArray = ["rock", "paper", "scissors"]
    let cpuElement = document.getElementById("cpu-choice")

    let spot = document.getElementById("user-choice")
    spot.src = `images/${choice}.jpg`

    let cpuChoice = cpuChoiceArray[Math.floor(Math.random() * cpuChoiceArray.length)];
    console.log(cpuChoice);

    spot.style.display = 'block';


    setTimeout(() => {
        cpuElement.src = `images/${cpuChoice}.jpg`
        cpuElement.style.display = 'block';
    }, 1000);

    setTimeout(() => {
        spot.style.display = 'none';
        cpuElement.style.display = 'none';
    }, 2000);


}



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


