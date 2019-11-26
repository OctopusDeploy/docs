---
title: Tentacles
description: Octopus Deploy communicates with Tentacles installed on Windows and Linux servers to deploy your software.
---

When you use Octopus Deploy to deploy software to Windows or Linux servers, the Octopus Deploy server communicates with Tentacles installed on those servers. The Tentacles perform the tasks necessary to deploy the software.

Windows Tentacles are a lightweight agent service and Linux Tentacles are a .NET Core application.

The Octopus server and Tentacles communicate in either **Listening** or **Polling** mode.

In **Listening** mode, Tentacles listen for instructions from the Octopus server. When the Octopus server has a task for a Tentacle, it connects to the Tentacle.

In **Polling** mode, Tentacles periodically poll the Octopus server to check for any tasks that need to be performed.

## See also

- Learn more about the advantages of each mode: [Tentacle Communication Modes](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md).
- Install and configure [Windows Tentacles](/docs/infrastructure/deployment-targets/windows-targets/index.md).
- Install and configure [Linux Tentacles](/docs/infrastructure/deployment-targets/linux/tentacle/index.md).
- [Tentacle.exe Command-line Tool](docs/octopus-rest-api/tentacle.exe-command-line/index.md).
