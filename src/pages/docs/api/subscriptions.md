---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Subscriptions
---

## Get a list of Subscriptions

:span[GET]{.api-get} `/api/{spaceId}/subscriptions`

Also reachable at `/api/spaces/{spaceIdentifier}/subscriptions`, `/api/subscriptions`.

Lists all of the Subscriptions in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource.

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}
- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested Subscriptions

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`EventNotificationSubscription`** :span[object]{.type-label}
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
  - **`SpaceId`** :span[string]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `Event`.
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
:::

## Create a new Subscription

:span[POST]{.api-post} `/api/{spaceId}/subscriptions`

Also reachable at `/api/spaces/{spaceIdentifier}/subscriptions`, `/api/subscriptions`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource.

**Request Body**

- **`EventNotificationSubscription`** :span[object]{.type-label} *(required)*
  - **`EmailDigestLastProcessed`** :span[string]{.type-label}  
    Format `date-time`.
  - **`EmailDigestLastProcessedEventAutoId`** :span[integer]{.type-label}
  - **`EmailFrequencyPeriod`** :span[string]{.type-label}  
    Format `date-span`.
  - **`EmailPriority`** :span[enum]{.type-label}  
    Allowed values: `Normal`, `Low`, `High`.
  - **`EmailShowDatesInTimeZoneId`** :span[string]{.type-label}
  - **`EmailTeams`** :span[array of string]{.type-label}
  - **`Filter`** :span[object]{.type-label}
  - **`SlackChannelIds`** :span[array of string]{.type-label}
  - **`SlackChannelNames`** :span[array of string]{.type-label}
  - **`SlackDigestLastProcessed`** :span[string]{.type-label}  
    Format `date-time`.
  - **`SlackDigestLastProcessedEventAutoId`** :span[integer]{.type-label}
  - **`SlackFrequencyPeriod`** :span[string]{.type-label}  
    Format `date-span`.
  - **`WebhookHeaderKey`** :span[string]{.type-label}
  - **`WebhookHeaderValue`** :span[object]{.type-label}
  - **`WebhookLastProcessed`** :span[string]{.type-label}  
    Format `date-time`.
  - **`WebhookLastProcessedEventAutoId`** :span[integer]{.type-label}
  - **`WebhookTeams`** :span[array of string]{.type-label}
  - **`WebhookTimeout`** :span[string]{.type-label}  
    Format `date-span`.
  - **`WebhookURI`** :span[string]{.type-label}  
    Use a backing field here, so we can ignore empty strings, which the portal sends us. Format `uri`.
- **`IsDisabled`** :span[boolean]{.type-label}
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource.

:::api-example{label="Request"}
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
:::

**Response**

`201` — Created

- **`EventNotificationSubscription`** :span[object]{.type-label}
  - **`EmailDigestLastProcessed`** :span[string]{.type-label}  
    Format `date-time`.
  - **`EmailDigestLastProcessedEventAutoId`** :span[integer]{.type-label}
  - **`EmailFrequencyPeriod`** :span[string]{.type-label}  
    Format `date-span`.
  - **`EmailPriority`** :span[enum]{.type-label}  
    Allowed values: `Normal`, `Low`, `High`.
  - **`EmailShowDatesInTimeZoneId`** :span[string]{.type-label}
  - **`EmailTeams`** :span[array of string]{.type-label}
  - **`Filter`** :span[object]{.type-label}
  - **`SlackChannelIds`** :span[array of string]{.type-label}
  - **`SlackChannelNames`** :span[array of string]{.type-label}
  - **`SlackDigestLastProcessed`** :span[string]{.type-label}  
    Format `date-time`.
  - **`SlackDigestLastProcessedEventAutoId`** :span[integer]{.type-label}
  - **`SlackFrequencyPeriod`** :span[string]{.type-label}  
    Format `date-span`.
  - **`WebhookHeaderKey`** :span[string]{.type-label}
  - **`WebhookHeaderValue`** :span[object]{.type-label}
  - **`WebhookLastProcessed`** :span[string]{.type-label}  
    Format `date-time`.
  - **`WebhookLastProcessedEventAutoId`** :span[integer]{.type-label}
  - **`WebhookTeams`** :span[array of string]{.type-label}
  - **`WebhookTimeout`** :span[string]{.type-label}  
    Format `date-span`.
  - **`WebhookURI`** :span[string]{.type-label}  
    Use a backing field here, so we can ignore empty strings, which the portal sends us. Format `uri`.
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
- **`SpaceId`** :span[string]{.type-label}
- **`Type`** :span[enum]{.type-label}  
  Allowed values: `Event`.

