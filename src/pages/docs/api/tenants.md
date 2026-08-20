---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Tenants
---

## Get a list of tenants

:endpoint{method="GET" path="/api/\{spaceId\}/tenants"}

Also reachable at `/api/spaces/{spaceIdentifier}/tenants`, `/api/tenants`.

Lists all of the tenants in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name, and returned 30 at a time.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`clonedFromTenantId`** :span[string]{.type-label}  
  A Tenant ID, to limit the included Tenants to those cloned from that Tenant. Example: Tenants-1.
- **`ids`** :span[array of string]{.type-label}  
  A list of Tenant IDs, to limit the matching of Tenants to those with a particular ID. Example: ["Tenants-1", "Tenants-2"].
- **`isDisabled`** :span[boolean]{.type-label}  
  Disabled Status, to limit the set of retrieved Tenants to those with the specified disabled status.
- **`name`** :span[string]{.type-label}  
  (Obsolete) A partial or complete name to limit the set of retrieved Tenants to. This will perform a "contains" style match against the supplied name or name-fragment. Left for backwards compatibility.
- **`partialName`** :span[string]{.type-label}  
  A partial name, to limit the set of Tenants to those with a name that includes the partial name.
- **`projectId`** :span[string]{.type-label}  
  A Project ID, to limit the set of Tenants to those connected to a particular Project. Example: Projects-1.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`tags`** :span[array of string]{.type-label}  
  A set of Tenant Tags, to limit the set of retrieved Tenants to those which are tagged with the specific tags. Example: Alpha,Beta,Stable.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Requested list of Tenants

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`ClonedFromTenantId`** :span[string]{.type-label}
  - **`CustomFields`** :span[array of string]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`Icon`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsDisabled`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`ProjectEnvironments`** :span[object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`TenantTags`** :span[array of string]{.type-label}  
    Tags are referenced by CanonicalName like {TagSetName}/{TagName}.
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastPageNumber`** :span[integer]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
      "SpaceId": "Spaces-1",
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
:::

## Create a new Tenant

:endpoint{method="POST" path="/api/\{spaceId\}/tenants"}

Also reachable at `/api/spaces/{spaceIdentifier}/tenants`, `/api/tenants`.

Creates a new Tenant, optionally cloning an existing tenant if the clone query string parameter is provided.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Clone`** :span[string]{.type-label}  
  The ID of the Tenant to clone. Example: Tenants-101.
- **`Description`** :span[string]{.type-label}
- **`IsDisabled`** :span[boolean]{.type-label}
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`ProjectEnvironments`** :span[object]{.type-label}  
  The projects the tenant is connected to, as an object keyed by project ID where each value is the array of environment IDs the tenant can deploy to for that project. Example: {"Projects-1": ["Environments-1", "Environments-2"]}.
- **`Slug`** :span[string]{.type-label}  
  A URL-friendly, unique identifier for the tenant. Generated from the name when omitted, which is usually what you want.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantTags`** :span[array of string]{.type-label}  
  Tags to apply to the tenant, as canonical tag names in the form 'TagSetName/TagName'. Example: ["Regions/EU-West", "Tier/Premium"]. Only tags from tenant-scoped tag sets are valid.

:::api-example{label="Request"}
```json
{
  "Clone": "Tenants-1",
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
  "SpaceId": "Spaces-1",
  "TenantTags": [
    "string"
  ]
}
```
:::

**Response**

`201` — Created

- **`ClonedFromTenantId`** :span[string]{.type-label}
- **`CustomFields`** :span[array of string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`Icon`** :span[object]{.type-label}
  - **`Color`** :span[string]{.type-label}  
    Icon background colour, as a Hex string.
  - **`Id`** :span[string]{.type-label}  
    Font Awesome Icon Id.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDisabled`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`ProjectEnvironments`** :span[object]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}  
  Tags are referenced by CanonicalName like {TagSetName}/{TagName}.

:::api-example{label="Response"}
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
  "SpaceId": "Spaces-1",
  "TenantTags": [
    "string"
  ]
}
```
:::

## List all tenants

:endpoint{method="GET" path="/api/\{spaceId\}/tenants/all"}

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/all`, `/api/tenants/all`.

Lists all of the tenants in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  A set of Tenant IDs to retrieve Tenants for.
- **`isDisabled`** :span[boolean]{.type-label}  
  Disabled Status, to limit the set of retrieved Tenants to those with the specified disabled status.
- **`name`** :span[string]{.type-label}  
  (Obsolete) A partial or complete name to limit the set of retrieved Tenants to. This will perform a "contains" style match against the supplied name or name-fragment. Left for backwards compatibility.
- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to limit the set of retrieved Tenants to. This will perform a "contains" style match against the supplied name or name-fragment.
- **`projectId`** :span[string]{.type-label}  
  A Project ID, to limit the set of retrieved Tenants to those connected to a particular Project.
- **`tags`** :span[array of string]{.type-label}  
  A set of Tenant Tags, to limit the set of retrieved Tenants to those which are tagged with the specific tags. Example: Alpha,Beta,Stable.

**Response**

`200` — Requested list of Tenants

- **`ClonedFromTenantId`** :span[string]{.type-label}
- **`CustomFields`** :span[array of string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`Icon`** :span[object]{.type-label}
  - **`Color`** :span[string]{.type-label}  
    Icon background colour, as a Hex string.
  - **`Id`** :span[string]{.type-label}  
    Font Awesome Icon Id.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDisabled`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`ProjectEnvironments`** :span[object]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}  
  Tags are referenced by CanonicalName like {TagSetName}/{TagName}.

