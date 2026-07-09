// Convert authored `<details data-group="id">` siblings into an accessible ARIA
// tablist (WAI-ARIA manual-activation tabs pattern). Self-contained, no external deps
// so the Ink package works in any Astro repo. A no-op when no `details[data-group]`
// exist, and naturally idempotent (it consumes the source <details> elements), so it is
// safe to run unconditionally. Styling lives in styles/components.css (`.tab-list` / `[role=tab]` /
// `[role=tabpanel]`); the markup contract is a shared agreement with the content author.

class TabsManual {
  private tabs: HTMLElement[];
  private panels: (HTMLElement | null)[] = [];
  private firstTab: HTMLElement | null = null;
  private lastTab: HTMLElement | null = null;

  constructor(tablist: HTMLElement) {
    this.tabs = Array.from(tablist.querySelectorAll<HTMLElement>('[role=tab]'));
    this.tabs.forEach((tab) => {
      const panel = document.getElementById(
        tab.getAttribute('aria-controls') ?? ''
      );
      tab.tabIndex = -1;
      tab.setAttribute('aria-selected', 'false');
      this.panels.push(panel);
      tab.addEventListener('keydown', (e) => this.onKeydown(e, tab));
      tab.addEventListener('click', () => this.setSelected(tab));
      if (!this.firstTab) this.firstTab = tab;
      this.lastTab = tab;
    });
    if (this.firstTab) this.setSelected(this.firstTab);
  }

  private setSelected(current: HTMLElement): void {
    this.tabs.forEach((tab, i) => {
      const selected = tab === current;
      tab.setAttribute('aria-selected', String(selected));
      if (selected) tab.removeAttribute('tabindex');
      else tab.tabIndex = -1;
      this.panels[i]?.classList.toggle('is-hidden', !selected);
    });
  }

  private moveFocus(tab: HTMLElement): void {
    tab.focus();
    this.setSelected(tab);
  }

  private onKeydown(event: KeyboardEvent, tab: HTMLElement): void {
    const index = this.tabs.indexOf(tab);
    let handled = true;
    switch (event.key) {
      case 'ArrowLeft':
        this.moveFocus(
          tab === this.firstTab ? this.lastTab! : this.tabs[index - 1]
        );
        break;
      case 'ArrowRight':
        this.moveFocus(
          tab === this.lastTab ? this.firstTab! : this.tabs[index + 1]
        );
        break;
      case 'Home':
        this.moveFocus(this.firstTab!);
        break;
      case 'End':
        this.moveFocus(this.lastTab!);
        break;
      default:
        handled = false;
    }
    if (handled) {
      event.stopPropagation();
      event.preventDefault();
    }
  }
}

export function enhanceDetailGroups(root: ParentNode = document): void {
  const groups = new Set<string>();
  root.querySelectorAll<HTMLElement>('details[data-group]').forEach((d) => {
    if (d.dataset.group) groups.add(d.dataset.group);
  });

  groups.forEach((group) => {
    const participants = Array.from(
      root.querySelectorAll<HTMLElement>(`details[data-group='${group}']`)
    );
    if (participants.length === 0) return;

    const parent = participants[0].parentNode;
    if (!parent) return;

    const tablist = document.createElement('div');
    tablist.setAttribute('role', 'tablist');
    tablist.className = 'tab-list';
    parent.insertBefore(tablist, participants[0]);

    participants.forEach((detail, i) => {
      const summary = detail.querySelector('summary');
      const id = `ink-tab-${group}-${i}`;
      const panelId = `ink-tabpanel-${group}-${i}`;

      const panel = document.createElement('div');
      panel.setAttribute('tabindex', '0');
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', id);
      panel.id = panelId;

      // Move the authored nodes (everything except <summary>) into the panel rather
      // than round-tripping through innerHTML - no HTML reparse, no injection sink, and
      // nested nodes/state are preserved. The source <details> is removed afterwards.
      const content = document.createElement('div');
      Array.from(detail.childNodes).forEach((node) => {
        if (node.nodeName === 'SUMMARY') return;
        content.appendChild(node);
      });
      panel.appendChild(content);
      parent.insertBefore(panel, participants[0]);

      const tab = document.createElement('button');
      tab.id = id;
      tab.type = 'button';
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      tab.setAttribute('aria-controls', panelId);

      const label = document.createElement('span');
      label.className = 'focus';
      label.textContent = summary?.textContent ?? '';
      tab.appendChild(label);
      tablist.appendChild(tab);
    });

    new TabsManual(tablist);
    participants.forEach((detail) => detail.parentNode?.removeChild(detail));
  });
}
