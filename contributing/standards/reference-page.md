# Reference page

A reference page is a content deliverable that helps a reader look up a complete set of values, options, settings, or commands. It composes one or more reference topics into a single page, framed by a short introduction.

A reference page is for looking up, not for understanding or doing. It answers "what values exist, and what does each one do?" across one or more related sets. The moment the reader's primary job becomes understanding a model (how the parts fit and why), the page is a concept page. The moment it becomes completing a procedure, the page is a guide page.

## Reference page elements

A reference page contains the following elements in order:

- Frontmatter*, including a title
- Introduction*
- 1 or more reference topics*
- Related links

(* = required)

## Title conventions

The frontmatter standard governs the title field for any document in the repository and how they should be written. Titles appear as the H1 and the page's `<title>` metadata element, used for SEO and LLM retrieval.

A reference page title is written like a reference topic title. Both are noun phrases naming an enumerated set. The difference is scope, not form. A reference topic title names the single set enumerated in that topic and must be unique among the topics on the page. A reference page title names the page's whole subject, which may span several related sets.

Reference page titles MUST:

- Be a noun phrase naming the set(s) the page enumerates
- Use the canonical product term as it appears in the UI or artifact
- Be 60 characters or fewer

Reference page titles MUST NOT:

- Be a gerund phrase
- Use imperative verbs or question framing

Well-formed reference page titles:

- System variables
- Variable filters
- Built-in user roles

Poorly-formed reference page titles:

- Managing system variables (gerund, signals a guide page not a reference page)
- Configure variable filters (imperative, signals a task topic)
- What variables can I use (question framing)

## Introduction

**Required**

The introduction is the opening prose beneath the H1, before the first reference topic. It frames the page, describing what the page enumerates and orienting the reader to the sets ahead. It has no heading of its own.

The introduction MUST:

- State what the page enumerates and orient the reader to the sets ahead
- Carry any caveat that applies across all topics on the page, such as version scope, "all values are strings," or partial-set warnings that span topics.

The introduction MUST NOT:

- Begin enumerating individual entries
- Explain a model or teach why the sets matter
- Contain procedure steps
- Contain a heading

### Introduction examples

A well-formed introduction for the page "System variables":

> This page lists the built-in variables Octopus provides for use in deployment processes, runbooks, and custom scripts. Variables are grouped by the scope they're drawn from. All Octopus variables are strings, even when the value looks like a number or boolean.

Poorly-formed introductions for the same page:

> Octopus.Release.Id returns the ID of the release; Octopus.Release.Number returns the version number… (begins to enumerate a set)

> Variables let you adjust a deployment's behavior based on its context, so you can avoid hardcoding values that change between environments… (teaches the model and the "why" which belong in concept pages or topics)

## Reference topics

**Required — one or more**

The body of a reference page is built from reference topics, each authored to the reference topic standard. Every topic's title renders as an H2.

Reference topics MUST:

- Each conform to the reference topic standard
- Enumerate sets that belong to the same subject — the subject named by the page title

Reference topics MUST NOT appear if they enumerate a set unrelated to the page's subject.

Reference topics SHOULD be split by the natural boundaries of the sets, not collapsed into one oversized table. When a page covers several distinguishable sets, each set earns its own reference topic.

### Reference topic examples

A well-formed set of reference topics for the page "System variables":

- Release variables
- Deployment variables
- Action variables
- Step variables
- User-modifiable settings

Each enumerates a distinguishable set of variables. All belong to the page's subject enumerating the built-in variables Octopus provides.

A poorly-formed set of reference topics for the same page:

- Release variables
- Deployment variables
- Writing variable expressions

"Writing variable expressions" discusses the Octostache model making it conceptual content. It belongs on a concept page.

Another poorly-formed set of reference topics for "System variables": a single "Variables" topic containing every system variable across all distinguished sets in a single table.

## Version notes

**Optional**

Where the page carries caveats tied to specific self-hosted Octopus versions, collect them in a Version notes block as the last element before Related links. See the version notes standard for what belongs here and how each entry is formed. This element does not appear on pages that have no version-specific caveats.

## Related links

**Optional**

Related links point the reader to where to go after the lookup: the concept page that explains the model behind these sets, guides that put the values to use, or adjacent reference pages.

