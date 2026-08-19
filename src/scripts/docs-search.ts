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
  type SearchSubResult,
} from './search-engine';
import { pagefindEngine } from './search-engine-pagefind';

const DEBOUNCE_MS = 150;

// Below this, typing is not yet a query.
//
// A one or two character prefix matches an enormous share of the index, and
// because Pagefind fetches every chunk a query touches, that means pulling down
// an enormous share of it: one character costs 975ms and two cost 837ms, against
// 342ms at three and under 200ms beyond that. Almost the whole of the keystroke
// lag lives in the two keystrokes nobody could act on anyway.
//
// It also spares the reader a list assembled from a single letter, which is
// never a useful answer.
const MIN_QUERY_LENGTH = 3;
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
  const announce = dialog.querySelector<HTMLElement>(
    '[data-docs-search-announce]'
  );
  const template = dialog.querySelector<HTMLTemplateElement>(
    '[data-docs-search-row]'
  );
  const sectionTemplate = dialog.querySelector<HTMLTemplateElement>(
    '[data-docs-search-section]'
  );

  // A partially rendered overlay is a bug elsewhere; wiring half of it up would
  // only turn that into a confusing runtime failure.
  if (
    !input ||
    !tabs ||
    !body ||
    !list ||
    !empty ||
    !echo ||
    !announce ||
    !template
  )
    return;

  const demo = dialog.dataset.demoResults;
  const engine: SearchEngine = demo
    ? fixtureEngine(JSON.parse(demo))
    : pagefindEngine(dialog.dataset.indexUrl ?? '/docs/pagefind/');

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

  function drawSection(
    template: HTMLTemplateElement,
    section: SearchSubResult,
    at: number
  ) {
    const item = template.content.cloneNode(true) as DocumentFragment;

    const row = item.querySelector<HTMLAnchorElement>('.docs-search__section')!;
    row.id = `${name}-search-option-${at}`;
    row.href = section.url;
    item.querySelector('.docs-search__section-title')!.textContent =
      section.title;

    return item;
  }

  /**
   * Rows for the whole response, pages and their matched sections interleaved.
   *
   * The running index is what keeps `aria-activedescendant` working: every
   * option needs a unique id, and a page's sections sit between it and the next
   * page rather than being numbered separately.
   */
  function drawAll(results: SearchResult[]) {
    const nodes: DocumentFragment[] = [];
    let at = 0;

    for (const result of results) {
      nodes.push(drawRow(result, at++));
      // No template means an overlay built before sections existed. Dropping them
      // costs the reader nothing beyond the deep link.
      if (!sectionTemplate) continue;
      for (const section of result.sections ?? []) {
        nodes.push(drawSection(sectionTemplate, section, at++));
      }
    }

    return nodes;
  }

  function render(response: Awaited<ReturnType<SearchEngine['search']>>) {
    list!.replaceChildren(...drawAll(response.results));

    for (const tab of facetTabs()) {
      const key = tab.dataset.facet!;
      const count = response.counts[key] ?? 0;
      // A tab with nothing behind it is a dead end, so every section but All
      // hides itself when the query misses it.
      tab.hidden = key !== 'all' && count === 0;
      tab.querySelector('.docs-search__count')!.textContent = `(${count})`;
    }

    // Long enough to have been searched, rather than merely non-empty. A two
    // character query never ran, so the panel should look like it is waiting
    // rather than reporting nothing found.
    const hasQuery = input!.value.trim().length >= MIN_QUERY_LENGTH;
    const hasResults = response.results.length > 0;

    tabs!.hidden = !hasQuery;
    body!.hidden = !hasQuery;
    empty!.hidden = hasResults;
    echo!.textContent = input!.value.trim();
    input!.setAttribute('aria-expanded', String(hasQuery && hasResults));

    // The combobox roles say a listbox exists and which row is active; nothing
    // says what came back. `render` runs once per settled query, so this speaks
    // at the rate the results themselves change rather than per keystroke.
    const found = response.results.length;
    announce!.textContent = !hasQuery
      ? ''
      : found === 0
        ? `No results for ${input!.value.trim()}`
        : `${found} ${found === 1 ? 'result' : 'results'} for ${input!.value.trim()}`;

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
    // Also guarded here, not only in `schedule`: a shared `?q=` link opens
    // straight into a search without going through the debounce.
    if (input!.value.trim().length < MIN_QUERY_LENGTH) {
      render({ results: [], counts: {} });
      return;
    }

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

    // Too short to search: close the panel back down rather than leaving the
    // previous query's results under a field that no longer says that. Deleting
    // back to two characters has to look like starting over, not like a search
    // that returned those rows.
    if (input!.value.trim().length < MIN_QUERY_LENGTH) {
      generation += 1;
      render({ results: [], counts: {} });
      return;
    }

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

  input.addEventListener('input', () => {
    // Ahead of the debounce, so the chunks this query needs are already on
    // their way by the time the search runs.
    engine.preload?.(input!.value);
    schedule();
  });

  dialog.addEventListener('keydown', (event) => {
    // Up and Down only. Home and End belong to the query, which is what an
    // editable combobox does with them, and taking them would leave no way to
    // put the caret back at the start — which is what frees Left for the tabs.
    // Both directions wrap, so the first and last result are one press apart.
    const steps: Record<string, () => number> = {
      ArrowDown: () => active + 1,
      ArrowUp: () => active - 1,
    };

    const step = steps[event.key];
    if (step) {
      const rows = options();
      if (rows.length === 0) return;
      event.preventDefault();
      setActive(step());
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
      const forward = event.key === 'ArrowRight';
      const strip = facetTabs().filter((tab) => !tab.hidden);
      if (strip.length < 2) return;

      const current = document.activeElement;
      const onTab = current instanceof HTMLElement && current.dataset.facet;

      // From the input, only once the caret has nowhere left to go. Anywhere
      // else in the query these keys are how you edit it, and taking them would
      // cost more than the tabs are worth.
      if (!onTab) {
        if (current !== input) return;
        const at = input!.selectionStart;
        if (at === null || at !== input!.selectionEnd) return;
        if (forward ? at !== input!.value.length : at !== 0) return;
      }

      const from = onTab
        ? strip.indexOf(current as HTMLElement)
        : strip.findIndex((tab) => tab.dataset.facet === facet);
      if (from === -1) return;

      event.preventDefault();
      const next =
        strip[(from + (forward ? 1 : -1) + strip.length) % strip.length];
      selectTab(next.dataset.facet!);
      // Focus follows selection on a tab strip, but only when the strip already
      // had it — driving from the input has to leave the query editable.
      if (onTab) next.focus();
      run();
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
  const navigator = window.navigator as Navigator & {
    userAgentData?: { platform: string };
  };
  const isApple = navigator.userAgentData
    ? navigator.userAgentData.platform === 'macOS'
    : (navigator.platform || navigator.userAgent).includes('Mac');

  document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() !== 'k') return;
    if (isApple ? !event.metaKey : !event.ctrlKey) return;
    event.preventDefault();
    open();
  });

  // Engines that are cheap to start say so; the rest wait for the overlay. See
  // `eager` on `SearchEngine` for why this is not the same answer for both.
  if (engine.eager) engine.warm?.();

  // A shared `?q=` link opens straight into results.
  const q = new URLSearchParams(window.location.search).get('q');
  if (q) open(q);
}

document
  .querySelectorAll<HTMLDialogElement>('[data-docs-search]')
  .forEach(setup);
