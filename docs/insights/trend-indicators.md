---
title: Trend indicators
description: Trends
position: 120
---

There are four trend directions, each with their own distinct icon:

- None
  - There is not enough deployment data to draw a trend
- Steady
  - The metric is neither better nor worse.
- Up
  - The metric is higher than it was previously and is trending up. A metric trneding up suggests a negative change in all metrics except Deployment Frequency.
- Down
  - The metric is lower than it was previously and is trending down. A metric trending down suggests a positive change in all metrics except Deployment Frequency.

The trends are calculated in four week blocks (28 days). We get an average of the past four weeks (from the current date) and compare that with an average of the previous block.

- If the current value is higher than the previous, the metric is trending up.
- If it is lower than the previous, it is trending down.
- If there was not enough data in the previous block, no trend can be drawn.
- If the two blocks are similar or the same, it is steady.

For Lead Time, Change Failure Rate and Mean Time to Recovery, the value shown next to the indicator is the overall average of the four week block. For Deployment Frequency, it is the weekly average of the block.
