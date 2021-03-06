//  [x] smarter deeper AI
//  [x] Alpha Beta Pruning

var isWhiteTurn = false;

var boardRep = [['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','w','b','','',''],
                ['','','','b','w','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','','']];

var whiteCount = 2;
var blackCount = 2;

function createBoard(){
    var square;
    var boardDiv = document.getElementById('game-board');
    
    for(var i=0; i < 8; i++){
        for(var j=0; j < 8; j++){
            square = document.createElement('div');
            square.classList.add('game-square');
            square.dataset.y = i;
            square.dataset.x = j;
            square.addEventListener('click', function(){
                console.log(this.isPopulated);
                if(!this.isPopulated){
                    //add the correct classes and edit the underlying array.
                    var piece = this.getElementsByClassName('game-piece')[0];
                    
                    var numFlipped = flipBetween(isWhiteTurn, Number(this.dataset.x), Number(this.dataset.y));
                    console.log(numFlipped);
                    
                    //must flip at least one piece.
                    if(numFlipped > 0){
                        if(isWhiteTurn){
                            piece.classList.add('piece-white');
                            boardRep[this.dataset.y][this.dataset.x] = 'w';
                            whiteCount += numFlipped + 1;
                            blackCount -= numFlipped;
                        } else {
                            piece.classList.add('piece-black');
                            boardRep[this.dataset.y][this.dataset.x] = 'b';
                            blackCount += numFlipped + 1;
                            whiteCount -= numFlipped;
                        }

                        this.appendChild(piece);
                        this.style.cursor = "default";
                        this.isPopulated = true;

                        updateScores();
                        
                        //change turn
                        if(canMove(!isWhiteTurn)){
                            isWhiteTurn = !isWhiteTurn;
                            if(isWhiteTurn){
                                setTimeout(makeMoveDeep, 1000);
                            }
                        }
                    } else {
                        //animate that the piece cannot be placed.
                        
                        if(!piece.annimationend){
                            piece.animationend = function(){
                                piece.classList.remove('no-flips');
                            }
                            piece.addEventListener('animationend', piece.animationend, false);
                        }
                        piece.classList.add('no-flips');
                    }
                    
                }
                if(!(canMove(isWhiteTurn) || canMove(!isWhiteTurn))){
                    alert('game over');
                }
                updateTurn();
            });
            
            var piece = document.createElement('div');
            piece.classList.add('game-piece');
            
            if(boardRep[i][j] == 'w'){
                piece.classList.add('piece-white');
                square.style.cursor = 'default';
                square.isPopulated = true;
            }
            if(boardRep[i][j] == 'b'){
                piece.classList.add('piece-black');
                square.style.cursor = 'default';
                square.isPopulated = true;
            }
            square.appendChild(piece);
            
            boardDiv.appendChild(square);
        }
        var newLine = document.createElement('br');
        newLine.style.clear = 'both';
        boardDiv.appendChild(newLine);
    }
}

function canMove(whiteTurn){
    for(var y=0; y < boardRep.length; y++){
        for(var x=0; x<boardRep[y].length; x++){
            if((flipBetween(whiteTurn, x, y, true) > 0) && boardRep[y][x] == ''){
                return true;
            }
        }
    }
    return false;
}

