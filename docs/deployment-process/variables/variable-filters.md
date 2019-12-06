---
title: Variable Filters
description: Octopus variable substitutions support *filters* to correctly encode values for a variety of target file types.
position: 18
---

By default, bindings are inserted into the output as-is; no consideration is given as to whether the target variable or file is XML, HTML, JSON etc. That is, the target file type is always treated as plain text.

Octopus variable substitutions support *filters* to correctly encode values for a variety of target file types. These are invoked using the `|` (pipe) operator.

Given the variable:

| Name          | Value         | Scope |
| ------------- | ------------- | ----- |
| `ProjectName` | `You & I`     |       |

An the template:

```powershell
<h3>#{ProjectName | HtmlEscape}</h3>
```

The result will be:

```powershell
<h3>You &amp; I</h3>
```

That is, the ampersand has been encoded correctly for use in an HTML document.

:::problem
The filters provided by Octopus are for use with trusted input; don't rely on them to sanitize data from potentially malicious sources.
:::

## Provided Filters {#VariableSubstitutionSyntax-Providedfilters}

Octopus provides the following filters:

| Name                                    | Purpose                                           | Example Input           | Example Output                   |
| --------------------------------------- | ------------------------------------------------- | ----------------------- | -------------------------------- |
| `ToLower`                               | Forces values to lowercase                        | `Automated Deployment`  | `automated deployment`           |
| `ToUpper`                               | Forces values to uppercase                        | `Automated Deployment`  | `AUTOMATED DEPLOYMENT`           |
| `ToBase64`                              | Converts values to Base64 (using UTF encoding)    | `Bar`                   | `QmF6`                           |
| `FromBase64`                            | Converts values from Base64 (using UTF encoding)  | `QmF6`                  | `Bar`                            |
| `HtmlEscape`                            | Escapes entities for use in HTML content          | `1 < 2`                 | `1 \&lt; 2`                      |
| `XmlEscape`                             | Escapes entities for use in XML content           | `1 < 2`                 | `1 \&lt; 2`                      |
| `JsonEscape`                            | Escapes data for use in JSON strings              | `He said "Hello!"`      | `He said \\"Hello!\\"`           |
| `MarkdownToHTML`                        | Converts Markdown to HTML                         | `This \_rocks\_`        | `\<p>This \<em>rocks\</em>\</p>` |
| [`NowDate`](#nowdate-and-nowdateutc)    | Outputs the current date                          |                         | `2016-11-03T08:53:11.0946448`    |
| [`NowDateUtc`](#nowdate-and-nowdateutc) | Outputs the current date in UTC                   |                         | `2016-11-02T23:01:46.9441479Z`   |
| [`Format`](#format)                     | Applies a format                                  | `4.3`                   | `$4.30`                          |
| [`Replace`](#replace)                   | Replaces a pattern                                | `1;2;3`                 | `1, 2, 3`                        |
| [`Trim`](#trim)                         | Removes whitespace from the start/end             | `···Bar···`             | `Bar`                            |
| [`Truncate`](#truncate)                 | Limits the length of values                       | `Octopus Deploy`        | `Octopus...`                     |
| [`Substring`](#substring)               | Extracts a range of characters by position        | `Octopus Deploy`        | `Deploy`                         |
| [`UriEscape`](https://docs.microsoft.com/en-us/dotnet/api/system.uri.escapeuristring?view=netframework-4.0)      | Escape a URI string        | `A b:c+d/e` | `A%20b:c+d/e`       |
| [`UriDataEscape`](https://docs.microsoft.com/en-us/dotnet/api/system.uri.escapedatastring?view=netframework-4.0) | Escape a URI data string   | `A b:c+d/e` | `A%20b%3Ac%2Bd%2Fe` |

### NowDate and NowDateUtc

The *NowDate* and *NowDateUtc* filters take no variable input but can take an additional optional right-hand-side argument the define the string format (Defaults to ISO-8601 [Round-trip format](https://msdn.microsoft.com/en-us/library/az4se3k1#Roundtrip)).

| MyFormat Variable | Filter Expression | Output                      |
| ----------------- | ----------------- | --------------------------- |
|                   | `#{ | NowDate }`                   | `2016-11-03T08:53:11.0946448` |
|                   | `#{ | NowDateUtc}`                 | `2016-11-02T23:01:46.9441479Z` |
|                   | `#{ | NowDate "HH dd-MMM-yyyy"}` | `09 03-Nov-2016` |
|                   | `#{ | NowDateUtc zz}`              | `+00` |
| dd-MM-yyyy        | `#{ | NowDate #{MyFormat}}`        | `03-Nov-2016` |

### Format

The *Format* filter introduced in **Octopus 3.5** allows for converting of input based on an additionally provided argument that is passed to the *`.ToString()`* method.

| MyVar Value           | Filter Expression                 | Output     |
| --------------------- | --------------------------------- | ---------- |
| `4.3`                 | `#{MyVar | Format C}`            | $4.30      |
| `2030/05/22 09:05:00` | `#{MyVar | Format yyyy}`         | 2030       |
|                       | `#{ | NowDate | Format Date MMM}` | Nov        |

### Replace

The *Replace* filter introduced in **Octopus 2018.8.4** performs a regular expression replace function on the variable. The regular expression should be provided in the [.NET Framework format](https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference). Double quotes need to be used around any expressions that contain whitespace or special characters. Expressions containing double quotes can not be expressed inline, but can be done via nested variables. If both the search and replace expressions are variables, ensure there is no space between the expressions.

| MyVar Value   | Filter Expression                       | Output                  |
| ------------- | --------------------------------------- | ----------------------- |
| `abc`         | `#{MyVar | Replace b}`                  | `ac`                    |
| `abc`         | `#{MyVar | Replace b X}`                | `aXc`                   |
| `a b c`       | `#{MyVar | Replace "a b" X}`            | `X c`                   |
| `ab12c3`      | `#{MyVar | Replace "[0-9]+" X}`         | `abXcX`                 |
| `abc`         | `#{MyVar | Replace "(.)b(.)" "$2X$1" }` | `cXa`                   |
| `abc`         | `#{MyVar | Replace #{match}#{replace}}` | `a_c` (when `match`=`b` and `replace`=`_`) |
| `abc`         | `#{MyVar | Replace #{match} _}`         | `a_c` (when `match`=`b`)                   |

### Trim

The *Trim* filter introduced in **Octopus 2019.8.0** removes any whitespace from the ends of the input. Both ends are trimmed unless an optional argument of `start` or `end` is provided.

| MyVar Value | Filter Expression       | Output   |
| ----------- | ----------------------- | -------- |
| `···Bar···` | `#{MyVar | Trim}`       | `Bar`    |
| `···Bar···` | `#{MyVar | Trim start}` | `Bar···` |
| `···Bar···` | `#{MyVar | Trim end}`   | `···Bar` |

### Truncate

The *Truncate* filter introduced in **Octopus 2019.8.0** limits the length of the input. If the input is longer than the length specified by the argument, the rest is replaced with an ellipsis.

| MyVar Value      | Filter Expression       | Output       |
| ---------------- | ----------------------- | ------------ |
| `Octopus Deploy` | `#{MyVar | Truncate 7}` | `Octopus...` |
| `abc`            | `#{MyVar | Truncate 7}` | `abc`        |

### Substring

The *Substring* filter introduced in **Octopus 2019.8.0** extracts a range of characters from the input and outputs them. If two arguments are supplied, they are interpreted as start and end offsets of the range. If only one argument is supplied, it is interpreted as the end offset of a range starting at 0.

| MyVar Value      | Filter Expression          | Output       |
| ---------------- | -------------------------- | ------------ |
| `Octopus Deploy` | `#{MyVar | Substring 8 6}` | `Deploy`     |
| `Octopus Deploy` | `#{MyVar | Substring 7}`   | `Octopus`    |
| `Octopus Deploy` | `#{MyVar | Substring 2 3}` | `top`        |

### UriPart

The *UriPart* filter introduced in **Octopus 2019.10.9** parses the input as a URI and extracts a specified part of it. A  helpful error will be written to the output if there is an error in the input or the filter expression.

| MyVar Value                             | Filter Expression                    | Output                     |
| --------------------------------------- | ------------------------------------ | -------------------------- |
| `https://octopus.com/docs`              | `#{MyVar | UriPart AbsolutePath}`    | `/docs`                    |
| `https://octopus.com/docs`              | `#{MyVar | UriPart AbsoluteUri}`     | `https://octopus.com/docs` |
| `https://octopus.com/docs`              | `#{MyVar | UriPart Authority}`       | `octopus.com`              |
| `https://octopus.com/docs`              | `#{MyVar | UriPart DnsSafeHost}`     | `octopus.com`              |
| `https://octopus.com/docs#filters`      | `#{MyVar | UriPart Fragment}`        | `#filters`                 |
| `https://octopus.com/docs`              | `#{MyVar | UriPart Host}`            | `octopus.com`              |
| `https://octopus.com/docs`              | `#{MyVar | UriPart HostAndPort}`     | `octopus.com:443`          |
| `https://octopus.com/docs`              | `#{MyVar | UriPart HostNameType}`    | `Dns`                      |
| `https://octopus.com/docs`              | `#{MyVar | UriPart IsAbsoluteUri}`   | `true`                     |
| `https://octopus.com/docs`              | `#{MyVar | UriPart IsDefaultPort}`   | `true`                     |
| `https://octopus.com/docs`              | `#{MyVar | UriPart IsFile}`          | `false`                    |
| `https://octopus.com/docs`              | `#{MyVar | UriPart IsLoopback}`      | `false`                    |
| `https://octopus.com/docs`              | `#{MyVar | UriPart IsUnc}`           | `false`                    |
| `https://octopus.com/docs`              | `#{MyVar | UriPart Path}`            | `/docs`                    |
| `https://octopus.com/docs?filter=faq`   | `#{MyVar | UriPart PathAndQuery}`    | `/docs?filter=faq`         |
| `https://octopus.com/docs`              | `#{MyVar | UriPart Port}`            | `443`                      |
| `https://octopus.com/docs?filter=faq`   | `#{MyVar | UriPart Query}`           | `?filter=faq`              |
| `https://octopus.com/docs`              | `#{MyVar | UriPart Scheme}`          | `https`                    |
| `https://octopus.com/docs`              | `#{MyVar | UriPart SchemeAndServer}` | `https://octopus.com`      |
| `https://username:password@octopus.com` | `#{MyVar | UriPart UserInfo}`        | `username:password`        |


:::hint
Filters were introduced in **Octopus 3.5**.
:::

## Differences From Regular Variable Bindings {#VariableSubstitutionSyntax-Differencesfromregularvariablebindings}

Because of the flexibility provided by the extended syntax, variables that are not defined will result in the source text, e.g. `#{UndefinedVar}` being echoed rather than an empty string, so that evaluation problems are easier to spot and debug. The `if` construct can be used to selectively bind to a variable only when it is defined, e.g. to obtain identical "empty" variable functionality as shown in the first example:

```powershell
Server=#{if DatabaseServer}#{DatabaseServer}#{/if};
```

## JSON Parsing {#VariableSubstitutionSyntax-JSONParsingjson}

Octostache 2.x (bundled with **Octopus 3.5**) includes an update to support parsing JSON formatted variables natively, and using their contained properties for variable substitution.

Given the variable:

| Name                        | Value                                    | Scope |
| --------------------------- | ---------------------------------------- | ----- |
| `Custom.MyJson`             | `{Name: "t-shirt", Description: "I am a shirt", Sizes: [{size: "small", price: 15.00}, {size: "large", price: 20.00}]}` |       |
| `Custom.MyJson.Description` | `Shirts are not shorts.`                 |       |

And the template:

```powershell
<h1>#{Custom.MyJson[Name]}</h1>
#{Custom.MyJson.Name} - #{Custom.MyJson.Description}
From: #{Custom.MyJson.Sizes[0].price | Format C}
Sizes: #{Custom.MyJson.Sizes}
```

The result will be:

```powershell
<h1>t-shirt</h1>
t-shirt - Shirts are not shorts
From: $15.00
Sizes: [{size: "small", price: 15.00}, {size: "large", price: 20.00}]
```

There are a few things to note here:

- The *Name* property is extracted from the JSON using either dot-notation or indexing.
- Providing an explicit project variable overrides one obtained by walking through the JSON.
- Arrays can be accessed using standard numerical index notation.
- Variables can map to a sub-section of the JSON variable.

### Repetition Over JSON {#VariableSubstitutionSyntax-RepetitionoverJSON}

Give the variables:

| Name      | Value                                    |
| --------- | ---------------------------------------- |
| MyNumbers | `[5,2,4]`                                |
| MyObjects | `{Cat: {Price: 11.5, Description: "Meow"}, Dog: {Price: 17.5, Description: "Woof"}}` |

And the template:

```powershell
Numbers:
#{each number in MyNumbers}
 - #{number}
#{/each}

Objects:
#{each item in MyObjects}
	#{item.Key}: #{item.Value.Price}
#{/each} 
```

The resulting text will be:

```powershell
Numbers:
 - 5
 - 2
 - 4
 
Objects:
Cat: 11.5
Dog: 17.5
```
