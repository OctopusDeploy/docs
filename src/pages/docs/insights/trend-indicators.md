---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Trend indicators
description: Insights helps spot performance trends
navOrder: 120
---

The trend of a metric is shown by a number and an icon indicating the direction. 

The value is calculated by comparing the last 28 days of deployments with the 28 days prior to that (56 days in total). The blocks are calculated from the current instant, so may shift during the day even if no activity occurs. For each of the two blocks, a single average (mean) is calculated and then compared.

The trend indicators are unaffected by the chosen granularity and time period.

## Indicators

![None trend indicator](/docs/insights/images/trend-none.svg) **None**: There are fewer than 10 deployments in the data set in either the current or prior periods.

![Steady trend indicator](/docs/insights/images/trend-steady.svg) **Steady**: The current metric is less than 5% higher or lower than the previous value.

![Up trend indicator](/docs/insights/images/trend-up.svg) **Up**: The metric is higher than it was previously.

![Down trend indicator](/docs/insights/images/trend-down.svg) **Down**: The metric is lower than it was previously.

If there is no current value/trend, ![Not enough data indicator](/docs/insights/images/trend-no-data.svg) will be shown.

## Sentiment

The sentiment of the trend is denoted by its color. For deployment frequency an upwards trend is positive (green) and downwards negative (red). For all other metrics, the opposite holds, upwards is negative (red) and downwards positive (green).

For deployment frequency, the value shown is the average (mean) number of deployments per week in the 28 day block. For all other metrics, it is the overall average (mean) for the block.
