# Guide page

A guide page is a content deliverable that helps a reader accomplish a feature-scoped job in Octopus. It composes one or more task topics into a single page, framed by a short introduction and optionally supported by concept and reference topics.

A guide page is for doing, not for understanding. It answers "how do I accomplish this?" for one coherent feature. The moment the reader's primary job becomes understanding what something is or how it fits, rather than completing a procedure, the page is a concept page.

## Guide page elements

A guide page contains the following elements in order:

- Frontmatter*, including a title
- Introduction*
- Concept topics
- 1 or more task topics*
- Reference topics
- Related links

(* = required)

## Title conventions

The frontmatter standard governs the title field for any document in the repository. Titles appear as the H1 and the page's `<title>` metadata element, used for SEO and LLM retrieval.

A guide page title is scoped to the page's job — the feature or the end-to-end journey the page covers as a whole — not to any single task on it.

Guide page titles MUST:

- Be a gerund phrase ("Managing deployment targets"), not imperative ("Manage deployment targets")
- Name the page's overall job, not one task on it
- Be 60 characters or fewer

Guide page titles SHOULD:

- Use a verb that encompasses the page's task set

A well-formed guide page title:

- Managing deployment targets

Poorly-formed guide page titles:

- Manage deployment targets (imperative; reserved for task topic titles)
- Deployment targets (noun-only; collides with the concept page for the same feature)
- Add a deployment target (scoped to one task, not the page)

## Introduction

**Required**

The introduction is the opening prose beneath the H1, before the first topic. It frames what the reader can accomplish on this page and orients them to the work ahead. It has no heading of its own.

The introduction MUST:

- State what the page lets the reader accomplish and orient them to the tasks ahead

The introduction MUST NOT:

- Contain procedure steps — that's the job of the task topics
- Teach the concepts in depth — that's the job of a concept topic or a concept page
- Contain a heading

### Introduction examples

A well-formed introduction for the guide "Managing deployment targets":

> A deployment target is the machine or service Octopus deploys to. This page covers registering targets, configuring them with roles, and removing them when they're no longer in use.

Poorly-formed introductions for the same page:

> To register a target, go to Infrastructure > Deployment Targets > Add Deployment Target and select a target type. (contains procedure steps that belong in a task topic)

> Deployment targets can be tagged with target tags, which map to deployment steps via roles. A single tag can be referenced by many projects, so changing one affects every process that depends on it. (teaches the concept model in depth instead of orienting; this belongs in a concept topic or concept page)

## Concept topics

**Optional**

A guide page MAY include concept topics, each authored to the concept topic standard, where the reader needs a model the introduction can't carry in a line or two. Each renders as an H2.

A feature guide rarely needs more than one. A journey guide — one covering an end-to-end configuration rather than a single feature — may need several, introduced at the point in the sequence where each becomes relevant. How they're ordered against the tasks they inform is governed by topic order in the composition rules below.

Concept topics MUST:

- Establish only the model the tasks on this page need
- Each conform to the concept topic standard

Concept topics MUST NOT:

- Duplicate framing already carried by the introduction
- Become the page's primary content — if understanding is the reader's main job, the page is a concept page

### Concept topic examples

An acceptable concept topic for the page "Managing deployment targets":

- A single "Deployment targets and roles" concept topic, placed before the task topics, establishing the target/role/tag model the tasks rely on.

Unacceptable concept topics for the same page:

