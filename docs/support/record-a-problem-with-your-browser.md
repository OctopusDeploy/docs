---
title: Record a Problem with Octopus Deploy in Your Web Browser
description: This page describes how you can record HTTP traffic between your browser and Octopus Server. This is especially helpful if you are having a problem with Octopus Deploy in your web browser. It includes instructions for taking a screen recording and web traffic capture, for diagnosing issues.
position: 28
---

If you are experiencing a problem with Octopus in your web browser we may ask you to take a recording of the HTTP traffic and the screen and send them to us for analysis.

This kind of analysis is most successful when you can provide us with a full picture of the problem at hand:

- What is going wrong, and what you expected to happen, in your own words.
- A screen recording of the problem happening.
- A recording of the HTTP traffic for the same period.
- The [Octopus Server logs](/docs/support/log-files.md) for the same period.

## Privacy

We recommend some small utilities to record your screen and web traffic. We are only concerned with analyzing the web traffic and how it may have caused the problem. To protect your privacy we will provide you with a secure location to upload the recordings, only use the recordings for the analysis, and then delete all traces of the recordings.

## Getting Prepared

These tools for Windows are both reputable and free. They should be installed and run on the computer you use to access your Octopus Server using your web browser:

1. Download and install [FiddlerCap](http://www.telerik.com/fiddler/fiddlercap) for web traffic recording.
1. Download and install [ScreenToGif](http://www.screentogif.com/) for screen recording.

## Recording

The most important thing is to get a screen and web traffic recording of the problem occurring. If you need to do any set up to make the problem occur, please record that as well.

:::hint
You can usually reduce the frame rate of the screen capture tool to reduce the overall size of the recording. Usually 5 FPS is enough to show the gist of what is going wrong.
:::

1. Start recording the screen.
1. Start recording web traffic.
1. Reproduce the problem including any steps required to make the problem happen (like setting up your deployment process in a certain way).
1. Stop the recordings.
1. Zip the recordings along with any log files which may be helpful for diagnosing the problem (like [Task Logs](/docs/support/get-the-raw-output-from-a-task.md) or [Octopus Server logs](/docs/support/log-files.md)).
1. Upload the zip file bundle to the secure and private share which should have been provided by an Octopus team member, then get back in touch with us - unfortunately we don't get notified of file uploads.

## Analysis

Due to the nature and depth of these investigations it may take a little while to analyze the recording and get to the bottom of what's happening.