function flipBetween(whiteTurn, x, y, isTest){
    var color = whiteTurn ? 'w' : 'b';
    var xPos;
    var yPos;
    var numFlipped = 0;
    
    //flip to the left
    xPos = x-1;
    while(xPos > -1 && boardRep[y][xPos] != color && boardRep[y][xPos] != ''){
        xPos--;
    }
    if(xPos != -1 && boardRep[y][xPos] == color){
        //flip all in between.
        for(var i=(xPos+1); i < x; i++){
            if(!isTest) flipOne(color, i, y);
            numFlipped++;
        }
        //console.log(boardRep);
    }
    
    //flip to the right.
    xPos = x+1;
    while(xPos < 8 && boardRep[y][xPos] != color && boardRep[y][xPos] != ''){
        xPos++;
    }
    if(xPos != 8 && boardRep[y][xPos] == color){
        //flip all in between.
        for(var i = (xPos-1); i > x; i--){
            if(!isTest) flipOne(color, i, y);
            numFlipped++;
        }
        //console.log(boardRep);
    }
    
    //flip above
    yPos = y-1;
    while(yPos > -1 && boardRep[yPos][x] != color && boardRep[yPos][x] != ''){
        yPos--;
    }
    if(yPos != -1 && boardRep[yPos][x] == color){
        //flip all in between
        for(var i=(yPos+1); i < y; i++){
            if(!isTest) flipOne(color, x, i);
            numFlipped++;
        }
        //console.log(boardRep);
    }
    
    //flip below
    yPos = y+1;
    while((yPos < 8) && (boardRep[yPos][x] != color) && (boardRep[yPos][x] != '')){
        yPos++;
    }
    if(yPos != 8 && boardRep[yPos][x] == color){
        //flip all in between
        for(var i=(yPos-1); i > y; i--){
            if(!isTest) flipOne(color, x, i);
            numFlipped++;
        }
        //console.log(boardRep);
    }
    
    //Diagonals
    //flip up and left diagonal
    xPos = x-1;
    yPos = y-1;
    while(xPos > -1 && yPos > -1 && boardRep[yPos][xPos] != color && boardRep[yPos][xPos] != ''){
        xPos--;
        yPos--;
    }
    if(yPos != -1 && xPos != -1 && boardRep[yPos][xPos] == color){
        //flip all in between
        xPos += 1;
        yPos += 1;
        while(yPos < y && xPos < x){
            if(!isTest) flipOne(color, xPos, yPos);
            xPos += 1;
            yPos += 1;
            numFlipped++;
        }
        //console.log(boardRep);
    }
    
    //flip up and right diagonal
    xPos = x+1;
    yPos = y-1;
    while(xPos < 8 && yPos > -1 && boardRep[yPos][xPos] != color && boardRep[yPos][xPos] != ''){
        xPos++;
        yPos--;
    }
    if(yPos != -1 && xPos != 8 && boardRep[yPos][xPos] == color){
        //flip all in between
        xPos -= 1;
        yPos += 1;
        while(yPos < y && xPos > x){
            if(!isTest) flipOne(color, xPos, yPos);
            numFlipped++;
            xPos -= 1;
            yPos += 1;
        }
        //console.log(boardRep);
    }
    
    //flip down and left diagonal
    xPos = x-1;
    yPos = y+1;
    while(xPos > -1 && yPos < 8 && boardRep[yPos][xPos] != color && boardRep[yPos][xPos] != ''){
        xPos--;
        yPos++;
    }
    if(yPos != 8 && xPos != -1 && boardRep[yPos][xPos] == color){
        //flip all in between
        xPos += 1;
        yPos -= 1;
        while(yPos > y && xPos < x){
            if(!isTest) flipOne(color, xPos, yPos);
            numFlipped++;
            xPos += 1;
            yPos -= 1;
        }
        //console.log(boardRep);
    }
    
    //flip down and right diagonal
    xPos = x+1;
    yPos = y+1;
    while((xPos < 8 && yPos < 8) && boardRep[yPos][xPos] != color && boardRep[yPos][xPos] != ''){
        xPos++;
        yPos++;
    }
    if(yPos != 8 && xPos != 8 && boardRep[yPos][xPos] == color){
        //flip all in between
        xPos -= 1;
        yPos -= 1;
        while(yPos > y && xPos > x){
            if(!isTest) flipOne(color, xPos, yPos);
            numFlipped++;
            xPos -= 1;
            yPos -= 1;
        }
        //console.log(boardRep);
    }
    
    if(!isTest){
        console.log(boardRep);       
    }
    
    return numFlipped;
}

