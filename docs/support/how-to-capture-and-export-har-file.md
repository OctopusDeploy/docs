---
title: Capture and export an HAR file
description: How to capture an HAR file to help the Octopus team diagnose problems when something unexpected happens.
position: 17
---

When something goes wrong in Octopus we may ask you to provide an HAR file to help us diagnose the problem. This file captures a web browser's interaction with a site and may provide insight into where and why a specific request is failing.

:::warning HAR files may contain sensitive data as they include any pages you downloaded while recording and associated cookies. Depending on what has been recorded, this may allow someone with your HAR file to impersonate accounts or any other personal information submitted during recording.
::: 

The following instructions are provided for each browser, starting from the Octopus web portal:
* [Chrome](#chrome)
* [Firefox](#firefox)
* [Safari](#safari)
* [Edge](#edge)

## Chrome {#chrome}
1. Press F12 to open developer tools.
2. Click the **Network** tab in the panel after it loads.
3. Click the **Record** (round gray button) in the upper left of the tab, it should turn red to indicate the session is being recorded.
4. Check the **Preserve log** box.
5. Click the **Clear** button (circle with a slash through it) to remove any existing network recordings in the current session.
6. Follow the same steps you did initially to reproduce the issue or unexpected behavior.
7. Once you have completed the reproduction steps, click **Download**.
8. Save the file to your computer, selecting **Save as HAR with Content**.

## Firefox {#firefox}
1. Press F12 to open developer tools.
3. Click the **Network** tab in the panel after it loads.
4. Click the **Clear** button (trash bin in upper left) to remove any undesired existing network recording in the current session. Recording should start automatically.
6. Follow the same steps you did initially to reproduce the issue or unexpected behavior.
7. Right click anywhere under the **File** column and select **Save all as HAR**, saving the file to your computer.

## Safari {#safari}
1. Click on the **Develop** menu and select **Show Web Inspector**.
2. Click the **Network** tab. Recording should start automatically.
3. Follow the same steps you did initially to reproduce the issue or unexpected behavior.
4. Click **Export** on the far right of the Network tab, saving the file to your computer.

## Edge {#edge}
1. Press F12 to open developer tools.
2. Click the **Network** tab in the panel after it loads. Recording should start automatically.
3. Follow the same steps you did initially to reproduce the issue or unexpected behavior.
4. Click **Export HAR** (down arrow in upper right), saving the file to your computer.


Once you have an HAR file, just upload it to the link that we'll have provided you.
