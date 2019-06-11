---
title: Sensitive Properties API Changed in Release 3.3
description: How the sensitive properties API changed in Octopus release 3.3.
position: 200
---

:::warning
**Breaking Changes**
In **Octopus 3.3** we made a breaking-change to the API with regards to sensitive-properties on deployment steps and templates.
:::

## Affected Endpoints {#SensitivePropertiesAPIChangesinRelease3.3-AffectedEndpoints}

The following API endpoints were affected:

- `/api/deploymentprocesses`
- `/api/actiontemplates`

## JSON Changes {#SensitivePropertiesAPIChangesinRelease3.3-JSONChanges}

The *SensitiveProperties* JSON property was removed from deployment-steps and action-template resource types.

The *Properties* JSON property is now a collection containing a mixture of plain strings (representing non-sensitive properties) and sensitive-value objects (representing sensitive-properties).

For example, a deployment step with one sensitive and one non-sensitive property in versions prior to **Octopus 3.3** would have resembled:

**Legacy deployment-process JSON**

```json
{
  "Id": "deploymentprocess-Projects-1",
  "ProjectId": "Projects-1",
  "Steps": [
    {
      "Id": "713a0621-c55e-4be8-8c95-06f8f7f9862f",
      "Name": "Deploy my application",
      "RequiresPackagesToBeAcquired": false,
      "Properties": {},
      "Condition": "Success",
      "StartTrigger": "StartAfterPrevious",
      "Actions": [
        {
          "Id": "51a404cf-a143-40aa-b9b2-094840b16b41",
          "Name": "Deploy my application",
          "ActionType": "Octopus.Script",
          "Environments": [],
          "Channels": [],
          "Properties": {
            "Octopus.Action.NonSensitiveProperty": "hello"
          },
	      "SensitiveProperties": {
            "Octopus.Action.SensitiveProperty": null
	  }
          "Links": {}
        }
      ]
    },
  ],
  "Version": 3,
  "LastSnapshotId": null,
  "Links": {
    "Self": "/api/deploymentprocesses/deploymentprocess-Projects-1",
    "Project": "/api/projects/Projects-1",
    "Template": "/api/deploymentprocesses/deploymentprocess-Projects-1/template{?channel,releaseId}"
  }
}

```

Note the Properties and SensitiveProperties collections on lines 19 and 22, and the fact that the values of sensitive-properties were always returned as null (line 23).

In **Octopus 3.3** and greater, this same resource would be represented as:

**New deployment-process JSON**

```json
{
  "Id": "deploymentprocess-Projects-1",
  "ProjectId": "Projects-1",
  "Steps": [
    {
      "Id": "713a0621-c55e-4be8-8c95-06f8f7f9862f",
      "Name": "Deploy my application",
      "RequiresPackagesToBeAcquired": false,
      "Properties": {},
      "Condition": "Success",
      "StartTrigger": "StartAfterPrevious",
      "Actions": [
        {
          "Id": "51a404cf-a143-40aa-b9b2-094840b16b41",
          "Name": "Deploy my application",
          "ActionType": "Octopus.Script",
          "Environments": [],
          "Channels": [],
          "Properties": {
            "Octopus.Action.NonSensitiveProperty": "hello",
            "Octopus.Action.SensitiveProperty": { HasValue: true },
          },
          "Links": {}
        }
      ]
    },
  ],
  "Version": 3,
  "LastSnapshotId": null,
  "Links": {
    "Self": "/api/deploymentprocesses/deploymentprocess-Projects-1",
    "Project": "/api/projects/Projects-1",
    "Template": "/api/deploymentprocesses/deploymentprocess-Projects-1/template{?channel,releaseId}"
  }
}
```

Note on line 21 the sensitive-property is now in the *Properties* collection, and is an object which indicates whether the sensitive-property has a value.

## Creating/Modifying Sensitive-Properties {#SensitivePropertiesAPIChangesinRelease3.3-Creating/ModifyingSensitive-Properties}

To create or alter the value of a sensitive property, the sensitive-property should be included in the *Properties* collection (as above), and it's JSON value should be:

```
"Octopus.Action.MyVariable": { NewValue = "my secret value" }
```

To un-set the value, use:

```
"Octopus.Action.MyVariable": { HasValue = false }
```
