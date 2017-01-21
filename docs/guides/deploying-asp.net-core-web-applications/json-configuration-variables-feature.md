---
title: JSON Configuration Variables Feature

---


The **JSON configuration variables** feature updates your JSON configuration files with the values from matching Octopus variables. In many ways this feature works similarly to the [Substitute Variables in Files](/docs/deploying-applications/substitute-variables-in-files.md) feature, but uses a special matching syntax so you can update configuration nested in JSON object and array literals.

:::hint
**Available in 3.3**
The JSON configuration variables feature was released in version **3.3** of Octopus Deploy. The capability was expanded with array indexing and the ability to replace entire arrays and object in version **3.3.23**.
:::

:::hint
ASP.NET Core 1.0 (previously known as ASP.NET 5) has been released! Microsoft's [ASP.NET documentation site](http://docs.asp.net/) is the best resource on the ASP.NET Core web application platform. Their [Configuration page](http://docs.asp.net/en/latest/fundamentals/configuration.html) provides detailed information on the configuration options available.
:::

:::hint
Our ASP.NET Core web application [deployment guide](/docs/guides/deploying-asp.net-core-web-applications.md) provides further information on how this feature fits into an Octopus project's deployment process.
:::


On this page:


- Configuring the JSON configuration variables feature
 - Step 1: Enable the feature
 - Step 2: Configure which files to update
- How your JSON configuration settings are updated by Octopus
 - Simple variables
 - Hierarchical variables
 - Array variables

## Configuring the JSON configuration variables feature

### Step 1: Enable the feature


To configure a package step to replace matching app settings in your JSON configuration files ensure the **JSON configuration variables** feature is enabled.


![](/docs/images/3702943/5275653.png)

### Step 2: Configure which files to update


Next, specify the relative paths within the package to your JSON configuration files.

:::success
**Relative path example**
Your relative path may look something like:

```
approot\packages\ASPNET.Core.Sample\1.0.0\root\appSettings.json
```
:::


Note that you can even use the [Variable Substitution Syntax](/docs/reference/variable-substitution-syntax.md) patterns in this file selection input box itself to do things like reference environment specific files, or conditionally include them based on scoped variables.


![](/docs/images/3702943/5275654.png)


Any matching variables in the JSON file will have their values replaced with the variables you have configured in Octopus.

## How your JSON configuration settings are updated by Octopus


When this feature is enabled, Octopus will find the target files and replace any matching configuration settings with the value of matching Octopus variables.

### Simple variables


Given this example of a target config file:

**Simple target file**

```js
{
   "weatherApiUrl": "dev.weather.com",
   "weatherApiKey": "DEV1234567",
   "tempImageFolder": "C:\temp\img"
}
```


If you have the Octopus Variables `weatherApiUrl` and `weatherApiKey` set to the values `test.weather.com` and `TEST7654321` the target config file is updated to become, noticing the `tempImageFolder` setting remains untouched:

**Simple JSON**

```js
{
   "weatherApiUrl": "test.weather.com",
   "weatherApiKey": "TEST7654321",
   "tempImageFolder": "C:\temp\img"
}
```

### Hierarchical variables


It is common (and encouraged) to use hierarchical variables in JSON configuration files.  This is supported in Octopus Deploy variables by using a nested path syntax delimited by *colon* characters.


For example, to update the value of `weatherApi.url` and `weatherApi.key` in the target config file you would configure the Octopus Variables `weatherApi:url` and `weatherApi:key`.

**Hierarchical JSON**

```js
{
   "weatherApi": {
      "url": "dev.weather.com",
      "key": "DEV1234567"
   }
}
```


You can also replace an entire object. For the example above you could set Octopus Variable `weatherApi` to a value of `{&quot;weatherApi&quot;:{&quot;url&quot;:&quot;test.weather.com&quot;,&quot;key&quot;:&quot;TEST7654321&quot;}}`

### Array variables


Octopus Deploy can also replace a value in a JSON array by using the zero-based index of the array in the variable name.


For example, the variable `foo:bar:1` with a value `qux` will update the value of the second element in the array to be `qux`:

**Hierarchical JSON**

```js
{
   "foo": {
      "bar": [
		"baz",
		"qux"
	  ]
   }
}
```


You can also replace an entire array. For the example above you could set Octopus Variable `foo:bar` to a value of `[&quot;baz&quot;,&quot;qux&quot;]`
