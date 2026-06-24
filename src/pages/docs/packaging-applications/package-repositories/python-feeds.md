---
layout: src/layouts/Default.astro
pubDate: 2026-06-16
modDate: 2026-06-16
title: Python feeds
description: Configuring PyPI repositories as Octopus Feeds
navOrder: 52
---

:::div{.success}
Python feeds are supported from version **Octopus 2026.2.9957**.
:::

Python repositories can be configured as an external feed in Octopus Deploy, allowing you to consume packages from pypi.org or private PyPI-compatible registries such as Nexus Repository Manager, JFrog Artifactory, Azure Artifacts, and AWS CodeArtifact.

Octopus communicates with the feed using the [PyPI Simple repository API](https://peps.python.org/pep-0503/). Both the JSON Simple API ([PEP 691](https://peps.python.org/pep-0691/)) and the legacy HTML Simple API ([PEP 503](https://peps.python.org/pep-0503/)) are supported, with the JSON API preferred when the registry offers it.

## Adding an external Python feed

The following steps can be followed to add an external Python feed.

1. Navigate to **Deploy ➜ Manage ➜ External Feeds** and click the **ADD FEED** button.
2. Select **PyPI Feed** from the **Feed Type** field.
3. Enter a descriptive name for the feed in the **Feed name** field.
4. In the **Feed URL** field, enter the URL of the PyPI Simple index ([PEP 503](https://peps.python.org/pep-0503/)). Common examples include:
   - Public PyPI registry: `https://pypi.org/simple/`
   - Nexus Repository Manager: `https://your-nexus-server/repository/pypi-hosted/simple/`
   - JFrog Artifactory: `https://your-artifactory-server/artifactory/api/pypi/pypi-repo/simple/`
5. Under **Credentials**, choose the authentication type required by your registry (see [Authentication](#authentication) below).
6. The **Download attempts** field defines the number of times that Octopus will attempt to download a package from the registry. Failed attempts will wait for the number of seconds defined in the **Download retry backoff** field before attempting to download the package again.
7. Click **Save and test** to verify the feed configuration.

## Authentication

Under **Credentials**, Python feeds support three authentication types:

### Anonymous access

For public registries like pypi.org, authentication is optional. Select **Anonymous Access** to access public packages without credentials.

### Username and password

Select **Username and Password** to authenticate using basic credentials, entering them in the **Feed Username** and **Feed Password** fields. This is the common choice for registries such as Nexus Repository Manager and JFrog Artifactory.

### Token

Select **Token** when your registry uses an API token. This shows a single **Personal Access Token** field — paste the token (including the `pypi-` prefix, where present) into it; no username is required.

Behind the scenes, Octopus authenticates using the standard Python convention of `__token__` as the username with your token as the password.

## Referencing Python packages

When referencing a Python package in Octopus Deploy, use the package name as it appears in the registry. PyPI package names are case-insensitive and treat `-`, `_`, and `.` as equivalent (see [PEP 503 name normalization](https://peps.python.org/pep-0503/#normalized-names)).

Examples:

- `requests`
- `azure-storage-blob`
- `Flask`

Octopus prefers built distributions (wheels, `.whl`) when available, falling back to source distributions (`.tar.gz` or `.zip`).

## Versioning with Python feeds

Python packages use [PEP 440](https://peps.python.org/pep-0440/) version identifiers, which Octopus interprets as semantic versions.

Pre-release versions are supported, following the PEP 440 specification:

- `1.0.0a1` (alpha)
- `1.0.0b2` (beta)
- `1.0.0rc1` (release candidate)
- `1.0.0.dev1` (development release)

When selecting the latest version for a package, you can order by the most recently published version. For pypi.org, publish dates are retrieved from the [PyPI JSON API](https://docs.pypi.org/api/json/). For registries that don't expose this API, Octopus falls back to ordering by version number.

## Testing a Python feed

After adding a Python feed, you can verify it's working correctly:

1. Click the **TEST** button on the feed configuration page.
2. Search for a known package in your registry.
3. Verify that the matching packages are listed.

:::div{.hint}
The feed test lists matching package names only. Version information isn't shown in the test results.
:::

## Troubleshooting Python feeds

### Connection issues

If you cannot connect to your registry:

1. Verify the feed URL is correct and points at the Simple index (typically ending in `/simple/`), and that it is accessible from the Octopus Server.
2. Check that authentication credentials are valid.
3. Ensure any required network access (firewall rules, proxy settings) is configured.
4. For Nexus or Artifactory, verify the repository is online and the repository path is correct.

### Authentication failures

If authentication is failing:

1. Confirm your credentials or API token haven't expired.
2. When using a token, ensure you selected the **Token** authentication type and pasted the full token into the **Personal Access Token** field.
3. For Artifactory, ensure your API key or access token has the necessary permissions.
4. Test authentication using `pip` with the same credentials and index URL:

```bash
pip install --index-url https://<username>:<password>@your-registry-url/simple/ package-name
```

### Package not found

If a package cannot be found:

1. Verify the package name is spelled correctly. Remember that PyPI names are case-insensitive and treat `-`, `_`, and `.` as equivalent.
2. Confirm the package exists in the registry and isn't private (if you're using anonymous access).
3. Confirm the registry exposes the package on its Simple index.
