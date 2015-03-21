var Board = require("./board.js");
var readline = require('readline');
var reader = readline.createInterface(process.stdin, process.stdout);

function Game(reader) {
  this.reader = reader;
  this.board = new Board();
  this.token = 'O';
}


Game.prototype.run = function(completionCB) {
  var that = this;
  this.token = (this.token === 'X') ? 'O' : 'X';
  var token = this.token;
  this.promptMove(function (move, token) {
    console.log("run token:" + token);
    that.board.addMove(move, token);
    completionCB(that.over());
  }, token);
};

Game.prototype.promptMove = function(cb, playerToken) {
  this.board.print();
  reader.question("Where would you like to move?", function(move) {
    var parseMove = [parseInt(move[0]), parseInt(move[move.length - 1])];
    console.log("promptMove token:" + playerToken);
    cb(parseMove, playerToken);
  });
};

Game.prototype.over = function() {
  if (this.board.won()) {
    console.log(this.board.won() + "wins");
    reader.close();
  } else if (this.board.tied()) {
    console.log(this.board.tied());
    reader.close();
  } else {
    return false;
  }
};

module.exports = Game;
