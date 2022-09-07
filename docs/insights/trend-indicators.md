---
title: Trend indicators
description: Insights helps spot performance trends
position: 120
---

Insights provides visibility into performance trends by showing the current metric value and assigning a trend direction. The trends are calculated in four week blocks (28 days). We get an average of the past four weeks (from the current date) and compare that with an average of the previous block.

- If the current value is higher than the previous, the metric is trending up.
- If it is lower than the previous, it is trending down.
- If there was not enough data in the previous block, no trend can be drawn.
- If the two blocks are similar or the same, it is steady.

There are four trend directions, each with their own distinct icon/indicator:

![None trend indicator](images/trend-none.svg) **None**: There is not enough deployment data to draw a trend.

![Steady trend indicator](images/trend-steady.svg) **Steady**: The metric is neither better nor worse.

![Up trend indicator](images/trend-up.svg) **Up**: The metric is higher than it was previously.

![Down trend indicator](images/trend-down.svg) **Down**: The metric is lower than it was previously.

If there is no current value/trend, ![Not enough data indicator](images/trend-no-data.svg) will be shown.

The sentiment of the trend is denoted by its color. For all metrics except deployment frequency, a metric trending up suggests a negative change (red) and trending down suggests a positive change (green). The opposite is true for deployment frequency.

For Lead Time, Change Failure Rate and Mean Time to Recovery, the value shown next to the indicator is the overall average of the four week block. For Deployment Frequency, it is the weekly average of the block.