:::api-example{label="Response"}
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
:::

## Get all Subscriptions

:span[GET]{.api-get} `/api/{spaceId}/subscriptions/all`

Also reachable at `/api/spaces/{spaceIdentifier}/subscriptions/all`, `/api/subscriptions/all`.

Lists all the Subscriptions in the supplied Octopus Deploy Space

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource.

**Response**

`200` — All Subscriptions from the requested Space

- **`EventNotificationSubscription`** :span[object]{.type-label}
  - **`EmailDigestLastProcessed`** :span[string]{.type-label}  
    Format `date-time`.
  - **`EmailDigestLastProcessedEventAutoId`** :span[integer]{.type-label}
  - **`EmailFrequencyPeriod`** :span[string]{.type-label}  
    Format `date-span`.
  - **`EmailPriority`** :span[enum]{.type-label}  
    Allowed values: `Normal`, `Low`, `High`.
  - **`EmailShowDatesInTimeZoneId`** :span[string]{.type-label}
  - **`EmailTeams`** :span[array of string]{.type-label}
  - **`Filter`** :span[object]{.type-label}
  - **`SlackChannelIds`** :span[array of string]{.type-label}
  - **`SlackChannelNames`** :span[array of string]{.type-label}
  - **`SlackDigestLastProcessed`** :span[string]{.type-label}  
    Format `date-time`.
  - **`SlackDigestLastProcessedEventAutoId`** :span[integer]{.type-label}
  - **`SlackFrequencyPeriod`** :span[string]{.type-label}  
    Format `date-span`.
  - **`WebhookHeaderKey`** :span[string]{.type-label}
  - **`WebhookHeaderValue`** :span[object]{.type-label}
  - **`WebhookLastProcessed`** :span[string]{.type-label}  
    Format `date-time`.
  - **`WebhookLastProcessedEventAutoId`** :span[integer]{.type-label}
  - **`WebhookTeams`** :span[array of string]{.type-label}
  - **`WebhookTimeout`** :span[string]{.type-label}  
    Format `date-span`.
  - **`WebhookURI`** :span[string]{.type-label}  
    Use a backing field here, so we can ignore empty strings, which the portal sends us. Format `uri`.
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
- **`SpaceId`** :span[string]{.type-label}
- **`Type`** :span[enum]{.type-label}  
  Allowed values: `Event`.

:::api-example{label="Response"}
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
:::

## Get a Subscription by ID

:span[GET]{.api-get} `/api/{spaceId}/subscriptions/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/subscriptions/{id}`, `/api/subscriptions/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Subscription to load.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource.

**Response**

`200` — The requested Subscription

- **`EventNotificationSubscription`** :span[object]{.type-label}
  - **`EmailDigestLastProcessed`** :span[string]{.type-label}  
    Format `date-time`.
  - **`EmailDigestLastProcessedEventAutoId`** :span[integer]{.type-label}
  - **`EmailFrequencyPeriod`** :span[string]{.type-label}  
    Format `date-span`.
  - **`EmailPriority`** :span[enum]{.type-label}  
    Allowed values: `Normal`, `Low`, `High`.
  - **`EmailShowDatesInTimeZoneId`** :span[string]{.type-label}
  - **`EmailTeams`** :span[array of string]{.type-label}
  - **`Filter`** :span[object]{.type-label}
  - **`SlackChannelIds`** :span[array of string]{.type-label}
  - **`SlackChannelNames`** :span[array of string]{.type-label}
  - **`SlackDigestLastProcessed`** :span[string]{.type-label}  
    Format `date-time`.
  - **`SlackDigestLastProcessedEventAutoId`** :span[integer]{.type-label}
  - **`SlackFrequencyPeriod`** :span[string]{.type-label}  
    Format `date-span`.
  - **`WebhookHeaderKey`** :span[string]{.type-label}
  - **`WebhookHeaderValue`** :span[object]{.type-label}
  - **`WebhookLastProcessed`** :span[string]{.type-label}  
    Format `date-time`.
  - **`WebhookLastProcessedEventAutoId`** :span[integer]{.type-label}
  - **`WebhookTeams`** :span[array of string]{.type-label}
  - **`WebhookTimeout`** :span[string]{.type-label}  
    Format `date-span`.
  - **`WebhookURI`** :span[string]{.type-label}  
    Use a backing field here, so we can ignore empty strings, which the portal sends us. Format `uri`.
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
- **`SpaceId`** :span[string]{.type-label}
- **`Type`** :span[enum]{.type-label}  
  Allowed values: `Event`.

:::api-example{label="Response"}
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
:::

## Update an existing Subscription

:span[PUT]{.api-put} `/api/{spaceId}/subscriptions/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/subscriptions/{id}`, `/api/subscriptions/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Subscription to modify.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource.

