// Capture this (which is the function to bind) in a variable named fn.
// Define and return an anonymous function.
// The anonymous function captures fn and context.
// In the anonymous function, call Function#apply on fn, passing the context.
// Assume the method you're binding doesn't take any arguments;
// we'll see tomorrow how to use the special arguments variable to fix this.

Function.prototype.myBind = function(context) {
  var fn = this;
  return function () {
    return fn.apply(context);
  };
};

function times(num, fun) {
  for (var i = 0; i < num; i++) {
    fun(); // call is made "function-style"
  }
}

var cat = {
  age: 5,
  ageOneYear: function () {
    console.log(this.age += 1);
  }
};

times(10, cat.ageOneYear.myBind(cat));
