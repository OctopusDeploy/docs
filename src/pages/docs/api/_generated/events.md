---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-09-04
title: Events
---

Events are automatically created when significant actions take place within Octopus by users.

Examples are adding environments, modifying projects, deploying releases, canceling tasks, and so on.
Events can be used to provide an audit trail of what has happened in the system.

The HTTP API **cannot** be used to add, modify or delete events.

## List Events

:endpoint{method="GET" path="/api/\{spaceId\}/events"}

Also reachable at `/api/events`, `/api/spaces/{spaceIdentifier}/events`.

A list of all audit events collected to date, ordered by the date of the event in descending order. Events can be filtered by various criteria and can be returned as a csv file when the optional parameter 'asCsv' is set to true.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`asCsv`** :span[boolean]{.type-label}  
  Returns list of events as a csv file when set to true.
- **`documentTypes`** :span[array of string]{.type-label}  
  The document types to be matched, provided as a comma separated list of strings.
- **`environments`** :span[array of string]{.type-label}  
  The environment ids to be matched, provided as a comma separated list of strings.
- **`eventAgents`** :span[array of string]{.type-label}  
  The event agents to be matched, provided as a comma separated list of strings.
- **`eventCategories`** :span[array of string]{.type-label}  
  The event categories to be matched, provided as a comma separated list of strings.
- **`eventGroups`** :span[array of string]{.type-label}  
  The event groups to be matched, provided as a comma separated list of strings.
- **`excludeDifference`** :span[boolean]{.type-label}  
  Omits the change details of all events when set to true.
- **`from`** :span[string]{.type-label}  
  Filter events that occurred after this datetime. Format `date-time`.
- **`fromAutoId`** :span[integer]{.type-label}  
  Filter events after specified autoId.
- **`ids`** :span[string]{.type-label}  
  The event ids to be matched, provided as a comma separated list of strings.
- **`includeInternalEvents`** :span[boolean]{.type-label}  
  Exclude the machine-related CRUD events that were added for auto-deploy events.
- **`projectGroups`** :span[array of string]{.type-label}  
  The project group ids to be matched, provided as a comma separated list of strings.
- **`projects`** :span[array of string]{.type-label}  
  The project ids to be matched, provided as a comma separated list of strings.
- **`regarding`** :span[array of string]{.type-label}  
  The related document ids to be matched, provided as a comma separated list of strings.
- **`regardingAny`** :span[array of string]{.type-label}  
  The related document ids to be matched, provided as a comma separated list of strings.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`tags`** :span[array of string]{.type-label}  
  The canonical tag ids to be matched, provided as a comma separated list of strings.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.
- **`tenants`** :span[array of string]{.type-label}  
  The tenant ids to be matched, provided as a comma separated list of strings.
- **`to`** :span[string]{.type-label}  
  Filter events that occurred before this datetime. Format `date-time`.
- **`toAutoId`** :span[integer]{.type-label}  
  Filter events before specified autoId.
- **`user`** :span[string]{.type-label}
- **`users`** :span[array of string]{.type-label}  
  The user ids to be matched, provided as a comma separated list of strings.

**Response**

`200` — A paginated list of events, unless AsCsv is true, in which case a text/csv file is returned

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}  
  The type of item in this list.
