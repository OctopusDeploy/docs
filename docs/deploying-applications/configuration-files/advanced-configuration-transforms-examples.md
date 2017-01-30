---
title: Advanced Configuration Transforms Examples
---

Configuration transforms can sometimes be complicated to setup. As a general rule, its best to have both configuration file and transform file in the same directory, however, this is not always achievable.

This page lists the supported scenarios and the transform definitions required to apply the transform.

## Supported scenarios {#AdvancedConfigurationTransformsExamples-Supportedscenarios}

<table class="table table-bordered">
    <tr>
        <th colspan="2" rowspan="2"><br><br><br><br></th>
        <th colspan="6" style="text-align: center;">Target</th>
    </tr>
    <tr>
        <th>Absolute Path</th>
        <th>Relative Path</th>
        <th>Filename</th>
        <th>
            <p>Wildcard Prefixed</p>
            <p style="text-align: center;">Absolute Path</p>
        </th>
        <th>
            <p style="text-align: center;"><span>Wildcard Prefixed</span></p>
            <p style="text-align: center;"><span>Relative Path</span></p>
        </th>
        <th>
            <p style="text-align: center;"><span>Wildcard Prefixed</span></p>
            <p style="text-align: center;"><span>Filename</span></p>
        </th>
    </tr>
    <tr>
        <th rowspan="6">
            <p><span><br></span></p>
            <p><span><br></span></p>
            <p><span><br></span></p>
            <p><span>Transform</span><br><br><br><br><br></p>
        </th>
        <th>Absolute Path</th>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;">
        example below
        </td>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;">
        example below
        </td>
        <td style="text-align: center;">
        example below
        </td>
    </tr>
    <tr>
        <th>Relative Path</th>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;">
        example below
        </td>
        <td style="text-align: center;">
        example below
        </td>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;">
        example below
        </td>
        <td style="text-align: center;">
        example below
        </td>
    </tr>
    <tr>
        <th>Filename</th>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;">
        example below
        </td>
        <td style="text-align: center;">
        example below
        </td>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;">
        example below
        </td>
        <td style="text-align: center;">
        example below
        </td>
    </tr>
    <tr>
        <th>Wildcard Absolute Path</th>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;">
        example below
        </td>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;">
        example below
        </td>
        <td style="text-align: center;">
        example below
        </td>
    </tr>
    <tr>
        <th>Wildcard Relative Path</th>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;">
        example below
        </td>
        <td style="text-align: center;">
        example below
        </td>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;">
        example below
        </td>
        <td style="text-align: center;">
        example below
        </td>
    </tr>
    <tr>
        <th>Wildcard Filename</th>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;">
        example below
        </td>
        <td style="text-align: center;">
        example below
        </td>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;">
        example below
        </td>
        <td style="text-align: center;">
        example below
        </td>
    </tr>
</table>

:::hint
**Wildcard support**
Please note that wildcards can be used anywhere in the transform filename (eg `*.mytransform.config` or `web.*.config`), but can only be used at the start of the target filename (eg `*.mytransform.config`, but **not** `web.*.config`)
:::

:::hint
**Enable detailed transform diagnostics logging**
To enable detailed logging of the process that searches for config transformations, add the variable `Octopus.Action.Package.EnableDiagnosticsConfigTransformationLogging`and set its value to `True.`
:::

## Transform and target are in the same directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-TransformandtargetareinthesamedirectoryTransformandtargetareinthesamedirectory}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─web.config
└─web.mytransform.config
```

Then the transform **web.mytransform.config => web.config** will:

- Apply the transform **web.mytransform.config** to file **web.config**

## Applying a transform against a target in a different folder {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-ApplyingatransformagainstatargetinadifferentfolderApplyingatransformagainstatargetinadifferentfolder}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─config
| └─web.config
└─web.mytransform.config
```

Then the transform **web.mytransform.config => config\web.config** will:

- Apply the transform **web.mytransform.config** to file **config\web.config**

## Transform and multiple targets are in the same directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-TransformandmultipletargetsareinthesamedirectoryTransformandmultipletargetsareinthesamedirectory}

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

## Applying a transform against multiple targets in a different directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-ApplyingatransformagainstmultipletargetsinadifferentdirectoryApplyingatransformagainstmultipletargetsinadifferentdirectory}

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

