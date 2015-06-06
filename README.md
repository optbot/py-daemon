py-daemon
===
Manage Python daemon processes.

Usage
---
### Basic
1.  Install: None
2.  Run: None
3.  Require: In the setup script for a service that will run as a Python
    daemon, include the following lines:

        var pyDaemon = require('@optbot/py-daemon');
        var service = pyDaemon.service({
          user: 'myservice',
          service: 'myservice.py',
          python: '/var/local/.virtualenvs/myservice/bin/python'
        });
       
### Details
#### Required configuration parameters
-   `user`: normally just the name of the service. The daemon
    will be owned by the specified user.
-   `service`: Argument to be passed to `python`. This should
    be the fully qualified path of the python command to be executed.
-   `python`: Fully qualified path to the Python interpreter. Using
    the interpreter inside a virtual environment picks up the 
    packages included in that virutal environment. If no virtual
    environment is needed, `/usr/bin/python` could also be specified.

#### Optional configuration parameters

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
