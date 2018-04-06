var WHITE = 'w';
var BLACK = 'b';

function FlipState(b){

    this.createCopy = function(oldState){
        copy = new FlipState([]);
        copy.nextCol = oldState.nextCol;
        copy.nextRow = oldState.nextRow;
        copy.whitePlayed = oldState.whitePlayed;

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
        child.whitePlayed = !this.whitePlayed;
        

        //modify the child's board
        //place a piece at the next open spot
        child.play(this.nextCol, this.nextRow);

        //set myself up to produce more feasible children.
        if(this.nextCol == 7){
            this.nextCol = 0;
            this.nextRow += 1;
        } else {
            this.nextCol++;
        }
        while((this.nextRow < this.board.length) && (this.nextCol < this.board[0].length) && !this.isValidMove(this.nextCol,this.nextRow)){
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

    //return how good the computer is doing.
    //Do I weight the edges and corner or trust that looking
    //ahead will be enough?
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
    
    //TODO game is over when there are no more moves for either player.
    //from there a win can be decided.
    //fix these three methods.
    this.isComputerWinner = function(){
      return !this.hasMoreChildren() && (this.staticEvaluation() > 0);
    }

    this.isUserWinner = function(){
      return !this.hasMoreChildren() && (this.staticEvaluation < 0);
    }

    this.isDraw = function(){
      return !this.hasMoreChildren() && this.staticEvaluation == 0;
    }

    //helper function
    //flip after placing move.
    this.doFlips = function(){
      //TODO
    }

    //true when not placed on top of another piece
    //AND can make flips.
    //TODO should I cut out early?
    this.isValidMove = function(x, y){
      var color = this.whitePlayed ? BLACK : WHITE;

      //is the space unoccupied?
      var isValid = (this.board[y][x] === '');

      //check to see if the move will flip anything.
      var numFlipped = 0;
      if(isValid){

        //count the flips.
        numFlipped += this.leftFlips(x, y, color);
        numFlipped += this.rightFlips(x, y, color);
        numFlipped += this.upFlips(x, y, color);
        numFlipped += this.downFlips(x, y, color);

        numFlipped += this.upLeftFlips(x,y,color);
        numFlipped += this.upRightFlips(x,y,color);
        numFlipped += this.downLeftFlips(x,y,color);
        numFlipped += this.downRightFlips(x,y,color);
      }

      return numFlipped > 0;
    }

    this.play = function(x,y) {
      color = this.whitePlayed ? WHITE : BLACK;
      this.board[y][x] = color;
      
      this.lastPlay.x = x;
      this.lastPlay.y = y;

      //do the flips
      this.leftFlips(x, y, color, true);
      this.rightFlips(x, y, color, true);
      this.upFlips(x, y, color, true);
      this.downFlips(x, y, color, true);

      this.upLeftFlips(x,y,color, true);
      this.upRightFlips(x,y,color, true);
      this.downLeftFlips(x,y,color, true);
      this.downRightFlips(x,y,color, true);
    }

    //edits the board after user clicks.
    /*this.placeUserMove = function(x, y){
      this.board[y][x] = BLACK;
      this.whitePlayed = false;
    }*/

    //helper methods.
    this.flipOne = function(x,y){
      this.board[y][x] = (this.board[y][x] == WHITE ? BLACK : WHITE)
    }

    //inputs: (x,y), w/b, and a boolean
    this.leftFlips = function(x, y, color, flip){
      var numFlipped = 0;

      var xPos = x-1;
      while(xPos > -1 && this.board[y][xPos] != color && this.board[y][xPos] != ''){
        xPos--;
      }
      if(xPos != -1 && this.board[y][xPos] == color){
        for(var i=(xPos+1); i < x; i++){
          if(flip){
            this.flipOne(i, y);
          }
          numFlipped++;
        }
      }

      return numFlipped;
    }

    this.rightFlips = function(x, y, color, flip){
      var numFlipped = 0;
      var xPos = x+1;
      while(xPos < 8 && this.board[y][xPos] != color && this.board[y][xPos] != ''){
        xPos++;
      }
      if(xPos != 8 && (xPos > x+1) && this.board[y][xPos] == color){
        for(var i = (xPos-1); i > x; i--){
          if(flip){
            this.flipOne(i, y);
          }
          numFlipped++;
        }
      }
      return numFlipped;
    }

    this.upFlips = function(x, y, color, flip){
      var numFlipped = 0;
      var yPos = y-1;
      while(yPos > -1 && this.board[yPos][x] != color && this.board[yPos][x] != ''){
        yPos--;
      }
      if(yPos != -1 && (yPos < y-1) && this.board[yPos][x] == color){
        for(var i=(yPos+1); i < y; i++){
          if(flip){
            this.flipOne(x, i);
          }
          numFlipped++;
        }
      }
      return numFlipped;
    }

    this.downFlips = function(x, y, color, flip){
      var numFlipped = 0;
      var yPos = y+1;
      while((yPos < 8) && (this.board[yPos][x] != color) && (this.board[yPos][x] != '')){
        yPos++;
      }
      if(yPos != 8 && this.board[yPos][x] == color){
        for(var i=(yPos-1); i > y; i--){
          if(flip){
            this.flipOne(x, i);
          }
          numFlipped++;
        }
      }
      return numFlipped;
    }

    this.upLeftFlips = function(x,y,color,flip){
      var numFlipped = 0;
      var xPos = x-1;
      var yPos = y-1;
      while(xPos > -1 && yPos > -1 && this.board[yPos][xPos] != color && this.board[yPos][xPos] != ''){
        xPos--;
        yPos--;
      }
      if(yPos != -1 && xPos != -1 && this.board[yPos][xPos] == color){
        xPos += 1;
        yPos += 1;
        while(yPos < y && xPos < x){
          if(flip){
            this.flipOne(xPos,yPos);
          }
          xPos++;
          yPos++;
          numFlipped++;
        }
      }
      return numFlipped;
    }

    this.upRightFlips = function(x,y,color,flip){
      var numFlipped = 0;
      var xPos = x+1;
      var yPos = y-1;
      while(xPos < 8 && yPos > -1 && this.board[yPos][xPos] != color && this.board[yPos][xPos] != ''){
          xPos++;
          yPos--;
      }
      if(yPos != -1 && xPos != 8 && this.board[yPos][xPos] == color){
        xPos -= 1;
        yPos += 1;
        while(yPos < y && xPos > x){
          if(flip){
            this.flipOne(xPos, yPos);
          }
          numFlipped++;
          xPos--;
          yPos++;
        }
      }
      return numFlipped;
    }

    this.downLeftFlips = function(x,y,color,flip){
      var numFlipped = 0;
      var xPos = x-1;
      var yPos = y+1;
      while(xPos > -1 && yPos < 8 && this.board[yPos][xPos] != color && this.board[yPos][xPos] != ''){
        xPos--;
        yPos++;
      }
      if(yPos != 8 && xPos != -1 && this.board[yPos][xPos] == color){
        xPos += 1;
        yPos -= 1;
        while(yPos > y && xPos < x){
          if(flip){
            this.flipOne(xPos, yPos);
          }
          numFlipped++;
          xPos++;
          yPos--;
        }
      }
      return numFlipped;
    }

    this.downRightFlips = function(x,y,color,flip){
      var numFlipped = 0;
      var xPos = x+1;
      var yPos = y+1;
      while((xPos < 8 && yPos < 8) && this.board[yPos][xPos] != color && this.board[yPos][xPos] != ''){
        xPos++;
        yPos++;
      }
      if(yPos != 8 && xPos != 8 && this.board[yPos][xPos] == color){
        xPos -= 1;
        yPos -= 1;
        while(yPos > y && xPos > x){
          if(flip){
            this.flipOne(xPos, yPos);
          }
          numFlipped++;
          xPos--;
          yPos--;
        }
      }
      return numFlipped;
    }
    
    //construction.
    this.nextCol = 0;
    this.nextRow = 0;
    this.board = b; //input board representation.
    this.whitePlayed = false;
    this.lastPlay = {x:0, y:0};
    
    while((this.nextRow < this.board.length) && (this.nextCol < this.board[0].length) && !this.isValidMove(this.nextCol, this.nextRow)){
      if(this.nextCol == 7){
          this.nextCol = 0;
          this.nextRow += 1;
      } else {
          this.nextCol += 1;
      }
    }
}