**Request Body**

- **`EventNotificationSubscription`** :span[object]{.type-label} *(required)*
  - **`EmailDigestLastProcessed`** :span[string]{.type-label}  
    Format `date-time`.
  - **`EmailDigestLastProcessedEventAutoId`** :span[integer]{.type-label}
  - **`EmailFrequencyPeriod`** :span[string]{.type-label}  
    Format `date-span`.
  - **`EmailPriority`** :span[enum]{.type-label}  
    Allowed values: `Normal`, `Low`, `High`.
  - **`EmailShowDatesInTimeZoneId`** :span[string]{.type-label}
  - **`EmailTeams`** :span[array of string]{.type-label}
  - **`Filter`** :span[object]{.type-label}
  - **`SlackChannelIds`** :span[array of string]{.type-label}
  - **`SlackChannelNames`** :span[array of string]{.type-label}
  - **`SlackDigestLastProcessed`** :span[string]{.type-label}  
    Format `date-time`.
  - **`SlackDigestLastProcessedEventAutoId`** :span[integer]{.type-label}
  - **`SlackFrequencyPeriod`** :span[string]{.type-label}  
    Format `date-span`.
  - **`WebhookHeaderKey`** :span[string]{.type-label}
  - **`WebhookHeaderValue`** :span[object]{.type-label}
  - **`WebhookLastProcessed`** :span[string]{.type-label}  
    Format `date-time`.
  - **`WebhookLastProcessedEventAutoId`** :span[integer]{.type-label}
  - **`WebhookTeams`** :span[array of string]{.type-label}
  - **`WebhookTimeout`** :span[string]{.type-label}  
    Format `date-span`.
  - **`WebhookURI`** :span[string]{.type-label}  
    Use a backing field here, so we can ignore empty strings, which the portal sends us. Format `uri`.
- **`Id`** :span[string]{.type-label} *(required)*  
  ID of the Subscription to modify.
- **`IsDisabled`** :span[boolean]{.type-label}
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource.
- **`Type`** :span[enum]{.type-label}  
  Allowed values: `Event`.

:::api-example{label="Request"}
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
:::

**Response**

`200` — The updated Subscription

- **`EventNotificationSubscription`** :span[object]{.type-label}
  - **`EmailDigestLastProcessed`** :span[string]{.type-label}  
    Format `date-time`.
  - **`EmailDigestLastProcessedEventAutoId`** :span[integer]{.type-label}
  - **`EmailFrequencyPeriod`** :span[string]{.type-label}  
    Format `date-span`.
  - **`EmailPriority`** :span[enum]{.type-label}  
    Allowed values: `Normal`, `Low`, `High`.
  - **`EmailShowDatesInTimeZoneId`** :span[string]{.type-label}
  - **`EmailTeams`** :span[array of string]{.type-label}
  - **`Filter`** :span[object]{.type-label}
  - **`SlackChannelIds`** :span[array of string]{.type-label}
  - **`SlackChannelNames`** :span[array of string]{.type-label}
  - **`SlackDigestLastProcessed`** :span[string]{.type-label}  
    Format `date-time`.
  - **`SlackDigestLastProcessedEventAutoId`** :span[integer]{.type-label}
  - **`SlackFrequencyPeriod`** :span[string]{.type-label}  
    Format `date-span`.
  - **`WebhookHeaderKey`** :span[string]{.type-label}
  - **`WebhookHeaderValue`** :span[object]{.type-label}
  - **`WebhookLastProcessed`** :span[string]{.type-label}  
    Format `date-time`.
  - **`WebhookLastProcessedEventAutoId`** :span[integer]{.type-label}
  - **`WebhookTeams`** :span[array of string]{.type-label}
  - **`WebhookTimeout`** :span[string]{.type-label}  
    Format `date-span`.
  - **`WebhookURI`** :span[string]{.type-label}  
    Use a backing field here, so we can ignore empty strings, which the portal sends us. Format `uri`.
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
- **`SpaceId`** :span[string]{.type-label}
- **`Type`** :span[enum]{.type-label}  
  Allowed values: `Event`.

:::api-example{label="Response"}
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
:::

## Delete an existing Subscription

:span[DELETE]{.api-delete} `/api/{spaceId}/subscriptions/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/subscriptions/{id}`, `/api/subscriptions/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Subscription to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource.

**Response**

`200` — Confirmation that the Subscription was deleted

:::api-example{label="Response"}
```json
{}
```
:::
