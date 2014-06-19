theprofiler
===========

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
var profiler = require("theprofiler");
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
