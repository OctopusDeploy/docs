---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Events
---

## Get a list of events

:span[GET]{.api-get} `/api/{spaceId}/events`

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

`200` — OK

## Return the list of event agents

:span[GET]{.api-get} `/api/{spaceId}/events/agents`

Also reachable at `/api/events/agents`, `/api/spaces/{spaceIdentifier}/events/agents`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The requested event agents

- **`Id`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}
- **`Name`** :span[string]{.type-label}

<div data-example="Response">

```json
[
  {
    "Id": "string",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string"
  }
]
```
</div>

## List event categories

:span[GET]{.api-get} `/api/{spaceId}/events/categories`

Also reachable at `/api/events/categories`, `/api/spaces/{spaceIdentifier}/events/categories`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`appliesTo`** :span[string]{.type-label}

**Response**

`200` — The requested Event Categories

- **`Id`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}
- **`Name`** :span[string]{.type-label}

<div data-example="Response">

```json
[
  {
    "Id": "string",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string"
  }
]
```
</div>

## List subscription event document types

:span[GET]{.api-get} `/api/{spaceId}/events/documenttypes`

Also reachable at `/api/events/documenttypes`, `/api/spaces/{spaceIdentifier}/events/documenttypes`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — A list of subscription event document types.

- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}

<div data-example="Response">

```json
[
  {
    "Id": "string",
    "Name": "string"
  }
]
```
</div>

## List subscription event groups

:span[GET]{.api-get} `/api/{spaceId}/events/groups`

Also reachable at `/api/events/groups`, `/api/spaces/{spaceIdentifier}/events/groups`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`appliesTo`** :span[string]{.type-label}  
  Filter results to only include Event Groups which are related to the provided string. eg. 'Machine'.

**Response**

`200` — A list of subscription event groups.

- **`EventCategories`** :span[array of string]{.type-label}
- **`Id`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}
- **`Name`** :span[string]{.type-label}

<div data-example="Response">

```json
[
  {
    "EventCategories": [
      "string"
    ],
    "Id": "string",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string"
  }
]
```
</div>

## Get a single event by ID

:span[GET]{.api-get} `/api/{spaceId}/events/{id}`

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

<div data-example="Response">

```json
{
  "ApiKeyHint": "string",
  "ApiKeyId": "string",
  "Category": "string",
  "ChangeDetails": {
    "Differences": "string",
    "DocumentContext": "string"
  },
  "Comments": "string",
  "Details": "string",
  "Id": "string",
  "IdentityEstablishedWith": "string",
  "IpAddress": "string",
  "IsService": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Message": "string",
  "MessageHtml": "string",
  "MessageReferences": [
    {
      "Length": 0,
      "ReferencedDocumentId": "string",
      "StartIndex": 0
    }
  ],
  "Occurred": "2020-01-01T00:00:00.000Z",
  "RelatedDocumentIds": [
    "string"
  ],
  "SpaceId": "string",
  "UserAgent": "string",
  "UserId": "string",
  "Username": "string"
}
```
</div>
