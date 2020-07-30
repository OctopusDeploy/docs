:::info
This Configuration Feature used to be called JSON Configuration Variarbles but has been re-named with the added support for YAML
:::

With the Structured Configuration Variables feature you can define [variables](/docs/projects/variables/index.md) in Octopus for use in the JSON and YAML configuration files of your applications. This lets you define different values based on the scope of the deployment. This feature uses a matching syntax so you can update configuration nested in JSON and YAML objects and array literals.

This is designed to work natively with [.NET Core Structured configuration files](/docs/deployment-examples/asp.net-core-web-application-deployments/index.md) but works equally well with any JSON files.

## Configuring the structured configuration variables feature {#StructuredConfigurationVariablesFeature-Configuringthestructuredconfigurationvariablesfeature}

1. When you define the package [step](/docs/deployment-process/steps/index.md) in your [project](/docs/projects/index.md) enable the Structured Configuration Variables feature by clicking the **CONFIGURE FEATURES** link, selecting **Structured Configuration Variables** then clicking **OK**.
2. In the **Features** section of the step template, specify the relative paths within the package to your Structured configuration files. For instance:

```
approot\packages\ASPNET.Core.Sample\1.0.0\root\appSettings.json
```

or

```
**/application.yaml
```

Octopus will find the target files and replace any matching configuration settings with the value of matching Octopus variables.

### Selecting target files {#StructuredConfigurationVariablesFeature-SelectingTargetFiles}

Target files are files that should have variable replacement applied to them. Multiple files can be supplied by seperating them with a new line.

There are a few options for supplying which files to use such as supplying a full path to the file, using a wild card to find all files in a directory, or using a wild card on the directory to find all files in that directory or deeper:

**Specific file path**
```
ExampleProject/appSettings.json
```

**Match any .yaml files in root directory**
```
*.yaml
```

**Match any .json files in a specific directory**
```
Config\*.json
```

**Match any .yaml files in specified folder or deeper**
```
Application/**/*.yaml
```

The Target File field also supports [extended template syntax](/docs/projects/variables/variable-substitutions.md#VariableSubstitutionSyntax-ExtendedSyntax) which can allow conditionals and loops to be used to specify files.

### How the file type for target files is determined

Structured Configuration Variables allows for replacement in both JSON and YAML files. To determine if a file is JSON or YAML, Calamari will first try and parse the file as JSON, and if it succeeds, it will treat the file as JSON. This is to allow backwards compatability from when this feature only supported replacement in JSON files.

If it doesn't parse as JSON, it will then use the file extension to determine if it should parse as YAML. If the file has the extension `yml` or `yaml`, Calamari will attempt to do variable replacement on the file as if it is a YAML file.

### Simple variables {#StructuredConfigurationVariablesFeature-Simplevariables}

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

### Hierarchical variables {#StructuredConfigurationVariablesFeature-Hierarchicalvariables}

It is common (and encouraged) to use hierarchical variables in Structured configuration files. This is supported in Octopus variables by using a nested path syntax delimited by *colon* characters.

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

**Hierarchical YAML**
```yaml
weatherApi:
  url: dev.weather.com
  key: DEV1234567
```

You can also replace an entire object. For the example above you could set Octopus Variable `weatherApi` to a value of `{"url":"test.weather.com","key":"TEST7654321"}` which will result in this:

**Replaced Hierarchical JSON**
```json
{
   "weatherApi": {
      "url": "test.weather.com",
      "key": "TEST7654321"
   }
}
```

**Replaced Hierarchical YAML**
```yaml
weatherApi:
  url: test.weather.com
  key: TEST7654321
```

### JSON Array or YAML Sequence variables {#StructuredConfigurationVariablesFeature-Arrayvariables}

Octopus can replace a value in a JSON array or a YAML sequence by using the zero-based index of the array or sequence in the variable name. If we take the following examples:

**Example Hierarchical JSON**
```json
{
   "foo": {
      "bar": [
         "item1",
         "item2"
     ]
   }
}
```

**Example Hierarchical YAML**
```yaml
foo:
  bar:
    - item1
    - item2
```

Variables can be set for `foo:bar:1` with a value `qux` which will update the value of the second element in the array or sequence to be `qux` like so:

**Replaced Array Index Hierarchical JSON**
```json
{
   "foo": {
      "bar": [
         "item1",
         "qux"
     ]
   }
}
```

**Replaced Sequence Index Hierarchical YAML**
```yaml
foo:
  bar:
    - item1
    - qux
```

It's possible to replace an entire array or sequence too. With the previous example above, if the Octopus Variable `foo:bar` was to a value of `["baz","qux"]` it would create outputs like:

**Replaced Array Hierarchical JSON**
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

**Replaced Sequence Hierarchical YAML**
```yaml
foo:
  bar:
    - baz
    - qux
```

The properties of objects in arrays can be replaced. In the example below defining an Octopus variable `foo:bar:0:key` with the value of `baz` replaces the `key` property of the first object in the array:

**Replaced Object Property in Array Hierarchical JSON**
```json
{
   "foo": {
      "bar": [
         {
            "key": "baz",
            "value": "qux"
         }
     ]
   }
}
```

**Replaced Map Property in Sequence Hierarchical YAML**
```yaml
foo:
  bar:
    -
      key: foo
      value: bar
    - qux
```

Note that you can even use the [Variable Substitution Syntax](/docs/projects/variables/variable-substitutions.md) patterns in this file selection input box itself to do things like reference environment specific files, or conditionally include them based on scoped variables.
