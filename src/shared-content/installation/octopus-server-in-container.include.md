Running Octopus Server inside a container lets you avoid installing Octopus directly on top of your infrastructure and makes getting up and running with Octopus as simple as a one line command. Upgrading to the latest version of Octopus is just a matter of running a new container with the new image version. 

We are confident in the Octopus Server Linux Container's reliability and performance. [Octopus Cloud](/docs/octopus-cloud) runs the Octopus Server Linux Container in AKS clusters in Azure.  But to use the Octopus Server Linux Container in Octopus Cloud, we had to make some design decisions and level up our knowledge about Docker concepts.  

We recommend the use of the Octopus Server Linux Container if you are okay with **all** of these conditions:

- You are familiar with Docker concepts, specifically around debugging containers, volume mounting, and networking.
- You are comfortable with one of the underlying hosting technologies for Docker containers; Kubernetes, ACS, ECS, AKS, EKS, or Docker itself.
- You understand Octopus Deploy is a stateful, not a stateless application, requiring additional monitoring.

We publish `linux/amd64` Docker images for each Octopus Server release and they are available on [DockerHub](https://hub.docker.com/r/octopusdeploy/).
