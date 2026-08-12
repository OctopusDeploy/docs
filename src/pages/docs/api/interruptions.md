---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Interruptions
---

## Lists interruptions for user attention. The results will be sorted by date from most recently to least recently created

`GET` `/api/{spaceId}/interruptions`

Also reachable at `/api/interruptions`, `/api/spaces/{spaceIdentifier}/interruptions`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`ids`** <span class="type-label">array of string</span> — List of specific interruption IDs to load.
- **`pendingOnly`** <span class="type-label">boolean</span> — If true, lists only pending interruptions.
- **`regarding`** <span class="type-label">string</span> — Lists interruptions related to a specific other document, specified by its ID (e.g. a ServerTasks-*, Projects-* or Environments-* ID).
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Holds a list of interruptions returned in response to ListInterruptionsRequest

`InterruptionResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`CanTakeResponsibility`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the current user has permissions to take responsibility for this interruption.
  - **`CorrelationId`** <span class="type-label">string</span> — Gets or sets the correlation ID of the activity in which the interruption was requested, if any.
  - **`Created`** <span class="type-label">string</span> — Gets the time at which the interruption was created. Format `date-time`.
  - **`Form`** <span class="type-label">object</span>
  - **`HasResponsibility`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the current user has responsibility for this interruption.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsLinkedToOtherInterruption`** <span class="type-label">boolean</span> — If this interruption is linked to another it will be automatically completed when the other one is. Used to handle interruptions in child deployments.
  - **`IsPending`** <span class="type-label">boolean</span> — True if the interruption is waiting for user action; otherwise, false.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`PullRequests`** <span class="type-label">array of object</span> — Gets or sets a list of pull requests associated with this interruption. This will only be populated when Type is PullRequestCompletion.
  - **`RelatedDocumentIds`** <span class="type-label">array of string</span> — Gets the ids of documents related to this interruption.
  - **`ResponsibleTeamIds`** <span class="type-label">array of string</span> — Gets the ids of groups that can take responsibility for this interruption.
  - **`ResponsibleUserId`** <span class="type-label">string</span> — Gets or sets the.
  - **`SpaceId`** <span class="type-label">string</span>
  - **`TaskId`** <span class="type-label">string</span> — Gets or sets the id of the Server Task raising the interruption.
  - **`Title`** <span class="type-label">string</span> — Gets or sets a title for this interruption.
  - **`Type`** <span class="type-label">enum</span> — Gets or sets the type of interruption. Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
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
      "CanTakeResponsibility": true,
      "CorrelationId": "string",
      "Created": "2020-01-01T00:00:00.000Z",
      "Form": {
        "Elements": [
          {}
        ],
        "Values": {}
      },
      "HasResponsibility": true,
      "Id": "string",
      "IsLinkedToOtherInterruption": true,
      "IsPending": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "PullRequests": [
        {}
      ],
      "RelatedDocumentIds": [
        "string"
      ],
      "ResponsibleTeamIds": [
        "string"
      ],
      "ResponsibleUserId": "string",
      "SpaceId": "string",
      "TaskId": "string",
      "Title": "string",
      "Type": "ManualIntervention"
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

## Get an Interruption by ID

`GET` `/api/{spaceId}/interruptions/{id}`

Also reachable at `/api/interruptions/{id}`, `/api/spaces/{spaceIdentifier}/interruptions/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Interruption to load.
- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the Space.

**Response**

`200` — The requested Interruption

`InterruptionResource`.

- **`CanTakeResponsibility`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the current user has permissions to take responsibility for this interruption.
- **`CorrelationId`** <span class="type-label">string</span> — Gets or sets the correlation ID of the activity in which the interruption was requested, if any.
- **`Created`** <span class="type-label">string</span> — Gets the time at which the interruption was created. Format `date-time`.
- **`Form`** <span class="type-label">object</span>
  - **`Elements`** <span class="type-label">array of object</span> — Elements of the form.
  - **`Values`** <span class="type-label">object</span> — Values supplied for the form elements.
- **`HasResponsibility`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the current user has responsibility for this interruption.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsLinkedToOtherInterruption`** <span class="type-label">boolean</span> — If this interruption is linked to another it will be automatically completed when the other one is. Used to handle interruptions in child deployments.
- **`IsPending`** <span class="type-label">boolean</span> — True if the interruption is waiting for user action; otherwise, false.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`PullRequests`** <span class="type-label">array of object</span> — Gets or sets a list of pull requests associated with this interruption. This will only be populated when Type is PullRequestCompletion.
  - **`Id`** <span class="type-label">string</span>
  - **`InterruptionId`** <span class="type-label">string</span>
  - **`Number`** <span class="type-label">integer</span>
  - **`RepositoryUrl`** <span class="type-label">string</span>
  - **`Status`** <span class="type-label">enum</span> — Allowed values: `Unknown`, `Open`, `Merged`, `Closed`, `UnknownGitVendor`.
  - **`Title`** <span class="type-label">string</span>
  - **`Url`** <span class="type-label">string</span>
