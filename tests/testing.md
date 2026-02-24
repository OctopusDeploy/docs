---
page_title: 'Migrating to v1.3.0'
subcategory: 'Upgrades & Migrations'
---

# v1.3.0 Migration Guide

In this release, we've announced a deprecation that will require action from some customers, depending on their configuration

## Deprecated - lifecycle `retention_policy` blocks

In this release, we announced the deprecation the following lifecycle resource and datasource blocks:

- `octopusdeploy_lifecycles.release_retention_policy`
- `octopusdeploy_lifecycles.tentacle_retention_policy`
- `octopusdeploy_lifecycles.phase.release_retention_policy`
- `octopusdeploy_lifecycles.phase.tentacle_retention_policy`

in favour of the following lifecycle resource blocks:

- `octopusdeploy_lifecycles.release_retention_with_strategy`
- `octopusdeploy_lifecycles.tentacle_retention_with_strategy`
- `octopusdeploy_lifecycles.phase.release_retention_with_strategy`
- `octopusdeploy_lifecycles.phase.tentacle_retention_with_strategy`

**In addition to this**, the fallback retention policy for lifecycles without explicit retention was previously set to "30" "Days". After switching to `retention_with_strategy`, the fallback retention will be "Default". Any phases without explicit retention will still inherit retention from their lifecycle.

### Rationale

In octopus 2025.3 and higher, a customizable default retention setting can be added at the space level and applied to desired lifecycles and phases within that space. The new `retention_with_strategy` blocks support this feature. This feature enables retention of many lifecycles to be changed on mass or more easily initiated at the user’s desired retention.

Lifecycles will now be initially set to the Space Default retention setting (the space default retention setting is initially set to "Keep forever”).

### Impact

This change affects all customers using lifecycles.

Lifecycle resources using `retention_policy` retention settings:

- users will need to change their HCL to use the new `retention_with_strategy` block

Lifecycles resources **without** explicit retention settings:

- if users don't want these lifecycles to have the space default retention, they will need to update their HCL to have explicit retention settings

Lifecycles data source use:

- viewing `retention_policy` settings is potentially inaccurate as it will not show when the space default retention is used
- users will need to update their hcl to access the `retention_with_strategy` blocks instead

### Timeline

Migration will be required no earlier than 15 Oct 2026

| Date        | What we'll do                                                        | What you need to do                                                      |
| ----------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 15 APR 2026 | **Enactment**: Soft-delete the deprecated block (Major release)      | Migrate your Terraform config, or use the escape-hatch, before upgrading |
| 15 OCT 2026 | **Completion**: Remove the deprecated block entirely (Patch release) | Migrate your Terraform config before upgrading                           |

### How to migrate

Please ensure you are working from a clean slate and have no pending changes to your Terraform config, by running a `terraform plan`. If you have outstanding changes, please resolve them before proceeding with this guide.

-> This migration substitutes equivalent resources. This is non-destructive as long as you complete the migration in one go.

1.  Within your lifecycle resources, replace all `retention_policy` blocks with `retention_with_strategy` blocks and equivalent retention settings

    - e.g. when setting keep forever for the release retention use:

          release_retention_with_strategy  = {
              strategy = “Forever”
          }

2.  Review all lifecycles without explicit release or tentacle retention blocks and set explicit retention where needed. Note that phases without explicit retention will still inherit from the lifecycle so may not need changes.
    All lifecycles without explicit release or tentacle retention blocks are currently being initialised with a retention of “30 days”. If the same behaviour is required after migration, please explicitly set the retention strategy as follows:

        release_retention_with_strategy = {
            strategy = “Count”
            quantity_to_keep = 30
            unit = “Days”
        }

    Or

        tentacle_retention_with_strategy = {
            strategy = “Count”
            quantity_to_keep = 30
            unit = “Days”
        }

3.  If your configuration includes data "octopusdeploy_lifecycles" to view retention properties, only view the `release_retention_with_strategy` and `tentacle_retention_with_strategy` blocks. This will enable you to see when blocks use the space default retention. E.g:

        data.octopusdeploy_lifecycles.exampleData.lifecycles[0].release_retention_with_strategy[0]

4.  Run `terraform plan`
5.  When satisfied, run `terraform apply` to complete the migration

### Escape hatch

We expect customers to migrate their configs in the 6 months between Announcement and Enactment of a deprecation. However, we know that this isn't always possible, so we have a further 6 months grace period.

If you're caught out during this period and need a bit more time to migrate, you can use this escape hatch to revert the soft-deletion from the Enactment stage.

| Environment Variable               | Required Value                              |
| ---------------------------------- | ------------------------------------------- |
| `TF_OCTOPUS_DEPRECATION_REVERSALS` | `octopusdeploy_lifecycles.retention_policy` |

This escape hatch will be removed and migration will be required during the [Completion phase](#Timeline)
