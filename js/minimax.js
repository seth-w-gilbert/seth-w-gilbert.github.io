//logic for choosing the best move.
//Alpha beta pruning to speed things up.

function Minimax(levels){
  this.maxlevels = levels;

  //return: (x,y), flip-state, ...
  //inputs: FlipState
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
  //inputs: flipstate, current level.
  this.recursiveMinimax = function(currentProblem, level) {
    //base case
    if((level == this.maxlevels) || currentProblem.isComputerWinner() || currentProblem.isUserWinner() || currentProblem.isDraw()){
      return currentProblem.staticEvaluation();

    //recursive case
    } else {
      var maximizing = (level % 2 == 0);
      var bestWeight;
      var cpCopy = currentProblem.createCopy(currentProblem); //make a copy so it doesn't use up the actual children.
      if(maximizing){
        bestWeight = -99999;
      } else {
        bestWeight = 99999;
      }

      while(cpCopy.hasMoreChildren()) {
        var child = cpCopy.nextChild();
        var weight = this.recursiveMinimax(child, level+1);

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
/*var board =[['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','w','b','','',''],
            ['','','','b','w','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','','']];

var minimax = new Minimax(3);
var startState = new FlipState(board);

var currentState = startState;
for(var i = 0; i < 10; i++){
  currentState = minimax.generateNextMove(currentState);
  console.log(currentState.board);
}
*/