---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Reporting
---

## Gets an XML report of deployments

`GET` `/api/{spaceId}/reporting/deployments/xml`

Also reachable at `/api/reporting/deployments/xml`, `/api/spaces/{spaceIdentifier}/reporting/deployments/xml`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`environmentId`** <span class="type-label">string</span> — An Environment ID, to limit the set of Deployments to deployed to a particular Environment. Example: Environments-1.
- **`fromCompletedTime`** <span class="type-label">string</span> — A date/time, to limit the set of Deployments to those which completed after a given moment. Example: 2000-01-01T01:23. Format `date-time`.
- **`fromStartTime`** <span class="type-label">string</span> — A date/time, to limit the set of Deployments to those which started after a given moment. Example: 2000-01-01T01:23. Format `date-time`.
- **`projectId`** <span class="type-label">string</span> — A Project ID, to limit the set of Deployments to those from a particular Project. Example: Projects-1.
- **`toCompletedTime`** <span class="type-label">string</span> — A date/time, to limit the set of Deployments to those which completed before a given moment. Example: 2000-01-01T01:23. Format `date-time`.
- **`toStartTime`** <span class="type-label">string</span> — A date/time, to limit the set of Deployments to those which started before a given moment. Example: 2000-01-01T01:23. Format `date-time`.

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>
