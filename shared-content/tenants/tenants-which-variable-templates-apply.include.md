When you connect a tenant to a project, variable templates defined by the project itself, or by included library variable sets, will be required by the tenant.

1. Library variable templates will be collected once - they are considered to be constant for the tenant. Think of these like "custom fields" for your tenants.
1. Project variable templates will be collected once for each project/environment combination the tenant is connected to. Think of these like database connection settings for the specific tenant/project/environment combination.

By carefully designing your variable templates you can implement complex multi-tenant deployment scenarios.