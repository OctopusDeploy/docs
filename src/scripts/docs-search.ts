// Behaviour for the search overlay. Listeners are delegated on `document` and
// elements are found by `data-*` attribute, the way `menu.ts` does it.
//
// The keyboard model is a combobox: focus never leaves the input, and
// `aria-activedescendant` is what moves down the list. That is what lets you
// keep typing to refine a query without first tabbing back out of the results.
//
// Each dialog carries a name in `data-docs-search`, and a trigger opens the one
// it names. The layout's own overlay is `site`; the component showcase puts a
// second one on the same page, which is why any of this is scoped at all.

import {
  fixtureEngine,
  type SearchEngine,
  type SearchResult,
} from './search-engine';
import { legacyEngine } from './search-engine-legacy';

const DEBOUNCE_MS = 150;
const SITE_SEARCH = 'site';

function setup(dialog: HTMLDialogElement) {
  const name = dialog.dataset.docsSearch || SITE_SEARCH;

  const input = dialog.querySelector<HTMLInputElement>(
    '[data-docs-search-input]'
  );
  const tabs = dialog.querySelector<HTMLElement>('[data-docs-search-tabs]');
  const body = dialog.querySelector<HTMLElement>('[data-docs-search-body]');
  const list = dialog.querySelector<HTMLElement>('[data-docs-search-results]');
  const empty = dialog.querySelector<HTMLElement>('[data-docs-search-empty]');
  const echo = dialog.querySelector<HTMLElement>('[data-docs-search-echo]');
  const template = dialog.querySelector<HTMLTemplateElement>(
    '[data-docs-search-row]'
  );

  // A partially rendered overlay is a bug elsewhere; wiring half of it up would
  // only turn that into a confusing runtime failure.
  if (!input || !tabs || !body || !list || !empty || !echo || !template) return;

  const demo = dialog.dataset.demoResults;
  const engine: SearchEngine = demo
    ? fixtureEngine(JSON.parse(demo))
    : legacyEngine(dialog.dataset.indexUrl ?? '/docs/search.json');

  let facet = 'all';
  let active = -1;
  let debounce = 0;
  // Every search is a race the newest one has to win, or a slow early query can
  // land after a later one and redraw the list with stale results.
  let generation = 0;

  const options = () => [
    ...list.querySelectorAll<HTMLElement>('[role="option"]'),
  ];

  const facetTabs = () => [
    ...tabs.querySelectorAll<HTMLElement>('[data-facet]'),
  ];

  function setActive(next: number) {
    const rows = options();
    if (rows.length === 0) {
      active = -1;
      input!.removeAttribute('aria-activedescendant');
      return;
    }

    active = (next + rows.length) % rows.length;

    rows.forEach((row, index) => {
      const isActive = index === active;
      row.toggleAttribute('data-active', isActive);
      row.setAttribute('aria-selected', String(isActive));
      if (isActive) {
        input!.setAttribute('aria-activedescendant', row.id);
        row.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  function drawRow(result: SearchResult, at: number) {
    const item = template.content.cloneNode(true) as DocumentFragment;

    const row = item.querySelector<HTMLAnchorElement>('.docs-search__row')!;
    row.id = `${name}-search-option-${at}`;
    row.href = result.url;

    item
      .querySelector('.docs-search__row-icon')!
      .classList.add(`docs-search__row-icon--${result.kind}`);
    item.querySelector('.docs-search__row-title')!.textContent = result.title;
    // The engine escapes the text it highlights, so the only tags that can reach
    // here are its own <mark>s.
    item.querySelector('.docs-search__row-excerpt')!.innerHTML = result.excerpt;
    item.querySelector('.docs-search__row-trail')!.textContent =
      result.breadcrumb.join(' / ');

    return item;
  }

  function render(response: Awaited<ReturnType<SearchEngine['search']>>) {
    list!.replaceChildren(...response.results.map(drawRow));

    for (const tab of facetTabs()) {
      const key = tab.dataset.facet!;
      const count = response.counts[key] ?? 0;
      // A tab with nothing behind it is a dead end, so every section but All
      // hides itself when the query misses it.
      tab.hidden = key !== 'all' && count === 0;
      tab.querySelector('.docs-search__count')!.textContent = `(${count})`;
    }

    const hasQuery = input!.value.trim().length > 0;
    const hasResults = response.results.length > 0;

    tabs!.hidden = !hasQuery;
    body!.hidden = !hasQuery;
    empty!.hidden = hasResults;
    echo!.textContent = input!.value.trim();
    input!.setAttribute('aria-expanded', String(hasQuery && hasResults));

    setActive(0);
  }

  function selectTab(key: string) {
    facet = key;
    for (const tab of facetTabs()) {
      const selected = tab.dataset.facet === key;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    }
  }

  async function run() {
    const mine = ++generation;
    let response = await engine.search(input!.value, facet);
    if (mine !== generation) return;

    // A narrowed tab the new query has nothing under would leave the panel
    // looking empty while other sections hold results, so fall back to All.
    if (facet !== 'all' && (response.counts[facet] ?? 0) === 0) {
      selectTab('all');
      response = await engine.search(input!.value, facet);
      if (mine !== generation) return;
    }

    render(response);
  }

  function schedule() {
    window.clearTimeout(debounce);
    debounce = window.setTimeout(run, DEBOUNCE_MS);
  }

  function open(seed?: string) {
    if (dialog.open) return;
    if (seed !== undefined) input!.value = seed;
    dialog.showModal();
    input!.focus();
    // Pull the index down while the first word is still being typed. It is
    // fetched on demand rather than on page load, so without this the first
    // search of a visit waits on the whole download.
    engine.warm?.();
    // A seeded open has a query to run; an empty one waits for the first key.
    if (input!.value.trim()) run();
  }

  // --- Triggers ------------------------------------------------------------
  // The nav trigger stays a real <input> inside a form that GETs a web search,
  // so with scripting off it still submits. Opening happens on click and key,
  // never on focus: the dialog hands focus back to the trigger when it closes,
  // and a focus handler would reopen it on the way out.

  const opensThis = (target: EventTarget | null) => {
    if (!(target instanceof Element)) return false;
    const trigger = target.closest<HTMLElement>('[data-docs-search-trigger]');
    if (!trigger) return false;
    return (trigger.dataset.docsSearchTrigger || SITE_SEARCH) === name;
  };

  // Click rather than pointerdown, so an anchor trigger (the old header's mobile
  // search link) is intercepted before it navigates.
  document.addEventListener('click', (event) => {
    if (!opensThis(event.target)) return;
    event.preventDefault();
    open();
  });

  document.addEventListener('keydown', (event) => {
    if (!opensThis(event.target)) return;

    if (event.key === 'Enter' || event.key === ' ') {
      // Enter would otherwise submit the fallback form and leave the site.
      event.preventDefault();
      open();
      return;
    }

    // Typing straight into the trigger carries the character across rather than
    // swallowing it.
    const isPrintable =
      event.key.length === 1 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.altKey;
    if (isPrintable) {
      event.preventDefault();
      open(event.key);
    }
  });

  // --- Inside the dialog ---------------------------------------------------

  input.addEventListener('input', schedule);

  dialog.addEventListener('keydown', (event) => {
    const steps: Record<string, (last: number) => number> = {
      ArrowDown: () => active + 1,
      ArrowUp: () => active - 1,
      Home: () => 0,
      End: (last) => last,
    };

    const step = steps[event.key];
    if (step) {
      const rows = options();
      if (rows.length === 0) return;
      event.preventDefault();
      setActive(step(rows.length - 1));
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      options()[active]?.click();
      return;
    }

    // Left/Right move between tabs only while a tab has focus, so they stay
    // available for editing the query the rest of the time.
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      const current = document.activeElement;
      if (!(current instanceof HTMLElement) || !current.dataset.facet) return;

      const strip = facetTabs().filter((tab) => !tab.hidden);
      const at = strip.indexOf(current);
      if (at === -1) return;

      event.preventDefault();
      const delta = event.key === 'ArrowRight' ? 1 : -1;
      strip[(at + delta + strip.length) % strip.length].focus();
    }
  });

  tabs.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const tab = target.closest<HTMLElement>('[data-facet]');
    if (!tab) return;

    selectTab(tab.dataset.facet!);
    run();
  });

  dialog
    .querySelector('[data-docs-search-close]')
    ?.addEventListener('click', () => dialog.close());

  // A modal dialog fills the viewport, so a click outside the panel still lands
  // on the dialog itself. That is the backdrop as far as the user is concerned.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener('close', () => {
    // Leave the query visible in the bar that opened it, so the page still shows
    // what was searched for.
    for (const trigger of document.querySelectorAll<HTMLElement>(
      '[data-docs-search-trigger]'
    )) {
      if (
        trigger instanceof HTMLInputElement &&
        (trigger.dataset.docsSearchTrigger || SITE_SEARCH) === name
      ) {
        trigger.value = input!.value;
      }
    }
  });

  // Chords and shared links belong to the page's own search, not to a demo
  // instance sitting in an article.
  if (name !== SITE_SEARCH) return;

  // Cmd+K on Apple platforms, Ctrl+K everywhere else.
  const platform =
    (navigator as Navigator & { userAgentData?: { platform: string } })
      .userAgentData?.platform ?? navigator.platform;
  const isApple = /Mac|iPhone|iPad/.test(platform || navigator.userAgent);

  document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() !== 'k') return;
    if (isApple ? !event.metaKey : !event.ctrlKey) return;
    event.preventDefault();
    open();
  });

  // A shared `?q=` link opens straight into results.
  const q = new URLSearchParams(window.location.search).get('q');
  if (q) open(q);
}

document
  .querySelectorAll<HTMLDialogElement>('[data-docs-search]')
  .forEach(setup);
