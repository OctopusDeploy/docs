---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: GitHub Organizations
description: Octopus Deploy houses its source code on GitHub in three organizations.
navOrder: 250
---

We use GitHub as our source control solution.  The repositories are split across three organizations.

- [Octopus Deploy](https://github.com/octopusdeploy)
- [Octopus Deploy Samples](https://github.com/octopussamples)
- [Octopus Deploy Labs](https://github.com/octopusdeploylabs)

## Octopus Deploy organization

The Octopus Deploy GitHub organization houses the repositories required to run Octopus Deploy.  It includes of a variety of repos, from the Octopus Deploy product itself to a variety of support applications, such as Calamari, Sashimi, Halibut, and other repos such as Blog, Docs, and People.    

### License

Unless noted, all public repositories in this organization are licensed under the [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0).  You are free to fork the repositories and make modifications.  However, if you do this, there is no guarantee future versions of Octopus Deploy will work with your forked repository.  In doing this, you are accepting the responsibility to keep your forked repository up to date.

### Support

Support for product related repositories in active development is included as part of your customer agreement.  We will make a note of which repositories are not supported in the repository ReadMe file.  Please do not create issues, as the issue trackers may or may not be actively monitored.  Instead, email [support@octopus.com](mailto:support@octopus.com) for the issue to be triaged and prioritized.

### Pull requests

Unless noted, public repositories in this organization will accept pull requests.  You will be required to sign a Contributor License Agreement or CLA.  In addition, we will include contribution guidelines in the repository.

## Octopus Deploy Samples organization

The Octopus Deploy Samples GitHub organization houses repositories that contain sample applications used in various blog posts, webinars, documentation, or videos.  These are sample applications and shouldn't be used for production.  

### License

All repositories in this organization are licensed under the [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0) or the [MIT License](https://opensource.org/licenses/MIT).  

### Support

No support is provided for any repository in the Octopus Deploy Samples organization.  All repositories are provided as-is with no implied warranty.

### Pull requests

Pull requests are not accepted in any repository in the Octopus Deploy Samples organization.  These are sample apps and shouldn't be used for production purposes.  

## Octopus Deploy Labs organization

The Octopus Deploy Labs GitHub organization houses repositories that contain applications and scripts to help manage or extend Octopus Deploy.  These are often tools we use internally, and we want to share them with our customers.

### License

All repositories in this organization are licensed under the [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0).  You are free to fork and modify these tools as you see fit.  

### Support

No support is provided for any repository in the Octopus Deploy Labs organization.  All repositories are provided as-is with no implied warranty.  Any issue submitted will not be fixed.

### Pull requests

Unless noted, pull requests will not be accepted in repositories in the Octopus Deploy Labs organization.  If pull requests are accepted on a repository, you will be required to sign a Contributor License Agreement or CLA.  In addition, we will include contribution guidelines in the repository.

### Target Octopus Deploy version

Repositories in this organization contain tools and scripts to extend or help maintain Octopus Deploy.  Octopus Deploy is continuously evolving.  While we do our best to maintain backward compatibility, sometimes we have to make a breaking change.  Each repository will include which versions of Octopus Deploy the tool or script was tested against, along with versions we expect it to work with.  
