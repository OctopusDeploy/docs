# API reference documentation

This folder holds the Markdown API reference that we publish to [octopus.com/docs](https://octopus.com/docs).
There is one file per group of endpoints — `feeds.md`, `runbooks.md`, and so on — plus an `index.md` listing
them all.

**Do not edit these files by hand.** They are generated from the Octopus Server Swagger document, and any hand
edit will be overwritten the next time the generator runs.

## How it works

`ApiDocsTests` (in `source/Octopus.IntegrationTests/Server/Web/Api/ApiDocs`) starts a server, fetches
`/api/swagger.json` from it, and turns it into this folder. It then approves what it generated against what is
committed here, so a change to a controller, a route, or a message contract surfaces as a diff on the docs
rather than silently drifting.

The generator lives beside the test:

| File | Responsibility |
| --- | --- |
| `ApiReferenceGenerator.cs` | Groups endpoints into files and lays out each endpoint's Markdown. |
| `ApiSchemaMarkdown.cs` | Renders schemas as attribute lists and synthesises the example payloads. |
| `ApiDocGrouping.cs` | Decides which file an endpoint belongs to and what that file is called. |
| `ApiDocGroupIntroductions.cs` | Finds the `ApiDocumentationGroup` classes and turns each into a page's opening prose. |
| `XmlDocMarkdown.cs` | Converts an XMLdoc comment into Markdown. |
| `TypeXmlDocs.cs` | Reads the XMLdoc the compiler writes out beside each assembly. |
| `MarkdownBuilder.cs` | Keeps the whitespace between Markdown blocks tidy. |

## Updating the docs

Run the test:

```shell
dotnet test source/Octopus.IntegrationTests/Octopus.IntegrationTests.csproj \
  --filter "FullyQualifiedName~ApiDocsTests"
```

If your change altered the API surface, the test fails and writes a `<name>.received.md` next to each
`<name>.md` that differs. Review the diffs, then accept them:

```shell
cd source/ApiDocs
for f in *.received.md; do mv "$f" "${f%.received.md}.md"; done
```

Locally, Assent will also open your configured diff tool for each changed file. When several files change at
once that gets noisy — set `AssentNonInteractive=true` in your environment and use the `.received.md` files
instead.

If the test reports stale files, a group of endpoints has been renamed or removed. Delete the files it names.

## Introducing a group

A page is otherwise nothing but a list of endpoints. To say what a group of endpoints is *for*, before a reader
reaches the first route, derive from `ApiDocumentationGroup` and name the Swagger tag the prose belongs to:

```csharp
/// <summary>
/// Rate limits protect a server from being overwhelmed by a single caller. Every response carries the
/// caller's remaining budget in its <c>X-RateLimit-Remaining</c> header.
/// </summary>
/// <remarks>
/// A caller that runs out of budget gets a `429`, and should wait for as long as the `Retry-After` header
/// says before trying again.
/// </remarks>
public class RateLimitingApiDocumentationGroup() : ApiDocumentationGroup("RateLimiting");
```

Put the class beside the controllers it describes. The generator finds it by scanning the Octopus assemblies,
so nothing needs registering, but that also means it needs a parameterless constructor and no dependencies.

The XMLdoc *is* the documentation — its `summary` followed by its `remarks`, converted to Markdown and written
directly above the group's first endpoint. `para`, `list` (bulleted and numbered), `code`, `c`, `see`
(`cref`, `href` and `langword`), `paramref`, `b`/`strong` and `i`/`em` all translate; anything else is unwrapped
so its content survives.

Your line breaks are kept, so write the comment the way you want the page to read. Both languages treat a single
line break inside a paragraph as a space, which means you can reflow the source freely, and a blank line starts
a new paragraph whether or not there is a `para` around it.

The tag is the one the endpoints carry, which for a conventional controller is the last segment of its
namespace — `Octopus.Server.Web.Controllers.RateLimiting` is tagged `RateLimiting`. Get it wrong and there is no
page to attach the prose to, so the generator fails rather than dropping it.

## What gets generated

**Grouping.** Endpoints are grouped by their first Swagger tag. An endpoint with no tags falls back to the
first segment of its route after any space identifier, so `/api/Spaces-1/runbooks/banana` would group under
`runbooks`. Group names become lower-kebab-case file names, which means tags differing only in casing (we have
both `OpenIdConnect` and `OpenIDConnect`) share a file.

**Alternate routes.** Most space-scoped operations are routable three ways: the current
`/spaces/{spaceIdentifier}/…` route, an older `/{spaceId}/…` route, and a legacy route that implicitly targets
the default space. Swagger lists each as a separate operation, distinguished by a suffix on the operation id.
Documenting all three would produce three identical sections, so we document the unsuffixed operation and list
the others under "Also reachable at". An operation that only exists in a suffixed form is documented as itself.

**Depth.** Request body attributes are expanded two levels deep — the payload's own properties, plus the
properties of any object nested directly inside them. Anything deeper is shown as a bare type. Responses are
documented by schema name and example payload; where an endpoint has no request body, its response attributes
are expanded instead, so that `GET` endpoints still describe what they return.

**Examples.** The example payloads are synthesised from the schemas, not captured from a real server. They show
the shape of a payload and use fixed placeholder values (`"string"`, `0`, a constant timestamp) so that
regenerating the docs doesn't produce a diff every time.

## Design

The output is shaped to fit the API reference design in
[Figma](https://www.figma.com/design/DTvlouW1QArI3ZTf1PXs4J/Documentation-vision?node-id=1569-28951&m=dev):
a heading and route per endpoint, then attributes, parameters, headers, error codes, and code blocks, in that
order. Markdown carries the structure; the docs site supplies the styling.
