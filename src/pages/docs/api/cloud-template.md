---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Cloud Template
---

## Requests the metadata (ie, parameters and values) for a cloud template (eg, cloudformation, terraform, azure ARM template)

`POST` `/api/cloudtemplate/{id}/metadata`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The id of a supported cloud template type, eg `CloudFormation`, `Terraform`, `AzureAppService`, `Kubernetes`, etc.

**Request Body**

`GetCloudTemplateMetadataRequest`

- **`FeedId`** <span class="type-label">string</span> — Id of the feed from which to load the package. Obsolete.
- **`Id`** <span class="type-label">string</span> *(required)* — The id of a supported cloud template type, eg `CloudFormation`, `Terraform`, `AzureAppService`, `Kubernetes`, etc.
- **`PackageId`** <span class="type-label">string</span> — Id of the package to load and parse. Obsolete.
- **`Template`** <span class="type-label">string</span> *(required)* — The cloud template to evaluate and extract parameters and values from. Minimum length 1.

<div data-example="Request">

```json
{
  "FeedId": "string",
  "Id": "string",
  "PackageId": "string",
  "Template": "string"
}
```
</div>

**Response**

`200` — The metadata (ie, parameters and values) for a cloud template (eg, cloudformation, terraform, azure ARM template)

`CloudTemplateMetadata`.

- **`Metadata`** <span class="type-label">object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`Types`** <span class="type-label">array of object</span>
- **`Values`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>
