:::div{.info}

This Configuration Feature was previously called JSON Configuration Variables. In version **2020.4.0**, we added support for YAML, XML, and Properties configuration file replacements and renamed the feature Structured Configuration Variables.

:::

With the **Structured Configuration Variables** feature you can define [variables](/docs/projects/variables) in Octopus for use in JSON, YAML, XML, and Properties configuration files of your applications. This lets you define different values based on the scope of the deployment. Settings are located using a structure-matching syntax, so you can update values nested inside structures such as JSON objects and arrays, YAML mappings and sequences, and XML elements and attributes. XPath is used for XML files, and similar expressions are used for the other formats.

## Configuring the structured configuration variables feature {#StructuredConfigurationVariablesFeature-Configuringthestructuredconfigurationvariablesfeature}

1. To enable Structured Configuration Variables on a [step](/docs/projects/steps) that supports the feature, click the **CONFIGURE FEATURES** link, select **Structured Configuration Variables**, then click **OK**.
2. In the **Structured Configuration Variables** section of the step, specify the relative paths to your structured configuration files, relative to the working directory. For instance:

```
approot\packages\ASPNET.Core.Sample\1.0.0\root\appSettings.json
```

or

```
**/application.yaml
```

:::div{.info}

If you are using a **Run a script** step, packages are extracted to a sub-directory with the name of the package reference. Please refer to [package files](/docs/deployments/custom-scripts/run-a-script-step/#referencing-packages-package-files) to learn more.
:::

Octopus will find the target files, match structures described by the names of Octopus variables, and replace their contents with the values of the variables.

### Selecting target files {#StructuredConfigurationVariablesFeature-SelectingTargetFiles}

Specify files that should have variable replacement applied to them. Multiple files can be supplied by separating them with a new line.

You can supply full paths to files, use wildcards to find multiple files in a directory, or use wildcards for a directory to find all files at that level or deeper:

**Specific file path**
```
ExampleProject\appSettings.json
```

**Match any .yaml files in the root directory**
```
*.yaml
```

**Match any .json files in the specified directory**
```
Config\*.json
```

**Match any .xml files in the specified directory or deeper**
```
Application/**/*.xml
```

The **Target File** field also supports [Variable Substitution Syntax](/docs/projects/variables/variable-substitutions), to allow things like referencing environment-specific files, or conditionally including them based on scoped variables. [Extended template syntax](/docs/projects/variables/variable-substitutions/#VariableSubstitutionSyntax-ExtendedSyntax) allows conditionals and loops to be used.

### How the file type for target files is determined

**Structured Configuration Variables** allows for replacement in JSON, YAML, XML, and Properties files. To determine what file type is being used, Octopus will first try and parse the file as JSON, and if it succeeds, it will treat the file as JSON. This is to ensure backwards compatibility, because this feature previously only supported JSON files.

If the file doesn't parse as JSON, Octopus refers to its file extension. If it is `yaml` or `yml`, the file will be parsed as YAML, if the extension is `xml`, the file will be parsed as XML, and finally if the extension is `properties` the file will be parsed as a Java Properties format.

If the file extension is not recognized (for example, a file with a `config` file extension), Octopus will try to parse the files using each of the supported formats until a matching format is found.

### Variable replacement {#StructuredConfigurationVariablesFeature-VariableReplacement}

Octopus uses variable names to identify the structures that should be replaced within the target files. If a structure within a target file has a hierarchical location that matches a variable name, its content will be replaced with the variable's value. The hierarchical location is identified differently depending on the type of target file:

- In JSON and YAML files, each location is identified by the sequence of keys leading to it from the root level, separated by `:`. 
- In XML files, structures can be identified by setting Octopus variable names to XPath expressions. 
- In Java Properties files, they have their keys matched against Octopus variable names. 

An example for each supported file type can be found in the following table:

| Format | Input file | Octopus variable name | Octopus variable value | Output file |
| ------ | ---------- | ---- | ----- | ----------- |
| JSON   | {"app": {"port": 80 }} | `app:port` | 4444 | {"app": {"port": 4444}} |
| YAML   | app:<br/>&nbsp;&nbsp;port: 80 | `app:port` | 4444 | app:<br/>&nbsp;&nbsp;port: 4444 |
| XML    | &lt;app&gt;&lt;port&gt;80&lt;/port&gt;&lt;/app&gt; | `/app/port` | 4444 | &lt;app&gt;&lt;port&gt;4444&lt;/port&gt;&lt;/app&gt; |
| Java Properties | app_port: 80 | `app_port` | 4444 | app_port: 4444 |

#### Variable names starting with the word Octopus

When targeting JSON and YAML files, care should be taken when naming variables to be used with the Structured Configuration Variables feature; Specifically, to avoid the use of the word `Octopus` in the name where possible. This is because Octopus provides a number of [system variables](/docs/projects/variables/system-variables) that start with the word `Octopus` that aren't intended for use with this feature. 

:::div{.warning}
Any variables that start with `Octopus` that **aren't** followed with a `:` are ignored when performing variable replacement on JSON and YAML files.
:::

Consider the following JSON input file:

```json
{
  "OctopusServer": {
    "WebPort": "80"
  }
}
```

If you had a variable named `OctopusServer:WebPort` with value `8080`, the value would *not be replaced* as the variable name starts with the word `Octopus`.

The easiest way to workaround this is to change the name of your variable to start with something other than the word `Octopus`. 

#### Variable casing

Octopus matches variable names to the structure in target files in a **case insensitive way**. 

For example, given the following JSON input file:

```json
{
  "app": {
    "port": "80"
  }
}
```

If you had a variable named `APP:PORT` with value `8080`, the value would be replaced despite the name of the variable being in upper case. The output file would become:

```json
{
  "app": {
    "port": "8080"
  }
}
```

For more information, refer to our [variable casing](/docs/projects/variables/#variable-casing) documentation.

## JSON and YAML

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

If you define [variables](/docs/projects/variables) in your Octopus project called `weatherApiUrl`, `weatherApiKey`, `port`, and `debug` with the values `test.weather.com`, `TEST7654321`, `80`, and `false`, the target config file is updated to become:

```json
{
   "weatherApiUrl": "test.weather.com",
   "weatherApiKey": "TEST7654321",
   "tempImageFolder": "C:\temp\img",
   "port": 80,
   "debug": false
}
```

Note that the `tempImageFolder` setting remains untouched, and the types of `port` and `debug` have not been changed. Octopus will attempt to keep the original type if the new value matches the type of the old value.

### Hierarchical variables {#StructuredConfigurationVariablesFeature-Hierarchicalvariables}

It is common (and encouraged) to use hierarchical variables in Structured configuration files. This is supported in Octopus variables by using a nested path syntax delimited by *colon* characters.

For example, to update the value of `weatherApi.url` and `weatherApi.key` in the target config file you would configure the Octopus variables `weatherApi:url` and `weatherApi:key`.

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

You can also replace an entire object. For the example above, you could set Octopus variable `weatherApi` to a value of `{"url":"test.weather.com","key":"TEST7654321"}`, which will result in this:

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

Variables can be set for `foo:bar:1` with a value `qux` which will update the value of the second element in the array or sequence to be `qux`, like so:

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

It's possible to replace an entire array or sequence too. In the previous example, if the Octopus variable `foo:bar` was set to `["baz","qux"]`, it would create outputs like:

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

The properties of objects in arrays can be replaced. In the example below, defining an Octopus variable `foo:bar:0:url` with the value of `test.weather.com` replaces the `url` property of the first object in the array:

**Replaced Object Property in Array Hierarchical JSON**
```json
{
   "foo": {
      "bar": [
         {
            "url": "test.weather.com",
            "key": "DEV1234567"
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
      url: test.weather.com
      key: DEV1234567
```

## XML

For XML files, the values to replace are located using the standard XPath syntax. Octopus supports both XPath 1 and XPath 2.

Octopus variables with names that are valid XPath expressions are matched against the target XML files. For example, if you have a variable called `//environment` with the value `production`, it will replace the contents of all `<environment>` elements with `production`.

### Replacing content

When replacing content, the replacement can only be as rich as what was originally there. If you select an element that contains only text, the replacement will be treated as text and structure-defining characters will be encoded as entity references. However, if you select an element that contains further element structures, the replacement is treated as an XML fragment, and structure-defining characters will be added as is.

This means that if you replace a password or connection string, any characters like `&`, `<` and `>` will be safely encoded within the string. For example, assume the target file contains the following:

```xml
<connectionString>Server=.;Database=db;User Id=admin;Password=password;</connectionString>
```

If you define a variable called `//connectionString` with the value `Server=.;Database=db;User Id=admin&boss;Password=Pass<word>1;` the structure will be updated as follows:

```xml
<connectionString>Server=.;Database=db;User Id=admin&amp;boss;Password=Pass&lt;word&gt;1;</connectionString>
```

:::div{.info}

This behavior of escaping special characters is [a requirement of the XML specification](https://www.w3.org/TR/2008/REC-xml-20081126/#syntax) (see section 2.4 for specifics), but any library or framework (such as IIS) reading the resulting XML document will automatically handle decoding those special characters when the value is retrieved.
:::

It's worth noting that an empty element, such as `<rules />`, contains no element structures and will only be filled with text. For example, assume the target file contains the following:

**Empty XML Element**
```xml
<configuration>
   <logging>
      <rules />
   </logging>
</configuration>
```

If the Octopus variable `/configuration/logging/rules` is specified with the value `<rule level="trace" />`, the value will be encoded as text, becoming:

**Empty XML Element Filled**
```xml
<configuration>
  <logging>
    <rules>&lt;rule level='trace' /&gt;</rules>
  </logging>
</configuration>
```

However, if the variable is named `/configuration/logging` to match the parent element, with the value `<rules><rule level="trace" /></rules>`, the value will be treated as an XML fragment because it is replacing an element structure (the `<rules />` element). This becomes:

**Empty XML Element Parent Replaced**
```xml
<configuration>
  <logging>
    <rules>
      <rule level="trace" />
    </rules>
  </logging>
</configuration>
```

### Replacing mixed content elements

Sometimes an element will contain a mixture of text and element structures. An example of this is:

```xml
<document>This is <b>mixed</b> content</document>
```

Because it contains an element structure, a replacement will be treated as an XML fragment. A variable named `/document` with the value of `<logger />` would result in:

```xml
<document>
  <logger />
</document>
```

Another option is to match and replace individual text nodes. A variable named `/document/child::text()[1]` with the value `just <text>` would result in:

```xml
<document>just &lt;text&gt;<b>mixed</b> content</document>
```

### Replacing attributes

Matching and replacing attribute values is supported with XPath. For example, assume the target file contains the following:

```xml
<configuration>
    <email role="admin">admin@example.com</email>
    <email role="user">user@example.com</email>
</configuration>
```

With the Octopus variable `/configuration/email/@role` with the value `developer`, the output will look like:

```xml
<configuration>
  <email role="developer">admin@example.com</email>
  <email role="developer">user@example.com</email>
</configuration>
```

Alternatively, to replace an element *based on its attribute*, you can apply the condition as a predicate. With a variable named `/configuration/email[@role='admin']` with the value `chief@example.org`, the output will look like:

```xml
<configuration>
  <email role="admin">chief@example.org</email>
  <email role="user">user@example.com</email>
</configuration>
```

Similar to the examples above, you can also replace other attribute values.  With a variable named `/configuration/email[@role='admin']/@address` with the value `chief@example.org`, the output will look like:

```xml
<configuration>
  <email role="admin" address="chief@example.org"></email>
  <email role="user" address="user@example.com"></email>
</configuration>
```


### XML CDATA sections

CDATA sections can be replaced just like any other node by selecting them with the XPath. When the content of the CDATA section is replaced, the CDATA presentation is maintained in the output. In the following example, `development` in the CDATA tag can be replaced with `prod<1>` by having a variable `/document/environment/text()` with the value `prod<1>`:

**XML Structure with CDATA**
```xml
<document>
    <environment><![CDATA[development]]></environment>
</document>
```

**XML Structure with CDATA Replaced**
```xml
<document>
  <environment><![CDATA[prod<1>]]></environment>
</document>
```

### Processing instructions

Processing instructions can be replaced using the XPath processing instruction selector like so: `/document/processing-instruction('xml-stylesheet')`. When replacing a processing instruction, it's not possible to replace the individual attributes. The whole processing instruction gets replaced with the supplied value. Take the following example:

**XML Structure Processing Instruction**
```xml
<document>
   <?xml-stylesheet type="text/xsl" href="/Content/Glossary/main.xsl"?>
</document>
```

When the Octopus variable `/document/processing-instruction('xml-stylesheet')` is set to `new value` the output will be the following:

**XML Structure Processing Instruction Replaced**
```xml
<document>
   <?xml-stylesheet new-value ?>
</document>
```

### Namespaces

When parsing the XML document, Octopus collects all namespace declarations for use in XPath expressions, so you can use any of the declared prefixes.

One limitation is that if the same prefix is declared more than once in a document, only the first will be available in XPath expressions. Because this is a potentially surprising situation, a warning will be logged, similar to the following:

```
The namespace 'http://octopus.com' could not be mapped to the 'octopus' prefix, as another namespace 'http://octopus.com/xml' is already mapped to that prefix. XPath selectors using this prefix may not return the expected nodes. You can avoid this by ensuring all namespaces in your document have unique prefixes.
```

**Root elements with namespaces**
If you have xml files that have a namespace on the root element, you might find your XPath expression doesn't match the root node. 
XPath provides different ways to select an element. One option to try is using a wildcard namespace in your XPath expression like `/*:rootelement/*:childelement`

Given the following xml:

```xml
<server xmlns="urn:my:domain:1.0">
  <properties>
    <property name="host.name" value="localhost" />
  </properties>
</server>
```
If you wanted to replace the value `localhost`, you could use the XPath expression of: `/*:server/*:properties/*:property[@name='host.name']/@value`

## Java properties 

Given this example of a target properties file:

```
weatherApiUrl = dev.weather.com
weatherApiKey = DEV1234567
tempImageFolder = C:\\temp\\img
logsFolder = C:\\logs
port = 8080
debug = true
```

If you define [variables](/docs/projects/variables) in your Octopus project called `weatherApiUrl`, `weatherApiKey`, `tempImageFolder`, `port`, and `debug` with the values `test.weather.com`, `TEST7654321`, `D:\temp\img`, `80`, and `false`, the target properties file is updated to become:

```
weatherApiUrl = test.weather.com
weatherApiKey = TEST7654321
tempImageFolder = D:\\temp\\img
logsFolder = C:\\logs
port = 80
debug = false
```

Note that the `logsFolder` setting remains untouched as there was no variable defined to override the value and that `tempImageFolder` has been encoded with the double `\`. Octopus will encode the variable in the correct encoding for the properties file format. 

Unlike JSON, YAML, and XML, it's not possible to do hierarchical replacement in a properties file as properties files are simple key value files. 
