---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Tenants
---

## Gets a list of tenants

`GET` `/api/{spaceId}/tenants`

Also reachable at `/api/spaces/{spaceIdentifier}/tenants`, `/api/tenants`.

Lists all of the tenants in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name, and returned 30 at a time.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`clonedFromTenantId`** <span class="type-label">string</span> — A Tenant ID, to limit the included Tenants to those cloned from that Tenant. Example: Tenants-1.
- **`ids`** <span class="type-label">array of string</span> — A list of Tenant IDs, to limit the matching of Tenants to those with a particular ID. Example: ["Tenants-1", "Tenants-2"].
- **`isDisabled`** <span class="type-label">boolean</span> — Disabled Status, to limit the set of retrieved Tenants to those with the specified disabled status.
- **`name`** <span class="type-label">string</span> — (Obsolete) A partial or complete name to limit the set of retrieved Tenants to. This will perform a "contains" style match against the supplied name or name-fragment. Left for backwards compatibility.
- **`partialName`** <span class="type-label">string</span> — A partial name, to limit the set of Tenants to those with a name that includes the partial name.
- **`projectId`** <span class="type-label">string</span> — A Project ID, to limit the set of Tenants to those connected to a particular Project. Example: Projects-1.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`tags`** <span class="type-label">array of string</span> — A set of Tenant Tags, to limit the set of retrieved Tenants to those which are tagged with the specific tags. Example: Alpha,Beta,Stable.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Requested list of Tenants

`TenantResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`ClonedFromTenantId`** <span class="type-label">string</span>
  - **`CustomFields`** <span class="type-label">array of string</span>
  - **`Description`** <span class="type-label">string</span>
  - **`Icon`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`ProjectEnvironments`** <span class="type-label">object</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`TenantTags`** <span class="type-label">array of string</span> — Tags are referenced by CanonicalName like {TagSetName}/{TagName}.
- **`ItemsPerPage`** <span class="type-label">integer</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastPageNumber`** <span class="type-label">integer</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NumberOfPages`** <span class="type-label">integer</span>
- **`TotalResults`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "ItemType": "string",
  "Items": [
    {
      "ClonedFromTenantId": "string",
      "CustomFields": [
        "string"
      ],
      "Description": "string",
      "Icon": {
        "Color": "string",
        "Id": "string"
      },
      "Id": "string",
      "IsDisabled": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "ProjectEnvironments": {
        "additionalProp1": [
          "string"
        ],
        "additionalProp2": [
          "string"
        ],
        "additionalProp3": [
          "string"
        ]
      },
      "Slug": "string",
      "SpaceId": "string",
      "TenantTags": [
        "string"
      ]
    }
  ],
  "ItemsPerPage": 0,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LastPageNumber": 0,
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
</div>

## Creates a new Tenant

`POST` `/api/{spaceId}/tenants`

Also reachable at `/api/spaces/{spaceIdentifier}/tenants`, `/api/tenants`.

Creates a new Tenant, optionally cloning an existing tenant if the clone query string parameter is provided.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateTenantCommand`

- **`Clone`** <span class="type-label">string</span> — The ID of the Tenant to clone. Example: Tenants-101.
- **`Description`** <span class="type-label">string</span>
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`ProjectEnvironments`** <span class="type-label">object</span> — The projects the tenant is connected to, as an object keyed by project ID where each value is the array of environment IDs the tenant can deploy to for that project. Example: {"Projects-1": ["Environments-1", "Environments-2"]}.
- **`Slug`** <span class="type-label">string</span> — A URL-friendly, unique identifier for the tenant. Generated from the name when omitted, which is usually what you want.
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantTags`** <span class="type-label">array of string</span> — Tags to apply to the tenant, as canonical tag names in the form 'TagSetName/TagName'. Example: ["Regions/EU-West", "Tier/Premium"]. Only tags from tenant-scoped tag sets are valid.

<div data-example="Request">

```json
{
  "Clone": "string",
  "Description": "string",
  "IsDisabled": true,
  "Name": "string",
  "ProjectEnvironments": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  },
  "Slug": "string",
  "SpaceId": "string",
  "TenantTags": [
    "string"
  ]
}
```
</div>

**Response**

`201` — Created

`TenantResource`.

- **`ClonedFromTenantId`** <span class="type-label">string</span>
- **`CustomFields`** <span class="type-label">array of string</span>
- **`Description`** <span class="type-label">string</span>
- **`Icon`** <span class="type-label">object</span>
  - **`Color`** <span class="type-label">string</span> — Icon background colour, as a Hex string.
  - **`Id`** <span class="type-label">string</span> — Font Awesome Icon Id.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`ProjectEnvironments`** <span class="type-label">object</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TenantTags`** <span class="type-label">array of string</span> — Tags are referenced by CanonicalName like {TagSetName}/{TagName}.

<div data-example="Response">

```json
{
  "ClonedFromTenantId": "string",
  "CustomFields": [
    "string"
  ],
  "Description": "string",
  "Icon": {
    "Color": "string",
    "Id": "string"
  },
  "Id": "string",
  "IsDisabled": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "ProjectEnvironments": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  },
  "Slug": "string",
  "SpaceId": "string",
  "TenantTags": [
    "string"
  ]
}
```
</div>

## Lists all tenants

