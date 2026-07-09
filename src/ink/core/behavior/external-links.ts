// Security: open off-host links in a new tab with rel=noopener, without clobbering
// links that already declare their own target/rel. Self-contained (no external deps)
// so the Ink package works in any Astro repo.
export function setExternalLinkAttributes(root: ParentNode = document): void {
  root
    .querySelectorAll<HTMLAnchorElement>('a[href^="http"]')
    .forEach((link) => {
      let destination: URL;
      try {
        destination = new URL(link.href);
      } catch {
        return;
      }
      if (destination.hostname === window.location.hostname) return;
      if (!link.target) link.setAttribute('target', '_blank');
      if (!link.rel) link.setAttribute('rel', 'noopener');
    });
}
