
var expect    = require("chai").expect,
    Profiler  = require("../index.js"),
    profiler  = new Profiler();

describe("profiler", function(){

  var x = Array(1000).map(function(e, index){
    return index;
  }),
  y, z, result;

  profiler.start("starting");
  y = x.map(function(e){
    return e*2;
  });
  profiler.lap("multiplying array by 2");
  z= x.filter(function(e){
    return (e%2)===0;
  });
  profiler.lap("filtering even numbers");
  profiler.end("done");

  it("should return a profile string", function(){

    result = profiler.getTimingAsString();
    expect(result).to.be.a("string");
    expect(result).to.have.length.above(0);

  });

  it("should return an array of objects with information about timming", function(){

    result = profiler.getTiming();
    expect(result).to.be.an("array");
    expect(result).to.have.length(4);
    result.forEach(function(e){
      expect(e).to.be.an("object");
      expect(e).to.have.keys("task", "tStart", "tPrevious");
    });

  });


});