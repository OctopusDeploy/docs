With Octopus Deploy's [High Availability](/docs/administration/high-availability) functionality, you connect multiple nodes to the same database and file storage.  Octopus Server makes specific assumptions about the performance and consistency of the file system when accessing log files, performing log retention, storing deployment packages and other deployment artifacts, exported events, and temporary storage when communicating with Tentacles.  

What that means is: 

- Octopus Deploy is sensitive to network latency.  It expects the file system to be hosted in the same data center as the virtual machines or container hosts running the Octopus Deploy Service.
- It is extremely rare for two or more nodes to write to the same file at the same time.
- It is common for two or more nodes to read the same file at the same time.

In our experience, you will have the best experience when all the nodes and the file system are located in the same data center.  Modern network storage devices and operating systems handle almost all the scenarios a highly available instance of Octopus Deploy will encounter.