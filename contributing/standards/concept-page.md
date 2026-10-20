# Concept page

A concept page is a content deliverable that helps a reader understand a single, coherent area of Octopus including what its parts are, why they exist, and how they fit together. It composes closely related concept topics into one page, framed by a short introduction and, where useful, supported by reference topics.

A concept page is for understanding, not for doing. It answers "what is this, and how does it fit?" across a cluster of related concepts. The moment the reader's primary job becomes completing a procedure, the page is a guide page.

## Concept page elements

A concept page contains the following elements in order:

- Frontmatter*, including a title
- Introduction*
- 1 or more concept topics*
- Reference topics
- Related links

(* = required)

## Title conventions

The frontmatter standard governs the title field for any document in the repository and how they should be written. Titles appear as the H1 and the page's `<title>` metadata element, used for SEO and LLM retrieval.

A concept page title is written differently from a concept topic title. A topic title is a terse noun phrase with no verbs, because it must stay reusable wherever it's embedded. A page title has no such constraint. The page title describes the whole page, not any single topic on it.

Concept page titles SHOULD be descriptive and written as the page's primary audience would search for it (primary audience is defined in the frontmatter's audience field).

They MAY use verbs or question framing where that matches how the primary audience searches.

A well-formed concept page title:

- How Octopus Deploy works

Poorly-formed concept page titles:

- 👋 Hello, Octopus Deploy (too broad — distinguishes nothing)
- Concepts (names the genre of the content, not the subject)

## Introduction

**Required**

The introduction is the opening prose beneath the H1, before the first concept topic. It frames the page, describing what this page covers and why the reader is here. It has no heading of its own.

The introduction MUST:

- State what the page covers and orient the reader to the concepts ahead

The introduction MUST NOT:

- Define the concepts themselves — that's the job of the concept topics
- Contain a heading

### Introduction examples

A well-formed introduction for the page "How Octopus Deploy works":

> This page explains the main building blocks of Octopus and how they fit together. Once the model makes sense, the rest of the documentation will too, and you'll know where each part of your deployment lives.

Poorly-formed introductions for the same page:

> A project is an application you deploy, an environment is where you deploy it, and a release bundles everything needed for one version. (defines the concepts that appear in the page body)

> Welcome to Octopus! Deployments have never been easier… (adds a heading, includes promotional content, and doesn't orient the reader to what's ahead)

## Concept topics

**Required — one or more**

The body of a concept page is built from concept topics, each authored to the concept topic standard. Every topic's title element renders as an H2 section heading on the page.

Concept topics MUST:

- Be closely related. Every topic on the page must belong to the same coherent concept area.
- Each conform to the concept topic standard

Concept topics MUST NOT:

- Appear if they don't relate to the others

### Concept topics examples

A well-formed set of concept topics for the page "How Octopus Deploy works":

- Projects, environments, and releases
- The deployment process
- Variables
- Infrastructure
- Lifecycles

All five related directly to the core deployment model, and each builds on the last.

A poorly-formed set of concept topics for the same page:

- Projects, environments, and releases
- The deployment process
- Advanced audit logging
- Octopus REST API authentication

Advanced audit logging and API authentication don't belong to the core deployment model a new reader is trying to grasp. The page sprawls across unrelated subjects instead of holding one concept area.

## Reference topics

**Optional — used sparingly**

A concept page MAY include reference topics, typically a comparison matrix or a properties table, where enumerated data clarifies a concept the page is explaining. Reference topics are authored to the reference topic standard.

Reference topics MUST:

- Support a concept on the page, not stand as the page's purpose
- Each conform to the reference topic standard

Reference topics MUST NOT:

- Be the dominant content

Reference topics SHOULD:

- Immediately follow the concept topic it supports

### Reference topic examples

An acceptable reference topic for the page "How Octopus Deploy works":

- A "Cloud vs Self-hosted" comparison reference topic placed directly after the concept topic that explains the two hosting models

Unacceptable reference topics for the same page:

- Three reference topics containing comparison tables, each introduced by a single sentence (makes lookup and reference the dominant content on the page)
- A "Which hosting option should I choose?" reference topic containing a decision matrix that the rest of the page content is built around (the page now exists to drive a choice making it a guide, not a concept page)

## Version notes

**Optional**

Where the page carries caveats tied to specific self-hosted Octopus versions, collect them in a Version notes block as the last element before Related links. See the version notes standard for what belongs here and how each entry is formed. This element does not appear on pages that have no version-specific caveats.

## Related links

**Optional**

Related links point the reader to where they're likely to go next: how-to pages and guides that put these concepts into use, other concept pages that share context, or reference topics that enumerate options.

Related links SHOULD:

