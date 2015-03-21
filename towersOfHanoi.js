var readline = require('readline');
var reader = readline.createInterface(process.stdin, process.stdout);

function HanoiGame() {
  this.stacks = [[3,2,1], [], []];
}

HanoiGame.prototype.isWon = function() {
  return (this.stacks[2].length === 3) ? true : false;
};

HanoiGame.prototype.isValidMove = function(startTowerIdx, endTowerIdx) {
  var startTower = this.stacks[startTowerIdx];
  var endTower = this.stacks[endTowerIdx];
  if ( startTower.length === 0) {
    console.log("Invalid Move: Stack empty");
    return false;
  } else if(startTower[startTower.length - 1] > endTower[endTower.length - 1]) {
    console.log("Invalid Move: Can't put larger disc on smaller");
    return false;
  } else if (!!startTower && !!endTower){
      return true;
  } else {
    console.log("Invalid Move: Invalid tower");
    return false;
  }
};

HanoiGame.prototype.move = function(startTowerIdx, endTowerIdx) {
  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
    this.stacks[endTowerIdx].push(this.stacks[startTowerIdx].pop());
  }
};

HanoiGame.prototype.print = function() {
  console.log(JSON.stringify(this.stacks));
};

HanoiGame.prototype.promptMove = function(cb) {
  this.print();
  reader.question('What stack would you like to move from?', function (from) {
    reader.question('What stack would you like to move to?', function (to) {
      cb(from, to);
    });
  });
};

HanoiGame.prototype.run = function(completionCallback) {
  var that = this;
  this.promptMove(function (x,y) {
    that.move(x,y);
    completionCallback(that.isWon());
  });
};

var h = new HanoiGame();

h.run(function cmp(won) {
  if(won) {
    console.log("You win");
    reader.close();
  } else {
    h.run(cmp.bind(cmp));
  }
});
