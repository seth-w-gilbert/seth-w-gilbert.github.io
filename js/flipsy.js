var whiteTurn = false;

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
            square.addEventListener('click', function(){
                var piece = document.createElement('div');
                piece.classList.add('game-piece');
                
                piece.classList.add(whiteTurn ? 'piece-white' : 'piece-black');
                whiteTurn = !whiteTurn;
                
                this.appendChild(piece);
            });
            
//            board.appendChild(square);
            var piece = document.createElement('div');
            piece.classList.add('game-piece');
            if(boardRep[i][j] == 'w'){
                piece.classList.add('piece-white');
            }
            if(boardRep[i][j] == 'b'){
                piece.classList.add('piece-black');
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