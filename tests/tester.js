;(function(exports) {
  var isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  var isString = function(str) {
    return typeof str === 'string';
  };

  var isNumbersEqual = function(a, b) {
    return a === b;
  };

  var passed = function() {
    process.stdout.write(".");
  };

  var failed = function(test, exception) {
    console.log(test.description);
    console.log(exception.stack);
  };

  var testSync = function(test) {
    test();
    passed();
  };

  var testAsync = function(test) {
    var timeout = setTimeout(function() {
      try {
        throw new Error("Failed: done() never called in async test.");
      } catch (e) {
        failed(test, e);
      }
    }, 500);

    test(function() {
      clearTimeout(timeout);
      passed();
    });
  };

  exports.tester = {
    test: function(tests) {
      var beforeEach = tests.beforeEach;
      delete tests.beforeEach;
      for (var i in tests) {
        if (beforeEach !== undefined) {
          beforeEach();
        }
        try {
          tests[i].length === 1 ? testAsync(tests[i]) : testSync(tests[i]);
        } catch (e) {
          failed(tests[i], e);
        }
      }
      console.log()
    },

    isEqual: function(a, b) {
      if (isNumber(a) && isNumber(b)) {
        if (isNumbersEqual(a, b) === false) {
          throw new Error(a + " and " + b + " are not equal");
        }
      } else if (isString(a) && isString(b)) {
        if (a !== b) {
          throw new Error(a + " and " + b + " are not equal");
        }
      }
    },

    mock: function() {
      var expectedArgs = Array.prototype.slice.call(arguments);
      var self = this;
      return function() {
        var actualArgs = Array.prototype.slice.call(arguments);
        if (expectedArgs.length !== actualArgs.length) {
          throw new Error("Wrong number of args to mocked function");
        }

        for (var i = 0; i < expectedArgs.length; i++) {
          if (expectedArgs[i] !== self.SKIP) {
            self.isEqual(expectedArgs[i], actualArgs[i]);
          }
        }
      };
    },

    SKIP: 'o89eu9o8ehu9o8ehu98hoeu98hoeu98hoeu98hoe98uho.98hu9,.'
  };
})(this);