- Four concept topics covering target types, roles, tags, and health checks, with the task topics pushed to the bottom of the page (understanding is now the page's primary job; this is a concept page with procedures bolted on)
- A "How deployment targets work" concept topic that re-explains the target model the introduction already framed (duplicates the introduction; the topic should add the model the intro can't carry, not restate it)

## Task topics

**Required — one or more**

The body of a guide page is built from task topics. Every topic's title element renders as an H2.

Task topics MUST:

- Each conform to the task topic standard
- Belong to the same page-level job as the other tasks on the page

Task topics MUST NOT:

- Appear if they belong to a different feature or journey than the rest of the page

### When an operation earns its own task topic

Not every operation a feature supports deserves a task topic. CRUD operations are common (add, configure, view, delete), and the trivial ones produce thin, fabrication-prone topics when forced into the task structure.

An operation earns its own task topic when it has either:

- More than one non-obvious step, or
- A material prerequisite or consequence the reader must know

An operation that has neither MUST be folded into the concept or reference topic that documents the entity or as a closing step of the task it naturally completes.

For example: Does the task of deleting a deployment target earn its own task topic? The procedure is trivial and obvious, but deleting a target that projects still deploy to has consequences the reader should know before acting. So, yes, it should get its own topic. The actionable consequences (what breaks, what to check first) belongs in the task topic alongside the procedure for deleting. The underlying model of why targets, roles, and tags interrelate belongs in a concept topic.

Another example: Does the task of viewing a deployment target earn its own task topic? The procedure is trivial and obvious. It is a single navigation step without prerequisites and self-evident result. So, no, it does not earn its own topic. Fold it into the concept topic that documents what a deployment target is, instead.

### Task topic examples

A well-formed set of task topics for the page "Managing deployment targets":

- Add a deployment target
- Configure target roles
- Delete a deployment target

Each is a distinct operation on the same feature. Add and configure operations involve more than one step, so they earn their own topic. The delete operation involves a material consequence, earning its own topic. The view operation is absent, folded into the concept topic that explains what a deployment target is.

A poorly-formed set of task topics for the same page:

- Add a deployment target
- View a deployment target
- Understanding target roles
- Troubleshoot target registration

View is a single self-evident step and earns no topic. "Understanding target roles" is a concept topic wearing a task topic title. It teaches a model rather than completing an operation. "Troubleshoot target registration" is a troubleshooting topic, which is never assembled into a guide. These live as their own deliverables, linked from the relevant task's troubleshooting element.

## Reference topics

**Optional — used sparingly**

A guide page MAY include reference topics where enumerated data supports a task on the page, for example a table of target types, a properties reference, or a permissions matrix.

Reference topics MUST:

- Support a task on the page, not stand as the page's purpose
- Each conform to the reference topic standard

Reference topics MUST NOT:

- Be the page's dominant content

Reference topics SHOULD:

- Immediately follow the task they support

### Reference topic examples

An acceptable reference topic for the page "Managing deployment targets":

- A "Target types" reference table placed directly after the task that registers a target, enumerating the target types the user can choose from.

An unacceptable reference topic for the same page:

- A "Deployment target settings" reference table the whole page is built around, with the task topics reduced to a sentence each. (lookup is now the page's purpose)

## Version notes

**Optional**

Where the page carries caveats tied to specific self-hosted Octopus versions, collect them in a Version notes block as the last element before Related links. See the version notes standard for what belongs here and how each entry is formed. This element does not appear on pages that have no version-specific caveats.

## Related links

**Optional**

Related links point the reader to where they're likely to go next: the concept page that explains the feature this guide operates, other guides for adjacent features or journeys, or reference pages that enumerate options.

Related links are a page-level element, distinct from the links inside a task topic. A task topic carries its own links for recovery (the troubleshooting element) and for forward motion (the next steps element). Related links are neither: they serve lateral discovery, where the reader goes after the page's job is done, not mid-task.

Related links SHOULD:

- Appear on most guide pages, as nearly every page has a sensible next destination
- Include the concept page that explains the feature, where one exists

Related links MUST NOT:

- Include links that don't resolve
- Exceed five links

### Related links examples

A well-formed set of related links for the page "Managing deployment targets":

- How deployment targets work
- Deploying to Kubernetes
- Environments
- Roles and target tags

A poorly-formed set of related links for the same page:

- Coming soon: dynamic target discovery (placeholder that doesn't resolve)
- Links to all fourteen pages that mention a deployment target (associative rather than navigational and exceeds the five-link limit)

## Composition rules

These rules govern how the topics above are assembled into a page.

### Scope

A guide page covers a single page-level job: one feature, or one end-to-end journey. Every task topic on the page MUST serve that job. A reader who lands on the page to do one thing should find the tasks that thing requires, and not tasks that belong to a different feature or journey.

Scope is set by the page's job, not by a feature boundary. A guide's scope may be at the feature level ("Managing deployment targets"). Or, it may be at the journey level ("Deploying to Kubernetes"). Guides that describe journeys may cross several features — targets, environments, deployment processes — because the journey needs them, held together by the reader's goal rather than by a single feature.

#### Examples of scope

Acceptable scopes for a guide:

- A "Managing deployment targets" page that contains add, configure, and delete tasks. Every task operates the same feature.
- A "Deploying to Kubernetes" page that contains tasks that register a Kubernetes target, add a deployment step, and create a release. These are different features held together by the single goal of getting a deployment running on a Kubernetes cluster.

Unacceptable scope for a guide:

- A "Managing deployment targets" page that also contains "Create an environment." Environments are a different feature and should have their own feature-level guide page.

### Topic order

Topics on a guide page follow the order the reader works in. A reader must never reach a task that depends on one they haven't done yet, or that assumes a model the page hasn't given them.

Order is relative to the page's primary audience, defined in the audience field in the page's frontmatter. Order the topics to match how that audience works toward the job the page delivers.

A concept topic MUST precede the tasks that depend on the model it establishes. On a feature guide, this usually means a single concept topic at the top, ahead of all the tasks. On a journey guide, concept topics are placed at the point in the sequence where each becomes relevant, not all models front-loaded before any work begins.

A reference topic SHOULD immediately follow the task it supports, so the reader meets the enumerated data at the moment the task calls for it.

- Do this: On "Managing deployment targets," order the tasks add → configure → delete, with the "Target types" reference topic immediately after add. You must add a target first, looking up which type to be successful, before you can configure the target. And you must configure the target before its deletion has consequences worth warning about.
- Do this: On "Deploying to Kubernetes," introduce the target/role model, register the target, then introduce the release model, then create the release. Each concept lands just before the tasks that rely on it.
- Not this: On "Deploying to Kubernetes," front-load both concept topics at the top, then all tasks. The reader has to hold the release model in their head through three unrelated registration tasks before it's used.

### Heading structure

The heading structure is important for reader scannability and for LLM retrieval. Follow these constraints:

- The page MUST have exactly one H1: the title, from frontmatter.
- Each concept, task, and reference topic's title renders as an H2.
- A topic MAY use an H3 for an internal subsection where one is genuinely needed. Use sparingly.
- H4 and deeper MUST NOT be used. Content that seems to need an H4 is a signal the topic is doing too much and should be split.

### Permitted and forbidden topic types

A guide page MUST contain only task topics and, optionally, concept and reference topics.

A guide page MUST NOT contain troubleshooting, glossary, or release-note topics:

- Troubleshooting topics are never assembled into a guide. A troubleshooting topic is its own deliverable with its own URL, linked from the Troubleshooting element of the task it relates to — not embedded in the page and not collected in a page footer. This keeps recovery content addressable on its own and lets one troubleshooting topic serve tasks across several guides.
- Glossary and release-note topics each have their own deliverables.

## Template

```
---
# Frontmatter — see the frontmatter standard.
# type MUST be: guide
---
[Introduction. One or two sentences framing what the reader can accomplish
on this page and the tasks ahead. No heading.]
## [Concept topic title]   <!-- optional; the model the tasks need -->
[Concept topic body.]
## [Task topic 1 title]   <!-- imperative: "Add a deployment target" -->
[Task topic body.]
## [Reference topic title]   <!-- optional; place immediately after the task it supports -->
[Reference table.]
## [Task topic 2 title]
[Task topic body.]
## [Task topic 3 title]
[Task topic body.]
## Version notes   <!-- optional; self-hosted versions only; before Related links -->
## Related links   <!-- optional; up to five, no placeholders -->
- [The concept page that explains this feature]
- [An adjacent guide]
```

## Example

Here's a short, complete guide page to use as an example. It opens with a concept topic establishing the target/role model, then documents 3 task topics (add, configure, delete), with a "Target types" reference table placed immediately after the task that needs it.

```
---
title: Managing deployment targets
sidebarLabel: Deployment targets
description: Add, configure, and remove the machines and services Octopus deploys to.
type: guide
audience: devops-eng
// Other frontmatter is discussed in the frontmatter standard
---
A deployment target is the machine or service Octopus deploys to. This page
covers registering targets, giving them roles so deployment steps know where to
run, and removing them safely when they're no longer in use.
## Deployment targets and roles
A deployment target represents somewhere Octopus deploys to — a virtual machine,
a Kubernetes cluster, a cloud service. A role is a tag you assign to a target so
that deployment steps can select it by role rather than by name. One role can
apply to many targets, and one target can carry many roles. You can view a
target's current roles on its detail page under Infrastructure ▸ Deployment
Targets.
## Add a deployment target
[Task topic body, authored to the task topic standard: prerequisites, steps,
and a Result confirming the target appears as healthy.]
## Target types
| Target type        | Use it for                                  |
|--------------------|---------------------------------------------|
| Listening Tentacle | Windows/Linux machines Octopus connects to  |
| Polling Tentacle   | Machines behind a firewall that call home   |
| Kubernetes cluster | Deployments to a Kubernetes API             |
| Azure Web App      | Deployments to an Azure App Service         |
## Configure target roles
[Task topic body: how to assign and change roles on an existing target, with a
Result confirming the role appears on the target.]
## Delete a deployment target
[Task topic body: the delete procedure, preceded by the consequence the reader
must know — deleting a target that projects still deploy to will break those
deployments — and how to check what depends on it first. Links to "Deployment
targets and roles" for why the dependency exists.]
## Related links
- [How deployment targets work](http://path/to/doc)
- [Deploying to Kubernetes](http://path/to/doc)
- [Environments](http://path/to/doc)
```