- **`Items`** :span[array of object]{.type-label}
  - **`ApiKeyHint`** :span[string]{.type-label}  
    Gets or sets the obfuscated hint of the API key used to authenticate the request, if applicable.
  - **`ApiKeyId`** :span[string]{.type-label}  
    Gets or sets the ID of the API key used to authenticate the request, if applicable.
  - **`Category`** :span[string]{.type-label}  
    Gets or sets the event category.
  - **`ChangeDetails`** :span[object]{.type-label}
  - **`Comments`** :span[string]{.type-label}  
    Gets or sets any user-provided comments that were recorded with the event.
  - **`Details`** :span[string]{.type-label}  
    Gets or sets the details of the event. For events representing a modification to a document use the ChangeDetails property.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IdentityEstablishedWith`** :span[string]{.type-label}  
    Gets or sets a description of how the user performing the event identified themselves to Octopus.
  - **`IpAddress`** :span[string]{.type-label}  
    The IP address of the user that created the event.
  - **`IsService`** :span[boolean]{.type-label}  
    Gets or sets whether the user who created the event is a service user or an interactive user.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Message`** :span[string]{.type-label}  
    Gets or sets the message text that summarizes the event.
  - **`MessageHtml`** :span[string]{.type-label}  
    Gets or sets the message text that summarizes the event, HTML formatted with links to the related documents.
  - **`MessageReferences`** :span[array of object]{.type-label}  
    Gets or sets an array of document ID's and indexes where they are mentioned in the message text.
  - **`Occurred`** :span[string]{.type-label}  
    Gets or sets the date/time that the event took place. Format `date-time`.
  - **`RelatedDocumentIds`** :span[array of string]{.type-label}  
    Gets or sets a collection of document ID's that this event relates to. Note that the document ID's may no longer exist.
  - **`SpaceId`** :span[string]{.type-label}  
    Gets or sets the SpaceId of the event. This represents the space in which the event was raised.
  - **`UserAgent`** :span[string]{.type-label}  
    Gets or sets the user agent header value from the request that triggered the event.
  - **`UserId`** :span[string]{.type-label}  
    Gets or sets the ID of the user who created the event.
  - **`Username`** :span[string]{.type-label}  
    Gets or sets the name of the user who created the event.
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
  "ItemType": "Event",
  "Items": [
    {
      "ApiKeyHint": null,
      "ApiKeyId": null,
      "Category": "Modified",
      "ChangeDetails": {
        "Differences": [
          {
            "path": "/IsDisabled",
            "op": "replace",
            "value": true
          }
        ],
        "DocumentContext": {
          "Id": "Tenants-1",
          "Name": "ExampleTenant"
        }
      },
      "Comments": "string",
      "Details": "string",
      "Id": "string",
      "IdentityEstablishedWith": "Session cookie",
      "IpAddress": "127.0.0.1",
      "IsService": false,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "Self": "/api/..."
      },
      "Message": "Tenant ExampleTenant was modified",
      "MessageHtml": "Tenant ExampleTenant was modified",
      "MessageReferences": [
        {}
      ],
      "Occurred": "2020-01-01T00:00:00.000Z",
      "RelatedDocumentIds": [
        "Tenants-1"
      ],
      "SpaceId": "Spaces-1",
      "UserAgent": "OctopusClient-js/2026.3.15581",
      "UserId": "Users-1",
      "Username": "MyUserName"
    }
  ],
  "ItemsPerPage": 30,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LastPageNumber": 1,
  "Links": {
    "Self": "/api/..."
  },
  "NumberOfPages": 2,
  "TotalResults": 42
}
```
:::

## List Event Agents

:endpoint{method="GET" path="/api/\{spaceId\}/events/agents"}

Also reachable at `/api/events/agents`, `/api/spaces/{spaceIdentifier}/events/agents`.

An Event Agent represents a source of events. Agents are either well known, or remote.

Well-known agents are represented in the response list by an Id and Name:

```
{ "Id": "Server", "Name": "Octopus Server task" }
```

Remote agents are represented in the response list by their HTTP User-Agent:

```
{ "Id": "curl/8.7.1", "Name": "curl/8.7.1" }
```

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  Ignored. All Event Agents known to the system are returned.

**Response**

`200` — The requested event agents

- **`Id`** :span[string]{.type-label}  
  A well-known identifier for a source of Events, or the HTTP User-Agent of a remote client which generated one or more events.
- **`Links`** :span[object]{.type-label}  
  The Links property is not set but exists for backwards compatibility.
- **`Name`** :span[string]{.type-label}  
  A well-known name for a source of Events, or the HTTP User-Agent of a remote client which generated one or more events.

:::api-example{label="Response"}
```json
[
  {
    "Id": "curl/8.7.1",
    "Links": null,
    "Name": "curl/8.7.1"
  }
]
```
:::

## List Event Categories

:endpoint{method="GET" path="/api/\{spaceId\}/events/categories"}

Also reachable at `/api/events/categories`, `/api/spaces/{spaceIdentifier}/events/categories`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  Ignored.

**Query Parameters**

- **`appliesTo`** :span[string]{.type-label}  
  Limits the results to event categories that apply to a particular document type.

**Response**

`200` — The requested Event Categories

- **`Id`** :span[string]{.type-label}  
  The ID of the Event Category.
- **`Links`** :span[object]{.type-label}  
  The Links property is not set but exists for backwards compatibility.
- **`Name`** :span[string]{.type-label}  
  The display name of the Event Category.

:::api-example{label="Response"}
```json
[
  {
    "Id": "Created",
    "Links": null,
    "Name": "Document created"
  }
]
```
:::

## List Document Types

:endpoint{method="GET" path="/api/\{spaceId\}/events/documenttypes"}

Also reachable at `/api/events/documenttypes`, `/api/spaces/{spaceIdentifier}/events/documenttypes`.

The list of document types that you can use for the documentTypes parameter when searching for events. Use the Document Type Id.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  Ignored.

**Response**

`200` — List of event document types.

- **`Id`** :span[string]{.type-label}  
  Document Type Identifier.
- **`Name`** :span[string]{.type-label}  
  Display name for the Document Type.

:::api-example{label="Response"}
```json
[
  {
    "Id": "ProjectGroups",
    "Name": "Project Group"
  }
]
```
:::

## List Event Groups

:endpoint{method="GET" path="/api/\{spaceId\}/events/groups"}

Also reachable at `/api/events/groups`, `/api/spaces/{spaceIdentifier}/events/groups`.

The list of event groups that you can use when searching for events

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  Ignored.

**Query Parameters**

- **`appliesTo`** :span[string]{.type-label}  
  Filter results to only include Event Groups which are related to the provided string. eg. 'Machine'.

**Response**

`200` — A list of subscription event groups.

- **`EventCategories`** :span[array of string]{.type-label}
- **`Id`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}
- **`Name`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
[
  {
    "EventCategories": [
      "Created",
      "Modified",
      "Deleted"
    ],
    "Id": "Document",
    "Links": null,
    "Name": "Document events"
  }
]
```
:::

