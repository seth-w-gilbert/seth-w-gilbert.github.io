var WHITE = 'w';
var BLACK = 'b';

function FlipState(b){

    this.nextCol = 3;
    this.nextRow = 2;
    this.board = b; //input board representation.
    this.isWhiteMove = true; //white just "played"

    this.createCopy = function(oldState){
        copy = new FlipState([]);
        copy.nextCol = oldState.nextCol;
        copy.nextRow = oldState.nextRow;
        copy.isWhiteMove = oldState.isWhiteMove;

        //for each row in the board.
        oldState.board.forEach((a, i) => {
            copy.board[i] = a.slice();
        });

        return copy;
    }

    this.hasMoreChildren = function(){
        return (this.nextCol < this.board[0].length) && (this.nextRow < this.board.length);
    }


    //returns the next *valid* child.
    this.nextChild = function(){
        //copy myself
        var child = this.createCopy(this);

        //switch whose move it is.
        child.isWhiteMove = !this.isWhiteMove;

        //modify the child's board
        //place a piece at the next open spot
        child.board[this.nextRow][this.nextCol] = child.isWhiteMove ? WHITE : BLACK;

        //set myself up to produce more feasible children.
        if(this.nextCol == 7){
            this.nextCol = 0;
            this.nextRow += 1;
        } else {
            this.nextCol++;
        }
        while((this.nextRow < this.board.length) && (this.nextCol < this.board[0].length) && !this.isValidMove(this.nextCol, this.nextRow)){
          if(this.nextCol == 7){
              this.nextCol = 0;
              this.nextRow += 1;
          } else {
              this.nextCol += 1;
          }
        }

        //reset the child's next open position to be feasible.
        child.nextRow = 0;
        child.nextCol = 0;
        while(child.nextRow < child.board.length && child.nextCol < child.board[0].length && !child.isValidMove(child.nextCol, child.nextRow)){
            if(child.nextCol == 7){
              child.nextCol = 0;
              child.nextRow += 1;
            } else {
              child.nextCol++;
            }
        }

        return child;
    }

    this.isComputerWinner = function(){
      return !this.hasMoreChildren() && (this.staticEvaluation() > 0);
    }

    this.isUserWinner = function(){
      return !this.hasMoreChildren() && (this.staticEvaluation < 0);
    }

    this.isDraw = function(){
      return !this.hasMoreChildren() && this.staticEvaluation == 0;
    }

    //return how good the computer is doing.
    this.staticEvaluation = function(){
      var count = 0;
      this.board.forEach((row) => {
          row.forEach((c) => {
              if(c === WHITE){
                count += 1;
              } else if(c === BLACK){
                count -= 1;
              }
          });
      });

      return count;
    }

    //helper function
    //flip after placing move.
    this.doFlips = function(){
      //TODO
    }

    //returns true
    //valid when not placed on top of another piece
    //AND can make flips.
    //TODO this is basically a copy of flipBetween from flipsy.js
    //TODO either make it more versatile, or split up the work somehow.
    this.isValidMove = function(x, y){
      var color = this.isWhiteMove ? WHITE : BLACK;

      //is the space unoccupied?
      var isValid = (this.board[y][x] === '');

      //check to see if the move will flip anything.
      var numFlipped = 0;
      if(isValid){

        //check left
        var xPos = x-1;
        while(xPos > -1 && board[y][xPos] != color && this.board[y][xPos] != ''){
            xPos--;
        }
        if(xPos != -1 && this.board[y][xPos] == color){
          for(var i=(xPos+1); i < x; i++){
              numFlipped++;
          }
        }

        //check right.
        xPos = x+1;
        while(xPos < 8 && this.board[y][xPos] != color && this.board[y][xPos] != ''){
            xPos++;
        }
        if(xPos != 8 && (xPos > x+1) && this.board[y][xPos] == color){
          for(var i = (xPos-1); i > x; i--){
              numFlipped++;
          }
        }

        //flip above
        var yPos = y-1;
        while(yPos > -1 && this.board[yPos][x] != color && this.board[yPos][x] != ''){
            yPos--;
        }
        if(yPos != -1 && (yPos < y-1) && this.board[yPos][x] == color){
          for(var i=(yPos+1); i < y; i++){
              numFlipped++;
          }
        }

        //flip below
        yPos = y+1;
        while((yPos < 8) && (this.board[yPos][x] != color) && (this.board[yPos][x] != '')){
            yPos++;
        }
        if(yPos != 8 && board[yPos][x] == color){
          for(var i=(yPos-1); i > y; i--){
              numFlipped++;
          }
        }

        //Diagonals
        //flip up and left diagonal
        xPos = x-1;
        yPos = y-1;
        while(xPos > -1 && yPos > -1 && this.board[yPos][xPos] != color && this.board[yPos][xPos] != ''){
            xPos--;
            yPos--;
        }
        if(yPos != -1 && xPos != -1 && this.board[yPos][xPos] == color){
          xPos += 1;
          yPos += 1;
          while(yPos < y && xPos < x){
              xPos += 1;
              yPos += 1;
              numFlipped++;
          }
        }

        //flip up and right diagonal
        xPos = x+1;
        yPos = y-1;
        while(xPos < 8 && yPos > -1 && this.board[yPos][xPos] != color && this.board[yPos][xPos] != ''){
            xPos++;
            yPos--;
        }
        if(yPos != -1 && xPos != 8 && this.board[yPos][xPos] == color){
          xPos -= 1;
          yPos += 1;
          while(yPos < y && xPos > x){
              numFlipped++;
              xPos -= 1;
              yPos += 1;
          }
        }

        //flip down and left diagonal
        xPos = x-1;
        yPos = y+1;
        while(xPos > -1 && yPos < 8 && this.board[yPos][xPos] != color && this.board[yPos][xPos] != ''){
            xPos--;
            yPos++;
        }
        if(yPos != 8 && xPos != -1 && this.board[yPos][xPos] == color){
          xPos += 1;
          yPos -= 1;
          while(yPos > y && xPos < x){
              numFlipped++;
              xPos += 1;
              yPos -= 1;
          }
        }

        //flip down and right diagonal
        xPos = x+1;
        yPos = y+1;
        while((xPos < 8 && yPos < 8) && this.board[yPos][xPos] != color && this.board[yPos][xPos] != ''){
            xPos++;
            yPos++;
        }
        if(yPos != 8 && xPos != 8 && this.board[yPos][xPos] == color){
          xPos -= 1;
          yPos -= 1;
          while(yPos > y && xPos > x){
              numFlipped++;
              xPos -= 1;
              yPos -= 1;
          }
        }
      }

      //none of the short circuit checks fired, not valid.
      return numFlipped > 0;
    }

    //edits the board after user clicks.
    this.placeUserMove = function(x, y){
      this.board[y][x] = BLACK;
      this.isWhiteMove = false;
      //TODO edit the visuals? how far should I go?
    }
}



//main
var board =[['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','w','b','','',''],
            ['','','','b','w','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','','']];

var state = new FlipState(board);
/*console.log(state);
console.log(state.staticEvaluation());
console.log(state.isValidMove(3,2));
console.log(state.isWhiteMove);*/

var i = 0;
while(state.hasMoreChildren()){
  var child = state.nextChild();
  console.log(child.board);
  console.log('next child:');
  console.log(child.nextChild().board);
  //TODO this doesn't quite give back what we would expect...
  console.log('');
  // console.log(child.staticEvaluation();
  i++;
}

console.log('number of children: ' + i);
