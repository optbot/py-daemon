py-daemon
===
Manage Python daemon processes.

Usage
---
### Basic
1.  Install: None
2.  Run: None
3.  Require:

        var pyDaemon = require('@optbot/py-daemon');
       
### Details
#### Setting up a Python daemon
To set up a Python daemon, you should first set up a generic
daemon with:

    var daemonSetup = require('@optbot/daemon-setup');
    ...
    daemonSetup.init(params);

For the Python-specific part of the setup, you can then use
the `init()` function provided in this package:

    var pyDaemon = require('@optbot/py-daemon');
    ...
    pyDaemon.init(params);

Required parameters are `user` (normally the name of the service) and
`configWriter`, a Python script that will write the necessary service
configurations to file (from which the daemon can pick up the
necessary arguments). Although the `configWriter` also uses 
`logpath` and `logfmt` as command line options, don't pass these
parameters to `init()`, as they will be ignored. `init()` will instead
construct these options from global configurations and,
in the case of `logpath`, from the `user` parameter. See below for more
details on how the `configWriter` script works.

#### Starting and stopping a Python daemon
After your Python daemon has been set up, you can start and stop
it using:

#### `configWriter` script
The `configWriter` script should accept at minimum the command line
arguments `user`, `logpath` and `logfmt`. These arguments, as well
as any arguments passed to `pyDaemon.init()` as `extras`, will be
passed to the `configWriter` as command line options. For example:

    var params = {
      user: 'myservice',
      configWriter: '/home/myuser/workspace/myservice/lib/configure.py',
      extras: {
        dbconn: 'mongodb://localhost:27017/'
      }
    }
    pyDaemon.init(params);

Testing
---
### Functionality
    $ npm test

### Code conformity
    $ jshint lib test
    $ jscs .

Connects to
---
No connections
