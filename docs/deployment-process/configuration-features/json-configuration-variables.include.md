With the JSON Configuration Variables feature you can define [variables](/docs/deployment-process/variables/index.md) in Octopus for use in the JSON configuration files of your applications. This lets you define different values based on the scope of the deployment. This feature uses a matching syntax so you can update configuration nested in JSON object and array literals.

This is designed to work natively with [.NET Core JSON configuration files](/docs/deployment-examples/asp.net-core-web-application-deployments/index.md) but works equally well with any JSON files.

## Configuring the JSON Configuration Variables Feature {#JSONConfigurationVariablesFeature-ConfiguringtheJSONconfigurationvariablesfeature}

1. When you define the package [step](/docs/deployment-process/steps/index.md) in your [project](/docs/deployment-process/projects/index.md) enable the JSON Configuration Variables feature by clicking the **CONFIGURE FEATURES** link and selecting **JSON configuration variables** and clicking **OK**.
2. In the **Features** section of the step template, specify the relative paths within the package to your JSON configuration files. For instance:

```
approot\packages\ASPNET.Core.Sample\1.0.0\root\appSettings.json
```

Octopus will find the target files and replace any matching configuration settings with the value of matching Octopus variables.

### Simple Variables {#JSONConfigurationVariablesFeature-Simplevariables}

Given this example of a target config file:

```json
{
   "weatherApiUrl": "dev.weather.com",
   "weatherApiKey": "DEV1234567",
   "tempImageFolder": "C:\temp\img"
}
```

If you define the [variables](/docs/deployment-process/variables/index.md) `weatherApiUrl` and `weatherApiKey` in the variables section of your [deployment process](/docs/deployment-process/variables/index.md) with the values `test.weather.com` and `TEST7654321` the target config file in your packaged application is updated to become:

```json
{
   "weatherApiUrl": "test.weather.com",
   "weatherApiKey": "TEST7654321",
   "tempImageFolder": "C:\temp\img"
}
```

Note, the `tempImageFolder` setting remains untouched.

### Hierarchical Variables {#JSONConfigurationVariablesFeature-Hierarchicalvariables}

It is common (and encouraged) to use hierarchical variables in JSON configuration files. This is supported in Octopus variables by using a nested path syntax delimited by *colon* characters.

For example, to update the value of `weatherApi.url` and `weatherApi.key` in the target config file you would configure the Octopus Variables `weatherApi:url` and `weatherApi:key`.

**Hierarchical JSON**

```json
{
   "weatherApi": {
      "url": "dev.weather.com",
      "key": "DEV1234567"
   }
}
```

You can also replace an entire object. For the example above you could set Octopus Variable `weatherApi` to a value of `{"weatherApi":{"url":"test.weather.com","key":"TEST7654321"}}`

### Array Variables {#JSONConfigurationVariablesFeature-Arrayvariables}

Octopus can also replace a value in a JSON array by using the zero-based index of the array in the variable name.

For example, the variable `foo:bar:1` with a value `qux` will update the value of the second element in the array to be `qux`:

**Hierarchical JSON**

```json
{
   "foo": {
      "bar": [
		"baz",
		"qux"
	  ]
   }
}
```

You can also replace an entire array. For the example above you could set Octopus Variable `foo:bar` to a value of `["baz","qux"]`.

Note that you can even use the [Variable Substitution Syntax](/docs/deployment-process/variables/variable-substitutions.md) patterns in this file selection input box itself to do things like reference environment specific files, or conditionally include them based on scoped variables.
