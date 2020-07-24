console.log("testing...");

let signIn = true

if(signIn){
    document.getElementById("interface-scope").style.display = 'block';
    document.getElementById("sign-in-scope").style.display = 'none';
} else {
    document.getElementById("interface-scope").style.display = 'none';
    document.getElementById("sign-in-scope").style.display = 'block';
}

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



let x = document.getElementById("rock-button")
x.addEventListener("click", () => {
    userChoice("rock")
})

let y = document.getElementById("paper-button")
y.addEventListener("click", () => {
    userChoice("paper")
})

let z = document.getElementById("scissors-button")
z.addEventListener("click", () => {
    userChoice("scissors")
})