## Get a single event by ID

:endpoint{method="GET" path="/api/\{spaceId\}/events/\{id\}"}

Also reachable at `/api/events/{id}`, `/api/spaces/{spaceIdentifier}/events/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the event.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested event

- **`ApiKeyHint`** :span[string]{.type-label}  
  Gets or sets the obfuscated hint of the API key used to authenticate the request, if applicable.
- **`ApiKeyId`** :span[string]{.type-label}  
  Gets or sets the ID of the API key used to authenticate the request, if applicable.
- **`Category`** :span[string]{.type-label}  
  Gets or sets the event category.
- **`ChangeDetails`** :span[object]{.type-label}
  - **`Differences`** :span[string]{.type-label}
  - **`DocumentContext`** :span[string]{.type-label}
- **`Comments`** :span[string]{.type-label}  
  Gets or sets any user-provided comments that were recorded with the event.
- **`Details`** :span[string]{.type-label}  
  Gets or sets the details of the event. For events representing a modification to a document use the ChangeDetails property.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IdentityEstablishedWith`** :span[string]{.type-label}  
  Gets or sets a description of how the user performing the event identified themselves to Octopus.
- **`IpAddress`** :span[string]{.type-label}  
  The IP address of the user that created the event.
- **`IsService`** :span[boolean]{.type-label}  
  Gets or sets whether the user who created the event is a service user or an interactive user.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Message`** :span[string]{.type-label}  
  Gets or sets the message text that summarizes the event.
- **`MessageHtml`** :span[string]{.type-label}  
  Gets or sets the message text that summarizes the event, HTML formatted with links to the related documents.
- **`MessageReferences`** :span[array of object]{.type-label}  
  Gets or sets an array of document ID's and indexes where they are mentioned in the message text.
  - **`Length`** :span[integer]{.type-label}
  - **`ReferencedDocumentId`** :span[string]{.type-label}
  - **`StartIndex`** :span[integer]{.type-label}
- **`Occurred`** :span[string]{.type-label}  
  Gets or sets the date/time that the event took place. Format `date-time`.
- **`RelatedDocumentIds`** :span[array of string]{.type-label}  
  Gets or sets a collection of document ID's that this event relates to. Note that the document ID's may no longer exist.
- **`SpaceId`** :span[string]{.type-label}  
  Gets or sets the SpaceId of the event. This represents the space in which the event was raised.
- **`UserAgent`** :span[string]{.type-label}  
  Gets or sets the user agent header value from the request that triggered the event.
- **`UserId`** :span[string]{.type-label}  
  Gets or sets the ID of the user who created the event.
- **`Username`** :span[string]{.type-label}  
  Gets or sets the name of the user who created the event.

:::api-example{label="Response"}
```json
{
  "ApiKeyHint": null,
  "ApiKeyId": null,
  "Category": "Modified",
  "ChangeDetails": {
    "Differences": [
      {
        "path": "/IsDisabled",
        "op": "replace",
        "value": true
      }
    ],
    "DocumentContext": {
      "Id": "Tenants-1",
      "Name": "ExampleTenant"
    }
  },
  "Comments": "string",
  "Details": "string",
  "Id": "string",
  "IdentityEstablishedWith": "Session cookie",
  "IpAddress": "127.0.0.1",
  "IsService": false,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "Self": "/api/..."
  },
  "Message": "Tenant ExampleTenant was modified",
  "MessageHtml": "Tenant ExampleTenant was modified",
  "MessageReferences": [
    {
      "Length": 0,
      "ReferencedDocumentId": "string",
      "StartIndex": 0
    }
  ],
  "Occurred": "2020-01-01T00:00:00.000Z",
  "RelatedDocumentIds": [
    "Tenants-1"
  ],
  "SpaceId": "Spaces-1",
  "UserAgent": "OctopusClient-js/2026.3.15581",
  "UserId": "Users-1",
  "Username": "MyUserName"
}
```
:::
