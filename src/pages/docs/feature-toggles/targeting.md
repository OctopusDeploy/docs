---
layout: src/layouts/Default.astro
pubDate: 2026-04-20
modDate: 2026-04-20
title: Targeting
subtitle: Control rollout within an environment
icon: fa-solid fa-target
navTitle: Targeting
navSection: Feature Toggles
description: Targeting options for Octopus Feature Toggles
navOrder: 96
---

## Tenants {#tenants}

If your Project uses [Tenants](/docs/tenants/), then Toggles may be enabled for subsets of your Tenants. 

The options for configuring a Feature Toggle for Tenants are:

- All Tenants
- Specific Tenants Included
- % of Tenants
- Specific Tenants Excluded

For example, the configuration shown below will result in the Toggle evaluating as `On` for 10% of Tenants, always including `Acme` and never including `Cyberdyne Systems`. 

![Tenanted Rollout](/docs/img/feature-toggles/tenant-rollout.png)

## Segments {#segments}

Segments allow enabling a toggle for a subset of users. 

Segments are key/value pairs, and are supplied by your applications via the [OpenFeature EvaluationContext](https://openfeature.dev/docs/reference/concepts/evaluation-context).


Common segment examples include:

- Specific users. e.g. `user-id/123456`  
- Specific accounts. e.g. `account-id/123456` 
- License types. e.g. `license-type/free`  
- Geographic regions. e.g. `region/eu` 
- Rollout rings. e.g. `ring/early-adopter`

The Evaluation Context can be supplied at different points in your application, for example:

- On start-up
- During each web request
- At the evaluation site

The following example shows adding a key/value to the evaluation context in C#.

```cs
// The client would be injected by IoC in many cases
var client = OpenFeature.Api.Instance.GetClient();
// The following is hard-coded, whereas a real-world use would set this dynamically
client.SetContext(EvaluationContext.Builder().Set("license-type", "free").Build());
```

Segments can then be configured for Environments on the Feature Toggle in Octopus.

![Add Segment](/docs/img/feature-toggles/segment-add.png)

A Toggle evaluation will match on segments if the evaluation context matches at least one segment for each key. 

Some examples:

|Segments   | Evaluation Context | Result |
|-----------|--------------------|--------|
| `user-id/123456`   | `user-id/123456` | `On` |
| `user-id/123456`   | `user-id/789383` | `Off` |
| `license-type/free` `region/Asia` `region/EU`  | `license-type/free` `region/Asia`  | `On` |
| `license-type/free` `region/Asia` `region/EU`  | `license-type/free` `region/US`  | `Off` |