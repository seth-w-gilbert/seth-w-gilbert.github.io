function createBoard(){
    var board = document.getElementById('game-board');
    var square;
    
    
    for(var j=0; j < 8; j++){
        for(var i=0; i < 8; i++){
            square = document.createElement('div');
            square.classList.add('game-square');
            board.appendChild(square);
            
        }
        var newLine = document.createElement('br');
        newLine.style.clear = 'both';
        board.appendChild(newLine);
    }
    
    
}