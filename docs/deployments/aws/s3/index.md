---
title: Upload to AWS S3 template
description: Upload to AWS S3 template.
---
Octopus supports the uploading an entire package or the files contained within a package through the `Upload a package to an AWS S3 bucket` step. This step uploads the package or the file(s) contained within the package
using the AWS managed by Octopus.

The following instructions can be used to configure the `Upload a package to an AWS S3 bucket` step.

## Add the upload a package to an AWS S3 bucket step

Add the `Upload a package to an AWS S3 bucket` step to the project, and give it a name.

![Upload s3 step](upload-s3-step.png "width=500")

### AWS section

Select the variable that references the `Amazon Web Services Account` under the `AWS Account` section or select whether you wish to execute using the service role of an EC2 instance. If you don't have an `AWS Account Variable` yet, check our [documentation on how to create one](/docs/projects/variables/aws-account-variables.md).

![AWS Account](step-aws-account.png "width=500")

The supplied account can optionally be used to assume a different AWS service role. This can be used to run the AWS commands with a role that limits the services that can be affected.

![AWS Role](step-aws-role.png "width=500")

:::hint
If you select `Yes` to `Execute using the AWS service role for an EC2 instance`, you do not need an AWS account or account variable. Instead the AWS service role for the EC2 instance executing the deployment will be used. See the [AWS documentation](https://oc.to/AwsDocsRolesTermsAndConcepts) for more information on service roles.
:::

### Package section

Under the `Package section`, define how the target package and the associated file uploads should behave for the step. The entire package can be uploaded or individual file(s) from the package can be specified for upload.

 ![S3 target options](upload-s3-target-options.png "width=500")

:::hint
The [Github feed](/docs/packaging-applications/package-repositories/github-feeds.md) works well with the upload to S3 step when no build process is involved and content needs to be pushed to S3 and versioned separately.
:::

### Entire package

By default, the entire package will be uploaded to the S3 bucket untouched with the given bucket key, metadata, and tags.

![Entire package options](entire-package-options.png "width=500")

#### Variable Substitution File Patterns

:::hint
The **Variable Substitution File Patterns field** for the **Upload a package to an AWS S3 bucket** step was added in Octopus **2022.2**.
:::

A newline-separated list of file names to transform, relative to the package contents. Extended wildcard syntax is supported. E.g., `Notes.txt`, `Config\*.json`, `**\specific-folder\*.config`.
This field supports extended template syntax. Conditional `if` and `unless`:
```text
#{if MyVar}...#{/if}
```

Iteration over variable sets or comma-separated values with `each`:
```text
#{each mv in MyVar}...#{mv}...#{/each}
```

#### Structured Variable File Patterns

:::hint
The **Structured Variable File Patterns** field for the **Upload a package to an AWS S3 bucket** step was added in Octopus **2022.2**.
:::

A list of files to perform structured variable substitution on. 

Target files need to be newline-seperated, relative to the package contents. Extended wildcard syntax is supported. E.g., `appsettings.json`, `Config\*.xml`, `**\specific-folder\*.yaml`. Learn more about the [Structured Configuration Variables](/docs/projects/steps/configuration-features/structured-configuration-variables-feature.md) feature and view [Structured Variables](/docs/projects/steps/configuration-features/structured-configuration-variables-feature.md#StructuredConfigurationVariablesFeature-VariableReplacement) examples.

#### Use filename with embedded content hash

:::hint
The option **Use filename with embedded content hash** for the **Upload a package to an AWS S3 bucket** was added in Octopus **2022.2**.
:::

![Use filename with embedded content hash options](filename-with-content-hash-option.png "width=500")

Select this option to allow the hash of the contents of the package to be included in the resulting bucket key. 

The hash should appear before the extension in the format of `filename@hash.extension`. The hash value is based on the contents of the zip package and is calculated after any variable substitutions/replacements.

Additionally, the hash value is available as a variable named `Octopus.Action.Package.PackageContentHash` to be used as a custom key. Note that this variable can only be used in this step.

### Individual files from the package

If you have chosen to upload individual files from the package, you will be presented with an additional `Files Section` where you can add one or more file selections where each selection can be for a single file or for multiple files depending on your use case.

#### Adding and removing file selections

A new file selection can be added by clicking on the `Add Another File Selection` button located under the `Files Section`.
![Add file selection](add-file-selection.png "width=500")

A file selection can be removed by expanding the appropriate selection and clicking on the `Remove File Selection` button.
![Remove file selection](remove-file-selection.png "width=500")

:::warning
File selections aren't formally removed or added until the step has been saved.
:::

#### Bucket key prefix

A prefix delimited with forward slash `/` characters is seen in S3 as folders.
Here are a few examples to help you get those files in the right folder structure:

| Package files            | S3 destination    | Prefix            |
| ------------------------ | ----------------- | ----------------- |
| \*\*/\*                  | /Content/External | `Content/External/` |
| Images/\*\*/\*           | /Content/Images   | `Content/Images/`   |
| Resource/\*\*/Special/\*\*/\* | /Files/\*\*/Special | `Files/` |

#### Single file selection
The single file selection lets you upload a single file to an S3 bucket which must exist within the package. If the file is not found an associated error will be raised. This selection also allows for the bucket key to be explicit.

![Single file selection](single-file-selection.png "width=500")

#### Bucket keys
A custom key delimited with forward slash `/` characters is seen in S3 as folders.
Here are a few examples to help you get those files in the right structure:

| Package file | S3 destination             | Custom key                  |
| ------------ | -------------------------- | --------------------------- |
| Logo.gif     | /Images/Logos/Logo.gif     | `Images/Logos/Logo.gif`     |
| xyz.gif      | /Images/Animals/Girafe.gif | `Images/Animals/Girafe.gif` |

:::hint
The bucket key used for a single file selection will uniquely identify the file within the bucket and will be used verbatim. That is, if you wish for the file to have an extension you should provide it as part of the bucket key as it is effectively renaming the file as part of the upload.
:::

#### Multiple file selections
Multiple file selections allow one or more files from the package to be uploaded to the S3 bucket using globbing patterns. The behavior is slightly different from single file selections as you have less control over the bucket key which will be used while no error will be raised if *no* files matched the globbing pattern. Files uploaded will have the bucket key prefix added to the file name. That is a file matched by the globbing pattern `path/to/file/File.template` with a prefix of `templates/` will be uploaded with the bucket key `templates/File.template`.

![Multiple file selections](multiple-file-selections.png "width=500")

:::hint
Any metadata and tags provided will be applied to all files uploaded to the bucket.
:::

### Metadata and tags
Metadata and tags can be provided for the package, for file selections for the package, or for individual files. See the [AWS documentation](https://oc.to/AwsS3UsingMetadata) for more information regarding the usage of metadata.

### Canned ACL
The canned ACL must be specified when uploading files as it dictates the permissions for a file within the S3 bucket. Please see the [AWS documentation](https://oc.to/AwsS3CannedAcl) for information regarding Canned ACLs.

### Storage class
The storage class for files specify the performance access requirements for a file.
Please see the [AWS documentation](https://oc.to/AwsS3StorageClasses) for more information regarding Storage classes.

### Upload behavior
Uploads are skipped if the content hash is the same as an existing object in the target bucket. This is done to avoid unnecessary uploads and may require special care to be taken when using custom bucket
keys.

:::hint
This behavior will be configurable in a future release to provide additional flexibility.
:::

### Output variables

:::hint
Output variables for the **Upload a package to an AWS S3 bucket** were added in Octopus **2022.2**.
:::

Octopus will create several output variables storing the properties of any uploaded files. The values can then be used in subsequent steps to access the uploaded files.

Here is the list of variables created after **a single file** has been uploaded:

| Variable                                                 | Description                                                                                                      | Example                                                             |
|----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| Octopus.Action[`step-name`].Output.Package.Key           | The key to the uploaded file, including any prefix which may have been specified                                 | `Octopus.Action[Upload package to S3].Output.Package.Key`           |
| Octopus.Action[`step-name`].Output.Package.S3Uri         | The S3 Uri to the uploaded file, of the form `s3://bucket-name/key`                                              | `Octopus.Action[Upload package to S3].Output.Package.S3Uri`         |
| Octopus.Action[`step-name`].Output.Package.Uri           | The virtual-hosted-style Uri to the uploaded file, of the form `https://bucket-name.s3.region.amazonaws.com/key` | `Octopus.Action[Upload package to S3].Output.Package.Uri`           |
| Octopus.Action[`step-name`].Output.Package.Arn           | The ARN for the uploaded file, of the form `arn:aws:s3:::bucket-name/key`                                        | `Octopus.Action[Upload package to S3].Output.Package.Arn`           |
| Octopus.Action[`step-name`].Output.Package.ObjectVersion | The version of the object, if applicable. (`Not versioned` is returned if the object doesn't have a version)     | `Octopus.Action[Upload package to S3].Output.Package.ObjectVersion` |


Here is the list of variables created after **multiple files** have been uploaded:

| Variable                                                              | Description                                                                                                      | Example                                                                       |
|-----------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| Octopus.Action[`step-name`].Output.Package.Key[`file-name`]           | The key to the uploaded file, including any prefix which may have been specified                                 | `Octopus.Action[Upload package to S3].Output.Package.Key[Logo.gif]`           |
| Octopus.Action[`step-name`].Output.Package.S3Uri[`file-name`]         | The S3 Uri to the uploaded file, of the form `s3://bucket-name/key`                                              | `Octopus.Action[Upload package to S3].Output.Package.S3Uri[Logo.gif]`         |
| Octopus.Action[`step-name`].Output.Package.Uri[`file-name`]           | The virtual-hosted-style Uri to the uploaded file, of the form `https://bucket-name.s3.region.amazonaws.com/key` | `Octopus.Action[Upload package to S3].Output.Package.Uri[Logo.gif]`           |
| Octopus.Action[`step-name`].Output.Package.Arn[`file-name`]           | The ARN for the uploaded file, of the form `arn:aws:s3:::bucket-name/key`                                        | `Octopus.Action[Upload package to S3].Output.Package.Arn[Logo.gif]`           |
| Octopus.Action[`step-name`].Output.Package.ObjectVersion[`file-name`] | The version of the object, if applicable. (`Not versioned` is returned if the object doesn't have a version)     | `Octopus.Action[Upload package to S3].Output.Package.ObjectVersion[Logo.gif]` |

## Error messages
The AWS deployment steps include a number of unique error codes that may be displayed in the output if there was an error. Below is a list of the errors and any additional troubleshooting steps that can be taken to rectify them.

### AWS-S3-ERROR-0001
The AWS account used to perform the operation does not have the required permissions to describe the CloudFormation stack. This means that the step is not able to generate any output variables.

An exception was thrown while contacting the AWS API.

This can happen when accessing AWS via a proxy, and the response from AWS indicated an error. The response body is printed to the logs in these cases.

An incorrect AWS region can result in this error. Ensure that the region matches one from the [AWS documentation](https://oc.to/AWSRegions).

### AWS-S3-ERROR-0002
The AWS account used to perform the operation does not have the required permissions to upload to the bucket.

An exception was thrown while contacting the AWS API.

This can happen when accessing AWS via a proxy, and the response from AWS indicated an error. The response body is printed to the logs in these cases.

An incorrect AWS region can result in this error. Ensure that the region matches one from the [AWS documentation](https://oc.to/AWSRegions).

### AWS-S3-ERROR-0003
An error occurred uploading a file to a bucket possibly due to metadata. Specified value has invalid HTTP header characters.

This can happen if the metadata key and or value has invalid characters. Ensure characters as per the [AWS documentation](https://oc.to/AwsS3UsingMetadata) is not used as part of
metadata.
