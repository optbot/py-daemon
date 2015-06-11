(function() {
  'use strict';
  var path = require('path');
  var shell = require('shelljs');

  exports.exec = function(params) {
    var cmd = path.join(__dirname, 'daemon.sh');
    var user = params.user;
    var service = path.join('/usr/local/lib/quichean', user, params.service);
    var opts = ['--user', user, '--python', params.python,
        '--service', service, '--action', params.action].join(' ');

    opts = (params.test ? opts + ' --test' : opts);
    console.log(opts);
    shell.exec(cmd + ' ' + opts);
  };

  exports.init = function(params) {
    var nconf = require('nconf');
    var pytools = require('@optbot/pytools');
    var configWriter = params['configWriter'];
    var user = params.user;
    var writerDir = path.dirname(configWriter);
    var writerFile = path.basename(configWriter);
    var silentState = shell.config.silent;
    var logpath = path.join(process.env.npm_config_quichean_logging_path, user);
    var extras = params.extras;
    var optsArr;
    var logfmt;
    var opts;
    var configWriteCommand;

    pytools.configure();
    nconf.file(path.join(process.env.npm_config_quichean_nconf_path,
          'pytools', 'config.json'));
    logfmt = nconf.get('logfmt');
    optsArr = ['--user', user, '--logpath', logpath, '--logfmt', '"' + logfmt + '"'];
    Object.keys(extras).forEach(function(key) {
      optsArr.push('--' + key);
      optsArr.push('"' + extras[key] + '"');
    });
    opts = optsArr.join(' ');
    configWriteCommand = ['python', writerFile, opts].join(' ');
    /**
     * The Python interpreter needs to start from the proper directory
     * so that imports work as expected
     */
    shell.config.silent = true;
    shell.pushd(writerDir);
    shell.exec(configWriteCommand, {silent: false});
    shell.popd();
    shell.config.silent = silentState;
  };
})();
