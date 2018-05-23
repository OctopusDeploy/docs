---
title: Deploying HTML and JavaScript Applications
description: This guide provides a simple example of deploying and configuring a simple javascript application built using AngularJS.
position: 51
---

We are commonly asked how to deploy and configure HTML/JS or Single Page Applications (SPA) running in a browser, or JavaScript applications running in NodeJS. This guide provides a simple example of deploying and configuring a simple JavaScript application using AngularJS.

:::hint
**Not using AngularJS?**
That's fine! This example uses AngularJS but the same basic principles apply for any applications running in a browser or NodeJS. Instead of using AngularJS constants, you could provide globally accessible values, or alternatively provide the configuration values in a separate JavaScript file your application loads as a module. The important part to understand is how to get your Octopus Variables into your application.
:::

## Prerequisites {#DeployingHTMLandJavaScriptApplications-Prerequisites}

This guide assumes some familiarity with common Octopus concepts like configuring [Projects ](/docs/deployment-process/projects/index.md)and [Variables](/docs/deployment-process/variables/index.md). To deploy this package using this guide you will need a server with IIS installed since it uses the [IIS Websites and Application Pools](/docs/deploying-applications/iis-websites-and-application-pools.md) deployment steps. Alternatively you could use any other web host, like Express in NodeJS, since this is just a single HTML file with no other dependencies.

## Sample Application {#DeployingHTMLandJavaScriptApplications-SampleApplication}

Here is a very simple AngularJS application which uses [AngularJS Constants](https://docs.angularjs.org/api/auto/service/$provide#constant) to provide other services, controllers and directives with access to the configuration data stored in Octopus. The important part to note here is where we set the constant: we are going to use the [Substitute Variables in Files](/docs/deployment-process/configuration-files/substitute-variables-in-files.md) feature to replace the **`#{MyApp.ConfigValue1}`** expression at deployment time.

**MyApp.html**

```js
<!DOCTYPE html>
<html>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
<body>
<script type="text/javascript">
angular
    .module('myApp', [])
	// Create a constant JSON object called 'myConfig' which can be injected
    .constant("myConfig", {
        "configValue1": "#{MyApp.ConfigValue1}",
        "configValue2": "#{MyApp.ConfigValue2}"
    })
    // Now we can provide configuration by injecting myConfig into this controller
    .controller("myCtrl", function($scope, myConfig) {
		$scope.message = "Hello world!";
		$scope.myConfig = myConfig;
    })
</script>
<div ng-app="myApp" ng-controller="myCtrl">
  <h1>{{message}}</h1>
  <p><em>These configuration values were set by Octopus Deploy:</em></p>
  <p>ConfigValue1: {{myConfig.configValue1}}</p>
  <p>ConfigValue2: {{myConfig.configValue2}}</p>
</div>
</body>
</html>
```

### Step 1: Upload the package to the built-in repository {#DeployingHTMLandJavaScriptApplications-Step1:Uploadthepackagetothebuilt-inrepository}

Firstly we need to make the package available for Octopus to deploy.

:::success
We've crafted and packaged v1.0.0 of this sample application for you to try out (see the link below). Alternatively you can create your own application and [package the application](/docs/packaging-applications/index.md) yourself to try it out.
:::

1. Download [MyApp.1.0.0.zip](/docs/attachments/myapp.1.0.0.zip)
2. [Upload it to the Octopus Built-In repository](/docs/packaging-applications/package-repositories/pushing-packages-to-the-built-in-repository.md) (you can do this by going to *Library > Packages* and clicking the **Upload package** button)

![](/docs/images/5672397/5866205.png "width=500")

### Step 2: Create the project, variables and deployment process {#DeployingHTMLandJavaScriptApplications-Step2:Createtheproject,variablesanddeploymentprocess}

Now we need to create the project and configure it ready to deploy our JavaScript application.

1. Create a new Project and choose an appropriate Lifecycle for testing this sample application.
 1. Remember you need to target a web server running IIS in order to follow this guide verbatim.
2. Configure some project variables to match the JavaScript shown above. *You can use these values or any other values you wish - we've chosen to show a [complex expression](/docs/deployment-process/variables/binding-syntax.md) including an [Octopus System Variable](/docs/deployment-process/variables/system-variables.md).*
![](/docs/images/5672397/5866206.png "width=500")
3. Configure the deployment process to deploy the MyApp package and host it in an IIS Web Site. Our web servers in this example belong to the **web-server** role.

![](/docs/images/5672397/5866207.png "width=500")

4. Configure the IIS Web Site you want Octopus to set up on your behalf.

![](/docs/images/5672397/5866208.png "width=500")

![](/docs/images/5672397/5866209.png "width=500")

5. Enable the [Substitute Variables in Files](/docs/deployment-process/configuration-files/substitute-variables-in-files.md) feature and configure it to replace the expressions in our `MyApp.html` file with variable values we defined earlier.

![](/docs/images/5672397/5866210.png "width=500")

### Step 3: Deploy! {#DeployingHTMLandJavaScriptApplications-Step3:Deploy!}

Now when we create a release for this project and deploy it we can see that Octopus has found the `MyApp.html` file and substituted the variable values into our expressions.

![](/docs/images/5672397/5866212.png "width=500")

And finally when we load the application in our browser we can see the results have flowed all the way through from Octopus to first-class citizens in our AngularJS application!

![](/docs/images/5672397/5866206.png "width=500")

![](/docs/images/5672397/5866211.png "width=500")

### Step 4: Minify the JavaScript and deploy again! {#DeployingHTMLandJavaScriptApplications-Step4:MinifytheJavaScriptanddeployagain!}

This approach also works perfectly with minified sources. This is because the minifier won't change string literals like `"#{MyApp.ConfigValue1}"` and the substitution will work just like it did before. In this example we will just minify the JavaScript inline in the HTML file. You can get the same result by moving the JavaScript into an external file and minifying that.

1. Unpack the MyApp.1.0.0.zip file
2. Minify the contents of the `<script>` tag. We used [https://jscompress.com/](https://jscompress.com/) to minify the JavaScript.
 1. You should notice the `"#{MyApp.ConfigValue1}"` string literal has been left intact by the minifier.
3. Pack the HTML file into a new package and name the file MyApp.1.0.1.zip. This new version of our package has been enhanced with minified sources and will be much faster to download!
4. Push the new package into the built-in repository, create a new release and deploy that release. You should see the same result as before, but now with minified sources!

**MyApp.html with minified JavaScript**

```js
<!DOCTYPE html>
<html>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
<body>
<script type="text/javascript">
angular.module("myApp",[]).constant("myConfig",{configValue1:"#{MyApp.ConfigValue1}",configValue2:"#{MyApp.ConfigValue2}"}).controller("myCtrl",function(a,b){a.message="Hello world!",a.myConfig=b});
</script>
<div ng-app="myApp" ng-controller="myCtrl">
  <h1>{{message}}</h1>
  <p><em>These configuration values were set by Octopus Deploy:</em></p>
  <p>ConfigValue1: {{myConfig.configValue1}}</p>
  <p>ConfigValue2: {{myConfig.configValue2}}</p>
</div>
</body>
</html>
```

## Next steps {#DeployingHTMLandJavaScriptApplications-Nextsteps}

From this point you could build on this example, pushing configuration variables through from Octopus to your application. You may want to consider how granular you make each constant, perhaps combining related configuration data into the same JSON object.
