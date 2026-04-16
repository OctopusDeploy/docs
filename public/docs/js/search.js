// @ts-check

import { qs } from './modules/query.js';
import { raiseEvent } from './modules/events.js';
import { explode, highlight } from './modules/string.js';

// @ts-ignore
const f = window.site_features ?? {};

/**
 * @param {string[]} settings
 * @param {string} option
 * @returns {boolean}
 */
function enabled(settings, option) {
  return settings && settings.includes(option);
}

/**
 * @param {string | null | undefined} value
 * @returns {string}
 */
function normaliseQuery(value) {
  return (value ?? '')
    .trim()
    .replace(/\.(?=\s|$)/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

/**
 * @param {string} query
 * @returns {string[]}
 */
function queryTerms(query) {
  const terms = explode(query);
  const expanded = [];

  terms.forEach((term) => {
    expanded.push(term);

    if (term.includes('.')) {
      expanded.push(...term.split('.').filter(Boolean));
    }
  });

  return [...new Set(expanded)];
}

/**
 * @param {string} url
 * @returns {URL}
 */
function toUrl(url) {
  if (/^https?:\/\//.test(url)) {
    return new URL(url);
  }

  const absoluteUrl = (url.startsWith('/') ? url : `/${url}`).replace(
    /^\/docs\/docs\//,
    '/docs/'
  );
  return new URL(absoluteUrl, window.location.origin);
}

/**
 * @param {URL} address
 * @returns {string}
 */
function toDisplayUrl(address) {
  return address.host === window.location.host
    ? address.pathname + address.search + address.hash
    : address.toString();
}

/**
 * @param {URL} address
 * @returns {HTMLDivElement}
 */
function buildPath(address) {
  const path = document.createElement('div');
  path.className = 'result-path';

  const segments = address.pathname.split('/').filter(Boolean);

  segments.forEach((segment, index) => {
    const words = segment.replace(/-/g, ' ').split(' ');
    const processedSegment = words
      .map((word, wordIndex) =>
        wordIndex === 0
          ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          : word.toLowerCase()
      )
      .join(' ');

    const segmentSpan = document.createElement('span');
    segmentSpan.className = 'result-path__segment';
    segmentSpan.textContent = processedSegment;
    path.appendChild(segmentSpan);

    if (index < segments.length - 1) {
      const svgIcon = document.createElement('span');
      svgIcon.className = 'result-path__icon';
      svgIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
          <path d="M1 9L5 5L1 1" stroke="#7C98B4" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
      path.appendChild(svgIcon);
    }
  });

  return path;
}

function initializeSearch() {
  const siteSearchInput = qs('[data-site-search-query]');
  const siteSearchWrapper = qs('[data-site-search-wrapper]');
  const siteSearchElement = qs('[data-site-search]');
  const siteSearchResults = qs('[data-site-search-results]');
  const removeSearchButton = qs('[data-site-search-remove]');

  if (
    siteSearchInput == null ||
    siteSearchWrapper == null ||
    siteSearchElement == null ||
    siteSearchResults == null ||
    removeSearchButton == null
  ) {
    return;
  }

  const pagefindModulePath =
    siteSearchElement.dataset.pagefindPath ?? '/pagefind/pagefind.js';

  /** @type {Promise<any> | null} */
  let pagefindModulePromise = null;
  /** @type {any[] | null} */
  let currentResults = null;
  let currentQuery = '';
  let scrolled = false;
  let debounceTimer = 0;

  async function getPagefind() {
    if (pagefindModulePromise == null) {
      pagefindModulePromise = import(pagefindModulePath);
    }

    return pagefindModulePromise;
  }

  /**
   * Softly demote REST API reference pages for broad documentation queries.
   * Exact API-oriented queries keep Pagefind's natural ordering.
   * @param {any[]} results
   * @param {string[]} terms
   * @param {string} query
   * @returns {any[]}
   */
  function prioritiseResults(results, terms, query) {
    const isReferenceQuery = terms.some((term) =>
      ['api', 'apis', 'cli', 'command', 'commands', 'rest'].includes(term)
    );
    const isExecutableQuery =
      /\w\.\w/.test(query) ||
      terms.some((term) => term.endsWith('exe') || term.includes('.exe'));

    if (isReferenceQuery && !isExecutableQuery) {
      return results;
    }

    /** @param {string} url */
    function priority(url) {
      const pathname = toUrl(url).pathname;

      if (isExecutableQuery && pathname.includes('.exe-command-line/')) {
        return -2;
      }

      if (pathname.startsWith('/docs/octopus-rest-api/cli/')) {
        return 3;
      }

      if (pathname.startsWith('/docs/octopus-rest-api/examples/')) {
        return 2;
      }

      if (pathname.startsWith('/docs/octopus-rest-api/')) {
        return 1;
      }

      return 0;
    }

    return [...results].sort((a, b) => priority(a.url) - priority(b.url));
  }

  function activateInput() {
    if (siteSearchWrapper.classList.contains('is-active')) return;
    siteSearchWrapper.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function deactivateInput() {
    if (!siteSearchWrapper.classList.contains('is-active')) return;
    siteSearchWrapper.classList.remove('is-active');
    siteSearchInput.blur();
    document.body.style.overflow = '';
  }

  function openDropdown() {
    siteSearchElement.classList.add('is-active');

    requestAnimationFrame(() => {
      const dropdownHeightPercentage = parseFloat(
        getComputedStyle(siteSearchWrapper).getPropertyValue(
          '--search-dropdown-height'
        )
      );
      const dropdownHeight =
        window.innerHeight * (dropdownHeightPercentage / 100) + 32;
      const siteSearchElementRect = siteSearchElement.getBoundingClientRect();
      const offsetFromBottomToElement =
        window.innerHeight - siteSearchElementRect.bottom;

      if (offsetFromBottomToElement < dropdownHeight) {
        document.body.style.overflow = '';
        siteSearchElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        setTimeout(() => {
          document.body.style.overflow = 'hidden';
        }, 300);
      }
    });
  }

  function closeDropdown() {
    siteSearchElement.classList.remove('is-active');
  }

  function clearInput() {
    closeDropdown();
    siteSearchInput.value = '';
    siteSearchResults.innerHTML = '';
    currentQuery = '';
    currentResults = null;
    siteSearchInput.focus();
  }

  function handleDropdownKeyboardNavigation(e) {
    if (!siteSearchWrapper.classList.contains('is-active')) return;

    if (e.key === 'Escape') {
      closeDropdown();
      deactivateInput();
      return;
    }

    if (e.key === 'Tab') {
      const firstElement = siteSearchInput;
      const lastElement =
        siteSearchResults.querySelector('button') ||
        siteSearchResults.querySelector(
          '.site-search-results__item:last-child .result-wrapper'
        );

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        if (lastElement) lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  /**
   * @param {any[]} results
   * @param {string[]} terms
   * @param {number} numberOfResults
   * @param {string} cleanQuery
   */
  function renderResults(results, terms, numberOfResults, cleanQuery) {
    const list = document.createElement('ul');
    list.className = 'site-search-results__list';

    results.slice(0, numberOfResults).forEach((result) => {
      const url = toUrl(result.url);
      const title = result.meta?.title ?? result.url;
      const li = document.createElement('li');
      li.classList.add('site-search-results__item');

      const listElementWrapper = document.createElement('a');
      listElementWrapper.href = toDisplayUrl(url);
      listElementWrapper.className = 'result-wrapper';

      const listElementTitle = document.createElement('span');
      listElementTitle.className = 'result-title';
      listElementTitle.innerHTML = highlight(title, terms);

      const listElementDescription = document.createElement('p');
      listElementDescription.className = 'result-description';
      listElementDescription.innerHTML = result.excerpt ?? '';

      listElementWrapper.appendChild(buildPath(url));
      listElementWrapper.appendChild(listElementTitle);
      listElementWrapper.appendChild(listElementDescription);
      li.appendChild(listElementWrapper);

      if (
        enabled(f.search, 'headings') &&
        Array.isArray(result.sub_results) &&
        result.sub_results.length > 1
      ) {
        const headings = document.createElement('ul');
        headings.className = 'result-headings';
        headings.tabIndex = 0;

        result.sub_results.slice(1, 4).forEach((subResult) => {
          if (!subResult?.title || !subResult?.url) {
            return;
          }

          const item = document.createElement('li');
          const link = document.createElement('a');
          link.href = toDisplayUrl(toUrl(subResult.url));
          link.innerHTML = highlight(subResult.title, terms);
          item.appendChild(link);
          headings.append(item);
        });

        if (headings.children.length > 0) {
          li.appendChild(headings);
        }
      }

      list.appendChild(li);
    });

    siteSearchResults.innerHTML = '';
    siteSearchResults.appendChild(list);

    if (results.length === 0) {
      const empty = document.createElement('h4');
      empty.classList.add('search-results__heading');
      empty.innerHTML = siteSearchResults.dataset.emptytitle || 'No Results';
      siteSearchResults.appendChild(empty);
    } else if (results.length > numberOfResults) {
      const more = document.createElement('button');
      more.className = 'show-more';
      more.type = 'button';
      more.innerHTML = 'See more';
      more.addEventListener('click', (e) => {
        e.stopPropagation();
        renderResults(results, terms, numberOfResults + 12, cleanQuery);
      });
      siteSearchResults.appendChild(more);
    }

    const address = window.location.href.split('?')[0];
    const nextAddress =
      cleanQuery.length > 0
        ? address + '?q=' + encodeURIComponent(cleanQuery)
        : address;

    window.history.pushState({}, '', nextAddress);
    raiseEvent('searched', { search: cleanQuery });
  }

  /**
   * @param {string} query
   */
  async function search(query) {
    const cleanQuery = normaliseQuery(query);
    const terms = queryTerms(cleanQuery);

    if (currentQuery === cleanQuery) {
      return;
    }

    currentQuery = cleanQuery;

    if (cleanQuery.length === 0) {
      closeDropdown();
      siteSearchResults.innerHTML = '';
      currentResults = null;
      const address = window.location.href.split('?')[0];
      window.history.pushState({}, '', address);
      return;
    }

    activateInput();
    openDropdown();

    try {
      const pagefind = await getPagefind();
      const searchResponse = await pagefind.search(cleanQuery);
      currentResults = await Promise.all(
        searchResponse.results.map((result) => result.data())
      );
      currentResults = prioritiseResults(currentResults, terms, cleanQuery);

      renderResults(currentResults, terms, 12, cleanQuery);
    } catch (error) {
      console.log(error);
    }
  }

  function debounceSearch() {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      search(siteSearchInput.value);
    }, 400);
  }

  siteSearchInput.addEventListener('focus', () => activateInput());
  siteSearchInput.addEventListener('click', () => {
    if (siteSearchInput.value.trim() !== '') {
      activateInput();
      openDropdown();
    }
  });

  removeSearchButton.addEventListener('click', () => clearInput());
  document.addEventListener('keydown', handleDropdownKeyboardNavigation);

  document.addEventListener('click', (e) => {
    if (
      !siteSearchElement.contains(e.target) &&
      !siteSearchResults.contains(e.target)
    ) {
      closeDropdown();

      const duration = getComputedStyle(siteSearchWrapper).getPropertyValue(
        '--search-dropdown-duration'
      );
      const durationMs =
        parseFloat(duration) * (duration.endsWith('ms') ? 1 : 1000);

      setTimeout(() => {
        deactivateInput();
      }, durationMs);
    }
  });

  siteSearchElement.addEventListener('submit', (e) => {
    e.preventDefault();
    debounceSearch();
  });

  siteSearchInput.addEventListener('keyup', function (e) {
    e.preventDefault();
    if (!scrolled) {
      scrolled = true;
      this.scrollIntoView(true);
    }
    debounceSearch();
  });

  const params = new URLSearchParams(window.location.search);
  if (params.has('q')) {
    siteSearchInput.value = params.get('q') ?? '';
    debounceSearch();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSearch);
} else {
  initializeSearch();
}
