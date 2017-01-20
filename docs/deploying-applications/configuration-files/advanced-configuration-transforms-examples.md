---
title: Advanced Configuration Transforms Examples

---


Configuration transforms can sometimes be complicated to setup. As a general rule, its best to have both configuration file and transform file in the same directory, however, this is not always achievable.


This page lists the supported scenarios and the transform definitions required to apply the transform.

### Supported scenarios

| 



 | Target |
| --- | --- |
| Absolute Path | Relative Path | Filename | 

Wildcard Prefixed


Absolute Path
 | 

Wildcard Prefixed


Relative Path
 | 

Wildcard Prefixed


Filename
 |
| --- | --- | --- | --- | --- | --- |
| 










Transform
 | Absolute Path | *not supported* | *not supported* | [example](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) | *not supported* | [example](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) | [example](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Relative Path | *not supported* | [example](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) | [example](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) | *not supported* | [example](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) | [example](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) |
| --- | --- | --- | --- | --- | --- | --- |
| Filename | *not supported* | [example](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) | [example](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) | *not supported* | [example](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) | [example](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) |
| --- | --- | --- | --- | --- | --- | --- |
| Wildcard Absolute Path | *not supported* | *not supported* | [example](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) | *not supported* | [example](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) | [example](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) |
| --- | --- | --- | --- | --- | --- | --- |
| Wildcard Relative Path | *not supported* | [example](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) | [example](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) | *not supported* | [example](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) | [example](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) |
| --- | --- | --- | --- | --- | --- | --- |
| Wildcard Filename | *not supported* | [example](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) | [examples](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) | *not supported* | [example](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) | [example](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md) |
| --- | --- | --- | --- | --- | --- | --- |

:::hint
**Wildcard support**
Please note that wildcards can be used anywhere in the transform filename (eg `*.mytransform.config` or `web.*.config`), but can only be used at the start of the target filename (eg `*.mytransform.config`, but **not** `web.*.config`)
:::

:::hint
**Enable detailed transform diagnostics logging**
To enable detailed logging of the process that searches for config transformations, add the variable `Octopus.Action.Package.EnableDiagnosticsConfigTransformationLogging`and set its value to `True.`
:::

### 
Transform and target are in the same directory


Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─web.config
└─web.mytransform.config
```


Then the transform **web.mytransform.config => web.config** will:


- Apply the transform **web.mytransform.config** to file **web.config**

### Applying a transform against a target in a different folder


Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─config
| └─web.config
└─web.mytransform.config
```


Then the transform **web.mytransform.config => config\web.config** will:


- Apply the transform **web.mytransform.config** to file **config\web.config**

### Transform and multiple targets are in the same directory


Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─app.config
├─connstrings.mytransform.config
└─web.config
```


Then the transform **connstrings.mytransform.config => \*.config** will:


- Apply the transform **connstrings.mytransform.config** to file **web.config**


- Apply the transform **connstrings.mytransform.config** to file **app.config**

### Applying a transform against multiple targets in a different directory


Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─config
| ├─app.config
| └─web.config
└─connstrings.mytransform.config
```


Then the transform **connstrings.mytransform.config => config\\*.config** will:


- Apply the transform **connstrings.mytransform.config** to file **config\web.config**


- Apply the transform **connstrings.mytransform.config** to file **config\app.config**

### Using an absolute path to the transform


Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
└─web.config
```


And the following files exist:

```powershell
c:\
└─transforms
  └─web.mytransform.config
```


Then the transform **c:\transforms\web.mytransform.config** => **web.config** will:


- Apply the transform **c:\transforms\web.mytransform.config** to file **web.config**

### Applying a transform with an absolute path against multiple files in a different directory


Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
└─config
  ├─app.config
  └─web.config
```


And the following files exist:

```powershell
c:\
└─transforms
  └─connstrings.mytransform.config
```


Then the transform **c:\transforms\connstrings.mytransform.config => config\\*.config** will:


- Apply the transform **c:\transforms\connstrings.mytransform.config** to file **config\web.config**


- Apply the transform **c:\transforms\connstrings.mytransform.config** to file **config\app.config**

### Using an absolute path to the transform, and applying it against multiple files


Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─app.config
└─web.config
```


And the following files exist:

```powershell
c:\
└─transforms
  └─connstrings.mytransform.config
```


Then the transform **c:\transforms\connstrings.mytransform.config => \*.config** will:


- Apply the transform **c:\transforms\connstrings.mytransform.config** to file **web.config**


- Apply the transform **c:\transforms\connstrings.mytransform.config** to file **app.config**

### Applying a transform from a different directory


Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─transforms
| └─web.mytransform.config
└─web.config
```


Then the transform **transforms\web.mytransform.config => web.config** will:


- Apply the transform **transforms\web.mytransform.config** to file **web.config**

### Applying a transform to a target in a sibling directory


Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─config
| └─web.config
└─transforms
  └─web.mytransform.config
```


Then the transform **transforms\web.mytransform.config => config\web.config** will:


- Apply the transform **transforms\web.mytransform.config** to file **config\web.config**

### Applying a transform from a different directory against multiple files


Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─app.config
├─transforms
| └─connstrings.mytransform.config
└─web.config
```


Then the transform **transforms\connstrings.mytransform.config => \*.config** will:


- Apply the transform **transforms\connstrings.mytransform.config** to file **web.config**


- Apply the transform **transforms\connstrings.mytransform.config** to file **app.config**

### Applying a transform to multiple targets in a sibling directory


Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─config
| ├─app.config
| └─web.config
└─transforms
  └─connstrings.mytransform.config
```


Then the transform **transforms\connstrings.mytransform.config => config\\*.config** will:


- Apply the transform **transforms\connstrings.mytransform.config** to file **config\web.config**


- Apply the transform **transforms\connstrings.mytransform.config** to file **config\app.config**

### Applying multiple transforms to a single target where both are in the same directory


Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─connstrings.mytransform.config
├─security.mytransform.config
└─web.config
```


Then the transform **\*.mytransform.config => web.config** will:


- Apply the transform **security.mytransform.config** to file **web.config**


- Apply the transform **connstrings.mytransform.config** to file **web.config**

### Wildcard transform with wildcard in the middle of the filename to a single target where both are in the same directory


Given a package which has the structure:




```powershell
Acme.Core.1.0.0.nupkg
├─MyApp.connstrings.octopus.config
├─MyApp.nlog_octopus.config
└─MyApp.WinSvc.exe.config
```





Then the transform **MyApp.\*.octopus.config => MyApp.WinSvc.exe.config** will:


- Apply the transform **MyApp.connstrings.octopus.config** to file **MyApp.WinSvc.exe.config**




### Applying multiple transforms to a single target in a different directory


Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─config
| └─web.config
├─connstrings.mytransform.config
└─security.mytransform.config
```


Then the transform **\*.mytransform.config => config\web.config** will:


- Apply the transform **security.mytransform.config** to file **config\web.config**


- Apply the transform **connstrings.mytransform.config** to file **config\web.config**

### Applying multiple transforms against multiple targets


Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─app.config
├─app.mytransform.config
├─web.config
└─web.mytransform.config
```


Then the transform **\*.mytransform.config => \*.config** will:


- Apply the transform **web.mytransform.config** to file **web.config**


- Apply the transform **app.mytransform.config** to file **app.config**

### Applying multiple transforms against multiple targets in a different directory


Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─app.mytransform.config
├─config
| ├─App.config
| └─web.config
└─web.mytransform.config

```


Then the transform **\*.mytransform.config => config\\*.config** will:


- Apply the transform **web.mytransform.config** to file **config\web.config**


- Apply the transform **app.mytransform.config** to file **config\app.config**

### Applying multiple absolute path transforms to the same target file


Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
└─web.config
```


And the following files exist:

```powershell
c:\
└─transforms
  ├─connstrings.mytransform.config
  └─security.mytransform.config
```


Then the transform **c:\transforms\\*.mytransform.config** => **web.config** will:


- Apply the transform **c:\transforms\connstrings.mytransform.config** to file **web.config**


- Apply the transform **c:\transforms\security.mytransform.config** to file **web.config**

### Using an absolute path wildcard transform and multiple targets


Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─web.config
└─web.config
```


And the following files exist:

```powershell
c:\
└─transforms
  ├─app.mytransform.config
  └─web.mytransform.config
```


Then the transform **c:\transforms\\*.mytransform.config => \*.config** will:


- Apply the transform**c:\transforms\web.mytransform.config** to file **web.config**


- Apply the transform **c:\transforms\app.mytransform.config** to file **app.config**

### Using an absolute path for multiple transforms against multiple relative files


Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
└─config
  ├─app.config
  └─web.config
```


And the following files exist:

```powershell
c:\
└─transforms
  ├─app.mytransform.config
  └─web.mytransform.config
```


Then the transform **c:\transforms\\*.mytransform.config** => **config\\*.config** will:


- Apply the transform **c:\transforms\web.mytransform.config** to file **config\web.config**


- Apply the transform **c:\transforms\app.mytransform.config** to file **config\app.config**

### Applying multiple relative transforms against a specific target


Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─transforms
| ├─connstrings.mytransform.config
| └─security.mytransform.config
└─web.config
```


Then the transform **transforms\\*.mytransform.config => web.config** will:


- Apply the transform **transforms\connstrings.mytransform.config** to file **web.config**


- Apply the transform **transforms\security.mytransform.config** to file **web.config**

### Applying multiple transforms in a different directory to a single target in a different directory


Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─config
| └─web.config
└─transforms
  ├─connstrings.mytransform.config
  └─security.mytransform.config
```


Then the transform **transforms\\*.mytransform.config => config\web.config** will:


- Apply the transform **transforms\connstrings.mytransform.config** to file **config\web.config**


- Apply the transform **transforms\security.mytransform.config** to file **config\web.config**

### Applying transforms from a different directory to multiple targets


Given a package which has the structure:


Acme.Core.1.0.0.nupkg

```powershell
├─app.config
├─transforms
| ├─app.mytransform.config
| └─web.mytransform.config
└─web.config
```


Then the transform **transforms\\*.mytransform.config => \*.config** will:


- Apply the transform **transforms\web.mytransform.config** to file **web.config**


- Apply the transform **transforms\app.mytransform.config** to file **app.config**

### Applying transforms from a different directory to targets in a different directory


Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─config
| ├─app.config
| └─web.config
└─transforms
  ├─app.mytransform.config
  └─web.mytransform.config
```


Then the transform **transforms\\*.mytransform.config => config\\*.config** will:


- Apply the transform **transforms\web.mytransform.config** to file **config\web.config**


- Apply the transform **transforms\app.mytransform.config** to file **config\app.config**
