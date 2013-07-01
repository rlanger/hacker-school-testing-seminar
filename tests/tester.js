;(function(exports) {
  var isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  var isNumbersEqual = function(a, b) {
    return a === b;
  };

  var gatherTests = function(testArray) {
    return Array.prototype.slice.call(testArray).reduce(function(acc, x, i) {
      i % 2 === 0 ? acc.push({ description:x }) : acc[acc.length-1].fn = x;
      return acc;
    }, []);
  };

  exports.tester = {
    test: function(tests) {
      var tests = gatherTests(arguments);
      for (var i = 0; i < tests.length; i++) {
        try {
          tests[i].fn();
          process.stdout.write(".");
        } catch (e) {
          console.log(tests[i].description);
          console.log(e.stack);
        }
      }
      console.log();
    },

    isEqual: function(a, b) {
      if (isNumber(a) && isNumber(b)) {
        if (isNumbersEqual(a, b) === false) {
          throw new Error(a + " and " + b + " are not equal");
        }
      }
    }
  };
})(this);