- Appear on most concept pages as nearly every page has a sensible next step
- Include the how-to page or guide that operationalizes the concepts

Related links MUST NOT:

- Include links that don't resolve
- Exceed five links

### Related links examples

A well-formed set of related links for the page "How Octopus Deploy works":

- Install Octopus Self-hosted
- Deployment targets
- The deployment process
- Variables
- Lifecycles

A poorly-formed set of related links for the same page:

- Coming soon: advanced lifecycle configuration (placeholder)
- Links to all eleven pages that mention a deployment (associative rather than navigational, and exceeds the five-link limit)

## Composition rules

These rules govern how the topics above are assembled into a page.

### Scope

A concept page covers a single coherent concept area. It presents a group of concepts a reader needs to understand together. The topics on the page MUST depend on or directly relate to each other. If a topic stands alone, it belongs somewhere else.

### Topic order

Concept topics SHOULD be ordered by dependency. A reader must never reach a topic that assumes one they haven't read yet. Put the most fundamental concept first, then the concepts that build on it.

Dependency isn't absolute. It's relative to the page's primary audience (defined in the audience field in the page's frontmatter). Order the topics to match how that audience builds understanding toward their job to be done.

- Do this: Projects, environments, and releases → The deployment process → Variables → Infrastructure → Lifecycles. Each topic builds on the previous one, ordered for an evaluator forming a first mental model of how Octopus works.
- Not this: Lifecycles before releases. A lifecycle governs how a release moves between environments. It's meaningless to a reader who doesn't yet know what a release is.

### Heading structure

The heading structure is important for reader scannability and for LLM retrieval. Follow these constraints:

- The page MUST have exactly one H1: the title, from frontmatter.
- Each concept and reference topic's title renders as an H2.
- A topic MAY use an H3 for an internal subsection where one is genuinely needed. Use sparingly.
- H4 and deeper MUST NOT be used. Content that seems to need an H4 is a signal the topic is doing too much and should be split.

### Permitted and forbidden topic types

A concept page MUST contain only concept topics and, optionally, reference topics.

A concept page MUST NOT contain task, troubleshooting, glossary, or release-note topics:

- Task topics turn the page into a how-to page or guide. This is the most important boundary on the page. Link to tasks in related links instead of embedding them.
- Troubleshooting, glossary, and release note topics each have their own deliverables.

## Template

```
---
# Frontmatter — see the frontmatter standard.
# type MUST be: concept
---
[Introduction. One or two sentences that frame what this page covers and why
the reader is here. No heading.]
## [Concept topic 1 title]
[Concept topic body.]
## [Concept topic 2 title]
[Concept topic body.]
## [Reference topic title]   <!-- optional; place immediately after the concept it supports -->
[Reference table.]
## [Concept topic 3 title]
[Concept topic body.]
## Version notes   <!-- optional; self-hosted versions only; before Related links -->
## Related links   <!-- optional; up to five, no placeholders -->
- [The how-to page or guide that puts these concepts into use]
- [A related concept page]
```

## Example

Here's a short, complete page to use as an example. It contains 2 concept topics explaining Octopus's hosting models, a reference topic that summarizes the differences in a table, and related links that point to related topics that operationalize the content.

```
---
title: How Octopus hosting works
sidebarLabel: Hosting models
description: New to Octopus Deploy? Learn how Octopus Cloud and self-hosted Octopus Server differ so you can understand which fits your team.
type: concept
audience: evaluator
// Other frontmatter is discussed in the frontmatter standard
---
Octopus runs in two ways: as a managed service we host for you, or as a server
you run yourself. This page explains both models and what changes depending on
which one you use.
## Octopus Cloud
Octopus Cloud is a fully managed instance hosted by Octopus. We run the server,
the database, and the infrastructure behind it, and we handle upgrades, backups,
and availability. You sign in and start building deployment processes — there's
nothing to install or maintain.
## Self-hosted Octopus Server
Self-hosted Octopus Server is an instance you install and run on your own
infrastructure, on-premises or in your own cloud account. You own the database,
the upgrade schedule, and the network boundary. Teams choose self-hosted when
they need Octopus to run inside their own environment for compliance, data
residency, or network-isolation reasons.
## Cloud vs self-hosted
| Responsibility   | Octopus Cloud   | Self-hosted      |
|------------------|-----------------|------------------|
| Hosting          | Octopus         | You              |
| Upgrades         | Automatic       | You              |
| Database         | Managed         | You              |
| Network boundary | Octopus-managed | Your environment |
## Related links
- [Install Octopus Self-hosted](http://path/to/doc)
- [Octopus Cloud](http://path/to/doc)
- [Spaces](http://path/to/doc)
```