function flipOne(color, x, y){
    var square = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
    boardRep[y][x] = color;
    var piece = square.childNodes[0];
    
    piece.color = color;
    
    if(!piece.transitionend){
        piece.transitionend = function(){
            if(!this.halfway){
                if(this.color == 'w'){
                    piece.classList.remove('piece-black');
                    piece.classList.add('piece-white');
                }  else {
                    piece.classList.remove('piece-white');
                    piece.classList.add('piece-black');
                }
                this.style.transform = 'rotateY(180deg)';
                this.halfway = true;
            } else {
                this.halfway = false;
            }
            
        };
        
        piece.addEventListener('transitionend', piece.transitionend);
    }
    
    //start the annimation
    piece.style.transform = "rotateY(90deg)";
}

//is white turn, generate AI move.
function makeMove(){
    var numFlipped = 0;
    var tempFlipped = 0;
    var pos = {x: 0, y: 0};
    
    for(var y=0; y < boardRep.length; y++){
        for(var x=0; x < boardRep[0].length; x++){
            
            if(boardRep[y][x] == ''){
                tempFlipped = flipBetween(true, x, y, true);
                if(tempFlipped > numFlipped){
                    //keep track of the max, and its position.
                    numFlipped = tempFlipped;
                    pos.x = x;
                    pos.y = y;
                } 
            }
            
        }
    }
    
    var square = document.querySelector('[data-x="' + pos.x + '"][data-y="' + pos.y + '"]');
    boardRep[pos.y][pos.x] = 'w';
    
    var piece = square.childNodes[0];
    piece.classList.add('piece-white');
    square.isPopulated = true;
    square.style.cursor = 'default';
    
    console.log(pos);
    flipBetween(true, pos.x, pos.y, false);
    whiteCount += (numFlipped + 1);
    blackCount -= (numFlipped);
    updateScores();
    isWhiteTurn = !isWhiteTurn;
    updateTurn();
    
    if(!(canMove(isWhiteTurn) || canMove(!isWhiteTurn))){
        alert('game over');
    }

}

function makeMoveDeep(){
    
    //find the move.
    var state = new FlipState(boardRep);
    console.log('deep');
    
    var mm = new Minimax(3);
    var child = mm.generateNextMove(state);
    var move = child.lastPlay;
    
    console.log(move.x + ", " + move.y);

    //make the move.
    var square = document.querySelector('[data-x="' + move.x + '"][data-y="' + move.y + '"]');
    boardRep[move.y][move.x] = 'w';
    
    var piece = square.childNodes[0];
    piece.classList.add('piece-white');
    square.isPopulated = true;
    square.style.cursor = 'default';
    
    var numFlipped = flipBetween(true, move.x, move.y, false);
    whiteCount += (numFlipped + 1);
    blackCount -= (numFlipped);
    updateScores();
    isWhiteTurn = !isWhiteTurn;
    updateTurn();
    
    if(!(canMove(isWhiteTurn) || canMove(!isWhiteTurn))){
		
		//TODO add blinking
        document.getElementById('turn-indic').innerHTML = "Game Over! ";
		var userWin = blackCount > whiteCount;
		if(userWin){
			document.getElementById('turn-indic').innerHTML += "You Win!";
		} else {
			if(blackCount == whiteCount) {
				document.getElementById('turn-indic').innerHTML = "It's a tie!";
			} else {
				document.getElementById('turn-indic').innerHTML = "You lose :(";
			}
		}
    }
}

//aesthetics
function updateScores(){
    document.getElementById('white-score').innerHTML = document.getElementById('white-score').innerHTML.replace(/\d+/, whiteCount);
    document.getElementById('black-score').innerHTML = document.getElementById('black-score').innerHTML.replace(/\d+/, blackCount);
}

function updateTurn(){
    document.getElementById('turn-indic').innerHTML = isWhiteTurn ? "<- Computer's Turn" : "Your Turn ->";
}