`GET` `/api/{spaceId}/tenants/all`

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/all`, `/api/tenants/all`.

Lists all of the tenants in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`ids`** <span class="type-label">array of string</span> — A set of Tenant IDs to retrieve Tenants for.
- **`isDisabled`** <span class="type-label">boolean</span> — Disabled Status, to limit the set of retrieved Tenants to those with the specified disabled status.
- **`name`** <span class="type-label">string</span> — (Obsolete) A partial or complete name to limit the set of retrieved Tenants to. This will perform a "contains" style match against the supplied name or name-fragment. Left for backwards compatibility.
- **`partialName`** <span class="type-label">string</span> — A partial or complete name to limit the set of retrieved Tenants to. This will perform a "contains" style match against the supplied name or name-fragment.
- **`projectId`** <span class="type-label">string</span> — A Project ID, to limit the set of retrieved Tenants to those connected to a particular Project.
- **`tags`** <span class="type-label">array of string</span> — A set of Tenant Tags, to limit the set of retrieved Tenants to those which are tagged with the specific tags. Example: Alpha,Beta,Stable.

**Response**

`200` — Requested list of Tenants

an array of `TenantResource`.

- **`ClonedFromTenantId`** <span class="type-label">string</span>
- **`CustomFields`** <span class="type-label">array of string</span>
- **`Description`** <span class="type-label">string</span>
- **`Icon`** <span class="type-label">object</span>
  - **`Color`** <span class="type-label">string</span> — Icon background colour, as a Hex string.
  - **`Id`** <span class="type-label">string</span> — Font Awesome Icon Id.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`ProjectEnvironments`** <span class="type-label">object</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TenantTags`** <span class="type-label">array of string</span> — Tags are referenced by CanonicalName like {TagSetName}/{TagName}.

<div data-example="Response">

```json
[
  {
    "ClonedFromTenantId": "string",
    "CustomFields": [
      "string"
    ],
    "Description": "string",
    "Icon": {
      "Color": "string",
      "Id": "string"
    },
    "Id": "string",
    "IsDisabled": true,
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "ProjectEnvironments": {
      "additionalProp1": [
        "string"
      ],
      "additionalProp2": [
        "string"
      ],
      "additionalProp3": [
        "string"
      ]
    },
    "Slug": "string",
    "SpaceId": "string",
    "TenantTags": [
      "string"
    ]
  }
]
```
</div>

## Reports back the status of multi-tenancy

`GET` `/api/{spaceId}/tenants/status`

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/status`, `/api/tenants/status`.

If multi-tenancy is enabled, \"Enabled\" will be true, otherwise it will be false.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The status of multi-tenancy.

`MultiTenancyStatusResource`.

- **`Enabled`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

<div data-example="Response">

```json
{
  "Enabled": true,
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  }
}
```
</div>

## Checks tenants for matching tags

`GET` `/api/{spaceId}/tenants/tag-test`

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/tag-test`, `/api/tenants/tag-test`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`tags`** <span class="type-label">array of string</span> — A list of Tenant Tags to limit the matching to.
- **`tenantIds`** <span class="type-label">array of string</span> — A list of Tenant IDs to limit the matching to.

**Response**

`200` — Requested set of Tenants with matching Tags

<div data-example="Response">

```json
{
  "additionalProp1": {
    "IsDisabled": true,
    "IsMatched": true,
    "MissingTags": [
      "string"
    ],
    "Reason": "string"
  },
  "additionalProp2": {
    "IsDisabled": true,
    "IsMatched": true,
    "MissingTags": [
      "string"
    ],
    "Reason": "string"
  },
  "additionalProp3": {
    "IsDisabled": true,
    "IsMatched": true,
    "MissingTags": [
      "string"
    ],
    "Reason": "string"
  }
}
```
</div>

## Returns a list of tenants who are missing required variables

`GET` `/api/{spaceId}/tenants/variables-missing`

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/variables-missing`, `/api/tenants/variables-missing`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`environmentId`** <span class="type-label">string</span> — An Environment ID, to limit the set of inspected Tenants to those connected to a particular Environment. Example: Environments-202.
- **`includeDetails`** <span class="type-label">boolean</span> — A switch to indicate whether missing variable details should be returned along with names. When false, each result names only the tenant, which is enough to check whether a tenant is missing anything at all.
- **`projectId`** <span class="type-label">string</span> — A Project ID, to limit the set of inspected Tenants to those connected to a particular Project. Example: Projects-202.
- **`tenantId`** <span class="type-label">string</span> — An ID for a Tenant. If supplied, will limit the result to variables missing for the Tenant identified by the ID. Example: Tenants-101.

**Response**

`200` — List of tenants who are missing required variables.

an array of `TenantsMissingVariablesResource`.

- **`Links`** <span class="type-label">object</span>
- **`MissingVariables`** <span class="type-label">array of object</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`LibraryVariableSetId`** <span class="type-label">string</span>
  - **`Links`** <span class="type-label">object</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`VariableTemplateId`** <span class="type-label">string</span>
  - **`VariableTemplateName`** <span class="type-label">string</span>
- **`TenantId`** <span class="type-label">string</span>

<div data-example="Response">

```json
[
  {
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "MissingVariables": [
      {
        "EnvironmentId": "string",
        "LibraryVariableSetId": "string",
        "Links": {},
        "ProjectId": "string",
        "VariableTemplateId": "string",
        "VariableTemplateName": "string"
      }
    ],
    "TenantId": "string"
  }
]
```
</div>

## Get a tenant by it's Id

`GET` `/api/{spaceId}/tenants/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{id}`, `/api/tenants/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Tenant to load.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Returns a tenant

`TenantResource`.