Related links SHOULD:

- Appear on most reference pages, as a reader who's looked something up usually has a next destination
- Include the concept page that explains the model behind the enumerated sets, where one exists

Related links MUST NOT:

- Include links that don't resolve
- Exceed five links

### Related link examples

A well-formed set of related links for the page "System variables":

- Variable substitutions
- Runbook variables
- Output variables

A poorly-formed set of related links for the same page:

- Coming soon: system variable changelog (placeholder that doesn't resolve)
- Links to all fourteen pages that mention a variable (associative, not navigational; exceeds five)

## Composition rules

These rules govern how the topics above are assembled into a page.

### Scope

A reference page covers a single coherent subject: one set, or several related sets a reader looks up together. Every reference topic on the page MUST enumerate a set that belongs to that subject. A reader who lands to look up one value should find the related sets alongside it, and not sets that belong to a different subject.

- Do this: A "System variables" page enumerating release, deployment, action, and output variables. Different scopes, one subject: the built-in variables Octopus provides.
- Not this: A "System variables" page that also enumerates the built-in user roles. User roles are a different subject with their own reference page.

### Topic order

Reference topics have no inherent order. Unlike concept and guide pages, no topic depends on another and no topic must be read before another. A reader may consult "Action variables" without needing to read "Release variables." Order therefore serves lookup speed, not comprehension.

Reference topics MUST NOT be ordered by dependency or narrative. There's no "read this first."

Reference topics SHOULD be ordered for lookup, by whichever of these fits the set:

- The product's own order, when the sets mirror something with an established order in the UI or artifact, for example the order that settings are listed in the UI. A reader who knows the product predicts where to look.
- Alphabetical, when there's no meaningful product order.

- Do this: On "System variables," order the topics by variable scope as they occur in a deployment's lifecycle (release → deployment → action → output), matching how the product surfaces them.
- Not this: Order the topics by how commonly the Octopus development team thinks each is used. "Commonly used" is a judgment call a reader can't predict, so it defeats lookup.

### Heading structure

The heading structure is important for reader scannability and for LLM retrieval. Follow these constraints:

- The page MUST have exactly one H1: the title, from frontmatter.
- Each reference topic's title renders as an H2.
- A topic MAY use an H3 for an internal subsection where one is genuinely needed. Use sparingly.
- H4 and deeper MUST NOT be used.

A reference page with exactly one reference topic MUST collapse the topic's title into the page H1. The page carries no H2 for its sole topic. The topic's short description follows the introduction directly. Because reference page and reference topic titles share the same convention (a noun phrase naming the set), the H1 satisfies both.

On a single-topic page, the introduction and the topic's short description sit adjacent with no heading between them. Fold the topic's scope statement into the introduction rather than repeating it.

### Permitted and forbidden topic types

A reference page MUST contain only reference topics.

A reference page MUST NOT contain concept topics. This is the most important boundary on the page. A page that needs to teach a model — how the sets relate, why they exist, when to reach for one — is a concept page that may carry reference topics, not a reference page that carries a concept topic. When a reference page seems to want conceptual framing, that framing belongs on a concept page, linked from related links.

A reference page MUST NOT contain task topics. A page whose reader's job is to complete a procedure is a guide page. Link to the guide from related links.

Troubleshooting, glossary, and release-note topics each have their own deliverables and MUST NOT appear.

## Template

For reference pages that collect multiple reference topics:

```
---
# Frontmatter — see the frontmatter standard.
# type MUST be: reference
---
[Introduction. One or two sentences naming what the page enumerates and
orienting the reader to the sets ahead, plus any caveat that applies across
all topics. No heading.]
## [Reference topic 1 title]   <!-- noun phrase naming the set -->
[Short description, then the reference table.]
## [Reference topic 2 title]
[Short description, then the reference table.]
## [Reference topic 3 title]
[Short description, then the reference table.]
## Version notes   <!-- optional; self-hosted versions only; before Related links -->
## Related links   <!-- optional; up to five, no placeholders -->
- [The concept page that explains the model behind these sets]
- [An adjacent reference page]
```

For reference pages that render a single reference topic:

```
---
# Frontmatter — see the frontmatter standard.
# type MUST be: reference
# title names the set (serves as both page and topic title)
---
[Introduction, with the sole topic's scope statement folded in. No heading.]
[Short description, then the reference table — no H2, directly after the intro.]
## Related links
- [The concept page that explains the model behind this set]
```

## Examples

Here's a short, complete reference page. It enumerates three variable scopes as separate reference topics, framed by an introduction carrying the page-wide "all strings" caveat, with related links pointing to the concept page that explains how the values are used. Tables are abbreviated for length; a real page enumerates each set completely.

```
---
title: System variables
sidebarLabel: System variables
navOrder: 2
description: The built-in variables Octopus provides for use in deployment processes, runbooks, and scripts.
subject: system variables, deployment variables, output variables, Octostache
type: reference
audience: [devops-eng, power-user]
image:
imageAlt:
---
This page lists the built-in variables Octopus provides for use in deployment
processes, runbooks, and custom scripts. Variables are grouped by the scope
they're drawn from. All Octopus variables are strings, even when the value
looks like a number or boolean.
## Release variables
Release-level variables are drawn from the project and release being created.
| Variable                | Description                                        | Example       |
|-------------------------|----------------------------------------------------|---------------|
| Octopus.Release.Id      | The ID of the release.                             | releases-123  |
| Octopus.Release.Number  | The version number of the release.                 | 1.2.3         |
| Octopus.Release.Notes   | Release notes associated with the release (Markdown).| Fixes bug 1  |
## Deployment variables
Deployment-level variables are drawn from the project and release being deployed.
| Variable                | Description                                        | Example            |
|-------------------------|----------------------------------------------------|--------------------|
| Octopus.Deployment.Id   | The ID of the deployment.                          | deployments-123    |
| Octopus.Deployment.Name | The name of the deployment.                        | Deploy to Production|
| Octopus.Deployment.Error| The error/exit code for a failed deployment.       | Script returned exit code 123 |
## Action variables
Action-level variables are available during execution of an action.
| Variable             | Description                                          | Example  |
|----------------------|-----------------------------------------------------|----------|
| Octopus.Action.Id    | The ID of the action.                               | 85287bef |
| Octopus.Action.Name  | The name of the action.                             | Website  |
| Octopus.Action.Number| The sequence number of the action in the process.   | 5        |
## Related links
- [Variable substitutions](http://path/to/doc)
- [Output variables](http://path/to/doc)
- [Runbook variables](http://path/to/doc)
```

Why this is well-formed: the introduction orients the reader to the sets ahead and carries the one caveat true across every topic ("all strings"), without teaching a model or enumerating entries. Each topic is a genuine set with a short description stating what that scope draws from. The topics are ordered by lifecycle scope (release → deployment → action), matching how the product surfaces them. Related links leads with the concept page that explains how the values are used — the "why" the reference page deliberately omits.

Here's a reference page with a single reference topic. The set is small and complete, so it needs only one topic — which means the topic title collapses into the page H1, the introduction absorbs the topic's scope statement, and the table follows the introduction directly with no H2.

```
---
title: Loop iteration variables
sidebarLabel: Loop iteration variables
navOrder:
description: The special variables available inside an each loop in a variable template.
subject: iteration variables, each loop, Octostache, templates
type: reference
audience: [devops-eng, power-user]
image:
imageAlt:
---
This page lists the special variables Octopus makes available inside an `each`
loop when evaluating a variable template. Each variable reports the position of
the current element in the collection being iterated. All values are strings.
| Variable                     | Description                                                        |
|------------------------------|-------------------------------------------------------------------|
| Octopus.Template.Each.Index  | Zero-based index of the current element in the iteration.          |
| Octopus.Template.Each.First  | "True" if the element is the first in the collection, otherwise "False".|
| Octopus.Template.Each.Last   | "True" if the element is the last in the collection, otherwise "False". |
## Related links
- [Variable substitutions](http://path/to/doc)
```

Why this is well-formed: with one set, there's one topic, so its title becomes the H1 — legal because reference page and reference topic titles share the same convention. There's no H2 for the sole topic. The introduction carries what would otherwise be the topic's short description (what the set enumerates, its scope — inside an each loop, and the "strings" caveat), so orientation appears once, not twice. The table follows the introduction directly. Related links points to the concept page that explains iteration, where this set is put to use.
