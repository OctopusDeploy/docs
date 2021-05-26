## Rootless Instance Creation {#rootless-instance-creation}

Creating a named instance with the `--instance` parameter as shown in the examples above will register the instance details in a central registry to allow it to be easily managed via its unique name. Access to this central registry on the target machine is under `C:\ProgramData\Octopus` on Windows and `/etc/octopus` on other Platforms. For some high-security low-trust environments, access to these locations may not be possible, so Octopus supports creating Tentacle instances that isolate all their configuration in a single directory.

Omitting the `--instance` and `--configuration` parameters from the [create-instance](/docs/octopus-rest-api/tentacle.exe-command-line/create-instance.md) command will create the `Tentacle.config` configuration file in the current working directory of the executing process. As such, it will not require any elevated permissions to create. However, relevant OS permissions may still be necessary depending on the ports used. To manage this instance, all ensuing commands are required to be run either with the executable being invoked from the context of the initial configuration directory or with the `--config` parameter pointing to the configuration file that was created in that directory.

For example, running the following commands:
```bash
mkdir ~/mytentacle && cd ~/mytentacle
tentacle create-instance
```

will create a Tentacle configuration file in `~/mytentacle` without needing access to the shared registry (typically stored on Linux at `/etc/octopus`).
Subsequent commands to this instance can be performed by running the command directly from that location:

```bash
cd ~/mytentacle
tentacle configure --trust F9EFD9D31A04767AD73869F89408F587E12CB23C
```

### Service Limitations {#service-limitations}

Due to the non-uniquely-named nature of these instances, only one such instance type can be registered as a service at any given time. An optional mechanism for running this instance is to use the [agent](/docs/octopus-rest-api/tentacle.exe-command-line/agent.md) command to start and run the Tentacle process inline. The [delete-instance](/docs/octopus-rest-api/tentacle.exe-command-line/delete-instance.md) command will also have no effect, its purpose being largely to remove the instance details from the registry and preserving the configuration on disk.