- **`ClonedFromTenantId`** <span class="type-label">string</span>
- **`CustomFields`** <span class="type-label">array of string</span>
- **`Description`** <span class="type-label">string</span>
- **`Icon`** <span class="type-label">object</span>
  - **`Color`** <span class="type-label">string</span> — Icon background colour, as a Hex string.
  - **`Id`** <span class="type-label">string</span> — Font Awesome Icon Id.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`ProjectEnvironments`** <span class="type-label">object</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TenantTags`** <span class="type-label">array of string</span> — Tags are referenced by CanonicalName like {TagSetName}/{TagName}.

<div data-example="Response">

```json
{
  "ClonedFromTenantId": "string",
  "CustomFields": [
    "string"
  ],
  "Description": "string",
  "Icon": {
    "Color": "string",
    "Id": "string"
  },
  "Id": "string",
  "IsDisabled": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "ProjectEnvironments": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  },
  "Slug": "string",
  "SpaceId": "string",
  "TenantTags": [
    "string"
  ]
}
```
</div>

## Modifies an existing Tenant

`PUT` `/api/{spaceId}/tenants/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{id}`, `/api/tenants/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Tenant to modify.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyTenantCommand`

- **`Description`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> *(required)* — ID of the Tenant to modify.
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`ProjectEnvironments`** <span class="type-label">object</span> — The complete set of projects the tenant is connected to, as an object keyed by project ID where each value is the array of environment IDs the tenant can deploy to for that project. Example: {"Projects-1": ["Environments-1"]}. Replaces the tenant's current connections; omitting an existing project disconnects it and deletes the tenant's variable values for it.
- **`Slug`** <span class="type-label">string</span> — A URL-friendly, unique identifier for the tenant. Resubmit the tenant's current slug unless you intend to change it; changing it breaks existing links that use the old slug.
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantTags`** <span class="type-label">array of string</span> — The complete set of tags for the tenant, as canonical tag names in the form 'TagSetName/TagName'. Example: ["Regions/EU-West", "Tier/Premium"]. Replaces the tenant's current tags; any existing tag omitted here is removed.

<div data-example="Request">

```json
{
  "Description": "string",
  "Id": "string",
  "IsDisabled": true,
  "Name": "string",
  "ProjectEnvironments": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  },
  "Slug": "string",
  "SpaceId": "string",
  "TenantTags": [
    "string"
  ]
}
```
</div>

**Response**

`200` — Confirms that a Tenant has been modified, containing the updated Tenant

`TenantResource`.

- **`ClonedFromTenantId`** <span class="type-label">string</span>
- **`CustomFields`** <span class="type-label">array of string</span>
- **`Description`** <span class="type-label">string</span>
- **`Icon`** <span class="type-label">object</span>
  - **`Color`** <span class="type-label">string</span> — Icon background colour, as a Hex string.
  - **`Id`** <span class="type-label">string</span> — Font Awesome Icon Id.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`ProjectEnvironments`** <span class="type-label">object</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TenantTags`** <span class="type-label">array of string</span> — Tags are referenced by CanonicalName like {TagSetName}/{TagName}.

<div data-example="Response">

```json
{
  "ClonedFromTenantId": "string",
  "CustomFields": [
    "string"
  ],
  "Description": "string",
  "Icon": {
    "Color": "string",
    "Id": "string"
  },
  "Id": "string",
  "IsDisabled": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "ProjectEnvironments": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  },
  "Slug": "string",
  "SpaceId": "string",
  "TenantTags": [
    "string"
  ]
}
```
</div>

## Deletes an existing Tenant

`DELETE` `/api/{spaceId}/tenants/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{id}`, `/api/tenants/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Tenant to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success

## Gets the logo associated with the Tenant

`GET` `/api/{spaceId}/tenants/{id}/logo`

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{id}/logo`, `/api/tenants/{id}/logo`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Tenant to retrieve the logo for.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>

## Modifies the logo associated with the tenant

`POST` `/api/{spaceId}/tenants/{id}/logo`

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{id}/logo`, `/api/tenants/{id}/logo`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Tenant to update the logo for.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success

## Modifies the logo associated with the tenant

`PUT` `/api/{spaceId}/tenants/{id}/logo`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Tenant to update the logo for.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success

## Modifies the logo associated with the tenant

`PUT` `/api/spaces/{spaceIdentifier}/tenants/{id}/logo`

Also reachable at `/api/tenants/{id}/logo`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Tenant to update the logo for.
- **`spaceIdentifier`** <span class="type-label">string</span> *(required)* — Identifier (ID or slug) of the space.

**Response**

`200` — Success

## Gets variables associated with the provided tenant ID

`GET` `/api/{spaceId}/tenants/{id}/variables`

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{id}/variables`, `/api/tenants/{id}/variables`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Tenant to retrieve variables for.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Variables associated with the provided tenant ID.

`TenantVariableResource`.

- **`ConcurrencyToken`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariables`** <span class="type-label">object</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectVariables`** <span class="type-label">object</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TenantId`** <span class="type-label">string</span>
- **`TenantName`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "ConcurrencyToken": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LibraryVariables": {
    "additionalProp1": {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp2": {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp3": {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    }
  },
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectVariables": {
    "additionalProp1": {
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "ProjectName": "string",
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp2": {
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "ProjectName": "string",
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp3": {
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "ProjectName": "string",
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    }
  },
  "SpaceId": "string",
  "TenantId": "string",
  "TenantName": "string"
}
```
</div>

## Creates or Updates the variables associated with the tenant

`POST` `/api/{spaceId}/tenants/{id}/variables`

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{id}/variables`, `/api/tenants/{id}/variables`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Tenant to modify.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyVariablesByTenantIdCommand`

- **`ConcurrencyToken`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> *(required)* — ID of the Tenant to modify.
- **`LibraryVariables`** <span class="type-label">object</span>
- **`ProjectVariables`** <span class="type-label">object</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantName`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "ConcurrencyToken": "string",
  "Id": "string",
  "LibraryVariables": {
    "additionalProp1": {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp2": {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp3": {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    }
  },
  "ProjectVariables": {
    "additionalProp1": {
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "ProjectName": "string",
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp2": {
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "ProjectName": "string",
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp3": {
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "ProjectName": "string",
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    }
  },
  "SpaceId": "string",
  "TenantName": "string"
}
```
</div>

**Response**

`200` — The variables associated with the tenant.

`TenantVariableResource`.

- **`ConcurrencyToken`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariables`** <span class="type-label">object</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectVariables`** <span class="type-label">object</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TenantId`** <span class="type-label">string</span>
- **`TenantName`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "ConcurrencyToken": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LibraryVariables": {
    "additionalProp1": {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp2": {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp3": {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    }
  },
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectVariables": {
    "additionalProp1": {
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "ProjectName": "string",
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp2": {
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "ProjectName": "string",
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp3": {
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "ProjectName": "string",
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    }
  },
  "SpaceId": "string",
  "TenantId": "string",
  "TenantName": "string"
}
```
</div>

## Creates or Updates the variables associated with the tenant

`PUT` `/api/{spaceId}/tenants/{id}/variables`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Tenant to modify.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyVariablesByTenantIdCommand`

