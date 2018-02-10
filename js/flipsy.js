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
    var board = new Array(8);
    var boardDiv = document.getElementById('game-board');
    
    
    for(var i=0; i < 8; i++){
        board[i] = new Array(8);
        for(var j=0; j < 8; j++){
            square = document.createElement('div');
            square.classList.add('game-square');
            square.dataset.y = i;
            square.dataset.x = j;
            square.addEventListener('click', function(){
                console.log(this.isPopulated);
                if(!this.isPopulated){
                    this.isPopulated = true;
                    
                    //add the correct classes and edit the underlying array.
                    var piece = this.getElementsByClassName('game-piece')[0];
                    piece.classList.add('game-piece');

                    if(isWhiteTurn){
                        piece.classList.add('piece-white');
                        boardRep[this.dataset.y][this.dataset.x] = 'w';
                        whiteCount++;
                    } else {
                        piece.classList.add('piece-black');
                        boardRep[this.dataset.y][this.dataset.x] = 'b';
                        blackCount++;
                    }
                    console.log(boardRep);

                    this.appendChild(piece);
                    this.style.cursor = "default";
                    
                    //flip the pieces
                    flipBetween(isWhiteTurn, Number(this.dataset.x), Number(this.dataset.y));
                    
                    updateScores();
                    //change turn
                    isWhiteTurn = !isWhiteTurn;
                }
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
            
            board[i][j] = square;
            boardDiv.appendChild(square);
        }
        var newLine = document.createElement('br');
        newLine.style.clear = 'both';
        boardDiv.appendChild(newLine);
    }
}

function flipBetween(isWhiteTurn, x, y){
    var char = isWhiteTurn ? 'w' : 'b';
    var xPos;
    var yPos;
    
    //flip to the left
    xPos = x-1;
    while(xPos > -1 && boardRep[y][xPos] != char && boardRep[y][xPos] != ''){
        xPos--;
    }
    if(xPos != -1 && boardRep[y][xPos] == char){
        //flip all in between.
        for(var i=(xPos+1); i < x; i++){
            flipOne(char, i, y);
        }
        console.log(boardRep);
    }
    
    //flip to the right.
    xPos = x+1;
    while(xPos < 8 && boardRep[y][xPos] != char && boardRep[y][xPos] != ''){
        xPos++;
    }
    if(xPos != 8 && boardRep[y][xPos] == char){
        //flip all in between.
        for(var i = (xPos-1); i > x; i--){
            flipOne(char, i, y);
        }
        console.log(boardRep);
    }
    
    //flip above
    yPos = y-1;
    while(yPos > -1 && boardRep[yPos][x] != char && boardRep[yPos][x] != ''){
        yPos--;
    }
    if(yPos != -1 && boardRep[yPos][x] == char){
        //flip all in between
        for(var i=(yPos+1); i < y; i++){
            flipOne(char, x, i);
        }
        console.log(boardRep);
    }
    
    //flip below
    yPos = y+1;
    while((yPos < 8) && (boardRep[yPos][x] != char) && (boardRep[yPos][x] != '')){
        yPos++;
    }
    if(yPos != 8 && boardRep[yPos][x] == char){
        //flip all in between
        for(var i=(yPos-1); i > y; i--){
            flipOne(char, x, i);
        }
        console.log(boardRep);
    }
    
    //Diagonals
    //flip up and left diagonal
    xPos = x-1;
    yPos = y-1;
    while(xPos > -1 && yPos > -1 && boardRep[yPos][xPos] != char && boardRep[yPos][xPos] != ''){
        xPos--;
        yPos--;
    }
    if(yPos != -1 && xPos != -1 && boardRep[yPos][xPos] == char){
        //flip all in between
        xPos += 1;
        yPos += 1;
        while(yPos < y && xPos < x){
            flipOne(char, xPos, yPos);
            xPos += 1;
            yPos += 1;
        }
        console.log(boardRep);
    }
    
    //flip up and right diagonal
    xPos = x+1;
    yPos = y-1;
    while(xPos < 8 && yPos > -1 && boardRep[yPos][xPos] != char && boardRep[yPos][xPos] != ''){
        xPos++;
        yPos--;
    }
    if(yPos != -1 && xPos != 8 && boardRep[yPos][xPos] == char){
        //flip all in between
        xPos -= 1;
        yPos += 1;
        while(yPos < y && xPos > x){
            flipOne(char, xPos, yPos);
            xPos -= 1;
            yPos += 1;
        }
        console.log(boardRep);
    }
    
    //flip down and left diagonal
    xPos = x-1;
    yPos = y+1;
    while(xPos > -1 && yPos < 8 && boardRep[yPos][xPos] != char && boardRep[yPos][xPos] != ''){
        xPos--;
        yPos++;
    }
    if(yPos != 8 && xPos != -1 && boardRep[yPos][xPos] == char){
        //flip all in between
        xPos += 1;
        yPos -= 1;
        while(yPos > y && xPos < x){
            flipOne(char, xPos, yPos);
            xPos += 1;
            yPos -= 1;
        }
        console.log(boardRep);
    }
    
    //flip down and right diagonal
    xPos = x+1;
    yPos = y+1;
    while((xPos < 8 && yPos < 8) && boardRep[yPos][xPos] != char && boardRep[yPos][xPos] != ''){
        xPos++;
        yPos++;
    }
    if(yPos != 8 && xPos != 8 && boardRep[yPos][xPos] == char){
        //flip all in between
        xPos -= 1;
        yPos -= 1;
        while(yPos > y && xPos > x){
            flipOne(char, xPos, yPos);
            xPos -= 1;
            yPos -= 1;
        }
        console.log(boardRep);
    }
}

function flipOne(char, x, y){
    var square = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
    console.log(square);
    boardRep[y][x] = char;
    var piece = square.childNodes[0];
    if(char == 'w'){
        piece.classList.remove('piece-black');
        piece.classList.add('piece-white');
        blackCount -= 1;
        whiteCount += 1;
    } else {
        piece.classList.remove('piece-white');
        piece.classList.add('piece-black');
        whiteCount -= 1;
        blackCount += 1;
    }
}

function updateScores(){
    document.getElementById('white-score').innerHTML = document.getElementById('white-score').innerHTML.replace(/\d+/, whiteCount);
    document.getElementById('black-score').innerHTML = document.getElementById('black-score').innerHTML.replace(/\d+/, blackCount);
}