function Clock(time) {
  this.time = null;
  this.hours = time.getHours();
  this.minutes = time.getMinutes();
  this.seconds = time.getSeconds();
}

Clock.TICK = 5000;

Clock.prototype.printTime = function() {
  console.log([this.hours, this.minutes, this.seconds].join(':'));
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
  this.seconds += tick;
  if (this.seconds >= 60) {
    this.seconds %= 60;
    this.minutes += 1;
  }
  if (this.minutes >= 60) {
    this.minutes = 0;
    this.hours += 1;
  }
  if (this.hours >= 24) {
    this.hours = 0;
  }
};

var c = new Clock(new Date());
c.run();
