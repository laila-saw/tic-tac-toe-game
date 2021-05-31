const selectBox=document.querySelector(".select-box");
const playerXBtn=selectBox.querySelector(".x");
const playerOBtn=selectBox.querySelector(".o");
const playBoardBox=document.querySelector(".playBoard-box");
allBox=document.querySelectorAll("section span");
const players=document.querySelector(".players");
const resultBox=document.querySelector(".result-box");
const wonText=resultBox.querySelector(".won-text");
const replayBtn=resultBox.querySelector("button");







window.onload=()=>{
    playerXBtn.onclick=()=>{
        selectBox.style.display="none";
        playBoardBox.style.display="block";

    }
    playerOBtn.onclick=()=>{
        selectBox.style.display="none";
        playBoardBox.style.display="block";
        players.setAttribute("class","players active player");

    }
    for(let i=0;i<allBox.length;i++){
        allBox[i].setAttribute("onclick","clickedBox(this)");
    }
}
let playerXIcon="fa fa-times";
let playerOIcon="fa fa-circle";
let playerSign ="X"; //suppose player will be x
let runBot = true;
// user click function 
function clickedBox(element){
    // console.log(element)
    if(players.classList.contains("player")){
        element.innerHTML=`<i class="${playerOIcon}"></i>`;
        players.classList.add("active");
        // if player select o then we'll change the playersign value to o
        playerSign="O";
        element.setAttribute("id",playerSign)
    }else{
        element.innerHTML=`<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
        element.setAttribute("id",playerSign)
    }
    selectWinner();
    playBoardBox.style.pointerEvents="none" // once user select then user can't select any other box untill box select
    element.style.pointerEvents="none"
    let randomDelayTime=((Math.random()*1000)+200).toFixed();
    setTimeout(() => {
        bot(runBot);
    }, randomDelayTime);
    console.log(randomDelayTime)

    
}
// bot click function 
function bot(runBot){
    if(runBot){
        // first change the playerSing .. so if user has x value in id then bot will have o
    playerSign="O"
    let array=[];
    for(let i=0;i<allBox.length;i++){
        if(allBox[i].childElementCount==0){
           array.push(i); 
        //    console.log(i+" "+"has no children")
        }
    }
    // console.log(array)
    let randomBox=array[Math.floor(Math.random()*array.length)];
    console.log(randomBox)
    if(array.length>0){
        if(players.classList.contains("player")){
            allBox[randomBox].innerHTML=`<i class="${playerXIcon}"></i>`;
            players.classList.remove("active");
            // if user is o then bot is x
            playerSign="X"
            allBox[randomBox].setAttribute("id",playerSign)


            
        }else{
            allBox[randomBox].innerHTML=`<i class="${playerOIcon}"></i>`;
            players.classList.remove("active");
            allBox[randomBox].setAttribute("id",playerSign)
        }
    }
    selectWinner();
    allBox[randomBox].style.pointerEvents="none"
    playBoardBox.style.pointerEvents="auto";
    playerSign="X"
    }
}

// let work on select the winner
function getClass(idname){
    return document.querySelector(".box" + idname).id; //returning  id name
}
function checkClass(val1,val2,val3,sign){
    if(getClass(val1)== sign && getClass(val2)== sign && getClass(val3)== sign )
    return true
}
function selectWinner(){
    if(checkClass(1,2,3,playerSign) || checkClass(4,5,6,playerSign) || checkClass(7,8,9,playerSign) || checkClass(1,4,7,playerSign) || checkClass(2,5,8,playerSign) || checkClass(3,6,9,playerSign) || checkClass(1,5,9,playerSign) || checkClass(3,5,7,playerSign )){
        // console.log(playerSign + " is the winner")
        // once match won by someone stop the bot
        runBot= false; 
        bot(runBot);
        setTimeout(()=>{
            playBoardBox.style.display="none";
            resultBox.style.display="block";
        },700);
        let wonTextTag='<div class="won-text">Player <p>'+playerSign+'</p> won the game!</div>';
            wonText.innerHTML=wonTextTag;  
    }
    else{
        if(getClass(1)!=""&& getClass(2)!=""&& getClass(3)!=""&& getClass(4)!=""&& getClass(5)!=""&& getClass(6)!=""&& getClass(7)!=""&& getClass(8)!=""&& getClass(9)!=""){
            runBot= false; 
            bot(runBot);
            setTimeout(()=>{
                playBoardBox.style.display="none";
                resultBox.style.display="block";
            },700);
            let wonTextTag='Match has been drawn !';
                wonText.innerHTML=wonTextTag;  
        }

    }

}
replayBtn.onclick=()=>{
    window.location.reload();
}



