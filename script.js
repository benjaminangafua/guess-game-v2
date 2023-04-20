const guessBoard = document.getElementById("guess-board");
const restart = document.getElementById("restart");
let chance = document.getElementById("chance")
let result = document.querySelector(".result")
let __ = [],count = 10

const createBoard = ()=>{
    for (let i =1; i<=100; i++){
        let num;
        do { num = Math.floor(Math.random()*100)+1 }
        while(__.includes(num))
        __.push(num) 
    }

    for(let i = 0; i<__.length; i++){
        let div = document.createElement("div")
        div.innerHTML = __[i]
        div.setAttribute("class", "num-guess")
        div.style.cursor="pointer"
        guessBoard.append(div)   
    }
}
createBoard()

let guess = document.querySelectorAll(".num-guess")
let random = Math.floor(Math.random()*100)+1
chance.innerHTML = count

// Check For Win
function checkForWin(event){
    if(count >0){
        result.innerHTML = event.target.innerHTML < random?"Too Low":
        event.target.innerHTML > random?"Too High": "Win"
        event.target.style = event.target.innerHTML == random?
        "background: blue; color: white": "background: gray"
   }else{
        result.innerHTML =  "Time Elapses";
    }
}

function disableAfterPlay(event){  
    count --
    chance.innerHTML = count   
    event.preventDefault()
    event.target.removeEventListener("click", disableAfterPlay) 
    checkForWin(event)
}


guess.forEach(ele=>ele.addEventListener("click", disableAfterPlay) )
 

restart.addEventListener("click", ()=>{
    guess.forEach(element=>{
        element.addEventListener("click", disableAfterPlay) 
        element.classList.toggle("bg");
        element.style.cursor="pointer";
    })
    random = Math.floor(Math.random()*100)+1;
    chance.innerHTML = count =10;
})