- **`ConcurrencyToken`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> *(required)* — ID of the Tenant to modify.
- **`LibraryVariables`** <span class="type-label">object</span>
- **`ProjectVariables`** <span class="type-label">object</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantName`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "ConcurrencyToken": "string",
  "Id": "string",
  "LibraryVariables": {
    "additionalProp1": {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp2": {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp3": {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    }
  },
  "ProjectVariables": {
    "additionalProp1": {
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "ProjectName": "string",
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp2": {
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "ProjectName": "string",
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp3": {
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "ProjectName": "string",
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    }
  },
  "SpaceId": "string",
  "TenantName": "string"
}
```
</div>

**Response**

`200` — The variables associated with the tenant.

`TenantVariableResource`.

- **`ConcurrencyToken`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariables`** <span class="type-label">object</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectVariables`** <span class="type-label">object</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TenantId`** <span class="type-label">string</span>
- **`TenantName`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "ConcurrencyToken": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LibraryVariables": {
    "additionalProp1": {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp2": {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp3": {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    }
  },
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectVariables": {
    "additionalProp1": {
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "ProjectName": "string",
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp2": {
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "ProjectName": "string",
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp3": {
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "ProjectName": "string",
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    }
  },
  "SpaceId": "string",
  "TenantId": "string",
  "TenantName": "string"
}
```
</div>

## Creates or Updates the variables associated with the tenant

`PUT` `/api/spaces/{spaceIdentifier}/tenants/{id}/variables`

Also reachable at `/api/tenants/{id}/variables`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Tenant to modify.
- **`spaceIdentifier`** <span class="type-label">string</span> *(required)* — Identifier (ID or slug) of the space.

**Request Body**

`ModifyVariablesByTenantIdCommand`

- **`ConcurrencyToken`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> *(required)* — ID of the Tenant to modify.
- **`LibraryVariables`** <span class="type-label">object</span>
- **`ProjectVariables`** <span class="type-label">object</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantName`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "ConcurrencyToken": "string",
  "Id": "string",
  "LibraryVariables": {
    "additionalProp1": {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp2": {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp3": {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    }
  },
  "ProjectVariables": {
    "additionalProp1": {
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "ProjectName": "string",
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp2": {
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "ProjectName": "string",
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp3": {
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "ProjectName": "string",
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    }
  },
  "SpaceId": "string",
  "TenantName": "string"
}
```
</div>

**Response**

`200` — The variables associated with the tenant.

`TenantVariableResource`.

- **`ConcurrencyToken`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariables`** <span class="type-label">object</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectVariables`** <span class="type-label">object</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TenantId`** <span class="type-label">string</span>
- **`TenantName`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "ConcurrencyToken": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LibraryVariables": {
    "additionalProp1": {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp2": {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp3": {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    }
  },
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectVariables": {
    "additionalProp1": {
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "ProjectName": "string",
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp2": {
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "ProjectName": "string",
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    },
    "additionalProp3": {
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectId": "string",
      "ProjectName": "string",
      "Templates": [
        {}
      ],
      "Variables": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    }
  },
  "SpaceId": "string",
  "TenantId": "string",
  "TenantName": "string"
}
```
</div>

## Gets the common variables associated with the tenant

`GET` `/api/{spaceId}/tenants/{tenantId}/commonvariables`

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{tenantId}/commonvariables`, `/api/tenants/{tenantId}/commonvariables`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*
- **`tenantId`** <span class="type-label">string</span> *(required)* — The ID of the tenant to read common variable values for. Example: Tenants-101.

- **`includeMissingVariables`** <span class="type-label">boolean</span> — When true, the response also lists the library variable set templates the tenant is required to supply a value for but has not, along with each template's default value.

**Response**

`200` — The common variables associated with a tenant.

`GetCommonVariablesByTenantIdResponse`.

- **`ConcurrencyToken`** <span class="type-label">string</span> — Minimum length 1.
- **`MissingVariables`** <span class="type-label">array of object</span>
  - **`LibraryVariableSetId`** <span class="type-label">string</span>
  - **`LibraryVariableSetName`** <span class="type-label">string</span>
  - **`Scope`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">object</span>
  - **`TemplateId`** <span class="type-label">string</span> — Minimum length 1.
  - **`Value`** <span class="type-label">object</span>
- **`TenantId`** <span class="type-label">string</span>
- **`Variables`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Minimum length 1.
  - **`LibraryVariableSetId`** <span class="type-label">string</span>
  - **`LibraryVariableSetName`** <span class="type-label">string</span>
  - **`Scope`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">object</span>
  - **`TemplateId`** <span class="type-label">string</span> — Minimum length 1.
  - **`Value`** <span class="type-label">object</span>

<div data-example="Response">

```json
{
  "ConcurrencyToken": "string",
  "MissingVariables": [
    {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Scope": {
        "EnvironmentIds": [
          "string"
        ]
      },
      "Template": {
        "DefaultValue": {},
        "DisplaySettings": {},
        "HelpText": "string",
        "Id": "string",
        "Label": "string",
        "Name": "string"
      },
      "TemplateId": "string",
      "Value": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      }
    }
  ],
  "TenantId": "string",
  "Variables": [
    {
      "Id": "string",
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Scope": {
        "EnvironmentIds": [
          "string"
        ]
      },
      "Template": {
        "DefaultValue": {},
        "DisplaySettings": {},
        "HelpText": "string",
        "Id": "string",
        "Label": "string",
        "Name": "string"
      },
      "TemplateId": "string",
      "Value": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      }
    }
  ]
}
```
</div>

## Creates or Updates the common variables associated with the tenant

`POST` `/api/{spaceId}/tenants/{tenantId}/commonvariables`

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{tenantId}/commonvariables`, `/api/tenants/{tenantId}/commonvariables`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*
- **`tenantId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyCommonVariablesByTenantIdCommand`

