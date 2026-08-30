---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Reporting
---

## Get an XML report of deployments

:endpoint{method="GET" path="/api/\{spaceId\}/reporting/deployments/xml"}

Also reachable at `/api/reporting/deployments/xml`, `/api/spaces/{spaceIdentifier}/reporting/deployments/xml`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`environmentId`** :span[string]{.type-label}  
  An Environment ID, to limit the set of Deployments to deployed to a particular Environment. Example: Environments-1.
- **`fromCompletedTime`** :span[string]{.type-label}  
  A date/time, to limit the set of Deployments to those which completed after a given moment. Example: 2000-01-01T01:23. Format `date-time`.
- **`fromStartTime`** :span[string]{.type-label}  
  A date/time, to limit the set of Deployments to those which started after a given moment. Example: 2000-01-01T01:23. Format `date-time`.
- **`projectId`** :span[string]{.type-label}  
  A Project ID, to limit the set of Deployments to those from a particular Project. Example: Projects-1.
- **`toCompletedTime`** :span[string]{.type-label}  
  A date/time, to limit the set of Deployments to those which completed before a given moment. Example: 2000-01-01T01:23. Format `date-time`.
- **`toStartTime`** :span[string]{.type-label}  
  A date/time, to limit the set of Deployments to those which started before a given moment. Example: 2000-01-01T01:23. Format `date-time`.

**Response**

`200` — Success

:::api-example{label="Response"}
```json
"string"
```
:::
