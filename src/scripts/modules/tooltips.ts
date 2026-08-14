const SELECTOR = '[data-tooltip]';

function addTooltipSpan(host: Element): void {
  let bubble = host.querySelector(':scope > .tooltip');
  if (!bubble) {
    bubble = document.createElement('span');
    bubble.className = 'tooltip';
    bubble.setAttribute('aria-hidden', 'true');
    host.append(bubble);
  }
  bubble.textContent = (host as HTMLElement).dataset.tooltip ?? '';
}

export function enhanceTooltips(): void {
  // Every tooltip that exists now needs an associated span
  document.querySelectorAll(SELECTOR).forEach(addTooltipSpan);

  // As do any that are dynamically added later
  new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === 'attributes' && record.target instanceof Element) {
        addTooltipSpan(record.target);
      }
      for (const node of record.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches(SELECTOR)) addTooltipSpan(node);
        node.querySelectorAll(SELECTOR).forEach(addTooltipSpan);
      }
    }
  }).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['data-tooltip'],
  });
}
