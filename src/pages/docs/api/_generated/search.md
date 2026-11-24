---
layout: src/layouts/Api.astro
pubDate: 2026-11-24
modDate: 2026-11-24
title: Search
---

Octopus supports searching for many types of resources across the entire system via the search API.

## Search for resources across all accessible spaces

:endpoint{method="GET" path="/api/globalsearch"}

**Query Parameters**

- **`inContainerId`** :span[string]{.type-label}  
  Optional space or project ID, determined by InContainerKind, to restrict the search results to.
- **`inContainerKind`** :span[string]{.type-label}  
  Whether the search runs inside a space or a project.
- **`scopeToType`** :span[string]{.type-label}  
  Optional resource type to restrict the search to. When omitted, every type available is searched.
- **`searchTerm`** :span[string]{.type-label}  
  A search term to search for.  
  Optional if the search is scoped with ScopeToType and/or InContainerId, required otherwise.

**Response**

`200` — The results of a global cross-space search.

- **`Counts`** :span[array of object]{.type-label}  
  The total number of matches for each resource type searched.
  - **`TotalCount`** :span[integer]{.type-label}  
    The number of matches for this type, capped at 100.
  - **`TotalCountIsCapped`** :span[boolean]{.type-label}  
    True when there were 100 or more matches for this type.
  - **`Type`** :span[string]{.type-label}  
    The resource type this count applies to.
- **`Results`** :span[array of object]{.type-label}  
  The resources that matched the search query.
  - **`EnvironmentKind`** :span[string]{.type-label}  
    When Type is Environment, this is the specific type of environment being referred to. Omitted otherwise.
  - **`Id`** :span[string]{.type-label}  
    The ID of the found resource. Minimum length 1.
  - **`Location`** :span[object]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    The display name of the found resource. Minimum length 1.
  - **`Type`** :span[string]{.type-label}  
    The type of the found resource.

:::api-example{label="Response"}
```json
{
  "Counts": [
    {
      "TotalCount": 28,
      "TotalCountIsCapped": false,
      "Type": "Runbook"
    }
  ],
  "Results": [
    {
      "EnvironmentKind": "Static",
      "Id": "Runbooks-12",
      "Location": {
        "Kind": "Project",
        "ProjectId": "Projects-22",
        "ProjectName": "Web App",
        "SpaceId": "Spaces-1",
        "SpaceName": "Default"
      },
      "Name": "Provision Ephemeral Environment",
      "Type": "Runbook"
    }
  ]
}
```
:::

## Lists spaces/projects to scope a search to

:endpoint{method="GET" path="/api/globalsearch/containers"}

**Query Parameters**

- **`containerSearchTerm`** :span[string]{.type-label}  
  The search term to match returned space and project names against.  
  If omitted, everything is included.

**Response**

`200` — Lists spaces and projects available to scope a search to.

- **`Results`** :span[array of object]{.type-label}  
  Up to 20 spaces followed by up to 20 projects matching the container search term.
  - **`Kind`** :span[string]{.type-label}  
    Whether a matched container is a space or a project.
  - **`ProjectId`** :span[string]{.type-label}  
    The ID of a matched project, set only when Kind is Project.
  - **`ProjectName`** :span[string]{.type-label}  
    The display name of a matched project, set only when Kind is Project.
  - **`SpaceId`** :span[string]{.type-label}  
    The ID of a matched space, or of the space a matched project lives within.
  - **`SpaceName`** :span[string]{.type-label}  
    The display name of a matched space, or of the space a matched project lives within. Minimum length 1.

:::api-example{label="Response"}
```json
{
  "Results": [
    {
      "Kind": "Project",
      "ProjectId": "Projects-22",
      "ProjectName": "Web App",
      "SpaceId": "Spaces-1",
      "SpaceName": "Default"
    }
  ]
}
```
:::
