(function() {
  'use strict';
  exports.exec = function(params) {
    var opts = ['--user', params['user'], '--python', params['python'],
        '--service', params['service'], '--action', params['action']].join(' ');

    opts = (params['test'] ? opts + ' --test' : opts);
    console.log(opts);
  };
})();
