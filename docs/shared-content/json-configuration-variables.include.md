With the JSON Configuration Variables feature you can define [variables](/docs/projects/variables/index.md) in Octopus for use in the JSON configuration files of your applications. This lets you define different values based on the scope of the deployment. This feature uses a matching syntax so you can update configuration nested in JSON object and array literals.

This is designed to work natively with [.NET Core JSON configuration files](/docs/deployment-examples/asp.net-core-web-application-deployments/index.md) but works equally well with any JSON files.

## Configuring the JSON configuration variables feature {#JSONConfigurationVariablesFeature-ConfiguringtheJSONconfigurationvariablesfeature}

1. When you define the package [step](/docs/deployment-process/steps/index.md) in your [project](/docs/projects/index.md) enable the JSON Configuration Variables feature by clicking the **CONFIGURE FEATURES** link and selecting **JSON configuration variables** and clicking **OK**.
2. In the **Features** section of the step template, specify the relative paths within the package to your JSON configuration files. For instance:

```
approot\packages\ASPNET.Core.Sample\1.0.0\root\appSettings.json
```

Octopus will find the target files and replace any matching configuration settings with the value of matching Octopus variables.

### Simple variables {#JSONConfigurationVariablesFeature-Simplevariables}

Given this example of a target config file:

```json
{
   "weatherApiUrl": "dev.weather.com",
   "weatherApiKey": "DEV1234567",
   "tempImageFolder": "C:\temp\img",
   "port": 8080,
   "debug": true
}
```

If you define the [variables](/docs/projects/variables/index.md) `weatherApiUrl`, `weatherApiKey`, `port`, and `debug` in the variables section of your [deployment process](/docs/projects/variables/index.md) with the values `test.weather.com`, `TEST7654321`, `80`, and `false`, the target config file in your packaged application is updated to become:

```json
{
   "weatherApiUrl": "test.weather.com",
   "weatherApiKey": "TEST7654321",
   "tempImageFolder": "C:\temp\img",
   "port": 80,
   "debug": false
}
```

Note, the `tempImageFolder` setting remains untouched and that the types of `port` and `debug` have not been changed. Octopus will attempt to keep the original type if the new value matches the type of the old value.

### Hierarchical variables {#JSONConfigurationVariablesFeature-Hierarchicalvariables}

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

### Array variables {#JSONConfigurationVariablesFeature-Arrayvariables}

Octopus can replace a value in a JSON array by using the zero-based index of the array in the variable name.

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

You can replace an entire array. For the example above you could set Octopus Variable `foo:bar` to a value of `["baz","qux"]`.

The properties of objects in arrays can be replaced. In the example below defining an Octopus variable `foo:bar:0:key` with the value of `baz` replaces the `key` property of the first object in the array:

**Hierarchical JSON**

```json
{
  "foo": {
    "bar": [
      {
        "key": "foo",
        "value": "bar"
      },
      "qux"
    ]
  }
}
```

Note that you can even use the [Variable Substitution Syntax](/docs/projects/variables/variable-substitutions.md) patterns in this file selection input box itself to do things like reference environment specific files, or conditionally include them based on scoped variables.
