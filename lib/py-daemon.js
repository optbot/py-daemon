(function() {
  'use strict';
  exports.exec = function(params) {
    Object.keys(params).forEach(function(key, i, arr) {
      console.log(key + ': ' + params[key]);
    });
  };
})();