- **`RelatedDocumentIds`** <span class="type-label">array of string</span> — Gets the ids of documents related to this interruption.
- **`ResponsibleTeamIds`** <span class="type-label">array of string</span> — Gets the ids of groups that can take responsibility for this interruption.
- **`ResponsibleUserId`** <span class="type-label">string</span> — Gets or sets the.
- **`SpaceId`** <span class="type-label">string</span>
- **`TaskId`** <span class="type-label">string</span> — Gets or sets the id of the Server Task raising the interruption.
- **`Title`** <span class="type-label">string</span> — Gets or sets a title for this interruption.
- **`Type`** <span class="type-label">enum</span> — Gets or sets the type of interruption. Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.

<div data-example="Response">

```json
{
  "CanTakeResponsibility": true,
  "CorrelationId": "string",
  "Created": "2020-01-01T00:00:00.000Z",
  "Form": {
    "Elements": [
      {
        "Control": {},
        "IsValueRequired": true,
        "Name": "string"
      }
    ],
    "Values": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "HasResponsibility": true,
  "Id": "string",
  "IsLinkedToOtherInterruption": true,
  "IsPending": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "PullRequests": [
    {
      "Id": "string",
      "InterruptionId": "string",
      "Number": 0,
      "RepositoryUrl": "string",
      "Status": "Unknown",
      "Title": "string",
      "Url": "string"
    }
  ],
  "RelatedDocumentIds": [
    "string"
  ],
  "ResponsibleTeamIds": [
    "string"
  ],
  "ResponsibleUserId": "string",
  "SpaceId": "string",
  "TaskId": "string",
  "Title": "string",
  "Type": "ManualIntervention"
}
```
</div>

## Gets the User that is currently responsible for this Interruption (if any)

`GET` `/api/{spaceId}/interruptions/{id}/responsible`

Also reachable at `/api/interruptions/{id}/responsible`, `/api/spaces/{spaceIdentifier}/interruptions/{id}/responsible`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Interruption.
- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the Space.

**Response**

`200` — OK

## Allows the current user to take responsibility for this interruption. Only users in one of the responsible teams on this interruption can take responsibility for it

`PUT` `/api/{spaceId}/interruptions/{id}/responsible`

Also reachable at `/api/interruptions/{id}/responsible`, `/api/spaces/{spaceIdentifier}/interruptions/{id}/responsible`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Interruption.
- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the Space.

**Response**

`200` — The User responsible for the requested Interruption

`UserResource`.

- **`CanPasswordBeEdited`** <span class="type-label">boolean</span>
- **`Created`** <span class="type-label">string</span> — Format `date-time`.
- **`DisplayName`** <span class="type-label">string</span> — Maximum length 64.
- **`EmailAddress`** <span class="type-label">string</span> — Format `email`. Maximum length 256.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`Identities`** <span class="type-label">array of object</span>
  - **`Claims`** <span class="type-label">object</span>
  - **`IdentityProviderName`** <span class="type-label">string</span>
