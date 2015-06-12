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

##### Required parameters
-   `user` : normally the name of the service
-   `configWriter` :  a Python script that will write the necessary service
configurations to file (from which the daemon can pick up the
necessary arguments). 

Although the `configWriter` also uses 
`logpath` and `logfmt` as command line options, don't pass these
parameters to `init()`. `init()` will instead
construct these options from global configurations and,
in the case of `logpath`, from the `user` parameter. See below for more
details on how the `configWriter` script works.

##### Optional parameters
-   `config` : contains arguments passed to `configWriter`. These arguments
    will be written to file so that the service can read them on
    automatic start at system reboot. See below for further details.
-   `virtualEnv` : configurations for the virtual environment
    in which the service is to be run.

#### Starting and stopping a Python daemon
After your Python daemon has been set up, you can start and stop
it using:

#### `configWriter` script
The `configWriter` script should accept at minimum the command line
arguments `user`, `logpath` and `logfmt`. These arguments, as well
as any arguments passed to `pyDaemon.init()` as `config`, will be
passed to the `configWriter` as command line options. For example:

    var params = {
      user: 'myservice',
      configWriter: '/home/myuser/workspace/myservice/lib/configure.py',
      config: {
        dbconn: 'mongodb://localhost:27017/'
      }
    }
    pyDaemon.init(params);

#### `virtualEnv` parameter
Recognized configurations are:
-   `reqFile` (required) : fully qualified path to the `requirements.txt` file
    for the virtual environment.
-   `dependencies` (optional) : An array of all packages that need to be
    installed globally using `apt-get`.

For example:

    var params = {
      user: 'myservice',
      configWriter: '/home/myuser/workspace/myservice/lib/configure.py',
      virtualEnv: {
        reqFile: path.join(__dirname, 'requirements.txt'),
        dependencies: ['python-dev',
          'freetype*',
          'cython',
          'python-scipy'
        ]
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
