---
title: Deploying Web Jobs

---


[Azure Web Jobs](https://azure.microsoft.com/en-us/documentation/articles/web-sites-create-web-jobs/) can either be packaged and deployed along with the Web App that they live under, or packaged and deployed independently.

## Location {#DeployingWebJobs-Location}


Web jobs are deployed to either `app_data/jobs/triggered/{job_name}` or `app_data/jobs/continuous/{job_name}`, depending on whether the job is *triggered* or *continuous*.

## Packaged with the Web App {#DeployingWebJobs-PackagedwiththeWebApp}


If you are packaging and deploying your Web App and Web Job together, the Web Job must be packaged in it's location under the App\_Data directory.

```powershell
\\MyWebApp.1.0.0.0.nupkg    
    \---app_data
        \---jobs
            \---continuous
                \---WebJob1
                    |   WebJob1.exe
                    |   WebJob1.exe.config
            \---triggered
                \---WebJob2
                    |   WebJob2.exe
                    |   WebJob2.exe.config
    \---bin
        \---MyWebApp.dll
    \---Global.asax
    \---index.html
    \---MyWebApp.nuspec
    \---web.config
```





Below is a sample of a nuspec file which could be used to produce the layout above.  For example using [OctoPack](/docs/packaging-applications/nuget-packages/using-octopack/index.md).

```xml
<?xml version="1.0"?><package >
  <metadata>
    <id>MyWebApp</id>
    <version>1.0.0.0</version>
    <title>MyWebApp</title>
    <authors>MyCompany</authors>
    <owners>MyCompany</owners>
    <projectUrl>https://github.com/MyCompany/MyWebApp</projectUrl>
    <iconUrl></iconUrl>
    <requireLicenseAcceptance>false</requireLicenseAcceptance>
    <description>MyWebApp with WebJobs</description>
    <copyright>Copyright 2015 MyCompany</copyright>
  </metadata>
  <files>
    <file src="..\WebJob1\bin\**\*.*" target="app_data\jobs\continuous\WebJob1" />
    <file src="..\WebJob2\bin\**\*.*" target="app_data\jobs\triggered\WebJob2" />
  </files>
</package>
```

## Packaged Independently {#DeployingWebJobs-PackagedIndependently}


If you are packaging and deploying your Web Job independently to the containing Web App (and possibly other Web Jobs and sub-applications), then it is important you set the Physical Path field to the appropriate location.  For example:

```
App_Data\Jobs\Triggered\WebJob1
```
