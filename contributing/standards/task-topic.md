# Task topic

A task topic provides step-by-step instructions for completing a single, discrete action. Each step contains one action. The topic includes explicit prerequisites, a stated result, and optional next steps. Task topics are the primary building block of how-to pages and the procedural backbone of guide pages.

## Task topic elements

Task topics contain the following elements in order:

- Title*
- Short description*
- Prerequisites
- Steps*
- Result
- Troubleshooting
- Next steps

(* = required)

## Title

**Required**

Write task topic titles as commands (imperative verb phrases) that name a single action, using the terms that appear in the product. The title states what the reader will accomplish, beginning with the verb. Where a procedure differs by platform, stack, or vendor, write a separate task with its own title rather than one title covering multiple procedures.

Task topic titles MUST:

- Begin with a command (commonly create, add, view, edit, delete)
- Name exactly one action
- Use the canonical product term for the object of the action as it appears in the UI
- Be unique from other topic titles

Task topic titles MUST NOT:

- Use gerunds, noun-phrase-only forms, or question framing
- Bundle multiple procedures into one title
- Exceed 60 characters

### Title examples

Well-formed titles for task topics:

- Add a deployment target
- Install Octopus Server on a Windows VM
- Install Octopus Server on a Linux host with Docker
- Create a deployment process

Poorly-formed titles for task topics:

- Adding a deployment target (uses a gerund)
- Deployment target confirmation (noun phrase, no action)
- How do I install Octopus Server? (uses question framing)
- Create and configure a runbook (bundles two procedures and should be split)

## Short description

**Required**

The short description is the opening paragraph of the topic. It states what completing the task accomplishes and why the reader would do it. It orients a reader who arrived looking for steps. It does not teach the concept or begin the procedure.

Short descriptions MUST:

- State what completing the task accomplishes
- Identify when to perform the task, where that isn't self-evident from the title

Short descriptions MUST NOT:

- Restate the title
- Contain or pre-empt the steps
- Carry extended conceptual explanation — push that to the optional concept intro at the page level

### Short description examples

A well-formed short description for the task "Add a deployment target":

> A deployment target must be set up in Octopus before any deployment process can run against it. Follow these steps to register a single target and assign it to an environment. This makes the deployment target available to the steps that deploy there.

Poorly-formed short descriptions for the same task:

> This task explains how to add a deployment target. (restates the title)

> First, go to Infrastructure > Deployment Targets and select Add Deployment Target… (pre-empts the steps; the procedure belongs in the steps element)

> A deployment target represents a unit of infrastructure, such as a Windows server running a Tentacle, a Linux machine reached over SSH, or a Kubernetes cluster. Each target belongs to one or more environments… (this belongs in a concept topic at the top of a page, not in a task topic)

## Prerequisites

**Required when they exist**

Prerequisites list what must already be true before the reader starts. Each item is a single, verifiable condition. Omit the block entirely when the task has no prerequisites.

Prerequisites MUST:

- State each condition as a single checkable item, in an unordered list
- Link to the task that satisfies the condition, where one exists
- Be limited to genuine blockers — things that will cause the procedure to fail if missing

Prerequisites MUST NOT:

- Contain steps or instructions. A prerequisite names a required state. It doesn't tell the reader how to reach it.
- List general background knowledge that isn't a checkable condition. For example, "familiarity with deployments."

### Prerequisites examples

Well-formed prerequisites for the task "Add a deployment target":

> **Before you begin**
>
> You'll need:
>
> - An environment to assign the target to. Learn more about environments.
> - A Tentacle agent installed on the target machine, or SSH access to it. Learn more about Tentacles.
> - The Infrastructure permission in the space. Learn more about permissions.

Poorly-formed prerequisites for the same task:

> Before you start, install the Tentacle agent by downloading it from the downloads page, running the installer, and selecting the listening or polling mode that matches your network. (this is a procedure; link to the install task instead of rewriting it)

## Steps

**Required**

Steps are the procedure. Each step is one action, written as an imperative instruction beginning with the verb. Steps are ordered, sequential, and assume the reader performs them in order. The procedure covers the single, happy, recommended path for completing the task (even if there are multiple ways to achieve the desired result).

Steps MUST:

