---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Events
---

## Get a list of events

`GET` `/api/{spaceId}/events`

Also reachable at `/api/events`, `/api/spaces/{spaceIdentifier}/events`.

A list of all audit events collected to date, ordered by the date of the event in descending order. Events can be filtered by various criteria and can be returned as a csv file when the optional parameter 'asCsv' is set to true.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`asCsv`** <span class="type-label">boolean</span> — Returns list of events as a csv file when set to true.
- **`documentTypes`** <span class="type-label">array of string</span> — The document types to be matched, provided as a comma separated list of strings.
- **`environments`** <span class="type-label">array of string</span> — The environment ids to be matched, provided as a comma separated list of strings.
- **`eventAgents`** <span class="type-label">array of string</span> — The event agents to be matched, provided as a comma separated list of strings.
- **`eventCategories`** <span class="type-label">array of string</span> — The event categories to be matched, provided as a comma separated list of strings.
- **`eventGroups`** <span class="type-label">array of string</span> — The event groups to be matched, provided as a comma separated list of strings.
- **`excludeDifference`** <span class="type-label">boolean</span> — Omits the change details of all events when set to true.
- **`from`** <span class="type-label">string</span> — Filter events that occurred after this datetime. Format `date-time`.
- **`fromAutoId`** <span class="type-label">integer</span> — Filter events after specified autoId.
- **`ids`** <span class="type-label">string</span> — The event ids to be matched, provided as a comma separated list of strings.
- **`includeInternalEvents`** <span class="type-label">boolean</span> — Exclude the machine-related CRUD events that were added for auto-deploy events.
- **`projectGroups`** <span class="type-label">array of string</span> — The project group ids to be matched, provided as a comma separated list of strings.
- **`projects`** <span class="type-label">array of string</span> — The project ids to be matched, provided as a comma separated list of strings.
- **`regarding`** <span class="type-label">array of string</span> — The related document ids to be matched, provided as a comma separated list of strings.
- **`regardingAny`** <span class="type-label">array of string</span> — The related document ids to be matched, provided as a comma separated list of strings.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`tags`** <span class="type-label">array of string</span> — The canonical tag ids to be matched, provided as a comma separated list of strings.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.
- **`tenants`** <span class="type-label">array of string</span> — The tenant ids to be matched, provided as a comma separated list of strings.
- **`to`** <span class="type-label">string</span> — Filter events that occurred before this datetime. Format `date-time`.
- **`toAutoId`** <span class="type-label">integer</span> — Filter events before specified autoId.
- **`user`** <span class="type-label">string</span>
- **`users`** <span class="type-label">array of string</span> — The user ids to be matched, provided as a comma separated list of strings.

**Response**

`200` — OK

## Returns the list of event agents

`GET` `/api/{spaceId}/events/agents`

Also reachable at `/api/events/agents`, `/api/spaces/{spaceIdentifier}/events/agents`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The requested event agents

an array of `EventAgentResource`.

- **`Id`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span>
- **`Name`** <span class="type-label">string</span>

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

## Lists event categories

`GET` `/api/{spaceId}/events/categories`

Also reachable at `/api/events/categories`, `/api/spaces/{spaceIdentifier}/events/categories`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`appliesTo`** <span class="type-label">string</span>

**Response**

`200` — The requested Event Categories

an array of `EventCategoryResource`.

- **`Id`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span>
- **`Name`** <span class="type-label">string</span>

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

## Lists subscription event document types

`GET` `/api/{spaceId}/events/documenttypes`

Also reachable at `/api/events/documenttypes`, `/api/spaces/{spaceIdentifier}/events/documenttypes`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — A list of subscription event document types.

an array of `DocumentTypeResource`.

- **`Id`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span>

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

## Lists subscription event groups

`GET` `/api/{spaceId}/events/groups`

Also reachable at `/api/events/groups`, `/api/spaces/{spaceIdentifier}/events/groups`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`appliesTo`** <span class="type-label">string</span> — Filter results to only include Event Groups which are related to the provided string. eg. 'Machine'.

**Response**

`200` — A list of subscription event groups.

an array of `EventGroupResource`.

- **`EventCategories`** <span class="type-label">array of string</span>
- **`Id`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span>
- **`Name`** <span class="type-label">string</span>

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

## Gets a single event by ID

`GET` `/api/{spaceId}/events/{id}`

Also reachable at `/api/events/{id}`, `/api/spaces/{spaceIdentifier}/events/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the event.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested event

`EventResource`.

- **`ApiKeyHint`** <span class="type-label">string</span> — Gets or sets the obfuscated hint of the API key used to authenticate the request, if applicable.
- **`ApiKeyId`** <span class="type-label">string</span> — Gets or sets the ID of the API key used to authenticate the request, if applicable.
- **`Category`** <span class="type-label">string</span> — Gets or sets the event category.
- **`ChangeDetails`** <span class="type-label">object</span>
  - **`Differences`** <span class="type-label">string</span>
  - **`DocumentContext`** <span class="type-label">string</span>
- **`Comments`** <span class="type-label">string</span> — Gets or sets any user-provided comments that were recorded with the event.
- **`Details`** <span class="type-label">string</span> — Gets or sets the details of the event. For events representing a modification to a document use the ChangeDetails property.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IdentityEstablishedWith`** <span class="type-label">string</span> — Gets or sets a description of how the user performing the event identified themselves to Octopus.
- **`IpAddress`** <span class="type-label">string</span> — The IP address of the user that created the event.
- **`IsService`** <span class="type-label">boolean</span> — Gets or sets whether the user who created the event is a service user or an interactive user.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Message`** <span class="type-label">string</span> — Gets or sets the message text that summarizes the event.
- **`MessageHtml`** <span class="type-label">string</span> — Gets or sets the message text that summarizes the event, HTML formatted with links to the related documents.
- **`MessageReferences`** <span class="type-label">array of object</span> — Gets or sets an array of document ID's and indexes where they are mentioned in the message text.
  - **`Length`** <span class="type-label">integer</span>
  - **`ReferencedDocumentId`** <span class="type-label">string</span>
  - **`StartIndex`** <span class="type-label">integer</span>
- **`Occurred`** <span class="type-label">string</span> — Gets or sets the date/time that the event took place. Format `date-time`.
- **`RelatedDocumentIds`** <span class="type-label">array of string</span> — Gets or sets a collection of document ID's that this event relates to. Note that the document ID's may no longer exist.
- **`SpaceId`** <span class="type-label">string</span> — Gets or sets the SpaceId of the event. This represents the space in which the event was raised.
- **`UserAgent`** <span class="type-label">string</span> — Gets or sets the user agent header value from the request that triggered the event.
- **`UserId`** <span class="type-label">string</span> — Gets or sets the ID of the user who created the event.
- **`Username`** <span class="type-label">string</span> — Gets or sets the name of the user who created the event.

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
