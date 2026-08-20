---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Interruptions
---

## List interruptions for user attention. The results will be sorted by date from most recently to least recently created

:endpoint{method="GET" path="/api/\{spaceId\}/interruptions"}

Also reachable at `/api/interruptions`, `/api/spaces/{spaceIdentifier}/interruptions`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  List of specific interruption IDs to load.
- **`pendingOnly`** :span[boolean]{.type-label}  
  If true, lists only pending interruptions.
- **`regarding`** :span[string]{.type-label}  
  Lists interruptions related to a specific other document, specified by its ID (e.g. a ServerTasks-*, Projects-* or Environments-* ID).
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Holds a list of interruptions returned in response to ListInterruptionsRequest

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`CanTakeResponsibility`** :span[boolean]{.type-label}  
    Gets or sets a value indicating whether the current user has permissions to take responsibility for this interruption.
  - **`CorrelationId`** :span[string]{.type-label}  
    Gets or sets the correlation ID of the activity in which the interruption was requested, if any.
  - **`Created`** :span[string]{.type-label}  
    Gets the time at which the interruption was created. Format `date-time`.
  - **`Form`** :span[object]{.type-label}
  - **`HasResponsibility`** :span[boolean]{.type-label}  
    Gets or sets a value indicating whether the current user has responsibility for this interruption.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsLinkedToOtherInterruption`** :span[boolean]{.type-label}  
    If this interruption is linked to another it will be automatically completed when the other one is. Used to handle interruptions in child deployments.
  - **`IsPending`** :span[boolean]{.type-label}  
    True if the interruption is waiting for user action; otherwise, false.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`PullRequests`** :span[array of object]{.type-label}  
    Gets or sets a list of pull requests associated with this interruption. This will only be populated when Type is PullRequestCompletion.
  - **`RelatedDocumentIds`** :span[array of string]{.type-label}  
    Gets the ids of documents related to this interruption.
  - **`ResponsibleTeamIds`** :span[array of string]{.type-label}  
    Gets the ids of groups that can take responsibility for this interruption.
  - **`ResponsibleUserId`** :span[string]{.type-label}  
    Gets or sets the.
  - **`SpaceId`** :span[string]{.type-label}
  - **`TaskId`** :span[string]{.type-label}  
    Gets or sets the id of the Server Task raising the interruption.
  - **`Title`** :span[string]{.type-label}  
    Gets or sets a title for this interruption.
  - **`Type`** :span[enum]{.type-label}  
    Gets or sets the type of interruption.  
    Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
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
      "SpaceId": "Spaces-1",
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
:::

## Get an Interruption by ID

:endpoint{method="GET" path="/api/\{spaceId\}/interruptions/\{id\}"}

Also reachable at `/api/interruptions/{id}`, `/api/spaces/{spaceIdentifier}/interruptions/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Interruption to load.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the Space.

**Response**

`200` — The requested Interruption

- **`CanTakeResponsibility`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether the current user has permissions to take responsibility for this interruption.
- **`CorrelationId`** :span[string]{.type-label}  
  Gets or sets the correlation ID of the activity in which the interruption was requested, if any.
- **`Created`** :span[string]{.type-label}  
  Gets the time at which the interruption was created. Format `date-time`.
- **`Form`** :span[object]{.type-label}
  - **`Elements`** :span[array of object]{.type-label}  
    Elements of the form.
  - **`Values`** :span[object]{.type-label}  
    Values supplied for the form elements.
- **`HasResponsibility`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether the current user has responsibility for this interruption.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsLinkedToOtherInterruption`** :span[boolean]{.type-label}  
  If this interruption is linked to another it will be automatically completed when the other one is. Used to handle interruptions in child deployments.
- **`IsPending`** :span[boolean]{.type-label}  
  True if the interruption is waiting for user action; otherwise, false.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`PullRequests`** :span[array of object]{.type-label}  
  Gets or sets a list of pull requests associated with this interruption. This will only be populated when Type is PullRequestCompletion.
  - **`Id`** :span[string]{.type-label}
  - **`InterruptionId`** :span[string]{.type-label}
  - **`Number`** :span[integer]{.type-label}
  - **`RepositoryUrl`** :span[string]{.type-label}
  - **`Status`** :span[enum]{.type-label}  
    Allowed values: `Unknown`, `Open`, `Merged`, `Closed`, `UnknownGitVendor`.
  - **`Title`** :span[string]{.type-label}
  - **`Url`** :span[string]{.type-label}
- **`RelatedDocumentIds`** :span[array of string]{.type-label}  
  Gets the ids of documents related to this interruption.
- **`ResponsibleTeamIds`** :span[array of string]{.type-label}  
  Gets the ids of groups that can take responsibility for this interruption.
- **`ResponsibleUserId`** :span[string]{.type-label}  
  Gets or sets the.
- **`SpaceId`** :span[string]{.type-label}
- **`TaskId`** :span[string]{.type-label}  
  Gets or sets the id of the Server Task raising the interruption.
- **`Title`** :span[string]{.type-label}  
  Gets or sets a title for this interruption.
- **`Type`** :span[enum]{.type-label}  
  Gets or sets the type of interruption.  
  Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.

:::api-example{label="Response"}
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
      "Id": "InterruptionPullRequests-1",
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
  "SpaceId": "Spaces-1",
  "TaskId": "string",
  "Title": "string",
  "Type": "ManualIntervention"
}
```
:::

## Get the User that is currently responsible for this Interruption (if any)

:endpoint{method="GET" path="/api/\{spaceId\}/interruptions/\{id\}/responsible"}

