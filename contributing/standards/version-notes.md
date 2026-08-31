# Version notes

This standard governs the version notes element: an optional, page-level block that collects caveats tied to specific self-hosted Octopus versions. It is a cross-cutting standard. It applies to concept pages, guide pages, and reference pages. It sits alongside, not inside, the page and topic standards that govern body content.

Version notes exist to keep version-specific detail out of the main body. A caveat that applies only to some self-hosted versions is noise for the reader on any other version, so it is lifted out of the prose where it would otherwise interrupt the majority case and collected in one block at the foot of the page.

This element does NOT apply to tutorial pages. Tutorial pages MUST NOT carry version notes.

The documentation set itself is not versioned. Version notes are how a single, unversioned page acknowledges that a detail differs across the self-hosted versions readers run.

## What a version note is, and is not

A version note records one of three things, each keyed to a self-hosted Octopus version:

- Availability - a capability exists from a given version onward.
- Removal - a capability existed until a given version and no longer does.
- Behavior change - a capability worked one way before a given version and differently after.

A version note is NOT:

- A caveat true across every version the page addresses. That is ordinary body content and belongs in the prose or the introduction where it applies, not in this block. The test is whether a self-hosted version boundary changes the answer; if no boundary is involved, it is not a version note.
- A statement about Octopus Cloud. Cloud always runs the latest release and never carries a version caveat. Version notes reference self-hosted versions only, and MUST NOT be keyed to Cloud.
- An authoring marker. The `[VERIFY]` and `[PLACEHOLDER]` markers in `content-conventions.md` are pre-ship signals that never render to readers. A version note is finished, rendered content. The two MUST NOT be conflated.

## Placement and heading

The element MUST:

- Use the exact H2 heading `Version notes`.
- Be the last body element on the page, immediately before Related links.

The element renders only where needed. Unlike the frontmatter skeleton, it is not present-but-empty on pages that have no caveats. A page with nothing to note omits the heading and the block entirely.

Placing version notes above Related links keeps Related links as the single terminal element across every page, and keeps the caveats inside the reading flow rather than stranded beneath the navigation the reader uses to leave.

## What each entry contains

Every entry MUST name three things:

- The subject - the capability, setting, or behavior the caveat applies to.
- The version boundary - the self-hosted version or build the caveat is keyed to.
- What is true at that boundary - available from, removed in, or changed from/to.

Naming the subject in every entry is what makes a collected, bottom-of-page block work. Lifted out of the prose, an entry that reads only "Available from 2024.2" is unreadable; the reader cannot tell what it refers to. The subject line is the cost of relocation, and it is mandatory.

Each entry MUST:

- Reference a self-hosted Octopus Server version or build, never Cloud.
- Record the version or build string exactly as the source states it, including a build number and a trailing `+` where the source carries them (`2025.4.10333+`, not `2025.4`). Rounding a boundary, or inventing one that the source does not state, is a fabricated technical specific — the highest-severity defect in these standards (see `content-conventions.md`).

An entry MAY:

- Carry more than one version boundary for a single subject, where a capability lands on parallel release trains at different builds (for example, a fix present in both a maintained line and the current line). List each boundary the subject applies to.

## Relevance

A version note SHOULD be included only while its boundary is still relevant to readers who run self-hosted Octopus. A caveat keyed to a version older than anyone still runs adds a line no reader needs, which works against the reason the element exists.

These standards do not define a version floor. Relevance is a matter of author judgment: an author keeps a note while it still serves self-hosted readers and drops it when it no longer does. This is not mechanically enforceable, and the validation check does not prune stale notes.

## Format

Use the shape that stays scannable for the number of entries:

- A bulleted list when there are few entries.
- A table with the subject as the first column once several entries accumulate. The subject-first column keeps every row self-describing.

## Examples

A well-formed version notes block as a list:

> ## Version notes
>
> - Viewing build information under Deploy ➜ Manage ➜ Build Information is available from Octopus Server 2019.10.0.
> - Viewing build information on deployments is available from 2024.2.
> - Kubernetes manifest reporting via the `kubectl` helper functions is available in 2025.4.10333+ and 2026.1.4557+.

This is well-formed because each entry names its own subject, keys to a self-hosted version, records the version strings exactly as the source states them (including the build numbers and `+` on the Kubernetes entry), and the one entry that lands on two release trains lists both boundaries.

The same content as a table, once the list has grown enough to warrant one:

> ## Version notes
>
> | Capability | Availability |
> |---|---|
> | Build information page (Deploy ➜ Manage ➜ Build Information) | From 2019.10.0 |
> | Build information on deployments | From 2024.2 |
> | Kubernetes manifest reporting (`kubectl` helpers) | 2025.4.10333+, 2026.1.4557+ |

A well-formed removal entry:

> - The `Octopus.Features` setting that toggled the legacy portal was removed in 2023.2; from that version the setting has no effect and can be deleted.

A well-formed behavior-change entry:

> - Before 2022.3, deleting an environment left its variable scopes in place; from 2022.3 the scopes are removed with the environment.

Each names the subject, the boundary, and what changed at it.

A poorly-formed version notes block:

> ## Version notes
>
> - Available from 2024.2.
> - Now works on Cloud.
> - Build information is available from around 2019 or so.
> - All values are returned as strings.

This is poorly-formed because:

- The first entry names no subject; lifted out of the prose it is unreadable.
- The second is keyed to Cloud, which always runs the latest release and never carries a version caveat.
- The third rounds the boundary ("around 2019 or so") instead of recording the exact version the source states — an invented technical specific.
- The fourth is not version-specific at all. It is a caveat true across every version and belongs inline where it applies, not in this block.

## Template

```
## Version notes   <!-- optional; self-hosted versions only; last body element, before Related links -->
- [Subject] is available from [exact self-hosted version].
- [Subject] was removed in [exact self-hosted version]; [what is true from that version].
- Before [exact self-hosted version], [subject] [old behavior]; from [that version], [new behavior].
```