- Be presented as an ordered (numbered) list, never a bulleted list.
- Be introduced by a lead-in line that names the procedure; the list never floats on its own
- Contain exactly one action per step
- Begin with an imperative verb and state the location before the action (where to be, then what to do)
- Use bold treatment for UI labels and mirror the casing shown in the UI
- Use `>` for navigation paths
- Use backticks for parameters, file paths, and commands
- Be free of conditional branching. If the procedure forks by platform, stack, or vendor, split it into separate task topics.

Steps MUST NOT:

- Combine multiple actions in one step
- Carry conceptual explanation — if a step needs a caveat or rationale, use a note admonition, not body prose inside the step
- Nest beyond one level of substeps

Steps MAY:

- Include inline screenshots, sparingly (see Inline screenshots in steps below)

### Steps examples

Well-formed steps for the task "Add a deployment target":

> To add a deployment target:
>
> 1. From the project dashboard, select **Infrastructure > Deployment Targets**.
> 2. Select **Add Deployment Target**.
> 3. Select the target type that matches your infrastructure.
> 4. Enter the requested configuration details, including at least one **Environment** and **Target** tag. See related links for specific guidance per type of deployment target.

Poorly-formed steps for the task "Add a deployment target":

> Navigate to the Infrastructure section of the nav, click Deployment Targets, then click Add Deployment Target and select the type of target you want. Tentacle targets communicate over a secure channel. You can either listen or poll using tentacles… (does not use a numbered list, has no lead-in, combines three actions, and embeds conceptual content)

### Inline screenshots in steps

Screenshots in a task are verification aids attached to a specific step. They are not high-level diagrams. Add one only when it earns its place.

Include a screenshot when:

- The reader might struggle to locate an item in the UI
- The procedure moves from one area of the UI to another
- It confirms the reader has reached the expected state before continuing

Screenshots MUST:

- Sit directly beneath the step they support, as continuation content of that step. They must not appear as their own numbered or bulleted list item.
- Include alt text describing what the image shows.
- Supplement the step, never replace it. The written instruction must stand alone for readers who can't see the image.

Screenshots MUST NOT:

- Appear for steps that are unambiguous from the text alone

A screenshot that's proposed but not yet created uses the SUGGESTED VISUAL marker defined in content-conventions.md, never visible body copy. Once the screenshot exists, embed it with standard Markdown image syntax and alt text per the rules above — that's what the `[Screenshot: …]` notation in this standard's worked example below represents: an embedded image's placement and alt text, not an unresolved suggestion.

## Result

**Optional, highly recommended**

The result states the observable outcome of completing the steps, so the reader can confirm they succeeded. Include it whenever the outcome can be stated accurately. Where there's no visible confirmation in the UI, the result can include a verification instruction the reader can run.

Prefer omission over fabrication. If you cannot state the outcome accurately, drop the element rather than invent one.

Results MUST:

- Describe an outcome the reader can actually observe, or give a verification step they can run
- Be a single statement of the state achieved by successfully completing the associated steps

Results MUST NOT:

- Restate the final step verbatim
- Introduce steps the procedure left out
- Assert an outcome the author can't verify

### Result examples

A well-formed result for the task "Add a deployment target" for targets with a visible outcome in the UI:

> The target appears in the Deployment targets list with a green Healthy status once Octopus completes its first health check.

A well-formed result for the task "Add a deployment target" for targets with no visible outcome in the UI:

> You can confirm that the target is reachable by running a health check from the target's overview page.

A poorly-formed result for the same task:

> The deployment target has been added successfully. (restates the final step and gives the reader nothing observable to check against)

## Troubleshooting

**Optional**

A single link to the troubleshooting topic that covers failures of this task, for a reader whose result didn't match. Troubleshooting content lives in its own standalone topic. A task topic links to it rather than embedding recovery steps. Place this element immediately after the result, so a reader who didn't reach the expected outcome finds the recovery path at the point of friction.

Troubleshooting MUST:

- Be a single link to a troubleshooting topic that covers failures of this task
- Be framed as recovery (the condition, then where to go)
- Be omitted entirely when no troubleshooting topic exists for the task

Troubleshooting MUST NOT:

