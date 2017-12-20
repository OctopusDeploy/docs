---
title: Substitute Variables in Files
description: Package steps have a feature that allows you to replace variables in any file. 
position: 10
---

Package steps have a feature that allows you to replace [Octopus Variables](/docs/deployment-process/variables/index.md) in any file. This comes in handy when you want to replace variables in configuration files outside of **appSettings**, **applicationSettings**, and **connectionStrings**, but also for other configuration that is related to scoping and deployments.

Turning on the feature can be done inside the NuGet package step under 'Configure Features'.

![](/docs/images/3048758/3278400.png "width=500")

Once you have the feature selected as part of your step, you can define all of the files you would like variables replaced in. This can be any file that is part of the package.

Each file needs to be defined on a new line in the textarea. You need to state the full path of the file, relative to the installation directory. So, if you need to replace variables on a file called *app.config* that is inside of a *config*folder on the root of your package, you need to put *config\app.config*on the **Target files** field.

![](/docs/images/3048758/3278401.png "width=500")

You can also use Octopus embedded template syntax to conditionally list files that only need replacement on specific environments.

The default option for Output file encoding (Detect from template) will use the Byte Order Mark (BOM) of the file to determine the encoding.

:::warning
If you include a configuration file that you are also doing a transformation and variable swap on, the variable change will run under the 'substitute variables in files' before the transformation as defined in the [package deployment feature ordering](/docs/reference/package-deployment-feature-ordering.md) process.
:::

## Some Examples {#SubstituteVariablesinFiles-SomeExamples}

You might have a different URL for a login form based on environment. This is inside your config file but outside of appSettings or ConnectionStrings. You can use a variable instead as shown below.

```powershell
    <authentication mode="Forms">
      <forms loginUrl="#{LoginURL}" timeout="2880" />
    </authentication>
```

Another case that has come up, is a header that has a different image or text in a shared layout file depending on environment that it is deployed to. Well you can define the file and put a variable in place where you want the change to be.

```powershell
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">OctoFX #{SiteReference}</a>
          </div>
```

:::warning
Since 3.0, by default **warnings** will be treated as **errors** when replacing variables in files using this feature. To override this behavior, set the variable **Octopus.Action.Package.IgnoreVariableReplacementErrors** to **True** in your project. By doing this, warnings will be treated as such and the deployment wont be marked as failed.
:::
