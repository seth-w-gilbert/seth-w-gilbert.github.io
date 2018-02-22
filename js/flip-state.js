function FlipState(b){
    
    this.nextCol = 0;
    this.nextRow = 0;
    this.board = b; //input board representation.
    this.isWhiteTurn;
    
    this.createCopy = function(oldState){
        copy = new FlipState();
        copy.nextCol = oldState.nextCol;
        copy.nextRow = oldState.nextRow;
        copy.isWhiteTurn = oldState.isWhiteTurn;
        
        //for each row in the board.
        oldState.forEach((a, i) => {
            copy.board[i] = a.slice();
        });
        
        console.log(copy.board);
        return copy;
    }
    
    this.hasMoreChildren = function(){
        return (this.nextCol < this.board[0].length) && (this.nextRow < this.board.length);
    }
    
    this.nextChild = function(){
        //copy myself
        var child = this.createCopy(this);
        
        //modify the child's board
        //place a piece at the next spot if possible
        //TODO
        
        
        //set myself up to produce more children.
        //edges should be handled by hasMoreChildren.
        if(this.nextCol == 7){
            this.nextCol = 0;
        } else {
            this.nextCol++;
        }
        child.nextRow = 0;
        child.nextCol = 0;
        child.isWhiteTurn = !this.isWhiteTurn;
        
        return child;
    }
    
    //TODO what is this supposed to do?
    //feasible as a place to move if -
    //  there isn't already a piece there and 
    //  you can make at least 1 flip.
    this.isFeasible = function(){
        var feasible = false;
        
        //find the position I just filled in.
        var row;
        var col;
        if(this.nextCol == 0){
            //TODO
        }
    }
    
    //TODO this doesn't make much sense in this case. Look at tic tac toe example.
    this.isSolved = function(){
    }
}