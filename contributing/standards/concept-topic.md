# Concept topic

A concept topic explains what something is, why it exists, and how it relates to other parts of the system. Concepts are expository, not procedural. A concept topic answers "what is this?" and "where does it fit?", not "how do I do this?" Concept topics are the primary building block of concept pages and the opening topic in guide pages.

## Concept topic elements

Concept topics contain the following elements in order:

- Title*
- Short description*
- Visual
- Body*

(* = required)

## Title

**Required**

Write concept page titles as noun phrases using the terms that appear in the product. Titles name the concept. They don't describe an action, ask a question, or frame a learning activity.

Concept topic titles MUST:

- Be a noun phrase
- Use the exact canonical term for the concept as it appears in the UI
- Be unique from other topic titles

Concept topic titles MUST NOT:

- Contain verbs, gerunds, or question framing
- Exceed 60 characters

Content topic titles SHOULD NOT be gerund-led.

### Title examples

Well-formed titles for concept topics:

- Deployment targets
- Spaces
- The deployment process

Poorly-formed titles for concept topics:

- What is a deployment target? (uses question framing)
- Understanding spaces (uses gerund)
- Configure your deployment process (uses a verb phrase)

## Short description

**Required**

The short description is the opening paragraph of the topic. It defines the concept in plain language and explains why the reader should understand it.

Concept topic short descriptions MUST:

- Define the concept
- Include a value statement that explains what understanding this concept enables

Concept topic short descriptions MUST NOT:

- Restate the title
- Contain unexplained product-specific terminology

### Short description examples

A well-formed short description for concept topics:

> Deployment targets are the machines and services that Octopus deploys software to. Defining targets lets you control exactly where deployments run and reuse that configuration across projects.

Poorly-formed short descriptions for concept topics:

> Deployment targets are targets for deployment. (restates the title, no value statement)

> Learn everything you need to know about deployment targets. (promotional, defines nothing)

## Visual

**Optional**

Visuals help readers understand concepts and their relationships between components, workflows, or dependencies. A well-placed diagram or screenshot reduces the amount of text a reader needs to understand how something works. They are high-value, optional assets for describing concepts.

A concept topic may include diagrams or screenshots that clarify the concept. Place each visual immediately after the prose it supports, not in a separate block at the end of the topic. A topic may contain more than one visual.

Concept topic visuals SHOULD be included when:

- The concept involves relationships between multiple components
- A hierarchy or flow is central to understanding the concept

Concept topic visuals MUST:

- Include alt text describing the image for readers who cannot see it

Concept topic visuals MUST NOT:

- Appear without surrounding prose that introduces and interprets what they illustrate

A visual that's proposed but not yet created or embedded MUST use the SUGGESTED VISUAL marker defined in content-conventions.md, never visible body copy. Once the visual exists, embed it with standard Markdown image syntax and alt text per the MUST rule above — that's what the bracketed notation in this topic's worked examples below represents: an embedded image's placement and alt text, not an unresolved suggestion.

Want to go further? See the screenshot and diagram standards for guidance on annotation, consistent examples, sizing, and captions. Those standards also contain the guidance LLMs should follow when generating or evaluating visual content in documentation.

## Body

**Required**

The body explains the concept in enough depth for a reader to understand it, apply it correctly, and recognize how it fits into the broader system.

Concept topic bodies MUST answer:

- What is this?
- Why does it exist and what does it enable?
- How does it relate to other concepts in the system?

Concept topic bodies SHOULD answer:

- When should you use this, and when should you not?

Concept topic bodies MUST NOT:

- Contain procedural content, steps, instructions, or UI directions; these belong in a task topic

### Body examples

Well-formed body for a concept topic:

> A deployment target is a machine or service that Octopus deploys software to. Targets represent the infrastructure in your environment — a Windows server running a Tentacle agent, a Linux machine accessible over SSH, a Kubernetes cluster, or a cloud region. Separating targets from the deployment process means you can change where software runs without changing how it deploys.
>
> Deployment targets belong to one or more environments, such as Development, Staging, or Production. Each target is assigned one or more roles — plain text labels like web-server or db-server — that connect it to the steps in a deployment process. A step that targets the role web-server runs against every deployment target carrying that role in the environment being deployed to.
>
> Use a deployment target when you are deploying software to a machine or service. If you need to run scripts or perform operations that aren't tied to a specific machine — such as calling an API or running a database migration — use a worker instead.

Poorly-formed body for a concept topic:

> To add a deployment target, go to Infrastructure > Deployment Targets and select Add Target. Select the target type and follow the prompts to complete registration. Once registered, your target will appear in the target list and can be assigned to an environment.

(This describes how to use the UI, not what a deployment target is. It belongs in a task topic.)

## Examples

Here's an example of a well-formed concept topic:

---

**Deployment targets**

Deployment targets are the machines and services that Octopus deploys software to. Defining targets lets you control exactly where deployments run and reuse that configuration across projects and teams.

<!-- [Diagram showing the relationship between a deployment target, its environment, its roles, and the deployment process steps that reference those roles.] -->

A deployment target represents a unit of infrastructure in your environment — a Windows server running a Tentacle agent, a Linux machine accessible over SSH, a Kubernetes cluster, or a cloud region. Separating targets from the deployment process means you can change where software runs without changing how it deploys. A deployment process that works in your Development environment works identically in Production because the process is the same — only the targets differ.

Deployment targets belong to one or more environments, such as Development, Staging, or Production. Each target is assigned one or more roles — plain text labels like web-server or db-server — that connect it to the steps in a deployment process. A step configured to target the role web-server runs against every deployment target carrying that role in the environment being deployed to.

Use a deployment target when you are deploying software to a specific machine or service. If you need to run scripts or operations that aren't tied to a specific machine — such as calling an API, sending a notification, or running a database migration — use a worker instead.

---

Here's an example of a poorly-formed concept topic:

---

**What is a deployment target and how do I configure one?**

Deployment targets are targets that you deploy to in Octopus Deploy. This page will explain everything you need to know about deployment targets and how to use them effectively in your deployment process.

To add a deployment target, navigate to Infrastructure > Deployment Targets and click Add Target. Select the target type from the list — options include Tentacle (Windows), Tentacle (Linux), SSH Connection, Kubernetes, and Azure Web App. Complete the required fields and click Save. Your new target will appear in the target list.

[Screenshot of the Add Deployment Target screen.]

---

Why is this poorly-formed?

- The title uses question framing and verb phrase combined and exceeds 60 characters.
- The short description restates the title. It contains no value statement and uses promotional framing ("everything you need to know"). It also contains unexplained terms ("deployment process") without context.
- The body content is procedural. It describes UI navigation and steps. It does not explain what a deployment target is, why it exists, or how it relates to other parts of the system.
- The visual appears without any surrounding prose to introduce or interpret it. A reader arriving at this image has no context for what they're looking at.
