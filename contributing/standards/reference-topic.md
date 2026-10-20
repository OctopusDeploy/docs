# Reference topic

A reference topic enumerates a complete set of options, values, commands, or requirements in a structured, scannable, table format. It does not explain or instruct. It describes what exists and what it does. Reference topics are used in hand-authored documentation (as opposed to auto-generated API or CLI references) delivered as optional supporting topics within articles.

## Reference topic elements

Reference topics contain the following elements in order:

- Title*
- Short description*
- Reference table*
- Examples

(* = required)

## Title

**Required**

Write reference topic titles as noun phrases that name the enumerated set or the artifact being documented, using the terms that appear in the product. Where a concept title names an idea, a reference title names the concrete thing a reader looks up, like a file, a list of configuration settings, or a list of requirements.

Reference topic titles MUST:

- Be a noun phrase
- Name the set, artifact, or collection being enumerated
- Use the canonical product term as it appears in the UI or the artifact
- Be unique from other topic titles

Reference topic titles MUST NOT:

- Use verbs, gerunds, or question framing
- Exceed 60 characters

### Title examples

Well-formed titles for reference topics:

- Built-in user roles
- System requirements
- Deployment target settings

Poorly-formed titles for reference topics:

- Configuring deployment targets (gerund; names an action, not a set)
- Deployment targets (names the idea, not the enumerated set)
- What are the system requirements? (question framing)

## Short description

**Required**

The short description is the opening paragraph of the topic. It states what the table enumerates and where the reference applies, for example the version or product context the values are valid for. It does not define concepts or provide steps for completing tasks.

Reference topic short descriptions MUST:

- State what the table enumerates
- State where the reference applies (version, subscription, or product scope) wherever that affects the values
- Note explicitly when the enumerated set is partial rather than complete

Reference topic short descriptions MUST NOT:

- Restate the title
- Explain why the reader would care, or when to use the thing
- Begin describing individual entries (these belong in the reference table)

### Short description examples

A well-formed short description for "Built-in user roles":

> Octopus ships with a set of built-in user roles. This topic lists each built-in role and the permissions it grants. Roles introduced in later versions of Octopus are not added to existing built-in roles automatically.

Poorly-formed short descriptions for the same reference:

> Built-in user roles are the user roles that are built into Octopus. (restates the title; states no scope)

> User roles play a major part in the Octopus security model. They're assigned to teams and dictate what members can do, so getting them right matters for keeping your instance secure. (security-model framing and rationale belong in a concept topic)

> The first role, Build Server, lets build servers publish packages and create releases and deployments… (begins describing individual entries)

## Reference table

**Required**

The reference table is the main body and majority of the topic. It displays every member of the enumerated set in a structured, scannable form so a reader can locate one entry without reading the others. The table doesn't explain why the set matters or how to use it (these are handled through related links). It states what each item is and what it does.

Reference tables MUST:

- Display the enumerated set as a table
- Be complete and enumerate every item of the set
- Use consistent phrasing, structure, and level of detail across the rows (parallel structure)
- Follow logical and predictable ordering, either alphabetical or the order the items appear in the UI
- Keep every cell factual and descriptive

Reference tables MUST NOT:

- Contain procedural content
- Contain conceptual framing
- Interleave other topic types into the table flow

The table's columns follow the natural structure of the set. Common formats include:

- A properties table (name, type, default, description) for settings, schema, and variables
- A comparison matrix (items down one axis, capabilities or editions across the other) for permissions and feature support
- A requirements list (component to requirement) for system requirements and compatibility. Choose the columns the set demands

### Reference table examples

A well-formed reference table for the reference topic "Built-in user roles":

| User role | Description |
|---|---|
| Build Server | Can publish packages and create releases, deployments, runbook snapshots, and runbook runs. |
| Certificate Manager | Can edit certificates and export private keys. |
| Deployment Creator | Can create deployments and runbook runs. |
| Project Viewer | Can view a project, its releases, and its deployments, but cannot edit them. |
| Project Contributor | Can do everything a Project Viewer can, plus edit variables and deployment steps. Cannot create or deploy releases. |
| Project Deployer | Can do everything a Project Contributor can, plus deploy releases. Cannot create them. |
| System Administrator | Can perform every action at the system level. |

A poorly-formed reference table for the same topic:

| User role | Description |
|---|---|
| Build Server | Build servers can publish packages and create releases. |
| Package Publisher | Permits packages to be pushed to the built-in feed. |

> Rather than modifying the built-in roles, we recommend leaving them as examples and creating your own.
>
> To create a custom user role, go to Configuration and select Roles, then select Add custom role…
>
> If a user has more or fewer permissions than expected, use the Test Permissions feature to see every permission a user holds.

This fails on several counts. Row phrasing isn't parallel. Three other topic types have been folded into running text: a recommendation, a procedure, and a troubleshooting line.

