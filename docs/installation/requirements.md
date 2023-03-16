---
title: Installation requirements
description: Software and hardware requirements for installing the Octopus Server.
position: 1
---

If you are hosting your Octopus Server yourself, these are the minimum requirements.

## Operating system

Octopus Server can be hosted on either:
- A Microsoft Windows operating system
- In a [Linux](docs/installation/octopus-server-linux-container/index.md) container.

However, once your Octopus Server is up and running, you can deploy to Windows servers, Linux servers, Microsoft Azure, AWS, GCP, Cloud Regions, or even an offline package drop.

### Windows Server

Octopus Server can be hosted on **Windows Server 2012 R2 or higher**. We automatically test Octopus Server on the following versions of Windows Server:

- Windows Server 2012 R2
- Windows Server 2016
- Windows Server 2019
- Windows Server 2022

Octopus Server will run on [Windows Server (Core)](https://docs.microsoft.com/en-us/windows-server/administration/server-core/what-is-server-core) without the Desktop experience. However, the easiest installation path is to use "Server with Desktop Experience" which has a GUI and supports running our installation wizard. If you want to use Windows Server Core, you will need to add some missing Windows Features and configure the Octopus Server yourself.

Learn about [automating installation](/docs/installation/automating-installation.md).

### Windows desktop

Octopus Server will run on client/desktop versions of Windows, such as Windows 7 and Windows 10. This can be an easy way to trial Octopus Server; however, we do not support Octopus Server for production workloads unless it is hosted on a server operating system.

### Octopus Server in Container

From **Octopus 2020.6**, we publish `linux/amd64` Docker images for each Octopus Server release and they are available on [DockerHub](https://hub.docker.com/r/octopusdeploy/).

Requirements for the [Octopus Server Linux Container](/docs/installation/octopus-server-linux-container/index.md) will depend on how you intend to run it. There are some different options to run the Octopus Server Linux Container, which include:

- [Octopus Server Container with Docker Compose](/docs/installation/octopus-server-linux-container/docker-compose-linux.md)
- [Octopus Server Container with systemd](/docs/installation/octopus-server-linux-container/systemd-service-definition.md)
- [Octopus Server Container in Kubernetes](/docs/installation/octopus-server-linux-container/octopus-in-kubernetes.md)

You can also run the Octopus Server Linux Container using a platform such as [AWS ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html).

!include <sql>

### Hypervisors

Windows Server can be installed on a bare-metal machine or on a virtual machine (VM) hosted by any popular type-1 hypervisor or virtual private server (cloud) technology.  Type-2 hypervisors can work for demos and POCs, but because they are typically installed on desktop operating systems, aren't recommended.  

:::hint
Octopus Deploy works the exact same on both bare-metal machines or VMs.  All it sees is it is running on Windows Server.  Of our customers who self-host Octopus Deploy, the vast majority of them use VMs.
:::

The list of hypervisors and virtual private servers include (but not limited to):

- Type-1 Hypervisors
    - [VMWare ESXi](https://www.vmware.com/products/esxi-and-esx.html)
    - [KVM](http://www.linux-kvm.org/page/Main_Page)
    - [XEN](https://xenproject.org/)
    - [Hyper-V on Windows Server](https://docs.microsoft.com/en-us/windows-server/virtualization/hyper-v/hyper-v-on-windows-server)
    - [RHEV](https://www.redhat.com/en/technologies/virtualization/enterprise-virtualization)
- Virtual Private Server (cloud)
    - AWS
    - Azure
    - GCP
    - Oracle
- Type-2 Hypervisors
    - [VMWare Workstation](https://www.vmware.com/products/workstation-pro.html)
    - [VMWare Fusion](https://www.vmware.com/products/fusion.html)
    - [VirtualBox](https://www.virtualbox.org/)
    - [Hyper-V on Windows 10](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/)
    - [Parallels](https://www.parallels.com/)

Most, if not all, of those tools include documentation or pre-built images for Windows Server 2012 R2, 2016 and 2019.  Please refer to their documentation on how to install and configure a Windows Server VM.  

## .NET {#dotnet-requirements}

Octopus Server is a .NET application distributed as a [self-contained deployment](https://docs.microsoft.com/en-us/dotnet/core/deploying/#publish-self-contained) that has all the components required to run, including the .NET runtime. Older versions of Octopus Server require the .NET Framework:

- **Octopus 3.4** to **Octopus 2018.4** requires [.NET Framework 4.5.1](https://www.microsoft.com/en-au/download/details.aspx?id=40773) or newer.
- **Octopus 2018.5** and later requires [.NET Framework 4.5.2](https://www.microsoft.com/en-au/download/details.aspx?id=42642) or newer and [WMF/PowerShell 5.0](https://www.microsoft.com/en-us/download/details.aspx?id=50395) or newer.
- **Octopus 2019.7** and later requires [.NET Framework 4.7.2](https://go.microsoft.com/fwlink/?LinkID=863265) or newer.
- **Octopus 2020.1** and later is a fully self-contained distribution bundling the .NET runtime - no .NET Framework or additional runtime is required.

## Windows PowerShell

- **Windows PowerShell 2.0.** This is automatically installed on 2008 R2.
- **Windows PowerShell 3.0 or 4.0** are recommended, both of which are compatible with PowerShell 2.0, but execute against .NET 4.0+.
- **Windows PowerShell 5.1** is required to run Azure steps.

## Supported browsers {#supported-browsers}

The Octopus Server includes the Octopus Web Portal user interface and we try to keep this as stable as possible:

- **Octopus 3.0** to **Octopus 3.17** supports all our default browsers and Internet Explorer 9+.
- **Octopus 4.0** and later supports all our default browsers, and Internet Explorer 11+ (available on Windows 7 and newer, and Windows Server 2008R2 SP1 and newer).
- **Octopus 2020.1** and later only supports our default browsers - Internet Explorer 11 is no longer supported.

Our default supported browsers are:

- Edge
- Chrome
- Firefox
- Safari

## Hardware requirements

!include <minimum-requirements>

## Learn more

- [Installation](/docs/installation/index.md)
- [Compatibility](/docs/support/compatibility.md)