:::api-example{label="Response"}
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
    "SpaceId": "Spaces-1",
    "TenantTags": [
      "string"
    ]
  }
]
```
:::

## Report back the status of multi-tenancy

:endpoint{method="GET" path="/api/\{spaceId\}/tenants/status"}

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/status`, `/api/tenants/status`.

If multi-tenancy is enabled, \"Enabled\" will be true, otherwise it will be false.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The status of multi-tenancy.

- **`Enabled`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

:::api-example{label="Response"}
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
:::

## Check tenants for matching tags

:endpoint{method="GET" path="/api/\{spaceId\}/tenants/tag-test"}

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/tag-test`, `/api/tenants/tag-test`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`tags`** :span[array of string]{.type-label}  
  A list of Tenant Tags to limit the matching to.
- **`tenantIds`** :span[array of string]{.type-label}  
  A list of Tenant IDs to limit the matching to.

**Response**

`200` — Requested set of Tenants with matching Tags

:::api-example{label="Response"}
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
:::

## Return a list of tenants who are missing required variables

:endpoint{method="GET" path="/api/\{spaceId\}/tenants/variables-missing"}

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/variables-missing`, `/api/tenants/variables-missing`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`environmentId`** :span[string]{.type-label}  
  An Environment ID, to limit the set of inspected Tenants to those connected to a particular Environment. Example: Environments-202.
- **`includeDetails`** :span[boolean]{.type-label}  
  A switch to indicate whether missing variable details should be returned along with names. When false, each result names only the tenant, which is enough to check whether a tenant is missing anything at all.
- **`projectId`** :span[string]{.type-label}  
  A Project ID, to limit the set of inspected Tenants to those connected to a particular Project. Example: Projects-202.
- **`tenantId`** :span[string]{.type-label}  
  An ID for a Tenant. If supplied, will limit the result to variables missing for the Tenant identified by the ID. Example: Tenants-101.

**Response**

`200` — List of tenants who are missing required variables.

- **`Links`** :span[object]{.type-label}
- **`MissingVariables`** :span[array of object]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`LibraryVariableSetId`** :span[string]{.type-label}
  - **`Links`** :span[object]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`VariableTemplateId`** :span[string]{.type-label}
  - **`VariableTemplateName`** :span[string]{.type-label}
- **`TenantId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
        "EnvironmentId": "Environments-1",
        "LibraryVariableSetId": "string",
        "Links": {},
        "ProjectId": "string",
        "VariableTemplateId": "string",
        "VariableTemplateName": "string"
      }
    ],
    "TenantId": "Tenants-1"
  }
]
```
:::

## Get a tenant by it's Id

