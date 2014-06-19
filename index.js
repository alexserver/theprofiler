/*
# profiler
A simple module for tracking execution time.

## Options
```
{ 
  format: "secs|milisecs"
}
```

## Usage
To keep track of some tasks:

```
var Profiler = require("theprofiler"),
    profiler = new Profiler();
//start timing:
profiler.start("starting");
//calling functions and saving laps
callSomethingBusy()
profiler.lap("something busy");
anotherSomethingBusy()
profiler.lap("another very busy")
somePromise().then(function(){
  profiler.lap("something asynchronous");
});
profiler.end("taraaa");
```

## TODO
next step, make it works with promises.

*/

var util = require("util");

var profiler = function(options){
  "use strict";

  this.timing = [];
  this.history = null;

  this.options = options || {};

  if (!this.options.hasOwnProperty("format")) {
    this.options.format = "msecs";
  }

};

profiler.prototype.start = function(task, category){
  if (typeof category === "undefined") {
    category = "main";
  }
  timing = [];
  timing.push({
    task: task,
    time: Date.now()
  });
};
profiler.prototype.end = function(task, category){
  if (typeof category === "undefined") {
    category = "main";
  }
  timing.push({
    task: task,
    time: Date.now()
  });
  history = timing;
  //timing = [];
};
profiler.prototype.lap = function(task, category){
  if (typeof category === "undefined") {
    category = "main";
  }
  timing.push({
    task: task,
    time: Date.now()
  });
};
profiler.prototype.getTiming = function(){
  var t0 = timing[0].time;
  return timing.map(function(e, index, a){
    return {
      task: e.task,
      tStart: e.time - t0,
      tPrevious: (index>0)? (e.time - a[index-1].time) : 0
    };
  });
};
profiler.prototype.getTimingAsString = function(){
  var stream = "",
      self = this;
  this.getTiming().forEach(function(e){
    switch (self.options.format) {
      case "secs":
        stream += util.format("TASK: %s, From start: %dsecs, From previous: %dmsecs \n" , 
          e.task, 
          (e.tStart/1000), 
          (e.tPrevious/1000) 
        );
        break;
      case "msecs":
        stream += util.format("TASK: %s, From start: %dmsecs, From previous: %dmsecs \n" , 
          e.task, 
          e.tStart, 
          e.tPrevious
        );
        break;
    }
  });
  return stream;
};
profiler.prototype.print = function(){
  console.log(this.getTimingAsString());
};

module.exports = profiler;
