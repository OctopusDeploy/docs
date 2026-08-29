---
layout: src/layouts/Default.astro
pubDate: 2026-08-29
modDate: 2026-08-29
title: Buildkite
description: Buildkite pipelines can create releases in Octopus Deploy, authenticating with OpenID Connect so no API key is stored in the pipeline.
navOrder: 45
---

[Buildkite](https://buildkite.com/) is a continuous integration platform that runs builds on agents you host yourself, or on Buildkite-hosted agents.

Buildkite pipelines integrate with Octopus using the [`octopus` CLI](/docs/octopus-rest-api/cli) and the [Octopus Deploy Create Release](https://github.com/OctopusDeploy/create-release-buildkite-plugin) plugin.

## Installing the Octopus CLI

The `octopus` CLI is not preinstalled on Buildkite agents, including Buildkite-hosted agents, so install it as part of your pipeline:

```bash
OCTOPUS_CLI_VERSION="2.21.4"
curl -sSfL -o /tmp/octopus.tar.gz \
  "https://github.com/OctopusDeploy/cli/releases/download/v${OCTOPUS_CLI_VERSION}/octopus_${OCTOPUS_CLI_VERSION}_linux_amd64.tar.gz"
mkdir -p /tmp/octopus-cli && tar -xzf /tmp/octopus.tar.gz -C /tmp/octopus-cli
export PATH="/tmp/octopus-cli:$PATH"
```

On agents you manage yourself, install it once as part of the agent image instead. See [Octopus CLI](/docs/octopus-rest-api/cli) for the `apt`, `yum` and Homebrew packages.

## Authentication

The `octopus` CLI reads its credentials from the environment:

| Variable | Purpose |
| :-- | :-- |
| `OCTOPUS_URL` | The base URL of your Octopus Server |
| `OCTOPUS_ACCESS_TOKEN` | A short-lived access token, from an OpenID Connect exchange |
| `OCTOPUS_API_KEY` | An API key, if you are not using OpenID Connect |
| `OCTOPUS_SPACE` | Optional. The name of the space to work in |

Anything that sets these before your Octopus steps run will work, whether that is a Buildkite [environment hook](https://buildkite.com/docs/agent/v3/hooks), a plugin, or a command in the step itself.

### OpenID Connect

Using [OpenID Connect](/docs/octopus-rest-api/openid-connect) means no Octopus API key is stored in Buildkite. Buildkite issues a signed token describing the running job, Octopus validates it, and returns an access token that is valid for one hour.

:::div{.hint}
OpenID Connect can only be used with [service accounts](/docs/security/users-and-teams/service-accounts), not user accounts.
:::

#### Configure an OIDC identity in Octopus

1. Go to **Configuration ➜ Users** and create a service account, or open an existing one.
2. Open the **OpenID Connect** section and click **Add OIDC Identity**.
3. Select **Other Issuer** as the issuer type.
4. Set the **Issuer** to `https://agent.buildkite.com`.
5. Set the **Subject** to match your pipeline, as described below.
6. Click **Save**, then copy the **Service Account Id**. It is a GUID, and is used as the audience of the token.

Give the service account the permissions it needs. For creating releases, the built-in **Release creator** role is usually enough.

#### Choosing the subject

Buildkite builds the subject claim from the job:

```
organization:ORG:pipeline:PIPELINE:ref:REF:commit:COMMIT:step:STEP_KEY
```

For example:

```
organization:acme:pipeline:my-app:ref:refs/heads/main:commit:9f3182061f1e2cca4702c368cbc039b7dc9d4485:step:build
```

Octopus matches the subject exactly, with `*` and `?` available as wildcards.

:::div{.warning}
Because the subject includes the commit, a subject copied verbatim from one build will only ever authorise **that** build. Wildcard at least the commit:

```
organization:acme:pipeline:my-app:ref:refs/heads/main:commit:*:step:*
```
:::

Be as specific as the rest of the subject allows. A subject such as `organization:acme:*` matches every pipeline in your organization, which is rarely what you want.

#### Exchange the token in your pipeline

There is no Octopus login plugin for Buildkite yet, so perform the exchange in your step:

```bash
SERVICE_ACCOUNT_ID="<the Service Account Id from Octopus>"
export OCTOPUS_URL="https://my.octopus.app"

ID_TOKEN="$(buildkite-agent oidc request-token --audience "$SERVICE_ACCOUNT_ID")"
TOKEN_ENDPOINT="$(curl -sSf "$OCTOPUS_URL/.well-known/openid-configuration" | jq -r .token_endpoint)"

export OCTOPUS_ACCESS_TOKEN="$(curl -sSf -X POST "$TOKEN_ENDPOINT" \
  -H 'Content-Type: application/json' \
  -d "$(jq -nc --arg a "$SERVICE_ACCOUNT_ID" --arg t "$ID_TOKEN" \
        '{grant_type:"urn:ietf:params:oauth:grant-type:token-exchange",
          audience:$a, subject_token:$t,
          subject_token_type:"urn:ietf:params:oauth:token-type:jwt"}')" \
  | jq -r .access_token)"
```

:::div{.hint}
Buildkite steps do not share an environment the way the steps of a GitHub Actions job do. Exchange the token in the same step that uses it, or in an [environment hook](https://buildkite.com/docs/agent/v3/hooks) attached to each step that talks to Octopus. Each step then gets its own short-lived token, which is a security benefit rather than an inconvenience.
:::

### API keys

Where OpenID Connect is not available, use an [API key](/docs/octopus-rest-api/how-to-create-an-api-key) stored following Buildkite's [guidance for pipeline secrets](https://buildkite.com/docs/pipelines/secrets), and either set `OCTOPUS_API_KEY` or pass it to the plugin as `api_key`.

## Creating a release

The [Octopus Deploy Create Release](https://github.com/OctopusDeploy/create-release-buildkite-plugin) plugin wraps `octopus release create`:

```yml
steps:
  - label: ":octopus-deploy: Create a release in Octopus Deploy"
    plugins:
      - OctopusDeploy/create-release#v0.2.0:
          project: "HelloWorld"
          release_number: "1.0.${BUILDKITE_BUILD_NUMBER}"
```

The plugin's README documents the full set of options. If you would rather not use the plugin, call the CLI directly:

```bash
octopus release create --project "HelloWorld" --version "1.0.$BUILDKITE_BUILD_NUMBER" --no-prompt
```

:::div{.hint}
Always pass `--no-prompt` when scripting the CLI. Without it, a missing required value makes the CLI wait for input and the job hangs until it times out.
:::

`git_ref` and `git_commit` are only valid for [version controlled projects](/docs/projects/version-control). Supplying them for a regular project fails with *"the GitCommit and GitRef arguments are not supported for this command"*.

## Build information

There is no Buildkite plugin for pushing [build information](/docs/packaging-applications/build-servers/build-information) yet. You can push it with the Octopus REST API, using the variables Buildkite exposes such as `BUILDKITE_COMMIT` and `BUILDKITE_BUILD_URL`. See [manually pushing build information](https://octopus.com/blog/manually-push-build-information-to-octopus).

## Troubleshooting

**The token exchange returns HTTP 400.** Almost always a subject mismatch. Decode the ID token and compare its `sub` against the Subject configured on the OIDC identity; matching is exact and case-sensitive. Remember that the subject includes the commit, so it needs at least `commit:*`.

**`403 ... Missing permission`.** Authentication succeeded and authorization did not. The service account needs a role; `ReleaseCreate` is the usual one.

**`could not obtain an OIDC token`.** The agent predates `buildkite-agent oidc request-token`, which needs agent 3.41 or later.

**A `$` in your pipeline YAML is being interpreted.** Buildkite interpolates pipeline YAML before the agent runs it, so a literal `$` must be written `$$`. Moving the script into a file in your repository, or into a plugin hook, avoids this entirely.

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli)
- [Using OpenID Connect with the Octopus API](/docs/octopus-rest-api/openid-connect)
- [Using OpenID Connect with other issuers](/docs/octopus-rest-api/openid-connect/other-issuers)
- [Create Release Buildkite plugin](https://github.com/OctopusDeploy/create-release-buildkite-plugin)