:endpoint{method="GET" path="/api/\{spaceId\}/tenants/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{id}`, `/api/tenants/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Tenant to load.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Returns a tenant

- **`ClonedFromTenantId`** :span[string]{.type-label}
- **`CustomFields`** :span[array of string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`Icon`** :span[object]{.type-label}
  - **`Color`** :span[string]{.type-label}  
    Icon background colour, as a Hex string.
  - **`Id`** :span[string]{.type-label}  
    Font Awesome Icon Id.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDisabled`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`ProjectEnvironments`** :span[object]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}  
  Tags are referenced by CanonicalName like {TagSetName}/{TagName}.

:::api-example{label="Response"}
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
  "SpaceId": "Spaces-1",
  "TenantTags": [
    "string"
  ]
}
```
:::

## Modify an existing Tenant

:endpoint{method="PUT" path="/api/\{spaceId\}/tenants/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{id}`, `/api/tenants/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Tenant to modify.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label} *(required)*  
  ID of the Tenant to modify.
- **`IsDisabled`** :span[boolean]{.type-label}
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`ProjectEnvironments`** :span[object]{.type-label}  
  The complete set of projects the tenant is connected to, as an object keyed by project ID where each value is the array of environment IDs the tenant can deploy to for that project. Example: {"Projects-1": ["Environments-1"]}. Replaces the tenant's current connections; omitting an existing project disconnects it and deletes the tenant's variable values for it.
- **`Slug`** :span[string]{.type-label}  
  A URL-friendly, unique identifier for the tenant. Resubmit the tenant's current slug unless you intend to change it; changing it breaks existing links that use the old slug.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantTags`** :span[array of string]{.type-label}  
  The complete set of tags for the tenant, as canonical tag names in the form 'TagSetName/TagName'. Example: ["Regions/EU-West", "Tier/Premium"]. Replaces the tenant's current tags; any existing tag omitted here is removed.

:::api-example{label="Request"}
```json
{
  "Description": "string",
  "Id": "Tenants-1",
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
  "SpaceId": "Spaces-1",
  "TenantTags": [
    "string"
  ]
}
```
:::

**Response**

`200` — Confirms that a Tenant has been modified, containing the updated Tenant

- **`ClonedFromTenantId`** :span[string]{.type-label}
- **`CustomFields`** :span[array of string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`Icon`** :span[object]{.type-label}
  - **`Color`** :span[string]{.type-label}  
    Icon background colour, as a Hex string.
  - **`Id`** :span[string]{.type-label}  
    Font Awesome Icon Id.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDisabled`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`ProjectEnvironments`** :span[object]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}  
  Tags are referenced by CanonicalName like {TagSetName}/{TagName}.

:::api-example{label="Response"}
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
  "SpaceId": "Spaces-1",
  "TenantTags": [
    "string"
  ]
}
```
:::

## Delete an existing Tenant

:endpoint{method="DELETE" path="/api/\{spaceId\}/tenants/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{id}`, `/api/tenants/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Tenant to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

## Get the logo associated with the Tenant

:endpoint{method="GET" path="/api/\{spaceId\}/tenants/\{id\}/logo"}

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{id}/logo`, `/api/tenants/{id}/logo`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Tenant to retrieve the logo for.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

:::api-example{label="Response"}
```json
"string"
```
:::

## Modify the logo associated with the tenant

:endpoint{method="POST" path="/api/\{spaceId\}/tenants/\{id\}/logo"}

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{id}/logo`, `/api/tenants/{id}/logo`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Tenant to update the logo for.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

## Modify the logo associated with the tenant

:endpoint{method="PUT" path="/api/\{spaceId\}/tenants/\{id\}/logo"}

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Tenant to update the logo for.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

## Modify the logo associated with the tenant

:endpoint{method="PUT" path="/api/spaces/\{spaceIdentifier\}/tenants/\{id\}/logo"}

Also reachable at `/api/tenants/{id}/logo`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Tenant to update the logo for.
- **`spaceIdentifier`** :span[string]{.type-label} *(required)*  
  Identifier (ID or slug) of the space.

**Response**

`200` — Success

## Get variables associated with the provided tenant ID

:endpoint{method="GET" path="/api/\{spaceId\}/tenants/\{id\}/variables"}

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{id}/variables`, `/api/tenants/{id}/variables`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Tenant to retrieve variables for.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Variables associated with the provided tenant ID.

- **`ConcurrencyToken`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariables`** :span[object]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectVariables`** :span[object]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantId`** :span[string]{.type-label}
- **`TenantName`** :span[string]{.type-label}

:::api-example{label="Response"}
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
  "SpaceId": "Spaces-1",
  "TenantId": "Tenants-1",
  "TenantName": "string"
}
```
:::

## Create or Update the variables associated with the tenant

:endpoint{method="POST" path="/api/\{spaceId\}/tenants/\{id\}/variables"}

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{id}/variables`, `/api/tenants/{id}/variables`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Tenant to modify.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ConcurrencyToken`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label} *(required)*  
  ID of the Tenant to modify.
- **`LibraryVariables`** :span[object]{.type-label}
- **`ProjectVariables`** :span[object]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantName`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "ConcurrencyToken": "string",
  "Id": "Tenants-1",
  "LibraryVariables": {
    "additionalProp1": {
      "LibraryVariableSetId": "LibraryVariableSets-1",
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
      "LibraryVariableSetId": "LibraryVariableSets-1",
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
      "LibraryVariableSetId": "LibraryVariableSets-1",
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
      "ProjectId": "Projects-1",
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
      "ProjectId": "Projects-1",
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
      "ProjectId": "Projects-1",
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
  "SpaceId": "Spaces-1",
  "TenantName": "string"
}
```
:::

**Response**

`200` — The variables associated with the tenant.

- **`ConcurrencyToken`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariables`** :span[object]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectVariables`** :span[object]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantId`** :span[string]{.type-label}
- **`TenantName`** :span[string]{.type-label}

:::api-example{label="Response"}
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
  "SpaceId": "Spaces-1",
  "TenantId": "Tenants-1",
  "TenantName": "string"
}
```
:::

## Create or Update the variables associated with the tenant

:endpoint{method="PUT" path="/api/\{spaceId\}/tenants/\{id\}/variables"}

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Tenant to modify.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ConcurrencyToken`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label} *(required)*  
  ID of the Tenant to modify.
- **`LibraryVariables`** :span[object]{.type-label}
- **`ProjectVariables`** :span[object]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantName`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "ConcurrencyToken": "string",
  "Id": "Tenants-1",
  "LibraryVariables": {
    "additionalProp1": {
      "LibraryVariableSetId": "LibraryVariableSets-1",
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
      "LibraryVariableSetId": "LibraryVariableSets-1",
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
      "LibraryVariableSetId": "LibraryVariableSets-1",
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
      "ProjectId": "Projects-1",
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
      "ProjectId": "Projects-1",
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
      "ProjectId": "Projects-1",
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
  "SpaceId": "Spaces-1",
  "TenantName": "string"
}
```
:::

**Response**

`200` — The variables associated with the tenant.

- **`ConcurrencyToken`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariables`** :span[object]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectVariables`** :span[object]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantId`** :span[string]{.type-label}
- **`TenantName`** :span[string]{.type-label}

:::api-example{label="Response"}
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
  "SpaceId": "Spaces-1",
  "TenantId": "Tenants-1",
  "TenantName": "string"
}
```
:::

## Create or Update the variables associated with the tenant

:endpoint{method="PUT" path="/api/spaces/\{spaceIdentifier\}/tenants/\{id\}/variables"}

Also reachable at `/api/tenants/{id}/variables`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Tenant to modify.
- **`spaceIdentifier`** :span[string]{.type-label} *(required)*  
  Identifier (ID or slug) of the space.

**Request Body**

- **`ConcurrencyToken`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label} *(required)*  
  ID of the Tenant to modify.
- **`LibraryVariables`** :span[object]{.type-label}
- **`ProjectVariables`** :span[object]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantName`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "ConcurrencyToken": "string",
  "Id": "Tenants-1",
  "LibraryVariables": {
    "additionalProp1": {
      "LibraryVariableSetId": "LibraryVariableSets-1",
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
      "LibraryVariableSetId": "LibraryVariableSets-1",
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
      "LibraryVariableSetId": "LibraryVariableSets-1",
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
      "ProjectId": "Projects-1",
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
      "ProjectId": "Projects-1",
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
      "ProjectId": "Projects-1",
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
  "SpaceId": "Spaces-1",
  "TenantName": "string"
}
```
:::

**Response**

`200` — The variables associated with the tenant.

- **`ConcurrencyToken`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariables`** :span[object]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectVariables`** :span[object]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantId`** :span[string]{.type-label}
- **`TenantName`** :span[string]{.type-label}

:::api-example{label="Response"}
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
  "SpaceId": "Spaces-1",
  "TenantId": "Tenants-1",
  "TenantName": "string"
}
```
:::

## Get the common variables associated with the tenant

:endpoint{method="GET" path="/api/\{spaceId\}/tenants/\{tenantId\}/commonvariables"}

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{tenantId}/commonvariables`, `/api/tenants/{tenantId}/commonvariables`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*
- **`tenantId`** :span[string]{.type-label} *(required)*  
  The ID of the tenant to read common variable values for. Example: Tenants-101.

**Query Parameters**

- **`includeMissingVariables`** :span[boolean]{.type-label}  
  When true, the response also lists the library variable set templates the tenant is required to supply a value for but has not, along with each template's default value.

**Response**

`200` — The common variables associated with a tenant.

- **`ConcurrencyToken`** :span[string]{.type-label}  
  Minimum length 1.
- **`MissingVariables`** :span[array of object]{.type-label}
  - **`LibraryVariableSetId`** :span[string]{.type-label}
  - **`LibraryVariableSetName`** :span[string]{.type-label}
  - **`Scope`** :span[object]{.type-label}
  - **`Template`** :span[object]{.type-label}
  - **`TemplateId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Value`** :span[object]{.type-label}
- **`TenantId`** :span[string]{.type-label}
- **`Variables`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Minimum length 1.
  - **`LibraryVariableSetId`** :span[string]{.type-label}
  - **`LibraryVariableSetName`** :span[string]{.type-label}
  - **`Scope`** :span[object]{.type-label}
  - **`Template`** :span[object]{.type-label}
  - **`TemplateId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Value`** :span[object]{.type-label}

:::api-example{label="Response"}
```json
{
  "ConcurrencyToken": "string",
  "MissingVariables": [
    {
      "LibraryVariableSetId": "LibraryVariableSets-1",
      "LibraryVariableSetName": "string",
      "Scope": {
        "EnvironmentIds": [
          "Environments-1",
          "..."
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
  "TenantId": "Tenants-1",
  "Variables": [
    {
      "Id": "string",
      "LibraryVariableSetId": "LibraryVariableSets-1",
      "LibraryVariableSetName": "string",
      "Scope": {
        "EnvironmentIds": [
          "Environments-1",
          "..."
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
:::

## Create or Update the common variables associated with the tenant

:endpoint{method="POST" path="/api/\{spaceId\}/tenants/\{tenantId\}/commonvariables"}

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{tenantId}/commonvariables`, `/api/tenants/{tenantId}/commonvariables`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*
- **`tenantId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ConcurrencyToken`** :span[string]{.type-label}  
  The concurrency token returned when reading the tenant's variables. Always pass it back so the write is rejected if someone else changed the variables since your read; omitting it skips the check and risks silently overwriting their changes.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantId`** :span[string]{.type-label} *(required)*
- **`Variables`** :span[array of object]{.type-label} *(required)*  
  The complete set of common variable values for the tenant; existing values omitted here are deleted. Each item is an object: 'Id' (the existing value's ID when updating; omit when adding), 'OwnerId' (the library variable set ID), 'TemplateId' (the variable template ID), 'Value' (a plain string for non-sensitive values, or {"HasValue": true, "NewValue": "secret"} for sensitive ones), and 'Scope' ({"EnvironmentIds": [...]} limiting the value to those environments; empty applies to all).
  - **`Id`** :span[string]{.type-label}
  - **`OwnerId`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`Scope`** :span[object]{.type-label} *(required)*
  - **`TemplateId`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`Value`** :span[object]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "ConcurrencyToken": "string",
  "SpaceId": "Spaces-1",
  "TenantId": "Tenants-1",
  "Variables": [
    {
      "Id": "string",
      "OwnerId": "string",
      "Scope": {
        "EnvironmentIds": [
          "Environments-1",
          "..."
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
:::

**Response**

`200` — The common variables associated with a tenant.

- **`ConcurrencyToken`** :span[string]{.type-label}  
  Minimum length 1.
- **`TenantId`** :span[string]{.type-label}
- **`Variables`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Minimum length 1.
  - **`LibraryVariableSetId`** :span[string]{.type-label}
  - **`LibraryVariableSetName`** :span[string]{.type-label}
  - **`Scope`** :span[object]{.type-label}
  - **`Template`** :span[object]{.type-label}
  - **`TemplateId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Value`** :span[object]{.type-label}

:::api-example{label="Response"}
```json
{
  "ConcurrencyToken": "string",
  "TenantId": "Tenants-1",
  "Variables": [
    {
      "Id": "string",
      "LibraryVariableSetId": "LibraryVariableSets-1",
      "LibraryVariableSetName": "string",
      "Scope": {
        "EnvironmentIds": [
          "Environments-1",
          "..."
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
:::

## Create or Update the common variables associated with the tenant

:endpoint{method="PUT" path="/api/\{spaceId\}/tenants/\{tenantId\}/commonvariables"}

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*
- **`tenantId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ConcurrencyToken`** :span[string]{.type-label}  
  The concurrency token returned when reading the tenant's variables. Always pass it back so the write is rejected if someone else changed the variables since your read; omitting it skips the check and risks silently overwriting their changes.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantId`** :span[string]{.type-label} *(required)*
- **`Variables`** :span[array of object]{.type-label} *(required)*  
  The complete set of common variable values for the tenant; existing values omitted here are deleted. Each item is an object: 'Id' (the existing value's ID when updating; omit when adding), 'OwnerId' (the library variable set ID), 'TemplateId' (the variable template ID), 'Value' (a plain string for non-sensitive values, or {"HasValue": true, "NewValue": "secret"} for sensitive ones), and 'Scope' ({"EnvironmentIds": [...]} limiting the value to those environments; empty applies to all).
  - **`Id`** :span[string]{.type-label}
  - **`OwnerId`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`Scope`** :span[object]{.type-label} *(required)*
  - **`TemplateId`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`Value`** :span[object]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "ConcurrencyToken": "string",
  "SpaceId": "Spaces-1",
  "TenantId": "Tenants-1",
  "Variables": [
    {
      "Id": "string",
      "OwnerId": "string",
      "Scope": {
        "EnvironmentIds": [
          "Environments-1",
          "..."
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
:::

**Response**

`200` — The common variables associated with a tenant.

- **`ConcurrencyToken`** :span[string]{.type-label}  
  Minimum length 1.
- **`TenantId`** :span[string]{.type-label}
- **`Variables`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Minimum length 1.
  - **`LibraryVariableSetId`** :span[string]{.type-label}
  - **`LibraryVariableSetName`** :span[string]{.type-label}
  - **`Scope`** :span[object]{.type-label}
  - **`Template`** :span[object]{.type-label}
  - **`TemplateId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Value`** :span[object]{.type-label}

:::api-example{label="Response"}
```json
{
  "ConcurrencyToken": "string",
  "TenantId": "Tenants-1",
  "Variables": [
    {
      "Id": "string",
      "LibraryVariableSetId": "LibraryVariableSets-1",
      "LibraryVariableSetName": "string",
      "Scope": {
        "EnvironmentIds": [
          "Environments-1",
          "..."
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
:::

## Create or Update the common variables associated with the tenant

:endpoint{method="PUT" path="/api/spaces/\{spaceIdentifier\}/tenants/\{tenantId\}/commonvariables"}

Also reachable at `/api/tenants/{tenantId}/commonvariables`.

**Path Parameters**

- **`spaceIdentifier`** :span[string]{.type-label} *(required)*  
  Identifier (ID or slug) of the space.
- **`tenantId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ConcurrencyToken`** :span[string]{.type-label}  
  The concurrency token returned when reading the tenant's variables. Always pass it back so the write is rejected if someone else changed the variables since your read; omitting it skips the check and risks silently overwriting their changes.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantId`** :span[string]{.type-label} *(required)*
- **`Variables`** :span[array of object]{.type-label} *(required)*  
  The complete set of common variable values for the tenant; existing values omitted here are deleted. Each item is an object: 'Id' (the existing value's ID when updating; omit when adding), 'OwnerId' (the library variable set ID), 'TemplateId' (the variable template ID), 'Value' (a plain string for non-sensitive values, or {"HasValue": true, "NewValue": "secret"} for sensitive ones), and 'Scope' ({"EnvironmentIds": [...]} limiting the value to those environments; empty applies to all).
  - **`Id`** :span[string]{.type-label}
  - **`OwnerId`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`Scope`** :span[object]{.type-label} *(required)*
  - **`TemplateId`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`Value`** :span[object]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "ConcurrencyToken": "string",
  "SpaceId": "Spaces-1",
  "TenantId": "Tenants-1",
  "Variables": [
    {
      "Id": "string",
      "OwnerId": "string",
      "Scope": {
        "EnvironmentIds": [
          "Environments-1",
          "..."
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
:::

**Response**

`200` — The common variables associated with a tenant.

- **`ConcurrencyToken`** :span[string]{.type-label}  
  Minimum length 1.
- **`TenantId`** :span[string]{.type-label}
- **`Variables`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Minimum length 1.
  - **`LibraryVariableSetId`** :span[string]{.type-label}
  - **`LibraryVariableSetName`** :span[string]{.type-label}
  - **`Scope`** :span[object]{.type-label}
  - **`Template`** :span[object]{.type-label}
  - **`TemplateId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Value`** :span[object]{.type-label}

:::api-example{label="Response"}
```json
{
  "ConcurrencyToken": "string",
  "TenantId": "Tenants-1",
  "Variables": [
    {
      "Id": "string",
      "LibraryVariableSetId": "LibraryVariableSets-1",
      "LibraryVariableSetName": "string",
      "Scope": {
        "EnvironmentIds": [
          "Environments-1",
          "..."
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
:::

## Get the project variables associated with the tenant

:endpoint{method="GET" path="/api/\{spaceId\}/tenants/\{tenantId\}/projectvariables"}

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{tenantId}/projectvariables`, `/api/tenants/{tenantId}/projectvariables`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*
- **`tenantId`** :span[string]{.type-label} *(required)*  
  The ID of the tenant to read project variable values for. Example: Tenants-101.

**Query Parameters**

- **`includeMissingVariables`** :span[boolean]{.type-label}  
  When true, the response also lists the project variable templates the tenant is required to supply a value for but has not, along with each template's default value.

**Response**

`200` — The project variables associated with a tenant.

- **`ConcurrencyToken`** :span[string]{.type-label}  
  Minimum length 1.
- **`MissingVariables`** :span[array of object]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectName`** :span[string]{.type-label}
  - **`Scope`** :span[object]{.type-label}
  - **`Template`** :span[object]{.type-label}
  - **`TemplateId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Value`** :span[object]{.type-label}
- **`TenantId`** :span[string]{.type-label}
- **`Variables`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectName`** :span[string]{.type-label}
  - **`Scope`** :span[object]{.type-label}
  - **`Template`** :span[object]{.type-label}
  - **`TemplateId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Value`** :span[object]{.type-label}

:::api-example{label="Response"}
```json
{
  "ConcurrencyToken": "string",
  "MissingVariables": [
    {
      "ProjectId": "Projects-1",
      "ProjectName": "string",
      "Scope": {
        "EnvironmentIds": [
          "Environments-1",
          "..."
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
  "TenantId": "Tenants-1",
  "Variables": [
    {
      "Id": "string",
      "ProjectId": "Projects-1",
      "ProjectName": "string",
      "Scope": {
        "EnvironmentIds": [
          "Environments-1",
          "..."
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
:::

## Create or Update the project variables associated with the tenant

:endpoint{method="POST" path="/api/\{spaceId\}/tenants/\{tenantId\}/projectvariables"}

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{tenantId}/projectvariables`, `/api/tenants/{tenantId}/projectvariables`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*
- **`tenantId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ConcurrencyToken`** :span[string]{.type-label}  
  The concurrency token returned when reading the tenant's variables. Always pass it back so the write is rejected if someone else changed the variables since your read; omitting it skips the check and risks silently overwriting their changes.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantId`** :span[string]{.type-label} *(required)*
- **`Variables`** :span[array of object]{.type-label} *(required)*  
  The complete set of project variable values for the tenant; existing values omitted here are deleted. Each item is an object: 'Id' (the existing value's ID when updating; omit when adding), 'OwnerId' (the project ID), 'TemplateId' (the variable template ID), 'Value' (a plain string for non-sensitive values, or {"HasValue": true, "NewValue": "secret"} for sensitive ones), and 'Scope' ({"EnvironmentIds": [...]} limiting the value to those environments; empty applies to all).
  - **`Id`** :span[string]{.type-label}
  - **`OwnerId`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`Scope`** :span[object]{.type-label} *(required)*
  - **`TemplateId`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`Value`** :span[object]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "ConcurrencyToken": "string",
  "SpaceId": "Spaces-1",
  "TenantId": "Tenants-1",
  "Variables": [
    {
      "Id": "string",
      "OwnerId": "string",
      "Scope": {
        "EnvironmentIds": [
          "Environments-1",
          "..."
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
:::

**Response**

`200` — The project variables associated with a tenant.

- **`ConcurrencyToken`** :span[string]{.type-label}  
  Minimum length 1.
- **`TenantId`** :span[string]{.type-label}
- **`Variables`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectName`** :span[string]{.type-label}
  - **`Scope`** :span[object]{.type-label}
  - **`Template`** :span[object]{.type-label}
  - **`TemplateId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Value`** :span[object]{.type-label}

:::api-example{label="Response"}
```json
{
  "ConcurrencyToken": "string",
  "TenantId": "Tenants-1",
  "Variables": [
    {
      "Id": "string",
      "ProjectId": "Projects-1",
      "ProjectName": "string",
      "Scope": {
        "EnvironmentIds": [
          "Environments-1",
          "..."
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
:::

## Create or Update the project variables associated with the tenant

:endpoint{method="PUT" path="/api/\{spaceId\}/tenants/\{tenantId\}/projectvariables"}

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*
- **`tenantId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ConcurrencyToken`** :span[string]{.type-label}  
  The concurrency token returned when reading the tenant's variables. Always pass it back so the write is rejected if someone else changed the variables since your read; omitting it skips the check and risks silently overwriting their changes.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantId`** :span[string]{.type-label} *(required)*
- **`Variables`** :span[array of object]{.type-label} *(required)*  
  The complete set of project variable values for the tenant; existing values omitted here are deleted. Each item is an object: 'Id' (the existing value's ID when updating; omit when adding), 'OwnerId' (the project ID), 'TemplateId' (the variable template ID), 'Value' (a plain string for non-sensitive values, or {"HasValue": true, "NewValue": "secret"} for sensitive ones), and 'Scope' ({"EnvironmentIds": [...]} limiting the value to those environments; empty applies to all).
  - **`Id`** :span[string]{.type-label}
  - **`OwnerId`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`Scope`** :span[object]{.type-label} *(required)*
  - **`TemplateId`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`Value`** :span[object]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "ConcurrencyToken": "string",
  "SpaceId": "Spaces-1",
  "TenantId": "Tenants-1",
  "Variables": [
    {
      "Id": "string",
      "OwnerId": "string",
      "Scope": {
        "EnvironmentIds": [
          "Environments-1",
          "..."
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
:::

**Response**

`200` — The project variables associated with a tenant.

- **`ConcurrencyToken`** :span[string]{.type-label}  
  Minimum length 1.
- **`TenantId`** :span[string]{.type-label}
- **`Variables`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectName`** :span[string]{.type-label}
  - **`Scope`** :span[object]{.type-label}
  - **`Template`** :span[object]{.type-label}
  - **`TemplateId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Value`** :span[object]{.type-label}

:::api-example{label="Response"}
```json
{
  "ConcurrencyToken": "string",
  "TenantId": "Tenants-1",
  "Variables": [
    {
      "Id": "string",
      "ProjectId": "Projects-1",
      "ProjectName": "string",
      "Scope": {
        "EnvironmentIds": [
          "Environments-1",
          "..."
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
:::

## Create or Update the project variables associated with the tenant

:endpoint{method="PUT" path="/api/spaces/\{spaceIdentifier\}/tenants/\{tenantId\}/projectvariables"}

Also reachable at `/api/tenants/{tenantId}/projectvariables`.

**Path Parameters**

- **`spaceIdentifier`** :span[string]{.type-label} *(required)*  
  Identifier (ID or slug) of the space.
- **`tenantId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ConcurrencyToken`** :span[string]{.type-label}  
  The concurrency token returned when reading the tenant's variables. Always pass it back so the write is rejected if someone else changed the variables since your read; omitting it skips the check and risks silently overwriting their changes.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantId`** :span[string]{.type-label} *(required)*
- **`Variables`** :span[array of object]{.type-label} *(required)*  
  The complete set of project variable values for the tenant; existing values omitted here are deleted. Each item is an object: 'Id' (the existing value's ID when updating; omit when adding), 'OwnerId' (the project ID), 'TemplateId' (the variable template ID), 'Value' (a plain string for non-sensitive values, or {"HasValue": true, "NewValue": "secret"} for sensitive ones), and 'Scope' ({"EnvironmentIds": [...]} limiting the value to those environments; empty applies to all).
  - **`Id`** :span[string]{.type-label}
  - **`OwnerId`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`Scope`** :span[object]{.type-label} *(required)*
  - **`TemplateId`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`Value`** :span[object]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "ConcurrencyToken": "string",
  "SpaceId": "Spaces-1",
  "TenantId": "Tenants-1",
  "Variables": [
    {
      "Id": "string",
      "OwnerId": "string",
      "Scope": {
        "EnvironmentIds": [
          "Environments-1",
          "..."
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
:::

**Response**

`200` — The project variables associated with a tenant.

- **`ConcurrencyToken`** :span[string]{.type-label}  
  Minimum length 1.
- **`TenantId`** :span[string]{.type-label}
- **`Variables`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectName`** :span[string]{.type-label}
  - **`Scope`** :span[object]{.type-label}
  - **`Template`** :span[object]{.type-label}
  - **`TemplateId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Value`** :span[object]{.type-label}

:::api-example{label="Response"}
```json
{
  "ConcurrencyToken": "string",
  "TenantId": "Tenants-1",
  "Variables": [
    {
      "Id": "string",
      "ProjectId": "Projects-1",
      "ProjectName": "string",
      "Scope": {
        "EnvironmentIds": [
          "Environments-1",
          "..."
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
:::

## List all of the tenant variables in the supplied Octopus Deploy Space. The results will be sorted alphabetically by id

:endpoint{method="GET" path="/api/\{spaceId\}/tenantvariables/all"}

Also reachable at `/api/spaces/{spaceIdentifier}/tenantvariables/all`, `/api/tenantvariables/all`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`projectId`** :span[string]{.type-label}  
  ID of a project that tenants must be connected to, to be included in the result set. For matching tenants, variables from all projects are still returned.

**Response**

`200` — All of the tenant variables in the supplied Octopus Deploy Space (sorted alphabetically by id).

- **`ConcurrencyToken`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariables`** :span[object]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectVariables`** :span[object]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantId`** :span[string]{.type-label}
- **`TenantName`** :span[string]{.type-label}

:::api-example{label="Response"}
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
    "SpaceId": "Spaces-1",
    "TenantId": "Tenants-1",
    "TenantName": "string"
  }
]
```
:::
