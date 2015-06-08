(function() {
  'use strict';
  var path = require('path');
  var shell = require('shelljs');

  exports.exec = function(params) {
    var cmd = path.join(__dirname, 'daemon.sh');
    var opts = ['--user', params['user'], '--python', params['python'],
        '--service', params['service'], '--action', params['action']].join(' ');

    opts = (params['test'] ? opts + ' --test' : opts);
    console.log(opts);
    shell.exec(cmd + ' ' + opts);
  };
})();
