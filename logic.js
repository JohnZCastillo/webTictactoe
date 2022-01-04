
//========================= HEPER ===============================

function isMatch(array,target){
    let status = true;
    array.forEach(element => {
        status = status && (element.innerHTML == target);
    });
    return status;
}

function isEmpty(array){
    let status = true;
    array.forEach(element => {
        status = status && (element.innerHTML.length <= 0);
    });
    return status;
}

function isAvailable(index){
    if(index >= 0 && index <= 8){
        return isEmpty([boxes[index]]);
    }
    return false;
}

function getRandom(array){
    let temp = Math.floor(Math.random() * array.length)
        while(!isAvailable(temp) && array.length > 0){
            array.splice(temp);
            temp = Math.floor(Math.random() * array.length)
        }
    if(array.length == 0){
        return -1;
    }
    console.log('returning from random: '+temp)
    return array[temp];
}

function whatIndex(value1,value2){ 
    if(value1 > value2){
        return --value1;
    }else{
        return ++value2;
    }
}

function countMatch(array,target){
    
    const data = {
        count: 0,
        available: [],
        target: this.target,
        status: function(){
            if(this.count == 2 && this.available.length == 1){
                return true;
            }else{
                return false;
            }
        },
    }

    array.forEach(element => {
        
        if(element.innerHTML <= 0){
            data.available.push(element)
        }

        if(target == element.innerHTML){
            data.count += 1;
        }
    });

    return data;
    
}


function sample(target){
    const row1 = countMatch([boxes[0],boxes[1],boxes[2]],target);
        if(row1.status()) return row1.available[0]
    
    const row2 = countMatch([boxes[3],boxes[4],boxes[5]],target);
        if(row2.status()) return row2.available[0]

    const row3 = countMatch([boxes[6],boxes[7],boxes[8]],target);
        if(row3.status()) return row3.available[0]
    
    const column1 = countMatch([boxes[0],boxes[3],boxes[6]],target);
        if(column1.status()) return column1.available[0]
    
    const column2 = countMatch([boxes[1],boxes[4],boxes[7]],target);
        if(column2.status()) return column2.available[0]
    
    const column3 = countMatch([boxes[2],boxes[5],boxes[8]],target);
        if(column3.status()) return column3.available[0]
    
    const diagonal1 = countMatch([boxes[0],boxes[4],boxes[8]],target);
        if(diagonal1.status()) return diagonal1.available[0]
    
    const diagonal2 = countMatch([boxes[2],boxes[4],boxes[6]],target);
        if(diagonal2.status()) return diagonal2.available[0]
    
        // 0 1 2
        // 3 4 5
        //6 7 8
    throw ("no avaialble pair found");
}

//=============================== END ============================



//============================= COMPUTER LOGIC ==================================

function mind(){

  
    if(isAvailable(4)){
        return 4;
    }

    if(clickCount == 1){
        console.log("======= ok ============")
        return getRandom([0,2,6,8]);
    }

    try{
        let box = sample(player2); 
        box.click();
        return;
    }catch(error){
        console.log(error);
    }
    
    try{
        let box = sample(player1); 
        box.click();
        return;
    }catch(error){
        console.log(error);
    }

    let cross = getRandom([1,3,5,7]);
        if(cross > -1){
            return cross;
        }

    let side = getRandom([0,2,6,8]);
        if(side > -1){
            return side;
        }
}

//================================== END ==================================

//return true kapa naga match ang tulo na box kag dli sinda null or 0 lenght
function match(box1,box2,box3){
    if(box1.innerHTML.length > 0 && box2.innerHTML.length > 0 && box3.innerHTML.length > 0){
        if((box1.innerHTML == box2.innerHTML) && box1.innerHTML == box3.innerHTML){
            return true;
        }
        return false;
    }
}

//alert sa page na may delay
function delayDisplay(text,time){
    setTimeout(()=>{
        alert(text);
    },time)
}

//himuon na red  ang background color sanbox na nagana
function hasWon(box1,box2,box3){
    box1.classList.add('win');
    box2.classList.add('win');
    box3.classList.add('win');
}

//ccall sa macther if may match 
//if match then call sa haswon para mag red ang color
//then call sa delayDisplay para mag alert nag gana na
// then reload sa page after 200ms
function checkSectionOfBoard(index1,index2,index3){
    if(match(boxes[index1],boxes[index2],boxes[index3])){
        hasWon(boxes[index1],boxes[index2],boxes[index3]);
        delayDisplay("Winner!",200)
        setTimeout(()=> location.reload(),500);
    }
}

//check section san board
function checkWinner(){
    
    checkSectionOfBoard(0,1,2)
    checkSectionOfBoard(3,4,5)
    checkSectionOfBoard(6,7,8)

    checkSectionOfBoard(0,3,6)
    checkSectionOfBoard(1,4,7)
    checkSectionOfBoard(2,5,8)
    
    checkSectionOfBoard(0,4,8)
    checkSectionOfBoard(2,4,6)
}

//return san token sa current player
function getCurrentPlayer(){
    //first click for player 1
    if(clickCount == 0){
        return player1
    }
    //second click for player 2
    if(clickCount == 1){
        return player2
    }
    //if even and click count sa player1
    if(clickCount >= 2 && clickCount % 2 == 0){
        return player1;
    }
    //pag dd the sa player 2
    return player2;
}

function changeTurn(){
    if(turn == 1){
        turn = 2;
    }else{
        turn = 1;
    }
}

//set san text sa boxe
function setText(){
    if(this.innerHTML.length <= 0){
        this.innerHTML = getCurrentPlayer();
        //update if successful and click
        clickCount++;

        changeTurn();

        //check if there is a winner;
        checkWinner();

        if(clickCount == 9){
            setTimeout(()=>{
                alert("Board is full")
                location.reload()
            },300)
          
        }

     setTimeout(()=>{
        if(turn == 2){
            let temp = mind();
            console.log("Computer is thinking: " +temp);
            boxes[temp].click();
        }
     },1000);

    }
}


//boxes sa sulod san board 
const boxes = document.querySelector('.board').children;

//player token
let player1 = "X";
let player2 = "O";

//para maaraman kung puno na ang board;
let clickCount = 0;

let turn = 1;

//iterate sa boxes then add san event sa taga board
Object.values(boxes).forEach(box => box.addEventListener('click',setText));