---
title: Switch from single-threaded workstation GC to concurrent server GC
position: 10
---


This page is for users that are experiencing Octopus server crashes with the below error:

```
Application: Octopus.Server.exe
Framework Version: v4.0.30319
Description: The process was terminated due to an unhandled exception.
Exception Info: System.Reflection.TargetInvocationException
Stack:
   at System.RuntimeMethodHandle.InvokeMethod(System.Object, System.Object[], System.Signature, Boolean)
   at System.Reflection.RuntimeMethodInfo.UnsafeInvokeInternal(System.Object, System.Object[], System.Object[])
   at System.Delegate.DynamicInvokeImpl(System.Object[])
   at Raven.Client.Linq.LinqPathProvider.GetValueFromExpressionWithoutConversion(System.Linq.Expressions.Expression, System.Object ByRef)
   at Raven.Client.Linq.LinqPathProvider.GetValueFromExpression(System.Linq.Expressions.Expression, System.Type)
```


This guide explains how you can reduce the occcurence of these crashes by enabling concurrent server Garbage Collection instead of single-threaded/concurrent workstation Garbage Collection.

:::hint
This step-by-step guide is more of a mitigation, rather than a solution, as we have been unable to pinpoint the exact cause of these crashes.


More information can be found in the [Sporadic Crashes](https://github.com/OctopusDeploy/Issues/issues/1099) GitHub issue
:::

```
Step-by-step guide
```


Follow these steps to enable concurrent server Garbage Collection, instead of single-threaded workstation Garbage Collection.

1. Open up the `Octopus.Server.exe.config` where your Octopus Server is installed (i.e.`C:\Program Files\OctopusDeploy\Octopus)`.
2. Find the `&lt;runtime&gt;` tag, if it contains `&lt;gcConcurrent /&gt;`, remove the tag

```powershell
<runtime>
  <gcConcurrent enabled="false" />
  ...
</runtime>
```
3. In the `&lt;runtime&gt;` tag, add the following, `&lt;gcServer enabled=&quot;true&quot; /&gt;`

```powershell
<runtime>
  <gcServer enabled="true" />
  ...
</runtime>
```
4. Finally, restart your Octopus service.
5. If you are still experiencing these crashes, you can also try to remove both the `&lt;gcServer /&gt;` and `&lt;gcConcurrent /&gt;` tags which will enable concurrent workstation GC.
