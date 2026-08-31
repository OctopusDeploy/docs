# Documentation content standards

This folder is the source of truth for how Octopus documentation is structured. The `octopus-docs-standards` Claude Code skill and the internal Confluence guidance both point back to these files.

The standards define a typed content model: small typed *topics* compose into typed *page deliverables*. Structure is specified rather than left to each author's judgment, and that specification is what keeps the docs set consistent and findable. So don't write a page from intuition about what a good docs page looks like. Work out which type you're writing, then follow the standards for that type.

These standards govern **structure** — what elements a page contains, and in what order. For voice, tone, spelling, and formatting, see the [Octopus style guide](https://www.octopus.design/latest/brand/writing/overview-VLYeW2mi-VLYeW2mi). The two are complementary: the standards decide what's on the page, the style guide decides how the prose reads.

## The content model

There are two layers:

- **Topics** are the reusable units, and each one does a single job. A concept topic explains an idea. A task topic gives the steps for one action. A reference topic holds structured lookup data.
- **Page deliverables** are what ships at a URL, assembled from topics. There are four: concept, guide, reference, and tutorial pages. More will be added as their standards are agreed.

A topic rendered inside a page becomes one of that page's H2 sections. A topic that ships on its own at its own URL is itself a page deliverable, and carries frontmatter like any other page.

## Which page type am I writing?

The page type follows from the reader's main job on the page. It isn't decided by the subject matter, and it isn't decided by the title.

| The reader wants to | Write a |
| --- | --- |
| Understand a model — how the parts fit together, why they exist | Concept page |
| Complete a procedure | Guide page |
| Look up values — options, settings, commands, variables | Reference page |
| Learn by doing, working through one supplied example end to end | Tutorial page |

If a page seems to need to be two of these, it's usually two pages. Open the candidate standard before you commit to one: each opens by stating what that page type is and is not.

### Guide or tutorial?

This is the easy one to get wrong, because both are built out of procedures. A tutorial is not "a guide for beginners". The question to ask is *whose goal, and whose example?*

A guide serves a reader who arrives with their own job to do and their own values to plug in, and it may branch to cover their situation. A tutorial supplies both the goal and the example, runs a single guaranteed path with no branching, and exists to teach — success is the reader reaching the end, not solving a problem they brought with them.

So if the page invents the goal and hands the reader concrete values to follow, it's a tutorial. If the reader brings both, it's a guide. [tutorial-page.md](tutorial-page.md) opens by setting out this boundary in full.

## Which standards apply

Read the standards for **both** the page and the topics it's assembled from. The page standard governs assembly and ordering; the topic standards govern what goes inside each section. Reading one without the other misses half the rules.

| Writing or editing | Read |
| --- | --- |
| A concept page | [concept-page.md](concept-page.md) and [concept-topic.md](concept-topic.md), plus [reference-topic.md](reference-topic.md) if the page includes reference data |
| A guide page | [guide-page.md](guide-page.md) and [task-topic.md](task-topic.md), plus [concept-topic.md](concept-topic.md) if it opens with a concept introduction, and [reference-topic.md](reference-topic.md) if it includes reference data |
| A reference page | [reference-page.md](reference-page.md) and [reference-topic.md](reference-topic.md) |
| A tutorial page | [tutorial-page.md](tutorial-page.md), [concept-topic.md](concept-topic.md), and [task-topic.md](task-topic.md) |
| A single topic that ships standalone | the matching topic standard for its type |

Two of the standards are cross-cutting, so they don't appear in the table:

- [content-conventions.md](content-conventions.md) applies to every authoring, editing, and review task.
- [frontmatter.md](frontmatter.md) applies to anything that ships at its own URL — every page, and any topic published standalone.

A third is conditional. [version-notes.md](version-notes.md) applies when a page carries version-specific caveats, and it covers concept, guide, and reference pages only — not tutorials.

## The standards

Ordered by the content model rather than alphabetically, because the layering is the point.

Topics:

- [concept-topic.md](concept-topic.md)
- [task-topic.md](task-topic.md)
- [reference-topic.md](reference-topic.md)

Pages:

- [concept-page.md](concept-page.md)
- [guide-page.md](guide-page.md)
- [reference-page.md](reference-page.md)
- [tutorial-page.md](tutorial-page.md)

Cross-cutting:

- [frontmatter.md](frontmatter.md)
- [content-conventions.md](content-conventions.md)
- [version-notes.md](version-notes.md)

## Using these with Claude Code

You don't have to apply these standards by hand. The `octopus-docs-standards` skill reads them for you and applies them as you draft or review, and `octopus-writing-guide` covers voice and style alongside it. See [CONTRIBUTING.md](../../CONTRIBUTING.md) for how to get set up and how to work with the agent.
