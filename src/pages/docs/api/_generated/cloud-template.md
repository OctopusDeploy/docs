---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-09-03
title: Cloud Template
---

## Get metadata for a cloud template

:endpoint{method="POST" path="/api/cloudtemplate/\{id\}/metadata"}

Request the metadata (ie, parameters and values) for a cloud template (eg, cloudformation, terraform, azure ARM template)

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The id of a supported cloud template type, eg `CloudFormation`, `Terraform`, `AzureAppService`, `Kubernetes`, etc.

**Request Body**

- **`FeedId`** :span[string]{.type-label}  
  Id of the feed from which to load the package. Obsolete.
- **`Id`** :span[string]{.type-label} *(required)*  
  The id of a supported cloud template type, eg `CloudFormation`, `Terraform`, `AzureAppService`, `Kubernetes`, etc.
- **`PackageId`** :span[string]{.type-label}  
  Id of the package to load and parse. Obsolete.
- **`Template`** :span[string]{.type-label} *(required)*  
  The cloud template to evaluate and extract parameters and values from. Minimum length 1.

:::api-example{label="Request"}
```json
{
  "FeedId": "string",
  "Id": "string",
  "PackageId": "string",
  "Template": "string"
}
```
:::

**Response**

`200` — The metadata (ie, parameters and values) for a cloud template (eg, cloudformation, terraform, azure ARM template)

- **`Metadata`** :span[object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`Types`** :span[array of object]{.type-label}
- **`Values`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Metadata": {
    "Description": "string",
    "Types": [
      {
        "Name": "string",
        "Properties": [
          {}
        ]
      }
    ]
  },
  "Values": "string"
}
```
:::