Also reachable at `/api/interruptions/{id}/responsible`, `/api/spaces/{spaceIdentifier}/interruptions/{id}/responsible`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Interruption.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the Space.

**Response**

`200` — OK

## Allow the current user to take responsibility for this interruption. Only users in one of the responsible teams on this interruption can take responsibility for it

:endpoint{method="PUT" path="/api/\{spaceId\}/interruptions/\{id\}/responsible"}

Also reachable at `/api/interruptions/{id}/responsible`, `/api/spaces/{spaceIdentifier}/interruptions/{id}/responsible`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Interruption.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the Space.

**Response**

`200` — The User responsible for the requested Interruption

- **`CanPasswordBeEdited`** :span[boolean]{.type-label}
- **`Created`** :span[string]{.type-label}  
  Format `date-time`.
- **`DisplayName`** :span[string]{.type-label}  
  Maximum length 64.
- **`EmailAddress`** :span[string]{.type-label}  
  Format `email`. Maximum length 256.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`Identities`** :span[array of object]{.type-label}
  - **`Claims`** :span[object]{.type-label}
  - **`IdentityProviderName`** :span[string]{.type-label}
- **`IsActive`** :span[boolean]{.type-label}
- **`IsRequestor`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether this user resource represents the user who requested it.
- **`IsService`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Password`** :span[string]{.type-label}
- **`ServiceAccountType`** :span[enum]{.type-label}  
  Allowed values: `Standard`, `Agent`.
- **`Username`** :span[string]{.type-label}  
  Maximum length 64.

:::api-example{label="Response"}
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
:::

## Submit a dictionary of form values for the interruption. Only the user with responsibility for this interruption can submit this form

:endpoint{method="POST" path="/api/\{spaceId\}/interruptions/\{id\}/submit"}

Also reachable at `/api/interruptions/{id}/submit`, `/api/spaces/{spaceIdentifier}/interruptions/{id}/submit`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Interruption.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the Space.

**Request Body**

- **`Guidance`** :span[string]{.type-label}  
  Used for Guided Failure Interruptions. Should be one of "Fail", "Retry", "Ignore" or "Exclude".
- **`Id`** :span[string]{.type-label} *(required)*  
  ID of the Interruption. Minimum length 1.
- **`Instructions`** :span[string]{.type-label}  
  Optional free-text instructions recorded with the submission.
- **`Notes`** :span[string]{.type-label}  
  Optional notes recorded with the submission and included in the audit log entry.
- **`Result`** :span[string]{.type-label}  
  Used for Manual Intervention Interruptions. Should be one of "Proceed" or "Abort".
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  ID of the Space.

:::api-example{label="Request"}
```json
{
  "Guidance": "string",
  "Id": "string",
  "Instructions": "string",
  "Notes": "string",
  "Result": "string",
  "SpaceId": "Spaces-1"
}
```
:::

**Response**

`200` — Confirms that the Interruption has been submitted successfully, containing the updated Interruption

- **`CanTakeResponsibility`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether the current user has permissions to take responsibility for this interruption.
- **`CorrelationId`** :span[string]{.type-label}  
  Gets or sets the correlation ID of the activity in which the interruption was requested, if any.
- **`Created`** :span[string]{.type-label}  
  Gets the time at which the interruption was created. Format `date-time`.
- **`Form`** :span[object]{.type-label}
  - **`Elements`** :span[array of object]{.type-label}  
    Elements of the form.
  - **`Values`** :span[object]{.type-label}  
    Values supplied for the form elements.
- **`HasResponsibility`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether the current user has responsibility for this interruption.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsLinkedToOtherInterruption`** :span[boolean]{.type-label}  
  If this interruption is linked to another it will be automatically completed when the other one is. Used to handle interruptions in child deployments.
- **`IsPending`** :span[boolean]{.type-label}  
  True if the interruption is waiting for user action; otherwise, false.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`PullRequests`** :span[array of object]{.type-label}  
  Gets or sets a list of pull requests associated with this interruption. This will only be populated when Type is PullRequestCompletion.
  - **`Id`** :span[string]{.type-label}
  - **`InterruptionId`** :span[string]{.type-label}
  - **`Number`** :span[integer]{.type-label}
  - **`RepositoryUrl`** :span[string]{.type-label}
  - **`Status`** :span[enum]{.type-label}  
    Allowed values: `Unknown`, `Open`, `Merged`, `Closed`, `UnknownGitVendor`.
  - **`Title`** :span[string]{.type-label}
  - **`Url`** :span[string]{.type-label}
- **`RelatedDocumentIds`** :span[array of string]{.type-label}  
  Gets the ids of documents related to this interruption.
- **`ResponsibleTeamIds`** :span[array of string]{.type-label}  
  Gets the ids of groups that can take responsibility for this interruption.
- **`ResponsibleUserId`** :span[string]{.type-label}  
  Gets or sets the.
- **`SpaceId`** :span[string]{.type-label}
- **`TaskId`** :span[string]{.type-label}  
  Gets or sets the id of the Server Task raising the interruption.
- **`Title`** :span[string]{.type-label}  
  Gets or sets a title for this interruption.
- **`Type`** :span[enum]{.type-label}  
  Gets or sets the type of interruption.  
  Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.

:::api-example{label="Response"}
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
      "Id": "InterruptionPullRequests-1",
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
  "SpaceId": "Spaces-1",
  "TaskId": "string",
  "Title": "string",
  "Type": "ManualIntervention"
}
```
:::
