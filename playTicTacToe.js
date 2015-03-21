var TTT = require("./ttt/index");
var g = new TTT.Game();

g.run(function cmp(over) {
    if (over) {
      this.over();
    } else {
      g.run(cmp.bind(cmp));
    }
});
