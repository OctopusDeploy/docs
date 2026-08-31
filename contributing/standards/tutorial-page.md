# Tutorial page

A tutorial page is a content deliverable that teaches a new user how Octopus works by having them build something tangible. It threads concepts and procedures together so the reader learns by doing: each step advances a single worked example, and each concept is introduced at the moment the step needs it.

A tutorial page is for learning, not for reference and not for real work. It answers "I'm new — show me how this fits together by walking me through it once." Unlike a guide page, the reader does not arrive with their own goal or their own values to plug in — the tutorial states the goal, provides an example, and ensures one successful path from start to finish.

This is the boundary that separates a tutorial from a guide:

- A guide page serves a reader who has their own job and their own inputs. It is a recipe they apply to their situation. It may branch ("if you're on Windows…").
- A tutorial page manufactures the job and provides the inputs. It is a single guaranteed path with no branching. Success is the reader finishing, not the reader solving a problem they brought with them.

The mechanical test is **whose goal, and whose example?** If both belong to the reader, it's a guide. If both are supplied by the page, it's a tutorial.

Because a tutorial's value comes from one continuous worked example, its topics are authored for this page only. A tutorial's "Create a project" topic is written around the tutorial's running example and is not the canonical, reusable task topic for creating a project. Tutorial topics are exempt from reuse. This is the one place topic authorship bends, and it bends by design.

## Tutorial page elements

A tutorial page contains the following elements in order:

- Frontmatter*, including a title
- Introduction*
- Concept and task topics*, interleaved
- Wrapping up

(* = required)

A tutorial page is assembled from the same concept topics and task topics as the other deliverables, authored to their existing standards. What differs is how they are arranged and what they may do, governed by the tutorial composition rules below. Each topic renders as an H2.

Concept material is interleaved just in time: a short concept topic placed immediately before the task that needs the model it establishes. A tutorial page differs from a guide page in one structural way that the composition rules make explicit: on a tutorial, concept topics MAY be the page's primary content, because teaching is the page's job. On a guide, they must not.

The running example, the transitions between topics, and the closing reflection are what make the sequence read as one continuous walkthrough rather than a list of procedures. They SHOULD appear but are not required.

## Title conventions

The frontmatter standard governs the title field for any document in the repository. Titles appear as the H1 and the page's `<title>` metadata element, used for SEO and LLM retrieval.

A tutorial title names what the reader will build by the end, framed as a guided first run.

Tutorial page titles MUST:

- Signal a guided first-run, by opening with either "Your first…" or "Get started with…"
- Name the tangible thing that the reader builds or the outcome they reach, not the features they use to get there.
- Be 60 characters or fewer

Tutorial page titles MUST NOT:

- Be a gerund phrase ("Managing deployment targets")
- Be a bare feature noun ("Deployment targets")

Well-formed tutorial page titles:

- Your first deployment
- Get started with Octopus Deploy
- Your first runbook

Poorly-formed tutorial page titles:

- Deploying your first application (gerund)
- Deployments (bare feature noun)
- Tutorial (names the genre, not what the reader builds)
- Deploy your first application (bare imperative)

## Introduction

**Required**

The introduction is the opening prose beneath the H1, before the first topic. In tutorials, the introduction sets up the worked example the whole page runs on, and it tells the reader what they'll have built by the end. It has no heading of its own.

The introduction MUST:

- State what the reader will build and see working by the end of the page
- Orient the reader to the walkthrough ahead

The introduction SHOULD:

- Introduce the running example the tutorial uses, where the tutorial has one
- State what the reader needs before starting, where anything is assumed — an account, an install — kept to one line

The introduction MUST NOT:

- Contain procedural steps
- Teach the concepts in depth
- Contain a heading

### Introduction examples

A well-formed introduction for the tutorial "Your first deployment":

> In this tutorial you'll deploy a small sample web app to a test environment and watch it go live. You'll create a project, define a single deployment step, and push a release through it. You'll learn the same shape every real Octopus deployment takes, at the smallest scale that still works end to end. You'll need an Octopus Cloud account to follow along.

Poorly-formed introductions for the same page:

> A project is the container for everything Octopus needs to deploy your application: its deployment process, its variables, and its releases. A release is a versioned snapshot of that process. (teaches the concepts in depth)

> Go to Projects, select Add Project, name it, and click Save to begin. (contains procedure steps that belong in a task topic)

> Welcome! Deployments in Octopus are powerful, flexible, and easier than ever. (adds no orientation, states no outcome, and reads as promotional filler)

## Concept and task topics

**Required — one or more, interleaved**

The body of a tutorial is a sequence of concept topics and task topics, each authored to its existing standard. Each topic renders as an H2.

Nothing about how a concept topic or a task topic is written changes on a tutorial page. What changes is how they are arranged, and two permissions the tutorial page grants that no other deliverable does.

### Concept topics

A tutorial MAY use concept topics to establish the model a following task needs. Each is authored to the concept topic standard and placed immediately before the task that relies on it, never front-loaded ahead of all the work.

Concept topics in a tutorial MUST:

