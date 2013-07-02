;(function(exports) {
  var http = require('http');
  var fs = require('fs');

  var DAY = "day";
  var NIGHT = "night";

  http.createServer(function (req, res) {
    if (req.url === "/") {
      fs.readFile('index.html', 'utf8', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    } else if (req.url === "/client.js") {
      fs.readFile('client.js', 'utf8', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(data);
      });
    } else if (req.url === "/canvas-renderer.js") {
      fs.readFile('canvas-renderer.js', 'utf8', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(data);
      });
    } else if (req.url === "/time.json") {
      res.writeHead(200, { 'Content-Type': 'application/json' });

      var hour = new Date().getHours();
      var time = hour > 6 && hour < 20 ? DAY : NIGHT;

      res.end('{ "time": "' + time + '" }');
    }
  }).listen(4000, 'localhost');
})(this);