- **`ConcurrencyToken`** <span class="type-label">string</span> — The concurrency token returned when reading the tenant's variables. Always pass it back so the write is rejected if someone else changed the variables since your read; omitting it skips the check and risks silently overwriting their changes.
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantId`** <span class="type-label">string</span> *(required)*
- **`Variables`** <span class="type-label">array of object</span> *(required)* — The complete set of common variable values for the tenant; existing values omitted here are deleted. Each item is an object: 'Id' (the existing value's ID when updating; omit when adding), 'OwnerId' (the library variable set ID), 'TemplateId' (the variable template ID), 'Value' (a plain string for non-sensitive values, or {"HasValue": true, "NewValue": "secret"} for sensitive ones), and 'Scope' ({"EnvironmentIds": [...]} limiting the value to those environments; empty applies to all).
  - **`Id`** <span class="type-label">string</span>
  - **`OwnerId`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`Scope`** <span class="type-label">object</span> *(required)*
  - **`TemplateId`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`Value`** <span class="type-label">object</span> *(required)*

<div data-example="Request">

```json
{
  "ConcurrencyToken": "string",
  "SpaceId": "string",
  "TenantId": "string",
  "Variables": [
    {
      "Id": "string",
      "OwnerId": "string",
      "Scope": {
        "EnvironmentIds": [
          "string"
        ]
      },
      "TemplateId": "string",
      "Value": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      }
    }
  ]
}
```
</div>

**Response**

`200` — The common variables associated with a tenant.

`ModifyCommonVariablesByTenantIdResponse`.

- **`ConcurrencyToken`** <span class="type-label">string</span> — Minimum length 1.
- **`TenantId`** <span class="type-label">string</span>
- **`Variables`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Minimum length 1.
  - **`LibraryVariableSetId`** <span class="type-label">string</span>
  - **`LibraryVariableSetName`** <span class="type-label">string</span>
  - **`Scope`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">object</span>
  - **`TemplateId`** <span class="type-label">string</span> — Minimum length 1.
  - **`Value`** <span class="type-label">object</span>

<div data-example="Response">

```json
{
  "ConcurrencyToken": "string",
  "TenantId": "string",
  "Variables": [
    {
      "Id": "string",
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Scope": {
        "EnvironmentIds": [
          "string"
        ]
      },
      "Template": {
        "DefaultValue": {},
        "DisplaySettings": {},
        "HelpText": "string",
        "Id": "string",
        "Label": "string",
        "Name": "string"
      },
      "TemplateId": "string",
      "Value": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      }
    }
  ]
}
```
</div>

## Creates or Updates the common variables associated with the tenant

`PUT` `/api/{spaceId}/tenants/{tenantId}/commonvariables`

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*
- **`tenantId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyCommonVariablesByTenantIdCommand`

- **`ConcurrencyToken`** <span class="type-label">string</span> — The concurrency token returned when reading the tenant's variables. Always pass it back so the write is rejected if someone else changed the variables since your read; omitting it skips the check and risks silently overwriting their changes.
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantId`** <span class="type-label">string</span> *(required)*
- **`Variables`** <span class="type-label">array of object</span> *(required)* — The complete set of common variable values for the tenant; existing values omitted here are deleted. Each item is an object: 'Id' (the existing value's ID when updating; omit when adding), 'OwnerId' (the library variable set ID), 'TemplateId' (the variable template ID), 'Value' (a plain string for non-sensitive values, or {"HasValue": true, "NewValue": "secret"} for sensitive ones), and 'Scope' ({"EnvironmentIds": [...]} limiting the value to those environments; empty applies to all).
  - **`Id`** <span class="type-label">string</span>
  - **`OwnerId`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`Scope`** <span class="type-label">object</span> *(required)*
  - **`TemplateId`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`Value`** <span class="type-label">object</span> *(required)*

<div data-example="Request">

```json
{
  "ConcurrencyToken": "string",
  "SpaceId": "string",
  "TenantId": "string",
  "Variables": [
    {
      "Id": "string",
      "OwnerId": "string",
      "Scope": {
        "EnvironmentIds": [
          "string"
        ]
      },
      "TemplateId": "string",
      "Value": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      }
    }
  ]
}
```
</div>

**Response**

`200` — The common variables associated with a tenant.

`ModifyCommonVariablesByTenantIdResponse`.

- **`ConcurrencyToken`** <span class="type-label">string</span> — Minimum length 1.
- **`TenantId`** <span class="type-label">string</span>
- **`Variables`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Minimum length 1.
  - **`LibraryVariableSetId`** <span class="type-label">string</span>
  - **`LibraryVariableSetName`** <span class="type-label">string</span>
  - **`Scope`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">object</span>
  - **`TemplateId`** <span class="type-label">string</span> — Minimum length 1.
  - **`Value`** <span class="type-label">object</span>

<div data-example="Response">

```json
{
  "ConcurrencyToken": "string",
  "TenantId": "string",
  "Variables": [
    {
      "Id": "string",
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Scope": {
        "EnvironmentIds": [
          "string"
        ]
      },
      "Template": {
        "DefaultValue": {},
        "DisplaySettings": {},
        "HelpText": "string",
        "Id": "string",
        "Label": "string",
        "Name": "string"
      },
      "TemplateId": "string",
      "Value": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      }
    }
  ]
}
```
</div>

## Creates or Updates the common variables associated with the tenant

`PUT` `/api/spaces/{spaceIdentifier}/tenants/{tenantId}/commonvariables`

Also reachable at `/api/tenants/{tenantId}/commonvariables`.

**Parameters**

- **`spaceIdentifier`** <span class="type-label">string</span> *(required)* — Identifier (ID or slug) of the space.
- **`tenantId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyCommonVariablesByTenantIdCommand`

- **`ConcurrencyToken`** <span class="type-label">string</span> — The concurrency token returned when reading the tenant's variables. Always pass it back so the write is rejected if someone else changed the variables since your read; omitting it skips the check and risks silently overwriting their changes.
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantId`** <span class="type-label">string</span> *(required)*
- **`Variables`** <span class="type-label">array of object</span> *(required)* — The complete set of common variable values for the tenant; existing values omitted here are deleted. Each item is an object: 'Id' (the existing value's ID when updating; omit when adding), 'OwnerId' (the library variable set ID), 'TemplateId' (the variable template ID), 'Value' (a plain string for non-sensitive values, or {"HasValue": true, "NewValue": "secret"} for sensitive ones), and 'Scope' ({"EnvironmentIds": [...]} limiting the value to those environments; empty applies to all).
  - **`Id`** <span class="type-label">string</span>
  - **`OwnerId`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`Scope`** <span class="type-label">object</span> *(required)*
  - **`TemplateId`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`Value`** <span class="type-label">object</span> *(required)*

<div data-example="Request">

```json
{
  "ConcurrencyToken": "string",
  "SpaceId": "string",
  "TenantId": "string",
  "Variables": [
    {
      "Id": "string",
      "OwnerId": "string",
      "Scope": {
        "EnvironmentIds": [
          "string"
        ]
      },
      "TemplateId": "string",
      "Value": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      }
    }
  ]
}
```
</div>

**Response**

`200` — The common variables associated with a tenant.

`ModifyCommonVariablesByTenantIdResponse`.

- **`ConcurrencyToken`** <span class="type-label">string</span> — Minimum length 1.
- **`TenantId`** <span class="type-label">string</span>
- **`Variables`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Minimum length 1.
  - **`LibraryVariableSetId`** <span class="type-label">string</span>
  - **`LibraryVariableSetName`** <span class="type-label">string</span>
  - **`Scope`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">object</span>
  - **`TemplateId`** <span class="type-label">string</span> — Minimum length 1.
  - **`Value`** <span class="type-label">object</span>

<div data-example="Response">

```json
{
  "ConcurrencyToken": "string",
  "TenantId": "string",
  "Variables": [
    {
      "Id": "string",
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string",
      "Scope": {
        "EnvironmentIds": [
          "string"
        ]
      },
      "Template": {
        "DefaultValue": {},
        "DisplaySettings": {},
        "HelpText": "string",
        "Id": "string",
        "Label": "string",
        "Name": "string"
      },
      "TemplateId": "string",
      "Value": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      }
    }
  ]
}
```
</div>

## Gets the project variables associated with the tenant

`GET` `/api/{spaceId}/tenants/{tenantId}/projectvariables`

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{tenantId}/projectvariables`, `/api/tenants/{tenantId}/projectvariables`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*
- **`tenantId`** <span class="type-label">string</span> *(required)* — The ID of the tenant to read project variable values for. Example: Tenants-101.

