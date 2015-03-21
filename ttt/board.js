function Board() {
  this.grid = [['_','_','_'],['_','_','_'],['_','_','_']];
  this.winner = null;
}

Board.prototype.print = function () {
  console.log(this.grid[0]);
  console.log(this.grid[1]);
  console.log(this.grid[2]);
};

// Board.prototype.over = function() {
//   return (this.won() || this.tied());
// };

Board.prototype.tied = function() {
  var tied = false;
  for(var i = 0; i < 3; i++) {
    tied = this.grid[i].every(function(el) {
      el !== '_';
    });
  }
  return tied ? "You tied" : false;
};

Board.prototype.won = function() {
  if (this.checkForWinner(this.grid, 'X')) {
       return this.winner = 'X';
  } else if (this.checkForWinner(this.columns, 'X')) {
      return this.winner = 'X';
  } else if (this.checkForWinner(this.diagonals, 'X')) {
      return this.winner = 'X';
  } else if (this.checkForWinner(this.grid, 'O')) {
      return this.winner = 'O';
  } else if (this.checkForWinner(this.columns, 'O')) {
      return this.winner = 'O';
  } else if (this.checkForWinner(this.diagonals, 'O')){
      return this.winner = 'O';
  } else {
    return false;
  }
};

Board.prototype.checkForWinner = function(arr, token){
  var won = false;
  for (var i = 0; i < arr.length; i++) {
    won = arr[i].every(function(el) {
      el === token;
    });
    if (won) {
      return true;
    }
  }
  return false;
};

Board.prototype.diagonals = function() {
  var diagOne = [this.grid[0][0], this.grid[1][1], this.grid[2][2]];
  var diagTwo = [this.grid[2][0], this.grid[1][1], this.grid[0][2]];
  return [diagOne, diagTwo];
};

Board.prototype.columns = function() {
  var columns = [];
  for(var i = 0; i < 3; i++) {
    columns[i] = [];
    for(var j = 0; j < 3; j++) {
      columns[j][i] = this.grid[i][j];
    }
  }
  return columns;
};

Board.prototype.addMove = function(move, token) {
  console.log("token in addToken: " + token);
  if (this.validMove(move)) {
    this.grid[move[0]][move[1]] = token;
  }
};

Board.prototype.validMove = function(move) {
  if (!this.grid[move[0]][move[1]]) {
    console.log("Invalid Move: Out of bounds");
  } else if (this.grid[move[0]][move[1]] !== '_') {
    console.log("Invalid Move: occupied");
  } else {
    return true;
  }
};

module.exports = Board;
