console.log("testing...");

const BACKEND_URL = 'http://localhost:3000';
fetch(`${BACKEND_URL}/test`)
    .then(response => response.json())
    .then(parsedResponse => console.log(parsedResponse));


    let x = document.getElementById("rock-button")
    x.addEventListener("onclick", () => {
        console.log("clicked")
    })