- **`includeMissingVariables`** <span class="type-label">boolean</span> — When true, the response also lists the project variable templates the tenant is required to supply a value for but has not, along with each template's default value.

**Response**

`200` — The project variables associated with a tenant.

`GetProjectVariablesByTenantIdResponse`.

- **`ConcurrencyToken`** <span class="type-label">string</span> — Minimum length 1.
- **`MissingVariables`** <span class="type-label">array of object</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`ProjectName`** <span class="type-label">string</span>
  - **`Scope`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">object</span>
  - **`TemplateId`** <span class="type-label">string</span> — Minimum length 1.
  - **`Value`** <span class="type-label">object</span>
- **`TenantId`** <span class="type-label">string</span>
- **`Variables`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Minimum length 1.
  - **`ProjectId`** <span class="type-label">string</span>
  - **`ProjectName`** <span class="type-label">string</span>
  - **`Scope`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">object</span>
  - **`TemplateId`** <span class="type-label">string</span> — Minimum length 1.
  - **`Value`** <span class="type-label">object</span>

<div data-example="Response">

```json
{
  "ConcurrencyToken": "string",
  "MissingVariables": [
    {
      "ProjectId": "string",
      "ProjectName": "string",
      "Scope": {
        "EnvironmentIds": [
          "string"
        ]
      },
      "Template": {
        "DefaultValue": {},
        "DisplaySettings": {},
        "HelpText": "string",
        "Id": "string",
        "Label": "string",
        "Name": "string"
      },
      "TemplateId": "string",
      "Value": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      }
    }
  ],
  "TenantId": "string",
  "Variables": [
    {
      "Id": "string",
      "ProjectId": "string",
      "ProjectName": "string",
      "Scope": {
        "EnvironmentIds": [
          "string"
        ]
      },
      "Template": {
        "DefaultValue": {},
        "DisplaySettings": {},
        "HelpText": "string",
        "Id": "string",
        "Label": "string",
        "Name": "string"
      },
      "TemplateId": "string",
      "Value": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      }
    }
  ]
}
```
</div>

