;(function() {
  var tester = require('./tester').tester;
  var client = require('../client');

  tester.test(
    'should draw sun and blue sky in canvas when it is daytime', function() {
      global.XMLHttpRequest = function() {
        this.open = function() {};

        this.send = function() {
          this.onload({
            target: { responseText: '{ "time": "day" }' }
          });
        };
      };

      global.document = {
        getElementById: function() {
          return {
            getContext: function() {
              return {
                beginPath: function() {},
                closePath: function() {},
                fill: function() {},
                canvas: {
                  width: 300,
                  height: 150
                },

                fillRect: function(x, y, w, h) {
                  tester.isEqual(x, 0);
                  tester.isEqual(y, 0);
                  tester.isEqual(w, 300);
                  tester.isEqual(h, 150);
                  tester.isEqual(this.fillStyle, "#ff0");
                },

                arc: function(x, y, radius, start, stop) {
                  tester.isEqual(x, 150);
                  tester.isEqual(y, 75);
                  tester.isEqual(radius, 30);
                  tester.isEqual(start, 0);
                  tester.isEqual(stop, Math.PI * 2);
                }
              };
            }
          };
        }
      };

      client.loadTime();
    }
  );

})(this);