## Using an absolute path to the transform {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-UsinganabsolutepathtothetransformUsinganabsolutepathtothetransform}

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

## Applying a transform with an absolute path against multiple files in a different directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-ApplyingatransformwithanabsolutepathagainstmultiplefilesinadifferentdirectoryApplyingatransformwithanabsolutepathagainstmultiplefilesinadifferentdirectory}

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

## Using an absolute path to the transform, and applying it against multiple files {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Usinganabsolutepathtothetransform,andapplyingitagainstmultiplefilesUsinganabsolutepathtothetransform,andapplyingitagainstmultiplefiles}

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

## Applying a transform from a different directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-ApplyingatransformfromadifferentdirectoryApplyingatransformfromadifferentdirectory}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─transforms
| └─web.mytransform.config
└─web.config
```

Then the transform **transforms\web.mytransform.config => web.config** will:

- Apply the transform **transforms\web.mytransform.config** to file **web.config**

## Applying a transform to a target in a sibling directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-ApplyingatransformtoatargetinasiblingdirectoryApplyingatransformtoatargetinasiblingdirectory}

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

## Applying a transform from a different directory against multiple files {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-ApplyingatransformfromadifferentdirectoryagainstmultiplefilesApplyingatransformfromadifferentdirectoryagainstmultiplefiles}

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

## Applying a transform to multiple targets in a sibling directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-ApplyingatransformtomultipletargetsinasiblingdirectoryApplyingatransformtomultipletargetsinasiblingdirectory}

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

## Applying multiple transforms to a single target where both are in the same directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-ApplyingmultipletransformstoasingletargetwherebothareinthesamedirectoryApplyingmultipletransformstoasingletargetwherebothareinthesamedirectory}

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

## Wildcard transform with wildcard in the middle of the filename to a single target where both are in the same directory {#AdvancedConfigurationTransformsExamples-Wildcardtransformwithwildcardinthemiddleofthefilenametoasingletargetwherebothareinthesamedirectory}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─MyApp.connstrings.octopus.config
├─MyApp.nlog_octopus.config
└─MyApp.WinSvc.exe.config
```

Then the transform **MyApp.\*.octopus.config => MyApp.WinSvc.exe.config** will:

- Apply the transform **MyApp.connstrings.octopus.config** to file **MyApp.WinSvc.exe.config**

## Applying multiple transforms to a single target in a different directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-ApplyingmultipletransformstoasingletargetinadifferentdirectoryApplyingmultipletransformstoasingletargetinadifferentdirectory}

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

## Applying multiple transforms against multiple targets {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-ApplyingmultipletransformsagainstmultipletargetsApplyingmultipletransformsagainstmultipletargets}

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

## Applying multiple transforms against multiple targets in a different directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-ApplyingmultipletransformsagainstmultipletargetsinadifferentdirectoryApplyingmultipletransformsagainstmultipletargetsinadifferentdirectory}

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

## Applying multiple absolute path transforms to the same target file {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-ApplyingmultipleabsolutepathtransformstothesametargetfileApplyingmultipleabsolutepathtransformstothesametargetfile}

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

## Using an absolute path wildcard transform and multiple targets {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-UsinganabsolutepathwildcardtransformandmultipletargetsUsinganabsolutepathwildcardtransformandmultipletargets}

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

## Using an absolute path for multiple transforms against multiple relative files {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-UsinganabsolutepathformultipletransformsagainstmultiplerelativefilesUsinganabsolutepathformultipletransformsagainstmultiplerelativefiles}

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

## Applying multiple relative transforms against a specific target {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-ApplyingamultiplerelativetransformsagainstaspecifictargetApplyingmultiplerelativetransformsagainstaspecifictarget}

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

## Applying multiple transforms in a different directory to a single target in a different directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-ApplyingmultipletransformsinadifferentdirectorytoasingletargetinadifferentdirectoryApplyingmultipletransformsinadifferentdirectorytoasingletargetinadifferentdirectory}

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

## Applying transforms from a different directory to multiple targets {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-ApplyingtransformsfromadifferentdirectorytomultipletargetsApplyingtransformsfromadifferentdirectorytomultipletargets}

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

## Applying transforms from a different directory to targets in a different directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-ApplyingtransformsfromadifferentdirectorytotargetsinadifferentdirectoryApplyingtransformsfromadifferentdirectorytotargetsinadifferentdirectory}

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
