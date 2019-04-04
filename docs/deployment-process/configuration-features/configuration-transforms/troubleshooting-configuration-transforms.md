---
title: Troubleshooting Configuration Transforms
description: Using configuration transformations.
position: 50
---

If you're new to configuration transformation, first check the package(s) part of the deployment are structured and contain what you expect. Following on from that review the deployment logs and output of the package(s) on your deployment targets to get investigate any unexpected behavior. You can try using the `Octopus.Action.Package.TreatConfigTransformationWarningsAsErrors` variable defined in the [System Variables](/docs/deployment-process/variables/system-variables.md) section of the documentation while you set it up the first time.

## Advanced Configuration Transforms Examples

Configuration transforms can sometimes be complicated to setup. As a general rule, its best to have both configuration file and transform file in the same directory, however, this is not always achievable.

This page lists the supported scenarios and the transform definitions required to apply the transform.

## Supported Scenarios {#AdvancedConfigurationTransformsExamples-Supportedscenarios}

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

## Transform and Target Are in the Same Directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Transformandtargetareinthesamedirectory}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─web.config
└─web.mytransform.config
```

Then the transform **web.mytransform.config => web.config** will:

- Apply the transform **web.mytransform.config** to file **web.config**.

## Applying a Transform Against a Target in a Different Folder {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingatransformagainstatargetinadifferentfolder}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─config
| └─web.config
└─web.mytransform.config
```

Then the transform **web.mytransform.config => config\web.config** will:

- Apply the transform **web.mytransform.config** to file **config\web.config**.

## Transform and Multiple Targets Are in the Same Directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Transformandmultipletargetsareinthesamedirectory}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─app.config
├─connstrings.mytransform.config
└─web.config
```

Then the transform **connstrings.mytransform.config => \*.config** will:

- Apply the transform **connstrings.mytransform.config** to file **web.config**.
- Apply the transform **connstrings.mytransform.config** to file **app.config**.

## Applying a Transform Against Multiple Targets in a Different Directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingatransformagainstmultipletargetsinadifferentdirectory}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─config
| ├─app.config
| └─web.config
└─connstrings.mytransform.config
```

Then the transform **connstrings.mytransform.config => config\\*.config** will:

- Apply the transform **connstrings.mytransform.config** to file **config\web.config**.
- Apply the transform **connstrings.mytransform.config** to file **config\app.config**.

## Using an Absolute Path to the Transform {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Usinganabsolutepathtothetransform}

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

 - Apply the transform **c:\transforms\web.mytransform.config** to file **web.config**.
 - Apply the transform **c:\transforms\web.mytransform.config** to file **subdir\web.config**.

## Applying a Transform With an Absolute Path to a Target in the Extraction Path Root {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Usinganabsolutepathtothetransformxtractiondirectoryroot}

:::hint
This transform is available in **Octopus Server 3.8.8** (Calamari 3.6.43) or later    
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
 - Apply the transform **c:\transforms\web.mytransform.config** to file **web.config**.

## Applying a Transform With an Absolute Path to a Target Relative to the Extraction Path {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-UsinganabsolutepathtothetransformRelativetoextractiondirectory}

:::hint
This transform is available in **Octopus 3.8.8** (Calamari 3.6.43) or later    
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
 - Apply the transform **c:\transforms\web.mytransform.config** to file **subdir\web.config**.

## Applying a Transform With an Absolute Path Against Multiple Files in a Different Directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingatransformwithanabsolutepathagainstmultiplefilesinadifferentdirectory}

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

- Apply the transform **c:\transforms\connstrings.mytransform.config** to file **config\web.config**.
- Apply the transform **c:\transforms\connstrings.mytransform.config** to file **config\app.config**.

## Using an Absolute Path to the Transform, and Applying it Against Multiple Files {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Usinganabsolutepathtothetransformandapplyingitagainstmultiplefiles}

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

- Apply the transform **c:\transforms\connstrings.mytransform.config** to file **web.config**.
- Apply the transform **c:\transforms\connstrings.mytransform.config** to file **app.config**.

## Applying a Transform From a Different Directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-ApplyingatransformfromadifferentdirectoryApplyingatransformfromadifferentdirectory}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─transforms
| └─web.mytransform.config
└─web.config
```

Then the transform **transforms\web.mytransform.config => web.config** will:

- Apply the transform **transforms\web.mytransform.config** to file **web.config**.

## Applying a Transform to a Target in a Sibling Directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingatransformtoatargetinasiblingdirectory}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─config
| └─web.config
└─transforms
  └─web.mytransform.config
```

Then the transform **transforms\web.mytransform.config => config\web.config** will:

- Apply the transform **transforms\web.mytransform.config** to file **config\web.config**.

## Applying a Transform From a Different Directory Against Multiple Files {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingatransformfromadifferentdirectoryagainstmultiplefiles}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─app.config
├─transforms
| └─connstrings.mytransform.config
└─web.config
```

Then the transform **transforms\connstrings.mytransform.config => \*.config** will:

- Apply the transform **transforms\connstrings.mytransform.config** to file **web.config**.
- Apply the transform **transforms\connstrings.mytransform.config** to file **app.config**.

## Applying a Transform to Multiple Targets in a Sibling Directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingatransformtomultipletargetsinasiblingdirectory}

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

- Apply the transform **transforms\connstrings.mytransform.config** to file **config\web.config**.
- Apply the transform **transforms\connstrings.mytransform.config** to file **config\app.config**.

## Applying Multiple Transforms to a Single Target Where Both Are in the Same Directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingmultipletransformstoasingletargetwherebothareinthesamedirectory}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─connstrings.mytransform.config
├─security.mytransform.config
└─web.config
```

