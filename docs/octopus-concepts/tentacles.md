---
title: Tentacles
description: Octopus Deploy communicates with Tentacles installed on Windows and Linux servers to deploy your software.
---

When you use Octopus Deploy to deploy software to Windows or Linux servers, the Octopus Deploy Server communicates with Tentacles installed on those servers. The Tentacles perform the tasks necessary to deploy the software.

Windows Tentacles are a lightweight agent service and Linux Tentacles are a .NET Core application.

The Octopus Server and Tentacles communicate in either **Listening** or **Polling** mode.

In **Listening** mode, Tentacles listen for instructions from the Octopus Server. When the Octopus Server has a task for a Tentacle, it connects to the Tentacle.

In **Polling** mode, Tentacles periodically poll the Octopus Server to check for any tasks that need to be performed.

Learn more about [Windows Tentacles](/docs/infrastructure/deployment-targets/windows-targets/index.md) and [Linux Tentacles](/docs/infrastructure/deployment-targets/linux/tentacle/index.md).

## Learn more

- Learn more about the advantages of each mode: [Tentacle Communication Modes](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md)
- [Tentacle.exe Command-line Tool](docs/octopus-rest-api/tentacle.exe-command-line/index.md)
