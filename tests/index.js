
var expect    = require("chai").expect,
    Profiler  = require("../index.js"),
    profiler  = new Profiler();

describe("profiler", function(){
  it("should return a profile string", function(){

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

    result = profiler.getTimingAsString();
    expect(result).to.be.a("string");
    expect(result).to.have.length.above(0);

  });
});