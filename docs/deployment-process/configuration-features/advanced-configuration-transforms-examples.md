---
title: Advanced Configuration Transforms Examples
description: Configuration transforms examples to help configure advanced scenarios.
position: 75
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
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Usinganabsolutepathtothetransform"> Example </a> </td>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingatransformwithanabsolutepathagainstmultiplefilesinadifferentdirectory"> Example </a> </td>
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Usinganabsolutepathtothetransformandapplyingitagainstmultiplefiles"> Example </a> </td>
    </tr>
    <tr>
        <th>Relative Path</th>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingatransformtoatargetinasiblingdirectory"> Example </a> </td>
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingatransformfromadifferentdirectory"> Example </a> </td>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingatransformtomultipletargetsinasiblingdirectory"> Example </a> </td>
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingatransformfromadifferentdirectoryagainstmultiplefiles"> Example </a> </td>
    </tr>
    <tr>
        <th>Filename</th>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingatransformagainstatargetinadifferentfolder"> Example </a> </td>
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Transformandtargetareinthesamedirectory"> Example </a> </td>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingatransformagainstmultipletargetsinadifferentdirectory"> Example </a> </td>
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Transformandmultipletargetsareinthesamedirectory"> Example </a> </td>
    </tr>
    <tr>
        <th>Wildcard Absolute Path</th>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingmultipleabsolutepathtransformstothesametargetfile"> Example </a> </td>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Usinganabsolutepathformultipletransformsagainstmultiplerelativefiles"> Example </a> </td>
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Usinganabsolutepathwildcardtransformandmultipletargets"> Example </a> </td>
    </tr>
    <tr>
        <th>Wildcard Relative Path</th>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingmultipletransformsinadifferentdirectorytoasingletargetinadifferentdirectory"> Example </a> </td>
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingamultiplerelativetransformsagainstaspecifictarget"> Example </a> </td>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingtransformsfromadifferentdirectorytotargetsinadifferentdirectory"> Example </a> </td>
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingtransformsfromadifferentdirectorytomultipletargets"> Example </a> </td>
    </tr>
    <tr>
        <th>Wildcard Filename</th>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingmultipletransformstoasingletargetinadifferentdirectory"> Example </a> </td>
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingmultipletransformstoasingletargetwherebothareinthesamedirectory"> Example </a> </td>
        <td style="text-align: center;"><em>not supported</em></td>
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingmultipletransformsagainstmultipletargetsinadifferentdirectory"> Example </a> </td>
        <td style="text-align: center;"> <a href="#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingmultipletransformsagainstmultipletargets"> Example </a> </td>
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

## Transform and target are in the same directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Transformandtargetareinthesamedirectory}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─web.config
└─web.mytransform.config
```

Then the transform **web.mytransform.config => web.config** will:

- Apply the transform **web.mytransform.config** to file **web.config**

## Applying a transform against a target in a different folder {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingatransformagainstatargetinadifferentfolder}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─config
| └─web.config
└─web.mytransform.config
```

Then the transform **web.mytransform.config => config\web.config** will:

- Apply the transform **web.mytransform.config** to file **config\web.config**

## Transform and multiple targets are in the same directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Transformandmultipletargetsareinthesamedirectory}

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

## Applying a transform against multiple targets in a different directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingatransformagainstmultipletargetsinadifferentdirectory}

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

## Using an absolute path to the transform {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Usinganabsolutepathtothetransform}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─subdir
| └─web.config
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
 - Apply the transform **c:\transforms\web.mytransform.config** to file **subdir\web.config**

## Applying a transform with an absolute path to a target in the extraction path root {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Usinganabsolutepathtothetransformxtractiondirectoryroot}

:::hint
This transform is available in Octopus Server 3.8.8 (Calamari 3.6.43) or later    
:::

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─subdir
| └─web.config
└─web.config
```

And the following files exist:

```powershell
c:\
└─transforms
  └─web.mytransform.config
```

Then the transform **c:\transforms\web.mytransform.config => .\web.config** will:
 - Apply the transform **c:\transforms\web.mytransform.config** to file **web.config**

## Applying a transform with an absolute path to a target relative to the extraction path {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-UsinganabsolutepathtothetransformRelativetoextractiondirectory}

:::hint
This transform is available in Octopus Server 3.8.8 (Calamari 3.6.43) or later    
:::

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─subdir
| └─web.config
└─web.config
```

And the following files exist:

```powershell
c:\
└─transforms
  └─web.mytransform.config
```

Then the **transform c:\transforms\web.mytransform.config => .\subdir\web.config** will:
 - Apply the transform **c:\transforms\web.mytransform.config** to file **subdir\web.config**

## Applying a transform with an absolute path against multiple files in a different directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingatransformwithanabsolutepathagainstmultiplefilesinadifferentdirectory}

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

## Using an absolute path to the transform, and applying it against multiple files {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Usinganabsolutepathtothetransformandapplyingitagainstmultiplefiles}

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

## Applying a transform to a target in a sibling directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingatransformtoatargetinasiblingdirectory}

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

## Applying a transform from a different directory against multiple files {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingatransformfromadifferentdirectoryagainstmultiplefiles}

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

## Applying a transform to multiple targets in a sibling directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingatransformtomultipletargetsinasiblingdirectory}

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

## Applying multiple transforms to a single target where both are in the same directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingmultipletransformstoasingletargetwherebothareinthesamedirectory}

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

## Applying multiple transforms to a single target in a different directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingmultipletransformstoasingletargetinadifferentdirectory}

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

## Applying multiple transforms against multiple targets {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingmultipletransformsagainstmultipletargets}

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

## Applying multiple transforms against multiple targets in a different directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingmultipletransformsagainstmultipletargetsinadifferentdirectory}

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

## Applying multiple absolute path transforms to the same target file {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingmultipleabsolutepathtransformstothesametargetfile}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─subdir
| └─web.config
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

- Apply the transform **c:\transforms\connstrings.mytransform.config** to file **subdir\web.config**

- Apply the transform **c:\transforms\security.mytransform.config** to file **subdir\web.config**

## Using an absolute path wildcard transform and multiple targets {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Usinganabsolutepathwildcardtransformandmultipletargets}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─app.config
├─subdir
| ├─app.config
| └─web.config
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

- Apply the transform **c:\transforms\web.mytransform.config** to file **web.config**

- Apply the transform **c:\transforms\app.mytransform.config** to file **app.config**

- Apply the transform **c:\transforms\web.mytransform.config** to file **subdir\web.config**

- Apply the transform **c:\transforms\app.mytransform.config** to file **subdir\app.config**

## Using an absolute path for multiple transforms against multiple relative files {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Usinganabsolutepathformultipletransformsagainstmultiplerelativefiles}

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

## Applying multiple relative transforms against a specific target {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingamultiplerelativetransformsagainstaspecifictarget}

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

## Applying multiple transforms in a different directory to a single target in a different directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingmultipletransformsinadifferentdirectorytoasingletargetinadifferentdirectory}

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

## Applying transforms from a different directory to multiple targets {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingtransformsfromadifferentdirectorytomultipletargets}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─app.config
├─transforms
| ├─app.mytransform.config
| └─web.mytransform.config
└─web.config
```

Then the transform **transforms\\*.mytransform.config => \*.config** will:

- Apply the transform **transforms\web.mytransform.config** to file **web.config**

- Apply the transform **transforms\app.mytransform.config** to file **app.config**

## Applying transforms from a different directory to targets in a different directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingtransformsfromadifferentdirectorytotargetsinadifferentdirectory}

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
