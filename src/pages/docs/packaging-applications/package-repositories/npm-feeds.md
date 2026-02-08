---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-02-05
title: NPM feeds
description: Configuring NPM repositories as Octopus Feeds
navOrder: 45
---

:::div{.success}
NPM feeds are supported from version **Octopus 2026.1.7997**.
:::

NPM repositories can be configured as an external feed in Octopus Deploy, allowing you to consume packages from npmjs.com or private NPM registries such as Nexus Repository Manager and JFrog Artifactory.

## Adding an external NPM feed

The following steps can be followed to add an external NPM feed.

1. Navigate to **Deploy ➜ Manage ➜ External Feeds** and click the **ADD FEED** button.
2. Select **NPM Feed** from the **Feed Type** field.
3. Enter a descriptive name for the feed in the **Feed name** field.
4. In the **Feed URL** field, enter the URL of the NPM registry. Common examples include:
   - Public NPM registry: `https://registry.npmjs.org`
   - Nexus Repository Manager: `https://your-nexus-server/repository/npm-hosted/`
   - JFrog Artifactory: `https://your-artifactory-server/artifactory/api/npm/npm-repo/`
5. If the NPM registry requires authentication, enter the credentials in the **Feed login** and **Feed password** fields. For token-based authentication (common with private registries), use the token as the password.
6. The **Download attempts** field defines the number of times that Octopus will attempt to download a package from the NPM registry. Failed attempts will wait for the number of seconds defined in the **Download retry backoff** field before attempting to download the package again.
7. Click **Save and test** to verify the feed configuration.

:::figure
![Add External Feed Dialog](/docs/img/packaging-applications/package-repositories/images/npm-add-external-feed.png)
:::

## Authentication

NPM feeds support several authentication methods:

### Public registries

For public registries like npmjs.com, authentication is optional. You can leave the credentials fields blank to access public packages.

### Username/Password

Most NPM registries support basic authentication with username and password. Enter these directly into the **Feed login** and **Feed password** fields.

### Nexus Repository Manager

For Nexus repositories:

1. Use your Nexus username in the **Feed login** field.
2. Use your Nexus password in the **Feed password** field.
3. Alternatively, you can use an [NPM Bearer Token](https://help.sonatype.com/repomanager3/nexus-repository-administration/user-authentication/user-tokens) generated from Nexus.

### JFrog Artifactory

For Artifactory repositories:

1. Use your Artifactory username in the **Feed login** field.
2. In the **Feed password** field, you can use either:
   - Your Artifactory password
   - An [Access Token](https://jfrog.com/help/r/jfrog-platform-administration-documentation/access-tokens) generated from Artifactory
   - An API Key (if enabled in your Artifactory instance)

## Referencing NPM packages

When referencing an NPM package in Octopus Deploy, use the package name as it appears in the NPM registry. For scoped packages, include the scope in the package name.

Examples:

- Unscoped package: `express`
- Scoped package: `@octopusdeploy/example-package`
- Organization scoped: `@myorg/my-package`

## Versioning with NPM feeds

NPM packages use [semantic versioning (SemVer)](https://semver.org/). Octopus Deploy supports the standard SemVer format: `MAJOR.MINOR.PATCH`.

Pre-release versions are also supported, following the SemVer specification with identifiers such as:

- `1.0.0-alpha`
- `1.0.0-beta.1`
- `1.0.0-rc.2`

## Testing an NPM feed

After adding an NPM feed, you can verify it's working correctly:

1. Click the **TEST** button on the feed configuration page.
2. Search for a known package in your NPM registry.
3. Verify that packages are displayed and version information is correct.

:::figure
![NPM Feed Test](/docs/img/packaging-applications/package-repositories/images/npm-search-packages.png)
:::

## Troubleshooting NPM feeds

### Connection issues

If you cannot connect to your NPM registry:

1. Verify the feed URL is correct and accessible from the Octopus Server.
2. Check that authentication credentials are valid.
3. Ensure any required network access (firewall rules, proxy settings) is configured.
4. For Nexus or Artifactory, verify the repository is online and the repository path is correct.

### Authentication failures

If authentication is failing:

1. Confirm your credentials haven't expired.
2. For Artifactory, ensure your API key or access token has the necessary permissions.
3. For Nexus, verify that NPM realm is properly configured if using token authentication.
4. Test authentication using the NPM CLI with the same credentials:

```bash
npm login --registry=https://your-registry-url
npm view package-name
```

### Package not found

If a package cannot be found:

1. Verify the package name is spelled correctly, including any scope.
2. Confirm the package exists in the registry and isn't private (if you're using anonymous access).
3. For scoped packages, ensure you're using the full package name including the `@scope/` prefix.

### Performance considerations

For large NPM registries or when dealing with many packages:

1. Consider using a caching proxy or mirror closer to your Octopus Server.
2. Adjust the **Download attempts** and **Download retry backoff** settings if you experience timeouts.
3. Monitor network bandwidth if packages are large or frequently downloaded.

## Learn more

- [NPM documentation](https://docs.npmjs.com/)
- [Working with scoped packages](https://docs.npmjs.com/cli/v8/using-npm/scope)
- [About NPM registry](https://docs.npmjs.com/about-the-public-npm-registry)
