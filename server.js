var search = require("bing.search")
var util = require("util");
var express = require("express");
var app = express();

search = new search ('N1/LXN1kBcmLyxUaZogoEI92FVy7TCQKfrWU9k8EZEA');

function parse(result){
    var obj = {};
    obj.url = result.url;
    obj.title = result.title;
    return obj;
}

app.get("/", function(req, res, next){
    res.end("Hello");
})

var searchTerms = [];

app.get("/search/*", function(req, res, next){
    var url = req.url.toString();
    var term = url.substring(8, url.indexOf("?"));
    var offset = url.substring(url.indexOf("?") + 8)
    searchTerms.push(term);
    
    search.images(term,  {top: offset},  function(err, results) {
      if (err) throw err;
      
      var fullResults = util.inspect(results, 
      {colors: true, depth: null});
      
      var finalArray = [];
      
      results.forEach(function(element){
          finalArray.push(parse(element));
      });
      
      res.end(JSON.stringify(finalArray, null, 2));
      
    });
    
    
    
})  

app.get("/latest/", function(req, res){
    res.end(JSON.stringify(searchTerms, null, 2))
})


app.listen(8080, function(){
    console.log("working")
})