## Creates or Updates the project variables associated with the tenant

`POST` `/api/{spaceId}/tenants/{tenantId}/projectvariables`

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{tenantId}/projectvariables`, `/api/tenants/{tenantId}/projectvariables`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*
- **`tenantId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyProjectVariablesByTenantIdCommand`

- **`ConcurrencyToken`** <span class="type-label">string</span> — The concurrency token returned when reading the tenant's variables. Always pass it back so the write is rejected if someone else changed the variables since your read; omitting it skips the check and risks silently overwriting their changes.
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantId`** <span class="type-label">string</span> *(required)*
- **`Variables`** <span class="type-label">array of object</span> *(required)* — The complete set of project variable values for the tenant; existing values omitted here are deleted. Each item is an object: 'Id' (the existing value's ID when updating; omit when adding), 'OwnerId' (the project ID), 'TemplateId' (the variable template ID), 'Value' (a plain string for non-sensitive values, or {"HasValue": true, "NewValue": "secret"} for sensitive ones), and 'Scope' ({"EnvironmentIds": [...]} limiting the value to those environments; empty applies to all).
  - **`Id`** <span class="type-label">string</span>
  - **`OwnerId`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`Scope`** <span class="type-label">object</span> *(required)*
  - **`TemplateId`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`Value`** <span class="type-label">object</span> *(required)*

<div data-example="Request">

```json
{
  "ConcurrencyToken": "string",
  "SpaceId": "string",
  "TenantId": "string",
  "Variables": [
    {
      "Id": "string",
      "OwnerId": "string",
      "Scope": {
        "EnvironmentIds": [
          "string"
        ]
      },
      "TemplateId": "string",
      "Value": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      }
    }
  ]
}
```
</div>

**Response**

`200` — The project variables associated with a tenant.

`ModifyProjectVariablesByTenantIdResponse`.

- **`ConcurrencyToken`** <span class="type-label">string</span> — Minimum length 1.
- **`TenantId`** <span class="type-label">string</span>
- **`Variables`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Minimum length 1.
  - **`ProjectId`** <span class="type-label">string</span>
  - **`ProjectName`** <span class="type-label">string</span>
  - **`Scope`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">object</span>
  - **`TemplateId`** <span class="type-label">string</span> — Minimum length 1.
  - **`Value`** <span class="type-label">object</span>

<div data-example="Response">

```json
{
  "ConcurrencyToken": "string",
  "TenantId": "string",
  "Variables": [
    {
      "Id": "string",
      "ProjectId": "string",
      "ProjectName": "string",
      "Scope": {
        "EnvironmentIds": [
          "string"
        ]
      },
      "Template": {
        "DefaultValue": {},
        "DisplaySettings": {},
        "HelpText": "string",
        "Id": "string",
        "Label": "string",
        "Name": "string"
      },
      "TemplateId": "string",
      "Value": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      }
    }
  ]
}
```
</div>

## Creates or Updates the project variables associated with the tenant

`PUT` `/api/{spaceId}/tenants/{tenantId}/projectvariables`

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*
- **`tenantId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyProjectVariablesByTenantIdCommand`

- **`ConcurrencyToken`** <span class="type-label">string</span> — The concurrency token returned when reading the tenant's variables. Always pass it back so the write is rejected if someone else changed the variables since your read; omitting it skips the check and risks silently overwriting their changes.
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantId`** <span class="type-label">string</span> *(required)*
- **`Variables`** <span class="type-label">array of object</span> *(required)* — The complete set of project variable values for the tenant; existing values omitted here are deleted. Each item is an object: 'Id' (the existing value's ID when updating; omit when adding), 'OwnerId' (the project ID), 'TemplateId' (the variable template ID), 'Value' (a plain string for non-sensitive values, or {"HasValue": true, "NewValue": "secret"} for sensitive ones), and 'Scope' ({"EnvironmentIds": [...]} limiting the value to those environments; empty applies to all).
  - **`Id`** <span class="type-label">string</span>
  - **`OwnerId`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`Scope`** <span class="type-label">object</span> *(required)*
  - **`TemplateId`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`Value`** <span class="type-label">object</span> *(required)*

<div data-example="Request">

```json
{
  "ConcurrencyToken": "string",
  "SpaceId": "string",
  "TenantId": "string",
  "Variables": [
    {
      "Id": "string",
      "OwnerId": "string",
      "Scope": {
        "EnvironmentIds": [
          "string"
        ]
      },
      "TemplateId": "string",
      "Value": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      }
    }
  ]
}
```
</div>

**Response**

`200` — The project variables associated with a tenant.

`ModifyProjectVariablesByTenantIdResponse`.

- **`ConcurrencyToken`** <span class="type-label">string</span> — Minimum length 1.
- **`TenantId`** <span class="type-label">string</span>
- **`Variables`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Minimum length 1.
  - **`ProjectId`** <span class="type-label">string</span>
  - **`ProjectName`** <span class="type-label">string</span>
  - **`Scope`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">object</span>
  - **`TemplateId`** <span class="type-label">string</span> — Minimum length 1.
  - **`Value`** <span class="type-label">object</span>

<div data-example="Response">

```json
{
  "ConcurrencyToken": "string",
  "TenantId": "string",
  "Variables": [
    {
      "Id": "string",
      "ProjectId": "string",
      "ProjectName": "string",
      "Scope": {
        "EnvironmentIds": [
          "string"
        ]
      },
      "Template": {
        "DefaultValue": {},
        "DisplaySettings": {},
        "HelpText": "string",
        "Id": "string",
        "Label": "string",
        "Name": "string"
      },
      "TemplateId": "string",
      "Value": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      }
    }
  ]
}
```
</div>

## Creates or Updates the project variables associated with the tenant

`PUT` `/api/spaces/{spaceIdentifier}/tenants/{tenantId}/projectvariables`

Also reachable at `/api/tenants/{tenantId}/projectvariables`.

**Parameters**

- **`spaceIdentifier`** <span class="type-label">string</span> *(required)* — Identifier (ID or slug) of the space.
- **`tenantId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyProjectVariablesByTenantIdCommand`

- **`ConcurrencyToken`** <span class="type-label">string</span> — The concurrency token returned when reading the tenant's variables. Always pass it back so the write is rejected if someone else changed the variables since your read; omitting it skips the check and risks silently overwriting their changes.
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantId`** <span class="type-label">string</span> *(required)*
- **`Variables`** <span class="type-label">array of object</span> *(required)* — The complete set of project variable values for the tenant; existing values omitted here are deleted. Each item is an object: 'Id' (the existing value's ID when updating; omit when adding), 'OwnerId' (the project ID), 'TemplateId' (the variable template ID), 'Value' (a plain string for non-sensitive values, or {"HasValue": true, "NewValue": "secret"} for sensitive ones), and 'Scope' ({"EnvironmentIds": [...]} limiting the value to those environments; empty applies to all).
  - **`Id`** <span class="type-label">string</span>
  - **`OwnerId`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`Scope`** <span class="type-label">object</span> *(required)*
  - **`TemplateId`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`Value`** <span class="type-label">object</span> *(required)*

<div data-example="Request">

```json
{
  "ConcurrencyToken": "string",
  "SpaceId": "string",
  "TenantId": "string",
  "Variables": [
    {
      "Id": "string",
      "OwnerId": "string",
      "Scope": {
        "EnvironmentIds": [
          "string"
        ]
      },
      "TemplateId": "string",
      "Value": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      }
    }
  ]
}
```
</div>

**Response**

`200` — The project variables associated with a tenant.

`ModifyProjectVariablesByTenantIdResponse`.

- **`ConcurrencyToken`** <span class="type-label">string</span> — Minimum length 1.
- **`TenantId`** <span class="type-label">string</span>
- **`Variables`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Minimum length 1.
  - **`ProjectId`** <span class="type-label">string</span>
  - **`ProjectName`** <span class="type-label">string</span>
  - **`Scope`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">object</span>
  - **`TemplateId`** <span class="type-label">string</span> — Minimum length 1.
  - **`Value`** <span class="type-label">object</span>

<div data-example="Response">

```json
{
  "ConcurrencyToken": "string",
  "TenantId": "string",
  "Variables": [
    {
      "Id": "string",
      "ProjectId": "string",
      "ProjectName": "string",
      "Scope": {
        "EnvironmentIds": [
          "string"
        ]
      },
      "Template": {
        "DefaultValue": {},
        "DisplaySettings": {},
        "HelpText": "string",
        "Id": "string",
        "Label": "string",
        "Name": "string"
      },
      "TemplateId": "string",
      "Value": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      }
    }
  ]
}
```
</div>

## Lists all of the tenant variables in the supplied Octopus Deploy Space. The results will be sorted alphabetically by id

`GET` `/api/{spaceId}/tenantvariables/all`

Also reachable at `/api/spaces/{spaceIdentifier}/tenantvariables/all`, `/api/tenantvariables/all`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`projectId`** <span class="type-label">string</span> — ID of a project that tenants must be connected to, to be included in the result set. For matching tenants, variables from all projects are still returned.

**Response**

`200` — All of the tenant variables in the supplied Octopus Deploy Space (sorted alphabetically by id).

an array of `TenantVariableResource`.

- **`ConcurrencyToken`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariables`** <span class="type-label">object</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectVariables`** <span class="type-label">object</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TenantId`** <span class="type-label">string</span>
- **`TenantName`** <span class="type-label">string</span>

<div data-example="Response">

```json
[
  {
    "ConcurrencyToken": "string",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "LibraryVariables": {
      "additionalProp1": {
        "LibraryVariableSetId": "string",
        "LibraryVariableSetName": "string",
        "Links": {},
        "Templates": [
          {}
        ],
        "Variables": {}
      },
      "additionalProp2": {
        "LibraryVariableSetId": "string",
        "LibraryVariableSetName": "string",
        "Links": {},
        "Templates": [
          {}
        ],
        "Variables": {}
      },
      "additionalProp3": {
        "LibraryVariableSetId": "string",
        "LibraryVariableSetName": "string",
        "Links": {},
        "Templates": [
          {}
        ],
        "Variables": {}
      }
    },
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "ProjectVariables": {
      "additionalProp1": {
        "Links": {},
        "ProjectId": "string",
        "ProjectName": "string",
        "Templates": [
          {}
        ],
        "Variables": {}
      },
      "additionalProp2": {
        "Links": {},
        "ProjectId": "string",
        "ProjectName": "string",
        "Templates": [
          {}
        ],
        "Variables": {}
      },
      "additionalProp3": {
        "Links": {},
        "ProjectId": "string",
        "ProjectName": "string",
        "Templates": [
          {}
        ],
        "Variables": {}
      }
    },
    "SpaceId": "string",
    "TenantId": "string",
    "TenantName": "string"
  }
]
```
</div>
