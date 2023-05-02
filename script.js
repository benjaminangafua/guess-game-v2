const guessBoard = document.getElementById("guess-board");
const restart = document.getElementById("restart");
const chance = document.getElementById("chance")
const result = document.querySelector(".result")
let __ = [],count = 10

const createBoard = ()=>{
    for (let i =1; i<=100; i++){
        let num;
        do { num = Math.floor(Math.random()*100)+1 }
        while(__.includes(num))
        __.push(num) 
    }

    for(let i = 0; i<__.length; i++){
        const div = document.createElement("div")
        div.innerHTML = __[i]
        div.setAttribute("class", "num-guess")
        div.style.cursor="pointer"
        guessBoard.append(div)   
    }
}
createBoard()

const guess = document.querySelectorAll(".num-guess")
let random = Math.floor(Math.random()*100)+1
chance.innerHTML = count

const audio =[
    "./audio/apostle.m4a",
    "./audio/basic1plus1.m4a",
    "./audio/chants.m4a",
    "./audio/chants-2.m4a",
    "./audio/cutting-grass.m4a",
    "./audio/dinner-man.m4a",
    "./audio/funke.m4a",
    "./audio/jesus-is-lord.m4a",
    "./audio/jezuz.m4a",
    "./audio/macdonalds.m4a",
    "./audio/no-future.m4a",
    "./audio/persecuted.m4a",
    "./audio/pregnancy.m4a",
    "./audio/think-about-your-life.m4a",
    "./audio/you-can-never-make-it-1.m4a",
    "./audio/you-can-never-make-it-full.mp3",
    "./audio/you-are-a-failure.m4a"
]
const voice=()=>(new Audio(audio[Math.floor(Math.random()*audio.length)]))

// Disable played number
const disableAfterPlay = event=>{  
    count --
    chance.innerHTML = count   
    event.preventDefault()
    event.target.removeEventListener("click", disableAfterPlay) 
    checkForWin(event,  disableAfterPlay)
}    
// Check For Win
function checkForWin (event, removeEvent){
    if(count >0){
        result.innerHTML =event.target.innerHTML < random?"Too Low":event.target.innerHTML > random?"Too High":"Congrats"
        if(event.target.innerHTML != random){
            event.target.style = `background:gray; cursor:not-allowed`
            event.target.disabled=true;
            voice().pause()
            voice().play() 
        }else if(event.target.innerHTML == random) {
            guess.forEach (ele=>{
                ele.style.cursor = `not-allowed`
                ele.removeEventListener("click", disableAfterPlay)
                // ele.replaceWith(ele.cloneNode(true))
            }) 
            event.disabled=true;
            event.target.style = `background: blue; color: white; cursor:not-allowed;`
            voice().pause()
        }
   }else{
        result.innerHTML =  "Time Elapses";
    }
}

document.addEventListener("keydown", (e)=>{ 
    guess.forEach(ele=>{
        if(ele.textContent==e.key){
           return ele.addEventListener("click", disableAfterPlay)            
        }
    })
})
guess.forEach(ele=>ele.addEventListener("click", disableAfterPlay) )

restart.addEventListener("click", ()=>{
    guess.forEach(element=>{
        element.addEventListener("click", disableAfterPlay)
        element.style.background = "none" 
        // element.classList.toggle("bg");
        element.style.cursor="pointer";
        result.innerHTML=""
    })
    random = Math.floor(Math.random()*100)+1;
    chance.innerHTML = count =10;
})