- Invent or link to a troubleshooting topic that doesn't exist, to fill the element. Prefer omission over fabrication.
- Contain troubleshooting steps inline. Recovery content belongs in the troubleshooting topic, not the task.
- List more than one troubleshooting link. Many failure modes are one troubleshooting topic covering them, not many links.

### Troubleshooting examples

A well-formed troubleshooting link for the task "Add a deployment target":

> If the target doesn't reach a healthy status, see Troubleshoot deployment targets.

A poorly-formed troubleshooting link for the same task:

> For more help, see the troubleshooting page, the Tentacle docs, the SSH guide, and the community forum. (multiple links; not specific to this task's failure; mixes recovery with general discovery)

## Next steps

**Optional**

Next steps point the reader to the single most likely forward action in their workflow. They briefly describe what to do next to keep making progress after this task. They are not a list of everything that may be related to the task.

Next steps MUST:

- Point to a logical follow-on task in the same workflow
- Be framed as forward motion, with the action stated

Next steps MUST NOT:

- List more than two or three onward paths

### Next steps example

Well-formed next steps for the task "Add a deployment target":

> After adding deployment targets, you can now add a deployment step that deploys to the target.

## Examples

Here's an example of a well-formed task topic:

---

**Add a deployment target**

A deployment target must be set up in Octopus before any deployment process can run against it. Follow these steps to register a single target and assign it to an environment. This makes the deployment target available to the steps that deploy there.

**Before you begin**

You'll need:

- An environment to assign the target to. Learn more about environments.
- A Tentacle agent installed on the target machine, or SSH access to it. Learn more about Tentacles.
- The Infrastructure permission in the space. Learn more about permissions.

To add a deployment target:

1. From the project dashboard, select **Infrastructure > Deployment Targets**.
2. Select **Add Deployment Target**.
3. Select the target type that matches your infrastructure.
  <!--[Screenshot: the Add Deployment Target screen showing the available target types. Alt text: "The Add Deployment Target screen with target type options."]-->
4. Enter the requested configuration details, including at least one **Environment** and **Target** tag. See related links for specific guidance per type of deployment target.

The target appears in the Deployment targets list with a green Healthy status once Octopus completes its first health check.

If the target doesn't reach a healthy status, see Troubleshoot deployment targets.

After adding a deployment target, you can add a deployment step that deploys to the target.

---

Here's an example of a poorly-formed task topic:

---

**How do I add and configure a deployment target?**

This topic explains how to add and configure a deployment target. A deployment target represents a unit of infrastructure, such as a Windows server running a Tentacle, a Linux machine reached over SSH, or a Kubernetes cluster. Each target belongs to one or more environments and carries tags that connect it to the steps in a deployment process.

You should be familiar with deployments and how Octopus works. First, install the Tentacle agent by downloading it from the downloads page, running the installer, and selecting the listening or polling mode that matches your network.

Navigate to the Infrastructure section of the nav, click Deployment Targets, then click Add Deployment Target and select the type of target you want. Tentacle targets communicate over a secure channel and can either listen or poll.

If you're on Windows, install a Tentacle and choose a communication mode. If you're on Linux, set up SSH access instead and skip the Tentacle steps.

Fill in the fields and save.

The deployment target has been added successfully.

Add a deployment step. See also Deployment targets, Environments, Deployment target tags, Workers, Variables, Channels, Lifecycles, and Projects.

---

Why is this poorly-formed?

- The title uses question framing and bundles two procedures (add and configure). It should be a single command naming one action, and the two procedures should be split into separate task topics.
- The short description restates the title and then dumps conceptual content — what a deployment target is and how it relates to environments and tags. That explanation belongs in a concept topic at the top of the page, not in the task.
- The prerequisites list general background knowledge ("familiar with deployments"), which isn't a checkable condition, and then inlines the Tentacle install as a procedure. A prerequisite names a required state and links to the task that satisfies it. It doesn't rewrite that task.
- The steps are a bulleted list with no lead-in. The first step combines three actions and embeds conceptual explanation about Tentacle communication. The second step branches by platform. This signals two task topics. The third step ("Fill in the fields and save") is too vague to follow.
- The result restates the final step and gives the reader nothing observable to verify against.
- Next steps lists far more than two or three onward paths.
