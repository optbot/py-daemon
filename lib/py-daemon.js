(function() {
  'use strict';
  var path = require('path');
  var shell = require('shelljs');

  exports.exec = function(params) {
    var cmd = path.join(__dirname, 'daemon.sh');
    var user = params['user'];
    var service = path.join('/usr/local/lib/quichean', user, params['service']);
    var opts = ['--user', user, '--python', params['python'],
        '--service', service, '--action', params['action']].join(' ');

    opts = (params['test'] ? opts + ' --test' : opts);
    console.log(opts);
    shell.exec(cmd + ' ' + opts);
  };
})();
