---
title: Compatibility
description: Backward compatibility between Octopus Server and related components
position: 130
---

The table below outlines the backward compatibility between Octopus Server and related components

| Octopus Server    | Octopus.Client Octo.exe | Calamari         | Tentacle      | TeamCity Plugin  |
| --------------    | ----------------------- | ------------     | ------------  | ---------------  |
| 3.2               | 3.2                     | 3.0 ➜ latest    | 3.2           |                  |
| 3.3               | 3.3 ➜ latest           | 3.3              | 3.0 ➜ latest | 3.3 ➜ latest    |
| 3.4               | 3.3 ➜ latest           | 3.4              | 3.0 ➜ latest | 3.3 ➜ latest    |
| 3.5 ➜ 2018.2     | 3.3 ➜ latest           | 3.5 ➜ latest    | 3.0 ➜ latest | 3.3 ➜ latest    |
| 2018.2 ➜ 2018.12 | 4.30.7 ➜ latest        | 3.5 ➜ latest    | 3.0 ➜ latest | 3.3 ➜ latest    |
| 2019.1 ➜ latest  | 5.0.0 ➜ latest         | 4.12.1 ➜ latest | 4.0 ➜ latest | coming soon      |

> Note: older versions of some libraries and plugins _can_ work with 2019.1 and higher _only if_ the [default space](https://g.octopushq.com/default-space) is enabled and such integrations are only used against that space. To make use of other spaces, please upgrade.
> Forwards compatible versions are: 
> - Octopus client: 4.30.7 ➜ 4.47.0
> - Calamari: 3.5 ➜ 4.12.0
> - Tentacle: 3.0 ➜ 3.25 
> - TeamCity Plugin: 3.3 ➜ latest