## Examples

**Optional, highly recommended**

Examples show the enumerated set applied in a real, concrete context to help readers understand what settings, permissions, requirements, etc., enable in their real-world use cases. Where the table tells the reader what each item is, examples show how items are applied or work with other concepts.

Examples MUST:

- Show an item from the table applied in a realistic, representative case
- Stay consistent with the table
- Be illustrative, not exhaustive (show one representative case)

Examples MUST NOT:

- Become a procedure
- Introduce conceptual framing or recommendations
- Introduce items not present in the table

### Examples of the example element

A well-formed example for the reference topic "Built-in user roles":

> A release manager who approves production deployments but doesn't author them might be assigned Project Lead (to create releases) scoped to all projects, plus Project Deployer scoped only to the Production environment.

A poorly-formed example for the same topic:

> To set up a release manager, go to Configuration > Teams, select Add Team, add the user, then assign Project Lead and Project Deployer and set the environment scope to Production. (this is a procedure, it doesn't explain how the settings are applied in a realistic use case)

## Full examples

Here's an example of a well-formed reference topic:

---

**Built-in user roles**

Octopus ships with a set of built-in user roles. This topic lists each built-in role and the permissions it grants. Roles introduced in later versions of Octopus are not added to existing built-in roles automatically.

Octopus includes the following built-in user roles, listed alphabetically:

| User role | Description |
|---|---|
| Build Server | Can publish packages and create releases, deployments, runbook snapshots, and runbook runs. |
| Certificate Manager | Can edit certificates and export private keys. |
| Deployment Creator | Can create deployments and runbook runs. |
| Environment Manager | Can view and edit environments and their machines. |
| Environment Viewer | Can view environments and their machines, but cannot edit them. |
| Package Publisher | Can push packages to the Octopus Server built-in feed. |
| Project Contributor | Can do everything a Project Viewer can, plus edit variables and deployment steps. Cannot create or deploy releases. |
| Project Deployer | Can do everything a Project Contributor can, plus deploy releases. Cannot create them. |
| Project Lead | Can do everything a Project Contributor can, plus create releases. Cannot deploy them. |
| Project Viewer | Can view a project, its releases, and its deployments, but cannot edit them. |
| Release Creator | Can create releases and runbook snapshots. |
| Runbook Consumer | Can view and run runbooks. |
| Runbook Producer | Can edit and run runbooks. |
| System Administrator | Can perform every action at the system level. |
| System Manager | Can perform every system-level action except those reserved for System Administrators. |
| Tenant Manager | Can edit tenants and their tags. |

A release manager who approves production deployments but doesn't author them might be assigned Project Lead (to create releases) scoped to all projects, plus Project Deployer scoped only to the Production environment.

---

Here's an example of a poorly-formed reference topic:

---

**User roles**

User roles and group permissions play a major part in the Octopus security model. These roles are assigned to teams, and they dictate what the members of those teams can do in Octopus. Octopus comes with a set of built-in user roles designed to work for most common scenarios.

| User role | Description |
|---|---|
| Build Server | Build servers can publish packages, and create releases, deployments, runbook snapshots and runbook runs. |
| Certificate Manager | Certificate managers can edit certificates and export private-keys |
| Project Viewer | Project viewers have read-only access to a project. They can see a project in their dashboard, view releases and deployments. Restrict this role by project to limit it to a subset of projects, and restrict it by environment to limit which environments they can view deployments to. |
| System Administrator | System administrators can do everything at the system level. |

The built-in user roles can be modified, but instead of modifying them, we recommend that you leave them as an example and create your own user roles.

**Creating user roles**

A custom user role can be created with any combination of permissions. To create a custom user role:

1. Under the Configuration page, click Roles.
2. Click Add custom role.
3. Select the permissions you'd like this role to contain, and give the role a name and description.

**Troubleshooting permissions**

If a user has more or fewer permissions than they should, use the Test Permissions feature to get a readable list of all permissions a specific user has. Go to Configuration ➜ Test Permissions and select a user from the drop-down.

---

Why is this poorly-formed?

- The short description is concept content. It explains the security model and why roles matter — the "why" that a reference deliberately omits and links out to instead. It also fails to state where the reference applies or its scope.
- The set is incomplete with no statement that it's partial. The legacy product lists seventeen built-in roles plus the space-level Space Manager; showing four without flagging the omission breaks the completeness rule.
- The "Creating user roles" section is a task. Procedural steps and UI navigation belong in a task topic, linked from related links, not folded into the reference body.
- The "Troubleshooting permissions" section is troubleshooting content. Like the procedure, it's a separate topic type that's been absorbed into what should be a single lookup.
- The result is one topic trying to do four jobs (concept, reference, task, and troubleshooting) so none is scannable or retrievable on its own.
