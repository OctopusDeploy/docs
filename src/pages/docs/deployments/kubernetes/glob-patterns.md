---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Glob Pattern Cheat Sheet  
description: Learn more about glob patterns usages.
navOrder: 90
---


Patterns are always relative so start them with a file or folder name. eg: `my/folder/*.yml` and `**/dep.yml`.

:::div{.warning}
Directory separators should be forward slashes `/` for all platforms. Backslashes `\` only work when the server and worker are running on Windows.
:::

:::div{.hint}
Glob patterns cannot contain folders stemming from a root directory. eg: `/` and `C:\`

Glob patterns cannot start with a relative path indicator. eg: `./` and `.\`

The directory traversal path `../` is not supported.
:::

`?` matches any single character in a file or directory name:
```
deployments/resource-?.yaml => deployments/resource-1.yaml, deployments/resource-g.yaml
```

`*` matches zero or more characters in a file or directory name:
```
deployments/*.yaml => deployments/anything-here.yaml, deployments/123-another-file.yaml
*/resource.yaml => deployments/resource.yaml, services/resource.yaml
```

`**` matches zero or more recursive directories:
```
**/resource.yaml => deployments/resource.yaml, services/resource.yaml, deployments/child-folder/resource.yaml
```