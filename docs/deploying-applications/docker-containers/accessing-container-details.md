---
title: Accessing Container Details
position: 1
---

When creating a container or network via one of the new Docker steps, you may wish to use details of the resulting resource in a subsequent step. All information about the networking configuration, volumes, environment variable and hardware resource allocation can be obtained for the container via the `docker inspect` command and similar information for the network via the `docker network inspect` command.

To allow access to this information Octopus invokes this command right after creating a container (or network) which results in a large detailed JSON array (since you can request multiple container details from a single invocation) that will look something like the examples below. This output is then returned back to the server and processed as an [Output Variable](/docs/deploying-applications/variables/output-variables.md) with the format `#{Octopus.Action[<action name>].Output.Docker.Inspect}`.

:::warning
**Inspection timing and relevance**
Keep in mind when using the results of Octopus Deploy's automatic inspection that this is **invoked just after the resource is created**. This means that

1. If your container immediately exits then some information such as the IP address used may be out of date
2. If your container state changes *after* this point in time, such as a new network or volume is attached, then the information may be out of date.
:::

:::success
**Advanced JSON parsing in variables**
With the [changes to Octostache introduced in Octopus Deploy 3.5](https://octofront.com/content/blog/octostache-json-formatting), a variable that is a JSON object can now be [parsed natively](/docs/reference/variable-substitution-syntax.md) and sub properties within the document can now be used for general variable substitution. This makes accessing information about your container from subsequent steps trivial.
:::

## Common examples {#AccessingContainerDetails-Commonexamples}

### Creating a network then adding a container {#AccessingContainerDetails-Creatinganetworkthenaddingacontainer}

A typical project may involve one step that first creates a network, and then creates a container that is attached to that network. Assuming that your subsequent Docker Run step needs to be connected to that network, you would select the network type *Custom Network* and then for the network name use the name of the network generated from the previous step that is now stored in its inspection output variable

```powershell
#{Octopus.Action[Create Network Step Name].Output.Docker.Inspect.Name}
```

![](/docs/images/5671068/5865817.png "width=500")

### Obtain Container IP address inside custom network {#AccessingContainerDetails-ObtainContainerIPaddressinsidecustomnetwork}

Once a container has started and is attached to a network, an IP address will be assigned to it. Since the container may vet attached to more than one network, the network details are stored in the JSON as an object indexed by the network name. When trying to get the IP address assigned to a container which has been added to a custom network, there are two steps to the variable substitution. First we need the network name, then we need to inspect the container and find the network information that corresponds to that network name.

```powershell
#{Octopus.Action[Create Container Step Name].Output.Docker.Inspect.NetworkSettings.Networks[#{Octopus.Action[Create Network Step Name].Output.Docker.Inspect.Name}].IPAddress}
```

while this variable might look complex, you should be able to see the two aforementioned steps involved. The network name inside the `Networks` index is first resolved, and then the network information is extracted from the container inspection variable.

:::hint
**Output variable in project variables**
You may find that you want to access variables from the inspection output several times and find it a bit cumbersome to keep typing out their full value. To simply things, you might find it helpful to create a project variable with the value of the output variable.

For instance, in the examples outlined above, the network name was needed several times. In this case It might be useful to create and use a project variable with the value (taking into consideration things like scoping)

```powershell
#{Octopus.Action[Create Network Step Name].Output.Docker.Inspect.Name}
```
:::

## Sample inspection output {#AccessingContainerDetails-Sampleinspectionoutputcommandexample}

The following JSON objects are real outputs from docker inspect commands to provide some indication of what to expect in the output variable.

**docker inspect <container>**  

```js
[
    {
        "Id": "dd6c3f3f533dcd0df76e4b729aca3565bc2b0f1c1bfb09143a5445a138af9179",
        "Created": "2016-09-01T05:52:00.527623518Z",
        "Path": "/entrypoint.sh",
        "Args": [
            "/etc/docker/registry/config.yml"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 22205,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2016-09-02T01:35:33.763071223Z",
            "FinishedAt": "2016-09-02T01:34:50.852301712Z"
        },
        "Image": "sha256:c6c14b3960bdf9f5c50b672ff566f3dabd3e450b54ae5496f326898513362c98",
        "ResolvConfPath": "/var/lib/docker/containers/dd6c3f3f533dcd0df76e4b729aca3565bc2b0f1c1bfb09143a5445a138af9179/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/dd6c3f3f533dcd0df76e4b729aca3565bc2b0f1c1bfb09143a5445a138af9179/hostname",
        "HostsPath": "/var/lib/docker/containers/dd6c3f3f533dcd0df76e4b729aca3565bc2b0f1c1bfb09143a5445a138af9179/hosts",
        "LogPath": "/var/lib/docker/containers/dd6c3f3f533dcd0df76e4b729aca3565bc2b0f1c1bfb09143a5445a138af9179/dd6c3f3f533dcd0df76e4b729aca3565bc2b0f1c1bfb09143a5445a138af9179-json.log",
        "Name": "/registry",
        "RestartCount": 0,
        "Driver": "aufs",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "default",
            "PortBindings": {
                "5000/tcp": [
                    {
                        "HostIp": "",
                        "HostPort": "5000"
                    }
                ]
            },
            "RestartPolicy": {
                "Name": "always",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "CapAdd": null,
            "CapDrop": null,
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "ConsoleSize": [
                0,
                0
            ],
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": null,
            "BlkioDeviceReadBps": null,
            "BlkioDeviceWriteBps": null,
            "BlkioDeviceReadIOps": null,
            "BlkioDeviceWriteIOps": null,
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DiskQuota": 0,
            "KernelMemory": 0,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": -1,
            "OomKillDisable": false,
            "PidsLimit": 0,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0
        },
        "GraphDriver": {
            "Name": "aufs",
            "Data": null
        },
        "Mounts": [
            {
                "Name": "7e288d82bca0014180c342545e28426e93cb2268c4391f7c167fe365ace71b0d",
                "Source": "/var/lib/docker/volumes/7e288d82bca0014180c342545e28426e93cb2268c4391f7c167fe365ace71b0d/_data",
                "Destination": "/var/lib/registry",
                "Driver": "local",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            }
        ],
        "Config": {
            "Hostname": "666c3f3f533d",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "ExposedPorts": {
                "5000/tcp": {}
            },
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/etc/docker/registry/config.yml"
            ],
            "Image": "registry:2",
            "Volumes": {
                "/var/lib/registry": {}
            },
            "WorkingDir": "",
            "Entrypoint": [
                "/entrypoint.sh"
            ],
            "OnBuild": null,
            "Labels": {}
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "c4d515974a7447100a988b428681f319d6bed307b9d41878c65f01c350ed65f9",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {
                "5000/tcp": [
                    {
                        "HostIp": "0.0.0.0",
                        "HostPort": "5000"
                    }
                ]
            },
            "SandboxKey": "/var/run/docker/netns/c4d515974a74",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "511fc829515ff45908b03fec69bcdc0ff929a717534ec0807de5aa56f291037c",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.2",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "02:42:ac:09:00:02",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "NetworkID": "94986a009f24f0eca0281a61a42f109a31591641efe03c04dacf8584bf379ca8",
                    "EndpointID": "505fc8295d5ff45908b03fec69bcdc0ff929a717534ec0807de5aa56f291037c",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:11:00:02"
                }
            }
        }
    }
]

```

**docker network inspect <network>**

```js
[
    {
        "Name": "LXRR3",
        "Id": "dd00393535a8198857aa43851d022a2cccca2810c5f406f515678eca64d19cdf",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.21.0.0/16",
                    "Gateway": "172.21.0.1/16"
                }
            ]
        },
        "Internal": false,
        "Containers": {},
        "Options": {},
        "Labels": {
            "Octopus.Action.Id": "482e6219-d7b0-4e38-afed-bba97e6a8c62",
            "Octopus.Deployment.Id": "Deployments-2842",
            "Octopus.Environment.Id": "Environments-1",
            "Octopus.Project.Id": "Projects-61",
            "Octopus.Release.Number": "0.0.47"
        }
    }
]
```
