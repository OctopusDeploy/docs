---
title: Substitute Variables in Files
description: Package steps have a feature that allows you to replace variables in any file.
position: 80
---
The Substitute Variables in Files feature is one of the [configuration features](/docs/deployment-process/configuration-features/index.md) you can enable as you define the [steps](/docs/deployment-process/steps/index.md) in your [deployment process](/docs/deployment-process/index.md). This feature is available in package steps, and it allows you to replace [Octopus Variables](/docs/deployment-process/variables/index.md) in any file.

:::hint
If you want to replace the configuration variables **appSettings**, **applicationSettings**, and **connectionStrings** see [configuration variables](/docs/deployment-process/configuration-features/configuration-variables.md) instead.
:::

## How to Substitute Variables in a File

The following example shows you how to use the Substitute Variables in Files feature to provide a different login form to the different environments you're deploying to, in this example we're deploying to a **Test** and **Production** environment.

1. Create the login variable in Octopus. From the [project](/docs/deployment-process/projects/index.md) overview page, click **Variables**.
  - Enter a the name for the variable, for instance, *LoginURL*.
  - Enter the value for the variable, for instance, *https://test.example.com/login*.
  - Scope the variable to the environment, for instance, *Test*.
  - Repeat the process for the production environment, to give you a different value for the loginURL variable for each environment and click **SAVE**. In this example, you would have variables similar to the following:

| Variable Name    | Value     | Scope    |
| ----------------------- | --------------- | -------- |
| LoginURL | https://test.example.com/login | Test |
| LoginURL | https://example.com/login | Production |

2. Include the loginURL variable in the app you're deploying. For instance:

```powershell
    <authentication mode="Forms">
      <forms loginUrl="#{LoginURL}" timeout="2880" />
    </authentication>
```

3. Define the deployment process, by clicking **Process** from the project overview page, then selecting, **ADD STEP**.
4. Select the **Deploy a Package** step.
5. From the [Step](/docs/deployment-process/steps/index.md) Template page, click the **Configure Features** link.
6. Check the **Substitute Variables in Files** checkbox and click **Ok**.

![Substitute Variables in Files feature](substitute-variables.png)

When you return to your deployment process, you will see the **Substitute Variables in Files** option has been added to the **Features** section of the deployment process.

7. Add the [step](/docs/deployment-process/steps/index.md) details.
  - Enter a name for the step.
  - Select the targets where the step should run.
  - Select the [package feed](/docs/packaging-applications/package-repositories/index.md) where the [package](/docs/packaging-applications/index.md) will be available.
  - Enter the [package ID](/docs/packaging-applications/package-id.md) for the package to be deployed.
8. In the **Target Files** text area, enter the files, as a newline separated list, that you want to perform the variable substitution on. In our example, that includes any file that references the LoginURL variable.

Each file needs to be defined on a new line in the text area. You need to state the full path of the file, relative to the installation directory. So, if you need to replace variables on a file called *app.config* that is inside of a *config* folder on the root of your package, you need to put *config\app.config* in the **Target files** field.

You can also use Octopus embedded template syntax to conditionally list files that only need replacement on specific environments.

9. If you want to specify the encoding for the transformed file, enter the encoding in the **Output file encoding** field.

The default option for Output file encoding (Detect from template) will use the Byte Order Mark (BOM) of the file to determine the encoding.

10. Add any [conditions](/docs/deployment-process/conditions/index.md) you need to specify for the step, and then click **SAVE**.

Now, when the application is deployed to your **test** and **production** environments,  will include the login URL you defined for the specific environment.

From here you can use the project overview menu to continue defining your process, or click **CREATE RELEASE** to create a [release](/docs/deployment-process/releases/index.md) and deploy your application.

:::warning
If you include a configuration file that you are also doing a [transformation](/docs/deployment-process/configuration-features/configuration-transforms.md) and [variable](/docs/deployment-process/configuration-features/configuration-variables.md) swap on, the variable change will run under the 'substitute variables in files' before the transformation as defined in the [package deployment feature ordering](/docs/deployment-examples/deploying-packages/package-deployment-feature-ordering.md) process.
:::

:::warning
By default **warnings** will be treated as **errors** when replacing variables in files using this feature. To override this behavior, set the variable **Octopus.Action.Package.IgnoreVariableReplacementErrors** to **True** in your project. By doing this, warnings will be treated as such and the deployment wont be marked as failed.
:::

## Another Example {#SubstituteVariablesinFiles-SomeExamples}

If you want to include a header that has a different image or text in a shared layout file depending on environment that it is deployed to. You can define the file and put a variable in place where you want the change to be. In this example, we've used the **SiteReference** variable:

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
