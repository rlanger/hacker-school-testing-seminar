;(function() {
  var tester = require('./tester').tester;
  var client = require('../client');
  var canvasRenderer = require('../canvas-renderer').canvasRenderer;

  // parsing time
  tester.test({
    'should parse time from server': function(done) {
      client.get = function(_, callback) {
        callback({ target: { responseText: '{ "time": "day" }' }});
      };

      client.getTime(function(time) {
        tester.isEqual(time, "day");
        done();
      });
    }
  });

  // canvas
  tester.test({
    'should draw rect where asked when fillBackground() called': function() {
      var ctx = {
        fillRect: tester.mock(0, 0, 300, 150),
        canvas: { width: 300, height: 150 }
      };
      canvasRenderer.fillBackground(ctx, "#aaa");
      tester.isEqual(ctx.fillStyle, "#aaa");
    },

    'should draw circile where asked when fillCircle() called': function() {
      var ctx = {
        beginPath: function() {},
        closePath: function() {},
        fill: function() {},
        arc: tester.mock(150, 75, 30, 0, Math.PI * 2),
      };
      canvasRenderer.fillCircle(ctx, 150, 75, 30, "#bbb");
      tester.isEqual(ctx.fillStyle, "#bbb");
    }
  });

  // correct drawing for time
  tester.test({
    beforeEach: function() {
      global.document = {
        getElementById: function() { return { getContext: function() {}}}
      };

      global.canvasRenderer = {
        center: function() {
          return { x: 150, y: 75 };
        }
      };
    },

    'should draw circle in the centre of sky when day': function() {
      global.canvasRenderer.fillBackground = function() { };
      global.canvasRenderer.fillCircle = tester.mock(tester.SKIP, 150, 75, 30, tester.SKIP);
      client.displayTime("day");
    },

    'should draw circle in the centre of sky when night': function() {
      global.canvasRenderer.fillBackground = function() { };
      global.canvasRenderer.fillCircle = tester.mock(tester.SKIP, 150, 75, 30, tester.SKIP);
      client.displayTime("night");
    },

    'should draw sun and blue sky when it is daytime': function() {
      global.canvasRenderer.fillBackground = tester.mock(tester.SKIP, "#00f");
      global.canvasRenderer.fillCircle = tester.mock(tester.SKIP, tester.SKIP,
                                                     tester.SKIP, tester.SKIP, "#ff0");
      client.displayTime("day");
    },

    'should draw sun and blue sky when it is nighttime': function() {
      global.canvasRenderer.fillBackground = tester.mock(tester.SKIP, "#000");
      global.canvasRenderer.fillCircle = tester.mock(tester.SKIP, tester.SKIP,
                                                     tester.SKIP, tester.SKIP, "#aaa");
      client.displayTime("night");
    }
  });
})(this);
