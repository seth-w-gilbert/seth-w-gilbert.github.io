var isWhiteTurn = false;

var boardRep = [['','','','','','','',''],
             ['','','','','','','',''],
             ['','','','','','','',''],
             ['','','','w','b','','',''],
             ['','','','b','w','','',''],
             ['','','','','','','',''],
             ['','','','','','','',''],
             ['','','','','','','','']];

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
                    } else {
                        piece.classList.add('piece-black');
                        boardRep[this.dataset.y][this.dataset.x] = 'b';
                    }
                    console.log(boardRep);

                    this.appendChild(piece);
                    this.style.cursor = "default";
                    
                    //flip the pieces
                    flipBetween(isWhiteTurn, this.dataset.x, this.dataset.y);
                    
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
    
    //flip to the left
    var xPos = x-1;
    while(boardRep[y][xPos] != char && boardRep[y][xPos] != '' && xPos != -1){
        console.log(xPos);
        xPos--;
    }
//    console.log('final: ' + xPos);
    if(xPos != -1 && boardRep[y][xPos] == char){
        //flip all in between.
        for(var i = xPos+1; i < x; i++){
            flipOne(char, i, y);
        }
        console.log(boardRep);
    }
    
    //flip to the right.
    console.log(x);
    xPos = Number(x)+1;
    console.log(xPos);
    while(boardRep[y][xPos] != char && boardRep[y][xPos] != '' && xPos < 9){
        console.log(xPos);
        xPos++;
    }
    console.log('final: ' + xPos);
    if(xPos != 9 && boardRep[y][xPos] == char){
        //flip all in between.
        for(var i = (xPos-1); i >  x; i--){
            console.log(i);
            flipOne(char, i, y);
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
    } else {
        piece.classList.remove('piece-white');
        piece.classList.add('piece-black');
    }
}