- Each conform to the concept topic standard
- Establish only the conceptual model the next task needs

Concept topics in a tutorial MUST NOT front-load models the reader won't use until later in the tutorial.

Unlike a guide page, concept topics on a tutorial MAY be the page's primary content. Teaching is the tutorial's job, so the balance between concept and task material is not constrained.

### Task topics

A tutorial MAY use task topics to present procedures that advance the walkthrough, each authored to the task topic standard.

Task topics on a tutorial MUST:

- Each conform to the task topic standard
- Advance the single running example, using the tutorial's concrete values rather than placeholders

Task topics on a tutorial MUST NOT:

- Include a Troubleshooting element. A tutorial guarantees a single working path. A step that fails often enough to need recovery is a defect in the tutorial to be fixed, not annotated. Recovery links also send a first-run reader off-page mid-walkthrough, breaking the guaranteed path.
- Include a Next steps element. Forward motion between tasks is carried by the tutorial's transitions, not by per-topic next steps that would only point to the next H2 on the same page.

Task topics on a tutorial are not canonical. A tutorial's "Create a project" is written around the running example and is not the reusable source for that operation. The same operation, authored for general use, belongs in its own guide page as the canonical, reusable task topic.

## Wrapping up

**Optional**

Wrapping up is a short passage after the final task topic that closes the walkthrough: it marks what the reader accomplished and, where useful, points them where to go next now that they've done it once. It's the tutorial's send-off. The reader may have just spent a while learning, and this is where that effort pays off. It has no procedure and teaches no new concept.

Unlike the introduction, which has no heading, this section falls at the end of the page after several topic H2s. It therefore takes its own H2, "Wrapping up", to separate it from the final task topic.

Wrapping up SHOULD:

- Acknowledge the accomplishment warmly. The reader built something real, and the send-off should feel like it. Let the delight come from naming the actual thing they achieved, not from exclamation.
- Restate the outcome the reader has achieved in a sentence.
- Connect the worked example back to the real work it stands in for, so the reader trusts they can now do this on their own.
- Point forward, where there's a sensible next destination. Link to the guide or concept page that takes this first run into real use, or the next tutorial in an onboarding sequence. Up to five links, none of them placeholders.

Wrapping up MUST NOT:

- Introduce a new concept or procedure
- Overclaim the reader's mastery ("you've deployed your first app," not "you're now an expert")
- Include links that don't resolve, or more than five

### Wrapping up examples

A well-formed wrapping up element for the tutorial "Your first deployment":

> **Wrapping up**
>
> Nice work! You've run a real deployment using Octopus Deploy. You created a project, defined a deployment process, and pushed a release to a live environment, which is the same path every Octopus deployment follows, whatever you're shipping. You now have everything you need to set this up for your own application.
>
> Where to go next:
>
> - How the deployment process works
> - Managing deployment targets
> - Environments and lifecycles

Poorly-formed wrapping up elements for the same page:

> Congratulations! You're now an Octopus expert. 🎉 (overclaims mastery, orients the reader to nothing, and leans on exclamation instead of naming what was achieved)

> To deploy to production, add a second environment and configure a lifecycle to promote releases between them. See also the twelve pages below that mention deployments. (introduces new procedure, then dumps an unfiltered associative link list)

## Composition rules

These rules govern how the topics above are assembled into a page. Where a rule matches the guide page or concept page standards it reads the same here on purpose. What's specific to a tutorial is the running example, the single path, and the just-in-time interleave.

### Scope

A tutorial page covers a single first-run journey: one worked example, carried from an empty starting state to one observable, working outcome. Every topic on the page MUST serve that journey.

A tutorial's scope is set by the example, not by a feature. Like a journey guide, a tutorial may cross several features because the worked example needs them. What holds the page together is the single running example, not a feature boundary.

### The running example

A tutorial SHOULD run on one concrete worked example, introduced in the introduction and advanced by every task topic on the page. The example is what turns a sequence of procedures into a walkthrough.

The running example SHOULD:

- Be one example, carried from the first task to the last — one project, one app, one deployment, named once and reused
- Use concrete values, not placeholders — a reader following along types what they read
- Appear inside the task topics' steps, not only in the surrounding prose

Once a tutorial has a running example, it MUST NOT change identity partway through. For example, a reader who created OctoFX in the first task must still be working on OctoFX in the last.

### The single path

A tutorial page MUST offer exactly one path from start to finish. No topic may fork the reader onto an alternative route. No "if you're on Windows, do this instead", no optional detours, no parallel platform tracks.

Where a real feature genuinely forks, for example Cloud versus Self-hosted installation, the tutorial picks one path and commits to it. A tutorial that needs to teach two paths is two tutorials, or one tutorial and a guide page.

### Topic order

Topics on a tutorial follow the order the reader works in, with concept topics interleaved just in time. A reader must never reach a task that depends on a step they haven't done, or a task whose model the page hasn't yet given them.

A concept topic MUST immediately precede the task whose model it establishes. Unlike a feature guide, a tutorial does not front-load a single concept topic ahead of all the tasks. Each concept lands at the point in the walkthrough where the reader is about to need it, and not before.

