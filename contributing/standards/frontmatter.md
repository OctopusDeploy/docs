# Frontmatter

This standard governs the YAML frontmatter block at the top of every page deliverable. It is a cross-cutting standard: it applies to all deliverable types (concept pages, guide pages, reference pages, and the deliverables that follow as their standards ship). It sits alongside, not inside, the page and topic standards that govern body content.

This standard defines which fields exist, the rules for each field, the build-time values derived from frontmatter, and what the validation check enforces. It does not govern body content, topic structure, or title conventions beyond the page title; those belong to the relevant page and topic standards.

## The schema

Every page MUST carry the following frontmatter block. The schema is a fixed skeleton: every defined field is present in every file, including optional ones.

- The frontmatter block MUST contain every field defined in this schema.
- Required fields MUST be non-empty.
- Optional fields MUST be present but MAY be empty. An empty value parses as null and is treated as "not provided".

| Field | Required | Type | Constraint | Purpose |
|---|---|---|---|---|
| `title` | Required | string | ≤ 60 chars | Renders as the page H1 and `<title>`. Follows the deliverable's page standard for title convention. |
| `sidebarLabel` | Required | string | short; distinct within its nav group | Navigation label. |
| `navOrder` | Optional | integer | — | Sibling order within the nav group. Empty accepts default ordering. |
| `description` | Required | string | ≤ 160 chars | Meta description. Not rendered in the page body. |
| `subject` | Optional | string | comma-separated; 2–8 keywords recommended; no duplicates | Keywords for search faceting and GEO. Optional but highly recommended. |
| `type` | Required | enum | one of concept, guide, reference, tutorial | Internal deliverable type. Drives @type and layout by mapping (see Mapping tables). |
| `audience` | Required | enum list | one or more values from the controlled vocabulary | Declared target audience. Multi-valued. Also seeds the synthetic-persona review step. |
| `image` | Optional | string (path) | resolves to an existing file when set | Open Graph share image. Empty falls back to the site default. |
| `imageAlt` | Conditional | string | required and non-empty when image is set | Alt text for the OG image. |

## Field-by-field rules

### title

The title field MUST:

- Be present and non-empty
- Be ≤ 60 characters
- Follow the title convention of the deliverable's page standard. This is the page title (H1), not a topic title; topic-level title rules DO NOT apply here.

The title field MUST NOT contain Markdown, HTML, or trailing punctuation.

- Do this: `Manage deployment targets`
- Not this: `Adding, configuring, and removing your Octopus deployment targets` (over 60 characters; task-topic phrasing; reads as a list of topics, not a page)

The title's format is set by the deliverable's page standard and varies by type, so the same feature yields different page titles: a guide page uses a gerund ("Managing deployment targets"), while concept and reference pages use noun phrases ("Deployment targets," "System variables"). Always check the deliverable's page standard for the exact convention.

### sidebarLabel

The sidebar label field MUST:

- Be present and non-empty

The sidebar label field SHOULD:

- Be unique among siblings in the same nav group
- Be shorter than title

The sidebar label field MAY:

- Equal title when title is already short and unambiguous in a list.

### navOrder

navOrder MAY be empty. When non-empty, it MUST be an integer. Empty means the nav applies its default ordering.

### description

The description field MUST:

- Be present and non-empty
- Be ≤ 160 characters

The description field SHOULD:

- Be unique per page

Descriptions are not rendered in the page body. They populate meta descriptions only. Reused descriptions weaken search differentiation, hence they should be unique-per-page.

### subject

The subject field is optional but highly recommended. It MAY be empty.

When non-empty, the subject field MUST be formatted as a comma-separated list of 2–8 keywords. These keywords should be unique (no duplicates; case-insensitive).

The subject field feeds DC.subject (Dublin Core) and keywords (schema.org) for search faceting and GEO. One lazy keyword helps nothing.

- Do this: `deployment targets, Tentacle, SSH, Kubernetes, deployment infrastructure`
- Not this: `deployment targets` (below the useful floor) / `Kubernetes, kubernetes` (duplicate)

