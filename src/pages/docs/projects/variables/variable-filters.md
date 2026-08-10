---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-28
title: Variable filters
icon: fa-solid fa-filter
description: Octopus variable substitutions support *filters* to correctly encode values for a variety of target file types.
navOrder: 18
---

By default, bindings are inserted into the output as-is; no consideration is given as to whether the target variable or file is XML, HTML, JSON etc. That is, the target file type is always treated as plain text.

Octopus variable substitutions support *filters* to correctly encode values for a variety of target file types. These are invoked using the `|` (pipe) operator.

Given the variable:

| Name          | Value     | Scope |
|---------------|-----------|-------|
| `ProjectName` | `You & I` |       |

And the template:

```html
<h3>#{ProjectName | HtmlEscape}</h3>
```

The result will be:

```html
<h3>You &amp; I</h3>
```

That is, the ampersand has been encoded correctly for use in an HTML document.

:::div{.problem}

The filters provided by Octopus are for use with trusted input; don't rely on them to sanitize data from potentially malicious sources.
:::

## Provided filters

Octopus provides a number of different types of filters for variable values:

- [Core filters](#core-filters)
- [Comparison filters](#comparison-filters)
- [Conversion filters](#conversion-filters)
- [Date filters](#date-filters)
- [Escaping filters](#escaping-filters)
- [Extraction filters](#extraction-filters)

## Core filters {#core-filters}

These core filters perform common string operations.

| Name                      | Purpose                                    | Example input          | Example output         |
|---------------------------|--------------------------------------------|------------------------|------------------------|
| [`Format`](#format)       | Applies a format                           | `4.3`                  | `$4.30`                |
| [`Replace`](#replace)     | Replaces a pattern                         | `1;2;3`                | `1, 2, 3`              |
| `ToLower`                 | Forces values to lowercase                 | `Automated Deployment` | `automated deployment` |
| `ToUpper`                 | Forces values to uppercase                 | `Automated Deployment` | `AUTOMATED DEPLOYMENT` |
| [`Trim`](#trim)           | Removes whitespace from the start/end      | `···Bar···`            | `Bar`                  |
| [`Truncate`](#truncate)   | Limits the length of values                | `Octopus Deploy`       | `Octopus...`           |
| [`Substring`](#substring) | Extracts a range of characters by position | `Octopus Deploy`       | `Deploy`               |

### Format

The *Format* filter allows for converting of input based on an additionally provided argument that is passed to the *`.ToString()`* method.

| MyVar Value                     | Filter Expression                     | Output            |
|---------------------------------|---------------------------------------|-------------------|
| `4.3`                           | `#{MyVar \| Format C}`                | $4.30             |
| `2030/05/22 09:05:00`           | `#{MyVar \| Format yyyy}`             | 2030              |
|                                 | `#{ \| NowDate \| Format Date MMM}`   | Nov               |
| `#{Octopus.Deployment.Created}` | `#{MyVar \| Format "MM/dd/yyyy"}`     | `01/01/2020`      |
| `#{Octopus.Deployment.Created}` | `#{MyVar \| Format "hh:mm:ss tt zz"}` | `11:09:38 AM +01` |

### Replace

The *Replace* filter performs a regular expression replace function on the variable. The regular expression should be provided in the [.NET format](https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference). Double quotes need to be used around any expressions that contain whitespace or special characters. Expressions containing double quotes can not be expressed inline, but can be done via nested variables. If both the search and replace expressions are variables, ensure there is no space between the expressions. For using Replace on special characters, you should escape the first parameter which will be the regex but the second parameter can be left as a string - see last example below.

| MyVar Value | Filter Expression                         | Output                                     |
|-------------|-------------------------------------------|--------------------------------------------|
| `abc`       | `#{MyVar \| Replace b}`                   | `ac`                                       |
| `abc`       | `#{MyVar \| Replace b X}`                 | `aXc`                                      |
| `a b c`     | `#{MyVar \| Replace "a b" X}`             | `X c`                                      |
| `ab12c3`    | `#{MyVar \| Replace "[0-9]+" X}`          | `abXcX`                                    |
| `abc`       | `#{MyVar \| Replace "(.)b(.)" "$2X$1" }`  | `cXa`                                      |
| `abc`       | `#{MyVar \| Replace #{match} #{replace}}` | `a_c` (when `match`=`b` and `replace`=`_`) |
| `abc`       | `#{MyVar \| Replace #{match} _}`          | `a_c` (when `match`=`b`)                   |
| `a\b`       | `#{MyVar \| Replace "\\" "\\\\"}`         | `a\\b`                                     |

### Substring

The *Substring* filter extracts a range of characters from the input and outputs them. If two arguments are supplied, they are interpreted as start and end offsets of the range. If only one argument is supplied, it is interpreted as the end offset of a range starting at 0.

| MyVar Value      | Filter Expression           | Output    |
|------------------|-----------------------------|-----------|
| `Octopus Deploy` | `#{MyVar \| Substring 8 6}` | `Deploy`  |
| `Octopus Deploy` | `#{MyVar \| Substring 7}`   | `Octopus` |
| `Octopus Deploy` | `#{MyVar \| Substring 2 3}` | `top`     |

### Trim

The *Trim* filter removes any whitespace from the ends of the input. Both ends are trimmed unless an optional argument of `start` or `end` is provided.

| MyVar Value | Filter Expression        | Output   |
|-------------|--------------------------|----------|
| `···Bar···` | `#{MyVar \| Trim}`       | `Bar`    |
| `···Bar···` | `#{MyVar \| Trim start}` | `Bar···` |
| `···Bar···` | `#{MyVar \| Trim end}`   | `···Bar` |

### Truncate

The *Truncate* filter limits the length of the input. If the input is longer than the length specified by the argument, the rest is replaced with an ellipsis.

| MyVar Value      | Filter Expression        | Output       |
|------------------|--------------------------|--------------|
| `Octopus Deploy` | `#{MyVar \| Truncate 7}` | `Octopus...` |
| `abc`            | `#{MyVar \| Truncate 7}` | `abc`        |

## Comparison filters {#comparison-filters}

These filters return `true` or `false` depending on the result of a comparison. They are typically useful for specifying the condition in an `#{if}` block.

| Name                                              | Purpose                                                                 | Example input    | Example output |
|---------------------------------------------------|-------------------------------------------------------------------------|------------------|----------------|
| [`Contains`](#startswith-endswith-and-contains)   | Determines whether a string contains a given string                     | `Octopus Dep`    | `true`         |
| [`EndsWith`](#startswith-endswith-and-contains)   | Determines whether the end of a string matches a given string           | `Deploy`         | `true`         |
| [`Match`](#match)                                 | Determines whether a string contains a given regular expression pattern | `"Octo.*Deploy"` | `true`         |
| [`StartsWith`](#startswith-endswith-and-contains) | Determines whether the beginning of a string matches a given string     | `Octo`           | `true`         |

### Match

The *Match* filter searches the input for an occurrence of a given regular expression pattern. It returns `true` if an occurrence is found, and `false` otherwise. The regular expression should be provided in the [.NET format](https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference). Double quotes need to be used around any expressions that contain whitespace or special characters. Expressions containing double quotes can not be expressed inline, but can be done via nested variables.

| MyVar Value | Filter Expression              | Output                      |
|-------------|--------------------------------|-----------------------------|
| `abc`       | `#{MyVar \| Match abc}`        | `true`                      |
| `abc`       | `#{MyVar \| Match def}`        | `false`                     |
| `a b c`     | `#{MyVar \| Match "a b"}`      | `true`                      |
| `ab12c3`    | `#{MyVar \| Match "ab[0-9]+"}` | `true`                      |
| `abc`       | `#{MyVar \| Match #{pattern}}` | `true` (when `match`=`abc`) |

### StartsWith, EndsWith and Contains

The *StartsWith*, *EndsWith* and *Contains* filters compare the input to a given string argument. They return `true` if the argument matches, and `false` otherwise. The comparison is case-sensitive. Strings are compared as [Ordinals](https://docs.microsoft.com/en-us/dotnet/api/system.stringcomparison). Double quotes need to be used around any expressions that contain whitespace or special characters. Expressions containing double quotes can not be expressed inline, but can be done via nested variables.

| MyVar Value | Filter Expression             | Output                    |
|-------------|-------------------------------|---------------------------|
| `abc`       | `#{MyVar \| StartsWith ab}`   | `true`                    |
| `abc`       | `#{MyVar \| StartsWith bc}`   | `false`                   |
| `abc`       | `#{MyVar \| StartsWith Ab}`   | `false`                   |
| `abc`       | `#{MyVar \| EndsWith bc}`     | `true`                    |
| `abc`       | `#{MyVar \| EndsWith ab}`     | `false`                   |
| `abc`       | `#{MyVar \| EndsWith bC}`     | `false`                   |
| `abc`       | `#{MyVar \| Contains bc}`     | `true`                    |
| `abc`       | `#{MyVar \| Contains ab}`     | `true`                    |
| `abc`       | `#{MyVar \| Contains AbC}`    | `false`                   |
| `a b(c`     | `#{MyVar \| Contains " b("}`  | `true`                    |
| `a"b"c`     | `#{MyVar \| Contains #{str}}` | `true` (when `str`=`"b"`) |

## Conversion filters {#conversion-filters}

These filters provide a mechanism to convert a value from one form to another.

| Name             | Purpose                                          | Example input    | Example output                   |
|------------------|--------------------------------------------------|------------------|----------------------------------|
| `FromBase64`     | Converts values from Base64 (using UTF encoding) | `QmF6`           | `Bar`                            |
| `ToBase64`       | Converts values to Base64 (using UTF encoding)   | `Bar`            | `QmF6`                           |
| `MarkdownToHTML` | Converts Markdown to HTML                        | `This \_rocks\_` | `\<p>This \<em>rocks\</em>\</p>` |

## Date filters {#date-filters}

These filters are used to work with dates.

| Name                                    | Purpose                              | Example input         | Example output                 |
|-----------------------------------------|--------------------------------------|-----------------------|--------------------------------|
| [`AddSeconds`](#date-add-filters)       | Shifts a date by a number of seconds | `2016-11-03T08:53:11` | `2016-11-03T08:53:41.0000000`  |
| [`AddMinutes`](#date-add-filters)       | Shifts a date by a number of minutes | `2016-11-03T08:53:11` | `2016-11-03T08:55:11.0000000`  |
| [`AddHours`](#date-add-filters)         | Shifts a date by a number of hours   | `2016-11-03T08:53:11` | `2016-11-03T10:53:11.0000000`  |
| [`AddDays`](#date-add-filters)          | Shifts a date by a number of days    | `2016-11-03T08:53:11` | `2016-11-05T08:53:11.0000000`  |
| [`AddWeeks`](#date-add-filters)         | Shifts a date by a number of weeks   | `2016-11-03T08:53:11` | `2016-11-10T08:53:11.0000000`  |
| [`AddMonths`](#addmonths)               | Shifts a date by whole months        | `2016-11-03T08:53:11` | `2016-12-03T08:53:11.0000000`  |
| [`AddTimeSpan`](#addtimespan)           | Shifts a date by a time span         | `2016-11-03T08:53:11` | `2016-11-03T10:53:11.0000000`  |
| [`NowDate`](#nowdate-and-nowdateutc)    | Outputs the current date             |                       | `2016-11-03T08:53:11.0946448`  |
| [`NowDateUtc`](#nowdate-and-nowdateutc) | Outputs the current date in UTC      |                       | `2016-11-02T23:01:46.9441479Z` |

### Date add filters {#date-add-filters}

*AddSeconds*, *AddMinutes*, *AddHours*, *AddDays* and *AddWeeks* shift a date by the given number of units and output the result in ISO-8601 [Round-trip format](https://msdn.microsoft.com/en-us/library/az4se3k1#Roundtrip), ready to be chained into [`Format`](#format).

The amount can be negative to shift a date backwards. Fractional amounts are supported, but must be quoted, because an unquoted argument can't contain a decimal point.

| MyVar Value           | Filter Expression                                        | Shift                 | Output                        |
|-----------------------|----------------------------------------------------------|-----------------------|-------------------------------|
| `2016-11-03T08:53:11` | `#{MyVar \| AddSeconds 30}`                              | 30 seconds            | `2016-11-03T08:53:41.0000000` |
| `2016-11-03T08:53:11` | `#{MyVar \| AddMinutes 2}`                               | 2 minutes             | `2016-11-03T08:55:11.0000000` |
| `2016-11-03T08:53:11` | `#{MyVar \| AddHours 2}`                                 | 2 hours               | `2016-11-03T10:53:11.0000000` |
| `2016-11-03T08:53:11` | `#{MyVar \| AddHours -2}`                                | 2 hours back          | `2016-11-03T06:53:11.0000000` |
| `2016-11-03T08:53:11` | `#{MyVar \| AddHours 48}`                                | 48 hours              | `2016-11-05T08:53:11.0000000` |
| `2016-11-03T08:53:11` | `#{MyVar \| AddHours "1.5"}`                             | 90 minutes            | `2016-11-03T10:23:11.0000000` |
| `2016-11-03T08:53:11` | `#{MyVar \| AddDays 2}`                                  | 2 days                | `2016-11-05T08:53:11.0000000` |
| `2016-11-03T08:53:11` | `#{MyVar \| AddDays "2.5"}`                              | 2.5 days, ie 60 hours | `2016-11-05T20:53:11.0000000` |
| `2016-11-03T08:53:11` | `#{MyVar \| AddWeeks 1}`                                 | 1 week                | `2016-11-10T08:53:11.0000000` |
| `2016-11-03T08:53:11` | `#{MyVar \| AddHours 2 \| Format "yyyy-MM-dd HH:mm:ss"}` | 2 hours               | `2016-11-03 10:53:11`         |
|                       | `#{ \| NowDate \| AddHours 2}`                           | 2 hours               | `2016-11-03T10:53:11.0946448` |

The filters can be chained to combine units, for example `#{MyVar | AddMonths 1 | AddDays 1 | AddHours 2}`.

All of the date add filters preserve how the input expressed its time zone: a value with no offset stays without one, a UTC value stays in UTC, and a value with an explicit offset keeps that offset rather than being converted to the server's local time.

If the input isn't a date, or the amount can't be parsed, the expression is left unevaluated and appears in the output as written. An unreplaced `#{...}` means the filter couldn't be applied, not that the value was empty.

### AddMonths

Calendar months vary in length, so *AddMonths* shifts by month rather than by a fixed duration, and takes **whole months only**. A fractional amount such as `AddMonths "1.5"` is rejected and left unevaluated.

:::div{.info}
When the starting day doesn't exist in the target month, the result is clamped to the last day of that month. This matches [DateTime.AddMonths](https://learn.microsoft.com/en-us/dotnet/api/system.datetime.addmonths).
:::

| MyVar Value  | Filter Expression          | Output       | Why                              |
|--------------|----------------------------|--------------|----------------------------------|
| `2030-05-22` | `#{MyVar \| AddMonths 1}`  | `2030-06-22` |                                  |
| `2030-05-22` | `#{MyVar \| AddMonths 12}` | `2031-05-22` |                                  |
| `2030-01-31` | `#{MyVar \| AddMonths 1}`  | `2030-02-28` | Clamped, February is short       |
| `2032-01-31` | `#{MyVar \| AddMonths 1}`  | `2032-02-29` | Clamped to a leap year February  |
| `2030-03-31` | `#{MyVar \| AddMonths -1}` | `2030-02-28` | Clamping applies going backwards |

### AddTimeSpan

*AddTimeSpan* shifts a date by a compound time span, for use when a single unit isn't enough. The time span is written as:

```text
{days}.{hours}:{minutes}:{seconds}
```

The `{days}.` part is optional. When it is left off, the remaining fields are read as `{hours}:{minutes}:{seconds}`. The full set of accepted forms is described in the .NET [TimeSpan.Parse](https://learn.microsoft.com/en-us/dotnet/api/system.timespan.parse#remarks) documentation.

:::div{.warning}
**`AddTimeSpan 48:00:00` is 48 days, not 48 hours.**

The `{hours}` field only holds values from 0 to 23. Once the leading field goes above 23 it is no longer read as hours — it becomes `{days}`, and every other field shifts along with it:

| Time span  | Reading                       | Actual shift                                                      |
|------------|-------------------------------|-------------------------------------------------------------------|
| `23:00:00` | `{hours}:{minutes}:{seconds}` | 23 hours                                                          |
| `24:00:00` | `{days}:{hours}:{minutes}`    | **24 days**                                                       |
| `48:00:00` | `{days}:{hours}:{minutes}`    | **48 days**                                                       |
| `24:01:02` | `{days}:{hours}:{minutes}`    | **24 days, 1 hour, 2 minutes** — the `02` is minutes, not seconds |

This is silent. Nothing fails, and the deployment proceeds with the wrong date.

Prefer [`AddHours`](#date-add-filters) when you mean hours: `AddHours 48` is unambiguous, where `AddTimeSpan 48:00:00` is not.
:::

:::div{.hint}
The day form contains a `.`, which is not valid in an unquoted filter argument, so it has to be quoted: `#{MyVar | AddTimeSpan "2.00:00:00"}`. Forms without a `.` can be written either way.
:::

| MyVar Value           | Filter Expression                      | Shift                 | Output                        |
|-----------------------|----------------------------------------|-----------------------|-------------------------------|
| `2016-11-03T08:53:11` | `#{MyVar \| AddTimeSpan 02:00:00}`     | 2 hours               | `2016-11-03T10:53:11.0000000` |
| `2016-11-03T08:53:11` | `#{MyVar \| AddTimeSpan 00:02:00}`     | 2 minutes             | `2016-11-03T08:55:11.0000000` |
| `2016-11-03T08:53:11` | `#{MyVar \| AddTimeSpan -02:00:00}`    | 2 hours back          | `2016-11-03T06:53:11.0000000` |
| `2016-11-03T08:53:11` | `#{MyVar \| AddTimeSpan "2.00:00:00"}` | 2 days                | `2016-11-05T08:53:11.0000000` |
| `2016-11-03T08:53:11` | `#{MyVar \| AddTimeSpan "2.12:00:00"}` | 2.5 days, ie 60 hours | `2016-11-05T20:53:11.0000000` |
| `2016-11-03T08:53:11` | `#{MyVar \| AddTimeSpan "1.02:30:00"}` | 1 day, 2.5 hours      | `2016-11-04T11:23:11.0000000` |

#### Deriving a change window from a deployment's start time

A common use is deriving an end time from a start time. For example, to give a ServiceNow change request a two hour implementation window:

| Name                                   | Value                                                                     |
|----------------------------------------|---------------------------------------------------------------------------|
| `Octopus.ServiceNow.Field[start_date]` | `#{Octopus.Task.QueueTime \| Format "yyyy-MM-dd HH:mm:ss"}`               |
| `Octopus.ServiceNow.Field[end_date]`   | `#{Octopus.Task.QueueTime \| AddHours 2 \| Format "yyyy-MM-dd HH:mm:ss"}` |

:::div{.warning}
`Octopus.Task.QueueTime` is the time the task was **queued**, not the time it started executing. The window above therefore starts counting down the moment the deployment joins the queue.

For a deployment that starts straight away this is effectively the current time, so the two are interchangeable. But if the task waits — behind another deployment, on a busy worker pool, or because it was scheduled for later — the window will already be partly or entirely used up by the time the deployment actually runs, and a change request can fall outside its own implementation window before any steps execute.

Where that matters, size the window against the worst-case queue wait rather than the expected run time. To vary it per environment, scope the whole expression rather than just the number of hours:

| Name              | Value                                                                     | Scope      |
|-------------------|---------------------------------------------------------------------------|------------|
| `ChangeWindowEnd` | `#{Octopus.Task.QueueTime \| AddHours 2 \| Format "yyyy-MM-dd HH:mm:ss"}` |            |
| `ChangeWindowEnd` | `#{Octopus.Task.QueueTime \| AddHours 8 \| Format "yyyy-MM-dd HH:mm:ss"}` | Production |

then set `Octopus.ServiceNow.Field[end_date]` to `#{ChangeWindowEnd}`.

The number of hours has to be written into each scoped value rather than supplied as `AddHours #{WindowHours}`, because a filter argument that is itself a variable can't be followed by another filter in the same chain. That restriction applies to all filters that take arguments.
:::

### NowDate and NowDateUtc

The *NowDate* and *NowDateUtc* filters take no variable input but can take an additional optional right-hand side argument to define the string format (Defaults to ISO-8601 [Round-trip format](https://msdn.microsoft.com/en-us/library/az4se3k1#Roundtrip)).

| MyFormat Variable | Filter Expression                 | Output                         |
|-------------------|-----------------------------------|--------------------------------|
|                   | `#{ \| NowDate }`                 | `2016-11-03T08:53:11.0946448`  |
|                   | `#{ \| NowDateUtc}`               | `2016-11-02T23:01:46.9441479Z` |
|                   | `#{ \| NowDate "HH dd-MMM-yyyy"}` | `09 03-Nov-2016`               |
|                   | `#{ \| NowDateUtc zz}`            | `+00`                          |
| dd-MM-yyyy        | `#{ \| NowDate #{MyFormat}}`      | `03-Nov-2016`                  |

## Escaping filters {#escaping-filters}

These filters apply format-specific escaping rules.

| Name                                                                                                             | Purpose                                            | Example input      | Example output         |
|------------------------------------------------------------------------------------------------------------------|----------------------------------------------------|--------------------|------------------------|
| `HtmlEscape`                                                                                                     | Escapes entities for use in HTML content           | `1 < 2`            | `1 \&lt; 2`            |
| `JsonEscape`                                                                                                     | Escapes data for use in JSON strings               | `He said "Hello!"` | `He said \\"Hello!\\"` |
| `PropertiesKeyEscape`                                                                                            | Escapes data for use in .properties keys           | `Hey: x=y`         | `Hey\:\ x\=y`          |
| `PropertiesValueEscape`                                                                                          | Escapes data for use in .properties values         | `a\b=c`            | `a\\b=c`               |
| [`UriEscape`](https://docs.microsoft.com/en-us/dotnet/api/system.uri.escapeuristring?view=netframework-4.0)      | Escape a URI string                                | `A b:c+d/e`        | `A%20b:c+d/e`          |
| [`UriDataEscape`](https://docs.microsoft.com/en-us/dotnet/api/system.uri.escapedatastring?view=netframework-4.0) | Escape a URI data string                           | `A b:c+d/e`        | `A%20b%3Ac%2Bd%2Fe`    |
| `XmlEscape`                                                                                                      | Escapes entities for use in XML content            | `1 < 2`            | `1 \&lt; 2`            |
| `YamlDoubleQuoteEscape`                                                                                          | Escapes data for use in YAML double quoted strings | `"Hello"\Goodbye`  | `\"Hello\"\\Goodbye`   |
| `YamlSingleQuoteEscape`                                                                                          | Escapes data for use in YAML single quoted strings | `The bee's knees`  | `The bee''s knees`     |

## Extraction filters {#extraction-filters}

These filters extract a part of value.

| Name                       | Purpose                                                              | Example input                   | Example output  |
|----------------------------|----------------------------------------------------------------------|---------------------------------|-----------------|
| [`UriPart`](#uripart)      | Extracts a specified part of a URI string                            | `https://octopus.com/docs`      | `/docs`         |
| `VersionMajor`             | Extracts the major version field from a version string               | `1.2.3.4-my-branch.1.2+build10` | `1`             |
| `VersionMinor`             | Extracts the minor version field from a version string               | `1.2.3.4-my-branch.1.2+build10` | `2`             |
| `VersionPatch`             | Extracts the patch version field from a version string               | `1.2.3.4-my-branch.1.2+build10` | `3`             |
| `VersionRevision`          | Extracts the revision version field from a version string            | `1.2.3.4-my-branch.1.2+build10` | `4`             |
| `VersionPreRelease`        | Extracts the prerelease field from a version string                  | `1.2.3.4-my-branch.1.2+build10` | `my-branch.1.2` |
| `VersionPreReleasePrefix`  | Extracts the prefix from the prerelease field from a version string  | `1.2.3.4-my-branch.1.2+build10` | `my-branch`     |
| `VersionPreReleaseCounter` | Extracts the counter from the prerelease field from a version string | `1.2.3.4-my-branch.1.2+build10` | `1.2`           |
| `VersionMetadata`          | Extracts the metadata field from a version string                    | `1.2.3.4-my-branch.1.2+build10` | `build10`       |

### UriPart

The *UriPart* filter parses the input as a URI and extracts a specified part of it. A helpful error will be written to the output if there is an error in the input or the filter expression.

| MyVar Value                             | Filter Expression                     | Output                     |
|-----------------------------------------|---------------------------------------|----------------------------|
| `https://octopus.com/docs`              | `#{MyVar \| UriPart AbsolutePath}`    | `/docs`                    |
| `https://octopus.com/docs`              | `#{MyVar \| UriPart AbsoluteUri}`     | `https://octopus.com/docs` |
| `https://octopus.com/docs`              | `#{MyVar \| UriPart Authority}`       | `octopus.com`              |
| `https://octopus.com/docs`              | `#{MyVar \| UriPart DnsSafeHost}`     | `octopus.com`              |
| `https://octopus.com/docs#filters`      | `#{MyVar \| UriPart Fragment}`        | `#filters`                 |
| `https://octopus.com/docs`              | `#{MyVar \| UriPart Host}`            | `octopus.com`              |
| `https://octopus.com/docs`              | `#{MyVar \| UriPart HostAndPort}`     | `octopus.com:443`          |
| `https://octopus.com/docs`              | `#{MyVar \| UriPart HostNameType}`    | `Dns`                      |
| `https://octopus.com/docs`              | `#{MyVar \| UriPart IsAbsoluteUri}`   | `true`                     |
| `https://octopus.com/docs`              | `#{MyVar \| UriPart IsDefaultPort}`   | `true`                     |
| `https://octopus.com/docs`              | `#{MyVar \| UriPart IsFile}`          | `false`                    |
| `https://octopus.com/docs`              | `#{MyVar \| UriPart IsLoopback}`      | `false`                    |
| `https://octopus.com/docs`              | `#{MyVar \| UriPart IsUnc}`           | `false`                    |
| `https://octopus.com/docs`              | `#{MyVar \| UriPart Path}`            | `/docs`                    |
| `https://octopus.com/docs?filter=faq`   | `#{MyVar \| UriPart PathAndQuery}`    | `/docs?filter=faq`         |
| `https://octopus.com/docs`              | `#{MyVar \| UriPart Port}`            | `443`                      |
| `https://octopus.com/docs?filter=faq`   | `#{MyVar \| UriPart Query}`           | `?filter=faq`              |
| `https://octopus.com/docs`              | `#{MyVar \| UriPart Scheme}`          | `https`                    |
| `https://octopus.com/docs`              | `#{MyVar \| UriPart SchemeAndServer}` | `https://octopus.com`      |
| `https://username:password@octopus.com` | `#{MyVar \| UriPart UserInfo}`        | `username:password`        |

## Differences from regular variable bindings {#differences-from-regular-bindings}

Because of the flexibility provided by the extended syntax, variables that are not defined will result in the source text, e.g. `#{UndefinedVar}` being echoed rather than an empty string, so that evaluation problems are easier to spot and debug. The `if` construct can be used to selectively bind to a variable only when it is defined, e.g. to obtain identical "empty" variable functionality as shown in the first example:

```powershell
Server=#{if DatabaseServer}#{DatabaseServer}#{/if};
```

## JSON parsing {#json-parsing}

Octostache 2.x includes an update to support parsing JSON formatted variables natively, and using their contained properties for variable substitution.

Given the variable:

| Name                        | Value                                                                                                                   | Scope |
|-----------------------------|-------------------------------------------------------------------------------------------------------------------------|-------|
| `Custom.MyJson`             | `{Name: "t-shirt", Description: "I am a shirt", Sizes: [{size: "small", price: 15.00}, {size: "large", price: 20.00}]}` |       |
| `Custom.MyJson.Description` | `Shirts are not shorts.`                                                                                                |       |

And the template:

```html
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

### Repetition over json {#repetition-over-json}

Given the variables:

| Name      | Value                                                                                |
|-----------|--------------------------------------------------------------------------------------|
| MyNumbers | `[5,2,4]`                                                                            |
| MyObjects | `{Cat: {Price: 11.5, Description: "Meow"}, Dog: {Price: 17.5, Description: "Woof"}}` |

And the template:

```yaml
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

```yaml
Numbers:
 - 5
 - 2
 - 4
 
Objects:
Cat: 11.5
Dog: 17.5
```

## Older versions

- Comparison filters are available from Octopus Deploy **2021.2** onwards.
- `VersionMajor`, `VersionMinor`, `VersionPatch`, `VersionRevision`, `VersionPreRelease`, `VersionPreReleasePrefix`, `VersionPreReleaseCounter` and `VersionMetadata` extraction filters are available from Octopus Deploy **2020.5** onwards.
- `PropertiesKeyEscape`, `PropertiesValueEscape`, `YamlDoubleQuoteEscape` and `YamlSingleQuoteEscape` escape filters are available from Octopus Deploy **2020.4** onwards.

## Learn more

- [Variable blog posts](https://octopus.com/blog/tag/variable/1)
