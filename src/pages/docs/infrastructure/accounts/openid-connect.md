---
layout: src/layouts/Default.astro
pubDate: 2023-22-09
modDate: 2023-22-09
title: OpenID Connect 
description: How to customize the Subject Claim for OpenID Connect authentication
navOrder: 70
---

## Configuration

:::div{.info}
If you are using Octopus Cloud, you will not need to do anything to expose the instance to the public internet, this is already configured for you.
:::

To use federated credentials, your Octopus instance will need to have two anonymous URLs exposed to the public internet. 

- `https://server-host/.well-known/openid-configuration`
- `https://server-host/.well-known/jwks`

These must be exposed with anonymous access on HTTPS. Without this, the OpenID Connect protocol will not be able to complete the authentication flow.

The hostname of the URL that these two endpoints are available on must either be configured under **Configuration->Nodes->Server Uri** or set as the first ListenPrefix in the server configuration. 

## Authenticating using OpenID Connect with third party services and tools

If you have a third-party service or tool that supports OpenID Connect, you can add any OIDC account variable into your projects variable set and use the `Octopus.OpenIdConnect.Jwt` variable to get access to the request token that can be used for authenticating.

## Subject Keys

When using OpenID Connect to authenticate to with external services, the Subject claim can have its contents customized.

This allows you to grant resource access at a fine or coarse grained level in your Cloud host, depending on your requirements.

The subject can be modified for the three different uses within Octopus:

- [Deployments and Runbooks](#deployments-and-runbooks)
- [Health Checks](#health-checks)
- [Account Test](#account-test)

### Subject key parts

- Only the requested keys for a **Subject** claim will be include in the generated **Subject** claim
- Any resource types include in the **Subject** claim will use the slug value for the resource. The slug value is generated from the name of the resource when it was created, it can be edited on the edit page of resource type.
- The **Subject** claim parts will always be in the following order 
    - **Space**
    - **Project**
    - **Runbook**
    - **Tenant**
    - **Environment**
    - **Target**
    - **Account**
    - **Type**


### Deployments and Runbooks {#deployments-and-runbooks}

The **Subject** claim for a deployment or a runbook supports the following parts:

- **Space** slug
- **Project** slug
- **Runbook** slug
- **Tenant** slug
- **Environment** slug
- **Account** slug
- **Type**

The default format for a deployment and runbook is `space:[space-slug]:project:[project-slug]:tenant:[tenant-slug]:environment:[environment-slug]`.

The value for the type is either `deployment` or `runbook`.

When changing the **Subject** claim format for a deployment and runbook, the runbook value will not be included (if specified) when running a deployment. 

For example, in the **Default** space, you have a project called **Deploy Web App**, and a runbook called **Restart**. If you set the **Subject** claim format to `space`, `project`, `runbook` and `type`, when running a deployment the **Subject** claim will be `space:default:project:deploy-web-app:type:deployment` and for the run of the runbook the **Subject** claim would be `space:default:project:deploy-web-app:runbook:restart:type:runbook`.
This is using the default generated slug values for the space, project and runbook.

## Health Checks {#health-checks}

The Health Check **Subject** claim supports the **Space** slug, the **Target** slug and the **Type**

The default format for a health check is `space:[space-slug]:target:[target-slug]`.

The value for the type is `health`.


## Account Test {#account-test}

The Account Test **Subject** claim supports the **Space** slug, the **Account** slug and the **Type**

The default format for an account test is `space:[space-slug]:account:[account-slug]`.

