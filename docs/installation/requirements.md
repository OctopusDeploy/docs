---
title: Installation requirements
description: Software and hardware requirements for installing the Octopus Server.
position: 1
---

If you are hosting your Octopus Server yourself, these are the minimum requirements.

## Operating system

The Octopus Server is hosted on a Microsoft Windows operating system, however, once your Octopus Server is up and running, you can deploy to Windows servers, Linux servers, Microsoft Azure, AWS, Cloud Regions, or even an offline package drop.

### Windows Server

Octopus Server can be hosted on any modern Windows Server. We automatically test the Octopus Server on the following versions of Windows Server:

- Windows Server 2012 R2
- Windows Server 2016
- Windows Server 2019

Octopus Server will run on the newer versions of Windows Server without GUIs, however, the easiest installation path is to use "Windows Server with a GUI" and run our installation wizard. If you want to use one of the new GUI-less servers, you will need to add some missing Windows Features and configure the Octopus Server yourself.

Learn about [automating installation](/docs/installation/automating-installation.md).

### Windows desktop

Octopus Server will run on client/desktop versions of Windows, such as Windows 7 and Windows 10. This can be an easy way to trial Octopus Server; however, we do not support Octopus Server for production workloads unless it is hosted on a server operating system.

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

## .NET Framework

We try to keep the .NET Framework requirements for Octopus Server as stable as possible:

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

- **Octopus 3.0** to **Octopus 3.17** supports all modern browsers and Internet Explorer 9+.
- **Octopus 4.0** and later supports all modern browsers, and Internet Explorer 11+ (available on Windows 7 and newer, and Windows Server 2008R2 SP1 and newer).
- **Octopus 2020.1** and later only supports modern browsers - Internet Explorer 11 is no longer supported.

## Hardware requirements

!include <minimum-requirements>

## Learn more

- [Installation](/docs/installation/index.md)
- [Compatibility](/docs/support/compatibility.md)
