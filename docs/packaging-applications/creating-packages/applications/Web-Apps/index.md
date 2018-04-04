---
title: Packaging Web Apps
description: Packaging Web Apps for deployment with Octopus Deploy.
hideInThisSection: false
position: 3
---

[WIP]

## Packaging Web Apps

Your application should be packaged into a [supported package format](/docs/packaging-applications/index.md) where the contents of the package will be synchronized with the Azure Web App via Web Deploy. Your package should include any content and binaries for your Web Site and any Web Jobs using the same folder structure that is expected by the Azure Web App hosting environment.

**Example Azure Web App package content**

```powershell
\\MyWebApp.1.0.0.0.nupkg
    \---bin
        \---MyWebApp.dll
    \---Global.asax
    \---index.html    
    \---web.config
```