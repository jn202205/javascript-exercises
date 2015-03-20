
function Clock(time) {
  this.time = time;
  this.hours = time.getHours();
  this.minutes = time.getMinutes();
  this.seconds = time.getSeconds();
}

Clock.TICK = 5000;

Clock.prototype.printTime = function() {
  console.log(this.hours + ":" + this.minutes + ":" + this.seconds);
};

Clock.prototype.run = function () {
  this.time = new Date();
  this.printTime();
  var that = this;
  setInterval(function () {
    that._tick(Clock.TICK);
  }, Clock.TICK);
};

Clock.prototype._tick = function (clockTick) {
  var tick = clockTick / 1000;
  var seconds = this.seconds + tick;
  console.log(tick);
  if (seconds >= 60) {
    this.minutes += 1;
    this.seconds = 0 + (seconds - 60);
  } else {
    this.seconds += tick;
  }
  if (this.minutes >= 60) {
    this.hours += 1;
    this.minutes = 0;
  }
  if (this.hours >= 24) {
    this.hours = 0;
  }
  this.printTime();
};

// var c = new Clock(new Date());
// c.run();
var readline = require('readline');
var reader = readline.createInterface(process.stdin, process.stdout, null);

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

// addNumbers(0, 3, function(sum) {
//   console.log("Total Sum: " + sum);
// });


function askIfGreaterThan (el1, el2, callback) {
  // Prompt user to tell us whether el1 > el2; pass true back to the
  // callback if true; else false.
  reader.question("Is " + el1 + " > " + el2 + "? (yes, no)", function(input){
    (input === "yes") ? callback(true) : callback(false);
  });
}

function innerBubbleSortLoop (arr, i, madeAnySwaps, outerBubbleSortLoop) {
  // Do an "async loop":
  // 1. If (i == arr.length - 1), call outerBubbleSortLoop, letting it
  //    know whether any swap was made.
  // 2. Else, use `askIfGreaterThan` to compare `arr[i]` and `arr[i +
  //    1]`. Swap if necessary. Call `innerBubbleSortLoop` again to
  //    continue the inner loop. You'll want to increment i for the
  //    next call, and possibly switch madeAnySwaps if you did swap.

  if ( i < arr.length - 1) {
    askIfGreaterThan(arr[i], arr[i + 1], function (isGreaterThan) {
      if (isGreaterThan) {
        var el = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = el;
        madeAnySwaps = true;
        innerBubbleSortLoop (arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
      } else {
        madeAnySwaps = false;
        innerBubbleSortLoop (arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
      }
    });
  } else {
    outerBubbleSortLoop (madeAnySwaps);
  }
}

function absurdBubbleSort (arr, sortCompletionCallback) {
  function outerBubbleSortLoop (madeAnySwaps) {
    // Begin an inner loop if `madeAnySwaps` is true, else call
    // `sortCompletionCallback`.
    if(madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, madeAnySwaps, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }

  // Kick the first outer loop off, starting `madeAnySwaps` as true.
  outerBubbleSortLoop(true);
}

absurdBubbleSort([3,2,1], function (arr) {
  console.log("Sorted array: " + arr);
  reader.close();
});
