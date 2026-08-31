# Content conventions

This standard governs authoring conventions that apply across every topic and page type: output format, the markers used for not-yet-real content, and how a proposed visual is represented before it exists. It is a cross-cutting standard, like `frontmatter.md`: it sits alongside, not inside, the page and topic standards that govern body content, and it applies regardless of deliverable type.

This standard does not define page structure, topic elements, or frontmatter fields; those belong to the relevant page, topic, and frontmatter standards.

## Output format

Deliverables MUST be authored in Markdown (`.md`) by default.

MDX (`.mdx`) SHOULD be used only when a page needs components that Markdown cannot express — for example, an interactive tabbed code sample or an embedded UI widget. Plain prose, headings, lists, tables, and images do not qualify; Markdown expresses all of them on its own.

### Output format examples

- Do this: author `deployment-targets.md` as plain Markdown, since headings, a table, and prose fully express the content.
- Not this: author the same content as `deployment-targets.mdx` because MDX happens to be available. Reaching for MDX without a genuine component need adds a build dependency the page doesn't use.

## Authoring markers (pre-ship, tracked, greppable)

Content isn't always ready to ship the moment it's drafted. Authoring markers name what's missing so the gap is visible, greppable, and owned — never silently invented, and never silently shipped. A marker is a pre-publication authoring artifact. It is never rendered to readers and must not survive into a shipped page.

**Disambiguation.** This is a different concept from the "no placeholders" rule that governs related links elsewhere in these standards (see concept-page.md, guide-page.md, reference-page.md). That rule prohibits a shipped dead end — a "Coming soon" link that never resolves — and it remains forbidden, unchanged. The markers defined here are the opposite case: a pre-ship signal that a human still needs to act, which must be resolved or removed before the page can pass. The word "placeholder" appears in both rules; they are not the same rule, and must not be conflated.

Three markers cover the ways content can be not-yet-real. Each is typed: it carries its specifics inline rather than standing as a bare token.

| Marker | Form | Means |
|---|---|---|
| `[VERIFY: <claim> — needs: <what/who confirms it>]` | Bracket tag | Content is present but not yet confirmed against source. |
| `[PLACEHOLDER: <what is missing> — needs: <what a human must supply>]` | Bracket tag | Content is absent. |
| `<!-- SUGGESTED VISUAL: <what to show and why> -->` | HTML comment | A visual is proposed but not yet created or embedded. |

The suggested-visual marker uses an HTML comment rather than a bracket tag because it stands in for a block element (an image or diagram) and MUST NOT render to readers the way inline bracketed prose would.

Authoring markers MUST:

- Match one of the three forms above exactly, so every marker in a page or across the repository can be found with a single grep pattern.
- State what is missing or unconfirmed, and what a human must supply to resolve it, inline in the marker itself. A bare token (`[TODO]`, `[PLACEHOLDER]` with nothing after it) carries neither and is not well-formed.
- Be used, by human or AI authors alike, in place of inventing a technical specific. A fabricated flag, setting, or path is the highest-severity defect in these standards — worse than a marked gap, because a reader acts on it as if it were confirmed.

Authoring markers MAY:

- Exist in in-progress content. A gap never halts the work (flag forward); mark it and keep moving.

A page carrying an unresolved marker MUST NOT be considered conformant or shippable. Markers are resolved — grounded in source — or removed entirely before a page passes validation. A page with zero markers is, on this axis, shippable; a page with any unresolved marker is not.

### Authoring markers examples

- Do this: `[PLACEHOLDER: the minimum supported Kubernetes version — needs: confirmation from the Kubernetes step SME]`
- Not this: inventing "Kubernetes 1.24 or later" to fill the gap, or leaving a bare `[TODO]` with no detail

A well-formed draft fragment carrying markers:

> Tentacle requires **[VERIFY: minimum supported .NET runtime version — needs: confirmation from the Tentacle release notes]** on the target machine.
>
> [PLACEHOLDER: the error message shown when a health check times out — needs: the exact string or a screenshot from engineering]
>
> <!-- SUGGESTED VISUAL: a sequence diagram showing the health check handshake between Server and Tentacle -->

This is well-formed because each marker states exactly what's missing and what resolves it, matches one of the three forms exactly, and the suggested visual is a comment — invisible if the page shipped exactly as drafted.

A poorly-formed version of the same fragment:

> Tentacle requires .NET 6.0 or later on the target machine. If the health check fails, you'll see a timeout error.
>
> [Insert diagram of the health check handshake here]

This is poorly-formed because the .NET version and the error message are invented rather than marked — the highest-severity defect — and the visual is written as visible body copy instead of a comment. A reader would see "[Insert diagram of the health check handshake here]" rendered on the live page.

## Suggested visuals

This section states when the SUGGESTED VISUAL marker (defined above) applies. It does not redefine topic-level visual rules — see concept-topic.md (## Visual) and task-topic.md (### Inline screenshots in steps) for when a visual should be included and what it must contain.

A visual that is proposed but not yet created or embedded MUST be written as the `<!-- SUGGESTED VISUAL: <what to show and why> -->` comment, never as visible body copy.

An actual, created visual MUST use normal Markdown image syntax with alt text (`![alt text](path)`), per the visual rules in the relevant topic standard.

An "insert screenshot here"-style note MUST NOT appear as rendered body copy, in any form — bracketed, bolded, or plain prose.

### Suggested visuals examples

- Do this: `<!-- SUGGESTED VISUAL: a diagram showing the relationship between a deployment target, its environment, and its roles -->`
- Not this: `[Insert a diagram here showing the relationship between a deployment target, its environment, and its roles]` written as visible prose in the topic body

A well-formed treatment of a proposed visual, mid-draft:

> Deployment targets belong to one or more environments and carry roles that connect them to deployment process steps.
>
> <!-- SUGGESTED VISUAL: a diagram showing a deployment target linked to an environment and the roles that connect it to process steps -->
>
> Use a deployment target when deploying to a specific machine or service.

A poorly-formed treatment of the same:

> Deployment targets belong to one or more environments and carry roles that connect them to deployment process steps.
>
> [Insert diagram here]
>
> Use a deployment target when deploying to a specific machine or service.

This is poorly-formed because "[Insert diagram here]" is written as visible body copy. A reader arriving at the shipped page would see the literal bracketed text rendered where a diagram should be.