- **`IsActive`** <span class="type-label">boolean</span>
- **`IsRequestor`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether this user resource represents the user who requested it.
- **`IsService`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Password`** <span class="type-label">string</span>
- **`ServiceAccountType`** <span class="type-label">enum</span> — Allowed values: `Standard`, `Agent`.
- **`Username`** <span class="type-label">string</span> — Maximum length 64.

<div data-example="Response">

```json
{
  "CanPasswordBeEdited": true,
  "Created": "2020-01-01T00:00:00.000Z",
  "DisplayName": "string",
  "EmailAddress": "user@example.com",
  "Id": "string",
  "Identities": [
    {
      "Claims": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "IdentityProviderName": "string"
    }
  ],
  "IsActive": true,
  "IsRequestor": true,
  "IsService": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Password": "string",
  "ServiceAccountType": "Standard",
  "Username": "string"
}
```
</div>

## Submits a dictionary of form values for the interruption. Only the user with responsibility for this interruption can submit this form

`POST` `/api/{spaceId}/interruptions/{id}/submit`

Also reachable at `/api/interruptions/{id}/submit`, `/api/spaces/{spaceIdentifier}/interruptions/{id}/submit`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Interruption.
- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the Space.

**Request Body**

`SubmitInterruptionCommand`

- **`Guidance`** <span class="type-label">string</span> — Used for Guided Failure Interruptions. Should be one of "Fail", "Retry", "Ignore" or "Exclude".
- **`Id`** <span class="type-label">string</span> *(required)* — ID of the Interruption. Minimum length 1.
- **`Instructions`** <span class="type-label">string</span> — Optional free-text instructions recorded with the submission.
- **`Notes`** <span class="type-label">string</span> — Optional notes recorded with the submission and included in the audit log entry.
- **`Result`** <span class="type-label">string</span> — Used for Manual Intervention Interruptions. Should be one of "Proceed" or "Abort".
- **`SpaceId`** <span class="type-label">string</span> *(required)* — ID of the Space.

<div data-example="Request">

```json
{
  "Guidance": "string",
  "Id": "string",
  "Instructions": "string",
  "Notes": "string",
  "Result": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — Confirms that the Interruption has been submitted successfully, containing the updated Interruption

`InterruptionResource`.

- **`CanTakeResponsibility`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the current user has permissions to take responsibility for this interruption.
- **`CorrelationId`** <span class="type-label">string</span> — Gets or sets the correlation ID of the activity in which the interruption was requested, if any.
- **`Created`** <span class="type-label">string</span> — Gets the time at which the interruption was created. Format `date-time`.
- **`Form`** <span class="type-label">object</span>
  - **`Elements`** <span class="type-label">array of object</span> — Elements of the form.
  - **`Values`** <span class="type-label">object</span> — Values supplied for the form elements.
- **`HasResponsibility`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the current user has responsibility for this interruption.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsLinkedToOtherInterruption`** <span class="type-label">boolean</span> — If this interruption is linked to another it will be automatically completed when the other one is. Used to handle interruptions in child deployments.
- **`IsPending`** <span class="type-label">boolean</span> — True if the interruption is waiting for user action; otherwise, false.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`PullRequests`** <span class="type-label">array of object</span> — Gets or sets a list of pull requests associated with this interruption. This will only be populated when Type is PullRequestCompletion.
  - **`Id`** <span class="type-label">string</span>
  - **`InterruptionId`** <span class="type-label">string</span>
  - **`Number`** <span class="type-label">integer</span>
  - **`RepositoryUrl`** <span class="type-label">string</span>
  - **`Status`** <span class="type-label">enum</span> — Allowed values: `Unknown`, `Open`, `Merged`, `Closed`, `UnknownGitVendor`.
  - **`Title`** <span class="type-label">string</span>
  - **`Url`** <span class="type-label">string</span>
- **`RelatedDocumentIds`** <span class="type-label">array of string</span> — Gets the ids of documents related to this interruption.
- **`ResponsibleTeamIds`** <span class="type-label">array of string</span> — Gets the ids of groups that can take responsibility for this interruption.
- **`ResponsibleUserId`** <span class="type-label">string</span> — Gets or sets the.
- **`SpaceId`** <span class="type-label">string</span>
- **`TaskId`** <span class="type-label">string</span> — Gets or sets the id of the Server Task raising the interruption.
- **`Title`** <span class="type-label">string</span> — Gets or sets a title for this interruption.
- **`Type`** <span class="type-label">enum</span> — Gets or sets the type of interruption. Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.

<div data-example="Response">

```json
{
  "CanTakeResponsibility": true,
  "CorrelationId": "string",
  "Created": "2020-01-01T00:00:00.000Z",
  "Form": {
    "Elements": [
      {
        "Control": {},
        "IsValueRequired": true,
        "Name": "string"
      }
    ],
    "Values": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "HasResponsibility": true,
  "Id": "string",
  "IsLinkedToOtherInterruption": true,
  "IsPending": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "PullRequests": [
    {
      "Id": "string",
      "InterruptionId": "string",
      "Number": 0,
      "RepositoryUrl": "string",
      "Status": "Unknown",
      "Title": "string",
      "Url": "string"
    }
  ],
  "RelatedDocumentIds": [
    "string"
  ],
  "ResponsibleTeamIds": [
    "string"
  ],
  "ResponsibleUserId": "string",
  "SpaceId": "string",
  "TaskId": "string",
  "Title": "string",
  "Type": "ManualIntervention"
}
```
</div>
