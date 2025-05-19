:::div{.info}
When using build information in release notes in conjunction with [built-in package repository triggers (formerly known as _Automatic Release Creation_)](https://octopus.com/docs/projects/project-triggers/built-in-package-repository-triggers) the build information **must** be pushed to Octopus **before** the packages are pushed to Octopus as the release will be created as soon as the package configured for automatic release create is pushed.
:::
