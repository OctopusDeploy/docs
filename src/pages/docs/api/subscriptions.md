---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Subscriptions
---

## Get a list of Subscriptions

`GET` `/api/{spaceId}/subscriptions`

Also reachable at `/api/spaces/{spaceIdentifier}/subscriptions`, `/api/subscriptions`.

Lists all of the Subscriptions in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource.

- **`ids`** <span class="type-label">array of string</span>
- **`partialName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested Subscriptions

`SubscriptionResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`EventNotificationSubscription`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `Event`.
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
      "EventNotificationSubscription": {
        "EmailDigestLastProcessed": "2020-01-01T00:00:00.000Z",
        "EmailDigestLastProcessedEventAutoId": 0,
        "EmailFrequencyPeriod": "string",
        "EmailPriority": "Normal",
        "EmailShowDatesInTimeZoneId": "string",
        "EmailTeams": [
          "string"
        ],
        "Filter": {},
        "SlackChannelIds": [
          "string"
        ],
        "SlackChannelNames": [
          "string"
        ],
        "SlackDigestLastProcessed": "2020-01-01T00:00:00.000Z",
        "SlackDigestLastProcessedEventAutoId": 0,
        "SlackFrequencyPeriod": "string",
        "WebhookHeaderKey": "string",
        "WebhookHeaderValue": {},
        "WebhookLastProcessed": "2020-01-01T00:00:00.000Z",
        "WebhookLastProcessedEventAutoId": 0,
        "WebhookTeams": [
          "string"
        ],
        "WebhookTimeout": "string",
        "WebhookURI": "https://example.com"
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
      "SpaceId": "string",
      "Type": "Event"
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

## Creates a new Subscription

`POST` `/api/{spaceId}/subscriptions`

Also reachable at `/api/spaces/{spaceIdentifier}/subscriptions`, `/api/subscriptions`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource.

**Request Body**

`CreateSubscriptionCommand`

- **`EventNotificationSubscription`** <span class="type-label">object</span> *(required)*
  - **`EmailDigestLastProcessed`** <span class="type-label">string</span> — Format `date-time`.
  - **`EmailDigestLastProcessedEventAutoId`** <span class="type-label">integer</span>
  - **`EmailFrequencyPeriod`** <span class="type-label">string</span> — Format `date-span`.
  - **`EmailPriority`** <span class="type-label">enum</span> — Allowed values: `Normal`, `Low`, `High`.
  - **`EmailShowDatesInTimeZoneId`** <span class="type-label">string</span>
  - **`EmailTeams`** <span class="type-label">array of string</span>
  - **`Filter`** <span class="type-label">object</span>
  - **`SlackChannelIds`** <span class="type-label">array of string</span>
  - **`SlackChannelNames`** <span class="type-label">array of string</span>
  - **`SlackDigestLastProcessed`** <span class="type-label">string</span> — Format `date-time`.
  - **`SlackDigestLastProcessedEventAutoId`** <span class="type-label">integer</span>
  - **`SlackFrequencyPeriod`** <span class="type-label">string</span> — Format `date-span`.
  - **`WebhookHeaderKey`** <span class="type-label">string</span>
  - **`WebhookHeaderValue`** <span class="type-label">object</span>
  - **`WebhookLastProcessed`** <span class="type-label">string</span> — Format `date-time`.
  - **`WebhookLastProcessedEventAutoId`** <span class="type-label">integer</span>
  - **`WebhookTeams`** <span class="type-label">array of string</span>
  - **`WebhookTimeout`** <span class="type-label">string</span> — Format `date-span`.
  - **`WebhookURI`** <span class="type-label">string</span> — Use a backing field here, so we can ignore empty strings, which the portal sends us. Format `uri`.
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource.

<div data-example="Request">

```json
{
  "EventNotificationSubscription": {
    "EmailDigestLastProcessed": "2020-01-01T00:00:00.000Z",
    "EmailDigestLastProcessedEventAutoId": 0,
    "EmailFrequencyPeriod": "string",
    "EmailPriority": "Normal",
    "EmailShowDatesInTimeZoneId": "string",
    "EmailTeams": [
      "string"
    ],
    "Filter": {
      "DocumentTypes": [
        "string"
      ],
      "Environments": [
        "string"
      ],
      "EventAgents": [
        "string"
      ],
      "EventCategories": [
        "string"
      ],
      "EventGroups": [
        "string"
      ],
      "ProjectGroups": [
        "string"
      ],
      "Projects": [
        "string"
      ],
      "Tags": [
        "string"
      ],
      "Tenants": [
        "string"
      ],
      "Users": [
        "string"
      ]
    },
    "SlackChannelIds": [
      "string"
    ],
    "SlackChannelNames": [
      "string"
    ],
    "SlackDigestLastProcessed": "2020-01-01T00:00:00.000Z",
    "SlackDigestLastProcessedEventAutoId": 0,
    "SlackFrequencyPeriod": "string",
    "WebhookHeaderKey": "string",
    "WebhookHeaderValue": {
      "IsSensitive": true,
      "SensitiveValue": {
        "HasValue": true,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "WebhookLastProcessed": "2020-01-01T00:00:00.000Z",
    "WebhookLastProcessedEventAutoId": 0,
    "WebhookTeams": [
      "string"
    ],
    "WebhookTimeout": "string",
    "WebhookURI": "https://example.com"
  },
  "IsDisabled": true,
  "Name": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`201` — Created

`SubscriptionResource`.

- **`EventNotificationSubscription`** <span class="type-label">object</span>
  - **`EmailDigestLastProcessed`** <span class="type-label">string</span> — Format `date-time`.
  - **`EmailDigestLastProcessedEventAutoId`** <span class="type-label">integer</span>
  - **`EmailFrequencyPeriod`** <span class="type-label">string</span> — Format `date-span`.
  - **`EmailPriority`** <span class="type-label">enum</span> — Allowed values: `Normal`, `Low`, `High`.
  - **`EmailShowDatesInTimeZoneId`** <span class="type-label">string</span>
  - **`EmailTeams`** <span class="type-label">array of string</span>
  - **`Filter`** <span class="type-label">object</span>
  - **`SlackChannelIds`** <span class="type-label">array of string</span>
  - **`SlackChannelNames`** <span class="type-label">array of string</span>
  - **`SlackDigestLastProcessed`** <span class="type-label">string</span> — Format `date-time`.
  - **`SlackDigestLastProcessedEventAutoId`** <span class="type-label">integer</span>
  - **`SlackFrequencyPeriod`** <span class="type-label">string</span> — Format `date-span`.
  - **`WebhookHeaderKey`** <span class="type-label">string</span>
  - **`WebhookHeaderValue`** <span class="type-label">object</span>
  - **`WebhookLastProcessed`** <span class="type-label">string</span> — Format `date-time`.
  - **`WebhookLastProcessedEventAutoId`** <span class="type-label">integer</span>
  - **`WebhookTeams`** <span class="type-label">array of string</span>
  - **`WebhookTimeout`** <span class="type-label">string</span> — Format `date-span`.
  - **`WebhookURI`** <span class="type-label">string</span> — Use a backing field here, so we can ignore empty strings, which the portal sends us. Format `uri`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Type`** <span class="type-label">enum</span> — Allowed values: `Event`.

<div data-example="Response">

```json
{
  "EventNotificationSubscription": {
    "EmailDigestLastProcessed": "2020-01-01T00:00:00.000Z",
    "EmailDigestLastProcessedEventAutoId": 0,
    "EmailFrequencyPeriod": "string",
    "EmailPriority": "Normal",
    "EmailShowDatesInTimeZoneId": "string",
    "EmailTeams": [
      "string"
    ],
    "Filter": {
      "DocumentTypes": [
        "string"
      ],
      "Environments": [
        "string"
      ],
      "EventAgents": [
        "string"
      ],
      "EventCategories": [
        "string"
      ],
      "EventGroups": [
        "string"
      ],
      "ProjectGroups": [
        "string"
      ],
      "Projects": [
        "string"
      ],
      "Tags": [
        "string"
      ],
      "Tenants": [
        "string"
      ],
      "Users": [
        "string"
      ]
    },
    "SlackChannelIds": [
      "string"
    ],
    "SlackChannelNames": [
      "string"
    ],
    "SlackDigestLastProcessed": "2020-01-01T00:00:00.000Z",
    "SlackDigestLastProcessedEventAutoId": 0,
    "SlackFrequencyPeriod": "string",
    "WebhookHeaderKey": "string",
    "WebhookHeaderValue": {
      "IsSensitive": true,
      "SensitiveValue": {
        "HasValue": true,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "WebhookLastProcessed": "2020-01-01T00:00:00.000Z",
    "WebhookLastProcessedEventAutoId": 0,
    "WebhookTeams": [
      "string"
    ],
    "WebhookTimeout": "string",
    "WebhookURI": "https://example.com"
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
  "SpaceId": "string",
  "Type": "Event"
}
```
</div>

## Get all Subscriptions

`GET` `/api/{spaceId}/subscriptions/all`

Also reachable at `/api/spaces/{spaceIdentifier}/subscriptions/all`, `/api/subscriptions/all`.

Lists all the Subscriptions in the supplied Octopus Deploy Space

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource.

**Response**

`200` — All Subscriptions from the requested Space

an array of `SubscriptionResource`.

- **`EventNotificationSubscription`** <span class="type-label">object</span>
  - **`EmailDigestLastProcessed`** <span class="type-label">string</span> — Format `date-time`.
  - **`EmailDigestLastProcessedEventAutoId`** <span class="type-label">integer</span>
  - **`EmailFrequencyPeriod`** <span class="type-label">string</span> — Format `date-span`.
  - **`EmailPriority`** <span class="type-label">enum</span> — Allowed values: `Normal`, `Low`, `High`.
  - **`EmailShowDatesInTimeZoneId`** <span class="type-label">string</span>
  - **`EmailTeams`** <span class="type-label">array of string</span>
  - **`Filter`** <span class="type-label">object</span>
  - **`SlackChannelIds`** <span class="type-label">array of string</span>
  - **`SlackChannelNames`** <span class="type-label">array of string</span>
  - **`SlackDigestLastProcessed`** <span class="type-label">string</span> — Format `date-time`.
  - **`SlackDigestLastProcessedEventAutoId`** <span class="type-label">integer</span>
  - **`SlackFrequencyPeriod`** <span class="type-label">string</span> — Format `date-span`.
  - **`WebhookHeaderKey`** <span class="type-label">string</span>
  - **`WebhookHeaderValue`** <span class="type-label">object</span>
  - **`WebhookLastProcessed`** <span class="type-label">string</span> — Format `date-time`.
  - **`WebhookLastProcessedEventAutoId`** <span class="type-label">integer</span>
  - **`WebhookTeams`** <span class="type-label">array of string</span>
  - **`WebhookTimeout`** <span class="type-label">string</span> — Format `date-span`.
  - **`WebhookURI`** <span class="type-label">string</span> — Use a backing field here, so we can ignore empty strings, which the portal sends us. Format `uri`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Type`** <span class="type-label">enum</span> — Allowed values: `Event`.

<div data-example="Response">

```json
[
  {
    "EventNotificationSubscription": {
      "EmailDigestLastProcessed": "2020-01-01T00:00:00.000Z",
      "EmailDigestLastProcessedEventAutoId": 0,
      "EmailFrequencyPeriod": "string",
      "EmailPriority": "Normal",
      "EmailShowDatesInTimeZoneId": "string",
      "EmailTeams": [
        "string"
      ],
      "Filter": {
        "DocumentTypes": [
          "string"
        ],
        "Environments": [
          "string"
        ],
        "EventAgents": [
          "string"
        ],
        "EventCategories": [
          "string"
        ],
        "EventGroups": [
          "string"
        ],
        "ProjectGroups": [
          "string"
        ],
        "Projects": [
          "string"
        ],
        "Tags": [
          "string"
        ],
        "Tenants": [
          "string"
        ],
        "Users": [
          "string"
        ]
      },
      "SlackChannelIds": [
        "string"
      ],
      "SlackChannelNames": [
        "string"
      ],
      "SlackDigestLastProcessed": "2020-01-01T00:00:00.000Z",
      "SlackDigestLastProcessedEventAutoId": 0,
      "SlackFrequencyPeriod": "string",
      "WebhookHeaderKey": "string",
      "WebhookHeaderValue": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      },
      "WebhookLastProcessed": "2020-01-01T00:00:00.000Z",
      "WebhookLastProcessedEventAutoId": 0,
      "WebhookTeams": [
        "string"
      ],
      "WebhookTimeout": "string",
      "WebhookURI": "https://example.com"
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
    "SpaceId": "string",
    "Type": "Event"
  }
]
```
</div>

## Get a Subscription by ID

`GET` `/api/{spaceId}/subscriptions/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/subscriptions/{id}`, `/api/subscriptions/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Subscription to load.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource.

**Response**

`200` — The requested Subscription

`SubscriptionResource`.

- **`EventNotificationSubscription`** <span class="type-label">object</span>
  - **`EmailDigestLastProcessed`** <span class="type-label">string</span> — Format `date-time`.
  - **`EmailDigestLastProcessedEventAutoId`** <span class="type-label">integer</span>
  - **`EmailFrequencyPeriod`** <span class="type-label">string</span> — Format `date-span`.
  - **`EmailPriority`** <span class="type-label">enum</span> — Allowed values: `Normal`, `Low`, `High`.
  - **`EmailShowDatesInTimeZoneId`** <span class="type-label">string</span>
  - **`EmailTeams`** <span class="type-label">array of string</span>
  - **`Filter`** <span class="type-label">object</span>
  - **`SlackChannelIds`** <span class="type-label">array of string</span>
  - **`SlackChannelNames`** <span class="type-label">array of string</span>
  - **`SlackDigestLastProcessed`** <span class="type-label">string</span> — Format `date-time`.
  - **`SlackDigestLastProcessedEventAutoId`** <span class="type-label">integer</span>
  - **`SlackFrequencyPeriod`** <span class="type-label">string</span> — Format `date-span`.
  - **`WebhookHeaderKey`** <span class="type-label">string</span>
  - **`WebhookHeaderValue`** <span class="type-label">object</span>
  - **`WebhookLastProcessed`** <span class="type-label">string</span> — Format `date-time`.
  - **`WebhookLastProcessedEventAutoId`** <span class="type-label">integer</span>
  - **`WebhookTeams`** <span class="type-label">array of string</span>
  - **`WebhookTimeout`** <span class="type-label">string</span> — Format `date-span`.
  - **`WebhookURI`** <span class="type-label">string</span> — Use a backing field here, so we can ignore empty strings, which the portal sends us. Format `uri`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Type`** <span class="type-label">enum</span> — Allowed values: `Event`.

<div data-example="Response">

```json
{
  "EventNotificationSubscription": {
    "EmailDigestLastProcessed": "2020-01-01T00:00:00.000Z",
    "EmailDigestLastProcessedEventAutoId": 0,
    "EmailFrequencyPeriod": "string",
    "EmailPriority": "Normal",
    "EmailShowDatesInTimeZoneId": "string",
    "EmailTeams": [
      "string"
    ],
    "Filter": {
      "DocumentTypes": [
        "string"
      ],
      "Environments": [
        "string"
      ],
      "EventAgents": [
        "string"
      ],
      "EventCategories": [
        "string"
      ],
      "EventGroups": [
        "string"
      ],
      "ProjectGroups": [
        "string"
      ],
      "Projects": [
        "string"
      ],
      "Tags": [
        "string"
      ],
      "Tenants": [
        "string"
      ],
      "Users": [
        "string"
      ]
    },
    "SlackChannelIds": [
      "string"
    ],
    "SlackChannelNames": [
      "string"
    ],
    "SlackDigestLastProcessed": "2020-01-01T00:00:00.000Z",
    "SlackDigestLastProcessedEventAutoId": 0,
    "SlackFrequencyPeriod": "string",
    "WebhookHeaderKey": "string",
    "WebhookHeaderValue": {
      "IsSensitive": true,
      "SensitiveValue": {
        "HasValue": true,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "WebhookLastProcessed": "2020-01-01T00:00:00.000Z",
    "WebhookLastProcessedEventAutoId": 0,
    "WebhookTeams": [
      "string"
    ],
    "WebhookTimeout": "string",
    "WebhookURI": "https://example.com"
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
  "SpaceId": "string",
  "Type": "Event"
}
```
</div>

## Updates an existing Subscription

`PUT` `/api/{spaceId}/subscriptions/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/subscriptions/{id}`, `/api/subscriptions/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Subscription to modify.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource.

**Request Body**

`ModifySubscriptionCommand`

- **`EventNotificationSubscription`** <span class="type-label">object</span> *(required)*
  - **`EmailDigestLastProcessed`** <span class="type-label">string</span> — Format `date-time`.
  - **`EmailDigestLastProcessedEventAutoId`** <span class="type-label">integer</span>
  - **`EmailFrequencyPeriod`** <span class="type-label">string</span> — Format `date-span`.
  - **`EmailPriority`** <span class="type-label">enum</span> — Allowed values: `Normal`, `Low`, `High`.
  - **`EmailShowDatesInTimeZoneId`** <span class="type-label">string</span>
  - **`EmailTeams`** <span class="type-label">array of string</span>
  - **`Filter`** <span class="type-label">object</span>
  - **`SlackChannelIds`** <span class="type-label">array of string</span>
  - **`SlackChannelNames`** <span class="type-label">array of string</span>
  - **`SlackDigestLastProcessed`** <span class="type-label">string</span> — Format `date-time`.
  - **`SlackDigestLastProcessedEventAutoId`** <span class="type-label">integer</span>
  - **`SlackFrequencyPeriod`** <span class="type-label">string</span> — Format `date-span`.
  - **`WebhookHeaderKey`** <span class="type-label">string</span>
  - **`WebhookHeaderValue`** <span class="type-label">object</span>
  - **`WebhookLastProcessed`** <span class="type-label">string</span> — Format `date-time`.
  - **`WebhookLastProcessedEventAutoId`** <span class="type-label">integer</span>
  - **`WebhookTeams`** <span class="type-label">array of string</span>
  - **`WebhookTimeout`** <span class="type-label">string</span> — Format `date-span`.
  - **`WebhookURI`** <span class="type-label">string</span> — Use a backing field here, so we can ignore empty strings, which the portal sends us. Format `uri`.
- **`Id`** <span class="type-label">string</span> *(required)* — ID of the Subscription to modify.
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource.
- **`Type`** <span class="type-label">enum</span> — Allowed values: `Event`.

<div data-example="Request">

```json
{
  "EventNotificationSubscription": {
    "EmailDigestLastProcessed": "2020-01-01T00:00:00.000Z",
    "EmailDigestLastProcessedEventAutoId": 0,
    "EmailFrequencyPeriod": "string",
    "EmailPriority": "Normal",
    "EmailShowDatesInTimeZoneId": "string",
    "EmailTeams": [
      "string"
    ],
    "Filter": {
      "DocumentTypes": [
        "string"
      ],
      "Environments": [
        "string"
      ],
      "EventAgents": [
        "string"
      ],
      "EventCategories": [
        "string"
      ],
      "EventGroups": [
        "string"
      ],
      "ProjectGroups": [
        "string"
      ],
      "Projects": [
        "string"
      ],
      "Tags": [
        "string"
      ],
      "Tenants": [
        "string"
      ],
      "Users": [
        "string"
      ]
    },
    "SlackChannelIds": [
      "string"
    ],
    "SlackChannelNames": [
      "string"
    ],
    "SlackDigestLastProcessed": "2020-01-01T00:00:00.000Z",
    "SlackDigestLastProcessedEventAutoId": 0,
    "SlackFrequencyPeriod": "string",
    "WebhookHeaderKey": "string",
    "WebhookHeaderValue": {
      "IsSensitive": true,
      "SensitiveValue": {
        "HasValue": true,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "WebhookLastProcessed": "2020-01-01T00:00:00.000Z",
    "WebhookLastProcessedEventAutoId": 0,
    "WebhookTeams": [
      "string"
    ],
    "WebhookTimeout": "string",
    "WebhookURI": "https://example.com"
  },
  "Id": "string",
  "IsDisabled": true,
  "Name": "string",
  "SpaceId": "string",
  "Type": "Event"
}
```
</div>

**Response**

`200` — The updated Subscription

`SubscriptionResource`.

- **`EventNotificationSubscription`** <span class="type-label">object</span>
  - **`EmailDigestLastProcessed`** <span class="type-label">string</span> — Format `date-time`.
  - **`EmailDigestLastProcessedEventAutoId`** <span class="type-label">integer</span>
  - **`EmailFrequencyPeriod`** <span class="type-label">string</span> — Format `date-span`.
  - **`EmailPriority`** <span class="type-label">enum</span> — Allowed values: `Normal`, `Low`, `High`.
  - **`EmailShowDatesInTimeZoneId`** <span class="type-label">string</span>
  - **`EmailTeams`** <span class="type-label">array of string</span>
  - **`Filter`** <span class="type-label">object</span>
  - **`SlackChannelIds`** <span class="type-label">array of string</span>
  - **`SlackChannelNames`** <span class="type-label">array of string</span>
  - **`SlackDigestLastProcessed`** <span class="type-label">string</span> — Format `date-time`.
  - **`SlackDigestLastProcessedEventAutoId`** <span class="type-label">integer</span>
  - **`SlackFrequencyPeriod`** <span class="type-label">string</span> — Format `date-span`.
  - **`WebhookHeaderKey`** <span class="type-label">string</span>
  - **`WebhookHeaderValue`** <span class="type-label">object</span>
  - **`WebhookLastProcessed`** <span class="type-label">string</span> — Format `date-time`.
  - **`WebhookLastProcessedEventAutoId`** <span class="type-label">integer</span>
  - **`WebhookTeams`** <span class="type-label">array of string</span>
  - **`WebhookTimeout`** <span class="type-label">string</span> — Format `date-span`.
  - **`WebhookURI`** <span class="type-label">string</span> — Use a backing field here, so we can ignore empty strings, which the portal sends us. Format `uri`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Type`** <span class="type-label">enum</span> — Allowed values: `Event`.

<div data-example="Response">

```json
{
  "EventNotificationSubscription": {
    "EmailDigestLastProcessed": "2020-01-01T00:00:00.000Z",
    "EmailDigestLastProcessedEventAutoId": 0,
    "EmailFrequencyPeriod": "string",
    "EmailPriority": "Normal",
    "EmailShowDatesInTimeZoneId": "string",
    "EmailTeams": [
      "string"
    ],
    "Filter": {
      "DocumentTypes": [
        "string"
      ],
      "Environments": [
        "string"
      ],
      "EventAgents": [
        "string"
      ],
      "EventCategories": [
        "string"
      ],
      "EventGroups": [
        "string"
      ],
      "ProjectGroups": [
        "string"
      ],
      "Projects": [
        "string"
      ],
      "Tags": [
        "string"
      ],
      "Tenants": [
        "string"
      ],
      "Users": [
        "string"
      ]
    },
    "SlackChannelIds": [
      "string"
    ],
    "SlackChannelNames": [
      "string"
    ],
    "SlackDigestLastProcessed": "2020-01-01T00:00:00.000Z",
    "SlackDigestLastProcessedEventAutoId": 0,
    "SlackFrequencyPeriod": "string",
    "WebhookHeaderKey": "string",
    "WebhookHeaderValue": {
      "IsSensitive": true,
      "SensitiveValue": {
        "HasValue": true,
        "Hint": "string",
        "NewValue": "string"
      },
      "Value": "string"
    },
    "WebhookLastProcessed": "2020-01-01T00:00:00.000Z",
    "WebhookLastProcessedEventAutoId": 0,
    "WebhookTeams": [
      "string"
    ],
    "WebhookTimeout": "string",
    "WebhookURI": "https://example.com"
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
  "SpaceId": "string",
  "Type": "Event"
}
```
</div>

## Deletes an existing Subscription

`DELETE` `/api/{spaceId}/subscriptions/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/subscriptions/{id}`, `/api/subscriptions/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Subscription to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource.

**Response**

`200` — Confirmation that the Subscription was deleted

`DeleteSubscriptionResponse`.

<div data-example="Response">

```json
{}
```
</div>
