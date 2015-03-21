var readline = require('readline');
var reader = readline.createInterface(
  process.stdin,
  process.stdout
);

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("Type a number: ", function(input) {
      var num = parseInt(input);
      sum += num;
      console.log("Current Sum: " + sum);
      addNumbers(sum, numsLeft -= 1, completionCallback);
    });
  } else {
    completionCallback(sum);
    reader.close();
  }
}

addNumbers(0, 3, function(sum) {
  console.log("Total Sum: " + sum);
});
