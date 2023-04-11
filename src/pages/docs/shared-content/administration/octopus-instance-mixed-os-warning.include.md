:::warning
Due to how Octopus stores the paths to various BLOB data (task logs, artifacts, packages, imports etc.), you cannot run a mix of both Windows Servers, and Octopus Linux containers connected to the same Octopus Deploy instance.  A single instance should only be hosted using one method.
:::