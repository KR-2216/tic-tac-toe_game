let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset");
let winMsg=document.querySelector(".winMsg")

let turnX=true;
let clickCount=0

const winPatterns=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]

boxes.forEach((box) =>{
    box.addEventListener("click",()=>{
        clickCount+=1
        if(turnX==true){
            box.innerText="X";
            box.style.color="#bc6c25";
            turnX=false;
        }
        else{
            box.innerText="O";
            box.style.color="#606c38";
            turnX=true;
        }
        box.disabled=true;
        checkWinner();
    })
})

const checkWinner=()=>{
    for(pattern of winPatterns){
        let pos1Val= boxes[pattern[0]].innerText;
        let pos2Val= boxes[pattern[1]].innerText;
        let pos3Val= boxes[pattern[2]].innerText;
        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                disableBoxes();
                showWinner(pos1Val);
                return;
            }
        }
    }
    if(clickCount==9){
        winMsg.innerText=`It is a Draw!`;
        winMsg.classList.remove("hide");
    }
}

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
    }
}

const showWinner=(winner)=>{
    winMsg.innerText=`Congratulations! Winner is ${winner}`;
    winMsg.classList.remove("hide");
}

const hideWinner=()=>{
    winMsg.classList.add("hide");
}

const resetGame=()=>{
    turnX=true;
    clickCount=0
    enableBoxes();
    hideWinner();
    for(let box of boxes){
        box.innerText="";
    }
}

resetBtn.addEventListener("click", resetGame);