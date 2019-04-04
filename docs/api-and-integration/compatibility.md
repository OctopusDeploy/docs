---
title: Compatibility
description: Backward compatibility between Octopus Server and related components
position: 130
---

The table below outlines the backward compatibility between Octopus Server and related components

| Octopus Server    | Octopus.Client Octo.exe | Calamari         | Tentacle      | TeamCity Plugin  |
| --------------    | ----------------------- | ------------     | ------------  | ---------------  |
| 3.2               | 3.2                     | 3.0 ➜ latest    | 3.2           |                  |
| 3.3               | 3.3 ➜ 4.30.3           | 3.3              | 3.0 ➜ latest | 3.3 ➜ latest    |
| 3.4               | 3.3 ➜ 4.30.3           | 3.4              | 3.0 ➜ latest | 3.3 ➜ latest    |
| 3.5 ➜ 2018.2     | 3.3 ➜ 4.30.3           | 3.5 ➜ latest    | 3.0 ➜ latest | 3.3 ➜ latest    |
| 2018.2 ➜ 2018.12 | 4.30.7 ➜ 4.47.0        | 3.5 ➜ latest    | 3.0 ➜ latest | 3.3 ➜ latest    |
| 2019.1*           | 5.0.0 ➜ 5.2.7          | 3.5 ➜ latest    | 4.0 ➜ latest | 5.0 ➜ latest    |
| 2019.2* ➜ latest | 6.0.0 ➜ latest         | 3.5 ➜ latest    | 4.0 ➜ latest | 5.0 ➜ latest    |

## &ast; Partial forwards compatibility

Older versions of some libraries and plugins _may_ work with **2019.1** and higher _only if_ the [default space](https://g.octopushq.com/default-space) is enabled and such integrations are only used against that space. To make use of other spaces, please upgrade.

However, **2019.1** also carries some breaking changes to the API so care must be taken when upgrading from a prior version that existing integrations are not effected. There is a comprehensive rundown of these changes available in our [downloads section](https://octopus.com/downloads/compare?from=2018.12.1&to=2019.1.0).

The table below outlines partially forwards compatible scenarios between Octopus Server and related components

| Octopus Server    | Octopus.Client Octo.exe | Calamari     | Tentacle    | TeamCity Plugin |
| --------------    | ----------------------- | --------     | --------    | --------------- |
| 2019.1  ➜ latest | 4.30.7 ➜ 4.47.0        | 3.5 ➜ 4.12.0 | 3.0 ➜ 3.25 | 3.3 ➜ latest   |
