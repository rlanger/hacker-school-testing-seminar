;(function(exports) {
  exports.loadTime = function() {
    var req = new XMLHttpRequest();
    req.onload = function(event) {
      var ctx = document.getElementById("canvas").getContext('2d');
      var responseJSON = JSON.parse(event.target.responseText);
      var time = responseJSON.time;

      if (time === "day") {
        ctx.fillStyle = "#00f";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.fillStyle = "#ff0";
        ctx.beginPath();
        ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, 30, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      } else if (time === "night") {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.fillStyle = "#aaa";
        ctx.beginPath();
        ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, 30, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    };

    req.open("GET", "/time.json", true);
    req.send();
  };
})(this);
