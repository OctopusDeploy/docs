---
layout: src/layouts/Default.astro
pubDate: 2025-09-11
modDate: 2025-09-11
title: Schema for Policies
subtitle: A list of the inputs that are provided to the policy engine 
icon: fa-solid fa-lock
navTitle: Schema for policies
navSection: Policies
description: Schema for policies
navOrder: 162
---

## Schema for Policies

Octopus has a set number of inputs that are provided to evaluate policies against deployments. The following is the full schema that is passed into the engine to evaluate deployments:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Octopus Policy input schema",
  "type": "object",
  "properties": {
    "Environment": {
      "type": "object",
      "properties": {
        "Id": {
          "type": "string"
        },
        "Name": {
          "type": "string"
        },
        "Slug": {
          "type": "string"
        }
      },
      "required": [
        "Id",
        "Name",
        "Slug"
      ]
    },
    "Project": {
      "type": "object",
      "properties": {
        "Id": {
          "type": "string"
        },
        "Name": {
          "type": "string"
        },
        "Slug": {
          "type": "string"
        }
      },
      "required": [
        "Id",
        "Name",
        "Slug"
      ]
    },
    "Space": {
      "type": "object",
      "properties": {
        "Id": {
          "type": "string"
        },
        "Name": {
          "type": "string"
        },
        "Slug": {
          "type": "string"
        }
      },
      "required": [
        "Id",
        "Name",
        "Slug"
      ]
    },
    "Tenant": {
      "type": "object",
      "properties": {
        "Id": {
          "type": "string"
        },
        "Name": {
          "type": "string"
        },
        "Slug": {
          "type": "string"
        }
      },
      "required": [
        "Id",
        "Name",
        "Slug"
      ]
    },
    "ProjectGroup": {
      "type": "object",
      "properties": {
        "Id": {
          "type": "string"
        },
        "Name": {
          "type": "string"
        },
        "Slug": {
          "type": "string"
        }
      },
      "required": [
        "Id",
        "Name",
        "Slug"
      ]
    },
    "SkippedSteps": {
      "type": "array",
      "items": {}
    },
    "Steps": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "Id": {
            "type": "string"
          },
          "Slug": {
            "type": "string"
          },
          "ActionType": {
            "type": "string"
          },
          "Enabled": {
            "type": "boolean"
          },
          "IsRequired": {
            "type": "boolean"
          },
          "Source": {
            "type": "object",
            "properties": {
              "Type": {
                "type": "string"
              },
              "SlugOrId": {
                "type": "string"
              },
              "Version": {
                "type": "string"
              }
            },
            "required": [
              "Type",
              "SlugOrId"
            ]
          },
          "Packages": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "Id": {
                  "type": "string"
                },
                "Name": {
                  "type": "string"
                },
                "Version": {
                  "type": "string",
                },
                "GitRef": {
                  "type": "string",
                }
              },
              "required": [
                "Id",
                "Name"
              ]
            }
          }
        },
        "required": [
          "Id",
          "Slug",
          "ActionType",
          "Enabled",
          "IsRequired",
          "Source"
        ]
      }
    },
    "Release": {
      "type": "object",
      "properties": {
        "Id": {
          "type": "string"
        },
        "Name": {
          "type": "string"
        },
        "Version": {
          "type": "string"
        },
        "GitRef": {
          "type": "string"
        }
      },
      "required": [
        "Id",
        "Name",
        "Version"
      ]
    }
    "Runbook": {
      "type": "object",
      "properties": {
        "Id": {
          "type": "string"
        },
        "Name": {
          "type": "string"
        },
        "Snapshot": {
          "type": "string"
        },
        "GitRef": {
          "type": "string"
        }
      },
      "required": [
        "Id",
        "Name",
        "Snapshot"
      ]
    }
  },
  "required": [
    "Environment",
    "Project",
    "Space",
    "SkippedSteps",
    "Steps", 
    "ProjectGroup"
  ]
}
```