- Do this: Projects (concept) → Create a project (task) → Deployments (concept) → Add a deployment step (task) → Releases (concept) → Create a release (task) → Deploy a release (task). The models that the user needs appear before the tasks that apply them; each task then advances the same example in the order the work happens.
- Not this: front-load Projects (concept), Deployments (concept), Releases (concept), then all four tasks. The reader has to hold multiple models in their head before doing anything.

### Heading structure

The heading structure is important for reader scannability and for LLM retrieval. Follow these constraints:

- The page MUST have exactly one H1: the title, from frontmatter.
- Each concept and task topic's title renders as an H2.
- The "Wrapping up" send-off also takes an H2. It is the one H2 on a tutorial page that is not a composed topic.
- A topic MAY use an H3 for an internal subsection where one is genuinely needed. Use sparingly.
- H4 and deeper MUST NOT be used. Content that seems to need an H4 is a signal the topic is doing too much and should be split.

### Permitted and forbidden topic types

A tutorial page MUST contain only concept topics and task topics.

A tutorial page MUST NOT contain reference, troubleshooting, glossary, or release-note topics:

- Reference topics serve lookup, not first-run learning. A tutorial that stops to enumerate every option breaks the single path. Link to the reference from the "Wrapping up" element if the reader will want it later.
- Troubleshooting topics are never assembled into any page, and a tutorial guarantees a working path in any case.
- Glossary and release-note topics each have their own deliverables.

## Template

```
---
# Frontmatter — see the frontmatter standard.
# type MUST be: tutorial
---
[Introduction. Two or three sentences: what the reader will build and see working by the end, the running example the page uses, and any one-line prerequisite. No heading.]
## [Concept topic 1 title]   <!-- the model the first task needs, and no more -->
[Concept topic body, authored to the concept topic standard.]
## [Task topic 1 title]   <!-- imperative: "Create a project" -->
[Task topic body, authored to the task topic standard, advancing the running example with concrete values. No Troubleshooting element, no Next steps element.]
## [Concept topic 2 title]   <!-- lands just before the task that needs it -->
[Concept topic body.]
## [Task topic 2 title]
[Task topic body, advancing the same running example.]
## [Task topic 3 title]   <!-- a task needs no preceding concept if its model is already established -->
[Task topic body.]
## Wrapping up
[Send-off: acknowledge what the reader built, restate the working outcome, connect it to their real work, and point forward. Up to five links, no placeholders.]
```

## Example

Here's a short, representative tutorial page. It interleaves three concept topics with four task topics — each concept landing immediately before the task that needs it — threads one running example (OctoFX) from the first task to the last, and closes with a "Wrapping up" send-off. Task bodies are abbreviated to keep the example focused on tutorial structure; each is authored in full to the task topic standard.

```
---
title: Your first deployment
sidebarLabel: Your first deployment
description: New to Octopus? Deploy a sample app end to end and learn how the core pieces fit together.
type: tutorial
audience: new-user
// Other frontmatter is discussed in the frontmatter standard
---
In this tutorial you'll deploy a small sample web app, OctoFX, to a test
environment and watch it go live. You'll create a project, define a deployment
step, and push a release through it — the same path every Octopus deployment
follows, at the smallest scale that still works end to end. You'll need an
Octopus Cloud account to follow along.
## Projects
A project is where Octopus keeps everything it needs to deploy one application:
its deployment process, its variables, and its releases. Everything you do in
this tutorial lives inside a single project.
## Create a project
[Task topic body, authored to the task topic standard. Prerequisites, a lead-in,
and numbered steps that create a project named OctoFX. Result: the OctoFX project
appears on the Projects dashboard. No Troubleshooting element, no Next steps.]
## The deployment process
A deployment process is the ordered set of steps Octopus runs to deploy your
application. Each step does one part of the work — deploy a package, run a
script, update a service. Your OctoFX project needs one step to start.
## Add a deployment step
[Task topic body: adds a "Deploy a package" step to the OctoFX project's
deployment process, using the sample package. Result: the step appears in the
OctoFX process editor.]
## Releases
A release is a versioned snapshot of your deployment process and everything it
needs, frozen so you can deploy the same thing to each environment in turn. You
deploy a release, not the process directly.
## Create a release
[Task topic body: creates release 0.0.1 of the OctoFX project. Result: release
0.0.1 appears on the project's Releases page, ready to deploy.]
## Deploy a release
[Task topic body: deploys OctoFX release 0.0.1 to the Test environment. Result:
the deployment finishes with a green Success status, and OctoFX is live in Test.]
## Wrapping up
Nice work! You've run a real deployment using Octopus. You created the OctoFX
project, defined a deployment process, and pushed a release to a live
environment — the same path every Octopus deployment follows, whatever you're
shipping. You now have everything you need to set this up for your own
application.
Where to go next:
- [How the deployment process works](http://path/to/doc)
- [Managing deployment targets](http://path/to/doc)
- [Environments and lifecycles](http://path/to/doc)
```
