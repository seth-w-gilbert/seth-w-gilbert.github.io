//logic for choosing the best move.
//Alpha beta pruning to speed things up.

function minimax(levels){
  this.maxlevels = levels;

  //return: (x,y), flip-state, ...
  //inputs: fliip state that we need to find the next move for.
  this.generateNextMove = function(currentProblem) {
    var bestBoard = null;

    var startLevel = 0;
    var bestWeight = -99999; //large negative number.
    var child;
    while(currentProblem.hasMoreChildren()) {
      child = currentProblem.nextChild();
      var weight = this.recursiveMinimax(child, startLevel+1);

      if(weight > bestWeight){
        bestBoard = child;
        bestWeight = weight;
      }
    }

    return bestBoard;
  }

  //TODO alpha beta.
  this.recursiveMinimax = function(currentProblem, level) {
    //base case
    if(level == this.maxlevels || currentProblem.isComputerWinner() || currentProblem.isUserWinner() || currentProblem.isDraw()){
      return currentProblem.staticEvaluation();

    //recursive case
    } else {
      var maximizing = (level % 2 == 0);
      var bestWeight;
      if(maximizing){
        bestWeight = -99999;
      } else {
        bestWeight = 99999;
      }

      while(currentProblem.hasMoreChildren()) {
        var child = currentProblem.nextChild();
        var weight = this.recursiveMinimax();

        if(maximizing){
          if(weight > bestWeight){
            bestWeight = weight;
          }
        } else {
          if(weight < bestWeight){
            bestWeight = weight;
          }
        }
      }

      return bestWeight;
    }
  }
}

//main
//TODO testing.
