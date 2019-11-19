Before you can deploy software your deployment targets, you need to tag them with target roles. This ensures you deploy the right software to the right deployment targets. Deployment targets can have multiple roles, but they must have at least one. Typical target roles include:

- web-server
- app-server
- db-server

Using target roles means the infrastructure in each of your environments doesn't need to be identical. For instance, in the **test** environment, you might be using a single VM to test all of your software, and so you tag that VM with all of the target roles you use in your deployment process. However, in the **production** environment you might have one or more dedicated deployment targets per functional role, for instance, one deployment target for the database server which you would tag with the target role `db-server`, and another deployment target that performs the role of web server and is tagged with the target role `web-server`.

Deployment targets can have more than one role, and more than one deployment target can have the same role.

As you decide on the target roles for your infrastructure, try to name the target roles based on the function the deployment targets will serve rather than describing some attribute of the deployment targets.
