# Contributing to the Octopus docs

Contributions to help improve this documentation are welcome. How you contribute depends on whether you're contributing from outside Octopus or you're an Octopus staff member.

Before you submit, check your change against the [documentation content standards](contributing/standards).

## External contributors

- The `main` branch has the latest version of the docs.
- Fork this repo and create a branch for your changes.
- Make the changes you'd like to contribute.
- Submit a pull request (PR) to `main` with your changes and include a comment explaining the changes.
- Sign the [Contribution License Agreement (CLA)](https://cla-assistant.io/OctopusDeploy/docs).
- We'll review your PR and accept it or suggest changes.

See the [Octopus style guide](https://www.octopus.design/latest/brand/writing/overview-VLYeW2mi-VLYeW2mi) for voice, grammar, and formatting conventions.

## Octopus staff

Anyone at Octopus can improve the documentation, whether you're fixing a page you found confusing or writing something new.

This section covers the essentials for working directly in this repository. For the complete guide — including a path for drafting content without touching git, current reviewer logistics, and where to get help — search Octopus's internal Confluence instance for "Documentation contribution and review guide".

You don't need to know the content standards yourself. The `octopus-docs-standards` and `octopus-writing-guide` skills in Claude Code apply them for you.

### Get set up

- [Claude Code](https://claude.com/product/claude-code) (submit an Access Requests ticket if you don't have this).
- Access to the [internal Claude Code plugins marketplace](https://github.com/OctopusDeploy/octopus-claude-internal-plugins).

To install the docs skills, add the marketplace from within Claude Code, then install the plugin:

```text
/plugin marketplace add https://github.com/OctopusDeploy/octopus-claude-internal-plugins
```

```text
/plugin
```

Confirm you can build the site locally (see "Deploying to preview environment" below), and confirm you have the `octopus-docs-standards` skill by asking Claude directly.

### Make your change

Plan the edit with Claude before you change anything. Point it at the source file and ask for an assessment, not a rewrite:

> Assess this page against our documentation standards. What can I do to bring it up to standard? And what's the smallest useful change to bring it closer to spec?

Then make the edits with the agent, working section by section rather than regenerating the whole page.

Never invent specifics. If a fact isn't confirmed — a version number, an error string, a setting name — the agent should mark it (`[VERIFY: ... — needs: ...]` or `[PLACEHOLDER: ... — needs: ...]`) instead of guessing. Resolve or remove every marker before you submit for review.

### Check it before you submit

- Ask the agent to review its own work against the standards and writing guide, then read the result yourself — you're accountable for what ships.
- Confirm outgoing links resolve, and check for incoming anchor links you may have broken by renaming or removing a heading.
- Build the page locally and look at it. This catches MDX problems the source hides, like a `:::` block nested inside another `:::`.
- Markdown lint, spelling, and broken links are also checked automatically on submit (see "Required checks" below) — get them green before you ask for review.

### Submit and review

Put your change on a new branch and open a pull request. Carry your plan into the description so a reviewer can check intent against result.

Review confirms the structure matches the agreed page type, the frontmatter is complete, and no facts were invented or markers left behind — often with the agent's help. The one thing no tool can check is accuracy, so make sure your reviewer has subject-matter expertise for the area you changed. The contribution and review guide in Confluence lists who's reviewing during the current documentation uplift.

### Writing conventions

When you need an example value in docs, use the following:

- Octopus URL: `https://your-octopus-url`
- Octopus API key: `API-YOUR-KEY`
- Snapshot name: `Snapshot XXXXX`
- SubscriptionId: `g3662re9njtelsyfhm7t`
- Fake password: `your-secret-password`

In general, prefer "your" over "my". For example, `your-value`.