Then the transform **\*.mytransform.config => web.config** will:

- Apply the transform **security.mytransform.config** to file **web.config**.
- Apply the transform **connstrings.mytransform.config** to file **web.config**.

## Wildcard Transform with Wildcard in the Middle of the Filename to a Single Target Where Both are in the Same Directory {#AdvancedConfigurationTransformsExamples-Wildcardtransformwithwildcardinthemiddleofthefilenametoasingletargetwherebothareinthesamedirectory}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─MyApp.connstrings.octopus.config
├─MyApp.nlog_octopus.config
└─MyApp.WinSvc.exe.config
```

Then the transform **MyApp.\*.octopus.config => MyApp.WinSvc.exe.config** will:

- Apply the transform **MyApp.connstrings.octopus.config** to file **MyApp.WinSvc.exe.config**.

## Applying Multiple Transforms to a Single Target in a Different Directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingmultipletransformstoasingletargetinadifferentdirectory}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─config
| └─web.config
├─connstrings.mytransform.config
└─security.mytransform.config
```

Then the transform **\*.mytransform.config => config\web.config** will:

- Apply the transform **security.mytransform.config** to file **config\web.config**.
- Apply the transform **connstrings.mytransform.config** to file **config\web.config**.

## Applying Multiple Transforms Against Multiple Targets {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingmultipletransformsagainstmultipletargets}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─app.config
├─app.mytransform.config
├─web.config
└─web.mytransform.config
```

Then the transform **\*.mytransform.config => \*.config** will:

- Apply the transform **web.mytransform.config** to file **web.config**.
- Apply the transform **app.mytransform.config** to file **app.config**.

## Applying Multiple Transforms Against Multiple Targets in a Different Directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingmultipletransformsagainstmultipletargetsinadifferentdirectory}

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

- Apply the transform **web.mytransform.config** to file **config\web.config**.
- Apply the transform **app.mytransform.config** to file **config\app.config**.

## Applying Multiple Absolute Path Transforms to the Same Target File {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingmultipleabsolutepathtransformstothesametargetfile}

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

- Apply the transform **c:\transforms\connstrings.mytransform.config** to file **web.config**.
- Apply the transform **c:\transforms\security.mytransform.config** to file **web.config**.
- Apply the transform **c:\transforms\connstrings.mytransform.config** to file **subdir\web.config**.
- Apply the transform **c:\transforms\security.mytransform.config** to file **subdir\web.config**.

## Using an Absolute Path Wildcard Transform and Multiple Targets {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Usinganabsolutepathwildcardtransformandmultipletargets}

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

- Apply the transform **c:\transforms\web.mytransform.config** to file **web.config**.
- Apply the transform **c:\transforms\app.mytransform.config** to file **app.config**.
- Apply the transform **c:\transforms\web.mytransform.config** to file **subdir\web.config**.
- Apply the transform **c:\transforms\app.mytransform.config** to file **subdir\app.config**.

## Using an Absolute Path for Multiple Transforms Against Multiple Relative Files {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Usinganabsolutepathformultipletransformsagainstmultiplerelativefiles}

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

- Apply the transform **c:\transforms\web.mytransform.config** to file **config\web.config**.
- Apply the transform **c:\transforms\app.mytransform.config** to file **config\app.config**.

## Applying Multiple Relative Transforms Against a Specific Target {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingamultiplerelativetransformsagainstaspecifictarget}

Given a package which has the structure:

```powershell
Acme.Core.1.0.0.nupkg
├─transforms
| ├─connstrings.mytransform.config
| └─security.mytransform.config
└─web.config
```

Then the transform **transforms\\*.mytransform.config => web.config** will:

- Apply the transform **transforms\connstrings.mytransform.config** to file **web.config**.
- Apply the transform **transforms\security.mytransform.config** to file **web.config**.

## Applying Multiple Transforms in a Different Directory to a Single Target in a Different Directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingmultipletransformsinadifferentdirectorytoasingletargetinadifferentdirectory}

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

- Apply the transform **transforms\connstrings.mytransform.config** to file **config\web.config**.
- Apply the transform **transforms\security.mytransform.config** to file **config\web.config**.

## Applying Transforms From a Different Directory to Multiple Targets {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingtransformsfromadifferentdirectorytomultipletargets}

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

- Apply the transform **transforms\web.mytransform.config** to file **web.config**.
- Apply the transform **transforms\app.mytransform.config** to file **app.config**.

## Applying Transforms From a Different Directory to Targets in a Different Directory {#AdvancedConfigurationTransformsExamples-AdvancedConfigurationTransformsExamples-Applyingtransformsfromadifferentdirectorytotargetsinadifferentdirectory}

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

- Apply the transform **transforms\web.mytransform.config** to file **config\web.config**.
- Apply the transform **transforms\app.mytransform.config** to file **config\app.config**.
