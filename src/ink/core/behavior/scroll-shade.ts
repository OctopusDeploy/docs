// Scroll-edge shades. ONE implementation for every container that shows fade
// scrims when content is scrolled out of view (the sidebar nav, the search
// results dropdown, ...). Contract: mark the container with [data-scroll-shade];
// the scrolling element is a [data-scroll-shade-viewport] child, or the
// container itself. The behavior keeps data-at-top / data-at-bottom current;
// CSS reveals the matching scrim when the value is "false". No-op without the
// markup.

type ShadeViewport = HTMLElement & { __inkShadeInit?: boolean };

export function observeScrollShades(): void {
  document
    .querySelectorAll<HTMLElement>('[data-scroll-shade]')
    .forEach((host) => {
      const viewport = (host.querySelector<HTMLElement>(
        '[data-scroll-shade-viewport]'
      ) ?? host) as ShadeViewport;
      if (viewport.__inkShadeInit) return;
      viewport.__inkShadeInit = true;

      const update = () => {
        host.setAttribute(
          'data-at-top',
          viewport.scrollTop <= 1 ? 'true' : 'false'
        );
        host.setAttribute(
          'data-at-bottom',
          viewport.scrollTop + viewport.clientHeight >=
            viewport.scrollHeight - 1
            ? 'true'
            : 'false'
        );
      };

      viewport.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      // Content can change under the scroller (e.g. search results rendering).
      new MutationObserver(update).observe(viewport, { childList: true });
      update();
    });
}