### type

The type field MUST:

- Be present and non-empty
- Be exactly one of: concept, guide, reference, or tutorial.

The type is the page's single source of truth for what the deliverable is, defining both schema.org metadata blocks and the supported page layout when the site builds. See "Mapping tables" below for more details.

### audience

The audience field MUST:

- Be present, with one or more values from the vocabulary table that follows.

The audience field MUST NOT:

- Contain values outside the list. A new audience value requires a change to this standard.

The audience field MAY:

- Be multi-valued.

Valid audience values are kebab-case, all-lowercase, and drawn from this list:

| Value | Meaning |
|---|---|
| `app-dev` | Application developer |
| `devops-eng` | DevOps engineer |
| `platform-eng` | Platform engineer |
| `infra-eng` | Infrastructure engineer |
| `admin` | Octopus administrator |
| `buyer` | Purchasing or decision-making stakeholder |
| `evaluator` | Assessing the product, not yet adopted |
| `new-user` | Recently adopted, still onboarding |
| `power-user` | Experienced, proficient user |

The values group loosely into role (`app-dev`…`buyer`), journey stage (`evaluator`, `new-user`), and proficiency (`power-user`). Any combination is valid.

- Do this: `[evaluator, new-user]`
- Not this: `[developers, beginners]` (free-form values outside the vocabulary)

### image

The image field is optional and MAY be empty. When non-empty, the image field MUST be a path that resolves to an existing file in the repository.

Most pages set no custom share image and fall back to the site default. Empty is the normal state.

### imageAlt

MUST be present and non-empty when image is non-empty.

When image is empty, imageAlt MUST be present but empty.

When there is no image, the key still exists (skeleton convention) but carries nothing.

## Mapping tables

@type and layout are derived from type at build time. Neither is stored in frontmatter.

The build MUST derive @type and layout from type using the tables below. A type value with no row is a build error, not a silent fallback.

type → schema.org @type (emitted in the JSON-LD block):

| type | @type |
|---|---|
| concept | TechArticle |
| guide | TechArticle |
| reference | TechArticle |
| tutorial | TechArticle |

type → layout (the Astro layout component):

| type | layout |
|---|---|
| concept | article |
| guide | article |
| reference | article |
| tutorial | article |

## Examples

Here's an example of a well-formed frontmatter block with every defined field present, and optional fields left empty where unused:

```yaml
---
title: Managing deployment targets
sidebarLabel: Deployment targets
navOrder: 3
description: Add, configure, and remove the machines and services Octopus deploys to.
subject: deployment targets, Tentacle, SSH, Kubernetes, deployment infrastructure
type: guide
audience: [platform-eng, infra-eng, new-user]
image:
imageAlt:
---
```

This is well-formed because:

- title is feature-scoped, under 60 chars with no trailing punctuation
- sidebarLabel is shorter than the title and reads cleanly in a narrow nav column
- navOrder is set because position relative to siblings matters
- description is one plain-prose sentence under 160 chars
- subject is a comma-separated list of five keywords within the 2–8 band with no duplicates
- type is guide which is a valid value according to the table in this spec
- audience contains three valid values from the vocabulary
- image and imageAlt are both present but remain empty (which falls back to the default Open Graph image at build time)

Here's an example of a poorly-formed frontmatter block:

```yaml
---
title: Adding, configuring, viewing, and deleting your deployment targets in Octopus
description: Deployment targets.
subject: deployment targets
type: how-to
audience: [developers, beginners]
image: /img/targets-og.png
imageAlt:
---
```

This is poorly-formed because:

- title is over the character limit and styled as a task list rather than a page title
- description is too thin for humans or machines to reasonably predict the content present on the page
- subject keyword list does not contain enough keywords to help facilitate search
- type uses a token that does not exist
- audience carries free-form values that are not valid according to this spec
- image is set while imageAlt is empty, the one invalid combination of that pair
- The block is also missing the sidebarLabel and navOrder fields
