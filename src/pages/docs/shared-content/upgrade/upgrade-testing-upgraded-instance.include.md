### Testing the upgraded instance

It is up to you to decide on the level of testing you wish to perform on your upgraded instance.  At a bare minimum, you should:

- Do test deployments on projects representative of your instance.  For example, if you have IIS deployments, do some IIS deployments.  If you have Java deployments, do some Java deployments.
- Check previous deployments, ensure all the logs and artifacts appear.
- Ensure all the project and tenant images appear.
- Run any custom API scripts to ensure they still work.
- Verify a handful of users can log in, and that their permissions are similar to before.
- Build server integration; ensure all existing build servers can push to the upgraded server.

We do our best to ensure backward compatibility, but it impossible to cover every user scenario for every possible configuration.  If something isn't working, please capture all relevant screenshots and logs and send them over to [support@octopus.com](mailto:support@octopus.com) for further investigation.
