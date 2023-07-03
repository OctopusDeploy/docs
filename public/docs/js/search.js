// @ts-check

import { qs } from './modules/query.js';
import { raiseEvent } from './modules/events.js';
import { contains, containsWord, sanitise, explode, highlight } from './modules/string.js';

/**
@typedef {
    {
        text: string;
        safeText: string;
        slug: string;
    }
} Heading

@typedef {
    {
        foundWords: number;
        score: number;
        title: string;
        keywords: string;
        safeTitle: string;
        description: string;
        safeDescription: string;
        headings: Heading[];
        tags: string[];
        url: string;
        date: string;
        matchedHeadings: Heading[];
    }
}  SearchEntry
 */

/** @type {SearchEntry[]} */
var haystack = [];
var currentQuery = '';
var dataUrl = qs('#site-search').dataset.sourcedata;

var ready = false;
var scrolled = false;

/**
 * Search term `s` and number of results `r`
 * @param {string} s 
 * @param {number|null} [r=12]
 * @returns 
 */
function search(s, r) {
    const numberOfResults = r ?? 12;
    console.log('search', s, numberOfResults);

    /** @type {SearchEntry[]} */
    const needles =  [];

    // Clean the input
    const cleanQuery = sanitise(s);

    if (currentQuery === cleanQuery) {
        return;
    }

    raiseEvent('searched', { search: s });

    currentQuery = cleanQuery;
    const queryTerms = explode(currentQuery);

    cleanQuery.length > 0 && haystack.forEach( (item) => {

        let foundWords = 0;
        item.score = 0;
        item.matchedHeadings = [];

        // The user searches for "Kitchen Sink"

        // Part 1 - Phrase Matches, i.e. "Kitchen Sink"

        // Title
        if (contains(item.safeTitle, currentQuery)) {
            item.score = item.score + 60;
        }

        // Headings
        item.headings.forEach(c => {
            if (contains(c.safeText, currentQuery)) {
                item.score = item.score + 20;
                item.matchedHeadings.push(c);
            }
        });

        // Description
        if (contains(item.description, currentQuery)) {
            item.score = item.score + 20;
        }

        // Part 2 - Term Matches, i.e. "Kitchen" or "Sink"
        
        queryTerms.forEach(term => {
            let isTermFound = false;

            // Title
            if (contains(item.safeTitle, term)) {
                item.score = item.score + 40;
                isTermFound = true;
            }

            // Headings
            item.headings.forEach(c => {
                if (contains(c.safeText, term)) {
                    item.score = item.score + 15;
                    isTermFound = true;

                    if (item.matchedHeadings.filter(h => h.slug == c.slug).length == 0) {
                        item.matchedHeadings.push(c);
                    }
                }
            });

            // Description
            if (contains(item.description, term)) {
                isTermFound = true;
                item.score = item.score + 15;
            }

            // Tags
            item.tags.forEach(t => {
                if (contains(t, term)) {
                    isTermFound = true;
                    item.score = item.score + 15;
                }
            });

            // Keywords
            if (contains(item.keywords, term)) {
                isTermFound = true;
                item.score = item.score + 15;
            }

            if (isTermFound) {
                foundWords++;
            }
        });

        item.foundWords = foundWords / queryTerms.length;

        if (item.score > 0) {
            needles.push(item);
        }
    });

    needles.sort(function (a, b){
        if (b.foundWords === a.foundWords) {
            return b.score - a.score;
        }

        return b.foundWords - a.foundWords;
    });

    const total = needles.reduce(function (accumulator, needle) {
        return accumulator + needle.score;
        }, 0);

    const results = qs('#site-search-results');

    const ol = document.createElement('ol');
    ol.className = 'site-search-results';

    const limit = Math.min(needles.length, numberOfResults);

    // @ts-ignore
    const siteUrl = new URL(site_url);

    for (let i = 0; i < limit; i++) {
        const needle = needles[i];

        const address = new URL(needle.url);
        const isSameHost = siteUrl.host == address.host;
        const url =  isSameHost ? address.pathname : needle.url;

        const a = document.createElement('a');
        a.innerHTML = highlight(needle.title, queryTerms);
        a.href = url;

        const path = document.createElement('div');
        path.className = 'result-path';
        path.innerHTML = address.pathname;

        const markers = document.createElement('div');
        markers.className = 'result-text';
        markers.innerHTML = highlight(needle.description, queryTerms);

        const li = document.createElement('li');
        li.dataset.score = (Math.round((needle.score/ total) * 100)).toString();
        li.appendChild(a);
        li.appendChild(path);
        li.appendChild(markers);

        if (needle.matchedHeadings.length > 0) {
            const headings = document.createElement('ul');
            headings.className = 'result-headings';

            headings.tabIndex = 0;

            needle.matchedHeadings
                .forEach(h => {
                    const item = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = url + '#' + h.slug;
                    link.innerHTML = highlight(h.text, queryTerms);
                    item.appendChild(link);
                    headings.append(item);
                });

            li.appendChild(headings);
        }

        ol.appendChild(li);
    }

    var h2 = document.createElement('h2');
    h2.innerHTML = needles.length === 0
        ? results.dataset.emptytitle || 'No Results'
        : results.dataset.title || 'Results';

    const more = document.createElement('button');
    more.className = 'show-more';
    more.type = 'button';
    more.innerHTML = 'See more';
    more.addEventListener('click', function() {
        currentQuery = '';
        const newTotal = numberOfResults + 12;
        console.log('More', newTotal);
        search(s, newTotal);
    })

    results.innerHTML = '';
    results.appendChild(h2);
    results.appendChild(ol);

    if (needles.length > numberOfResults) {
        results.appendChild(more);
    }

    const address = window.location.href.split('?')[0];
    window.history.pushState({}, '', address + '?q=' + encodeURIComponent(cleanQuery));
}

/** @type {Number} */
var debounceTimer;

function debounceSearch() {
    var input = /** @type {HTMLInputElement} */(qs('#site-search-query'));

    if (input == null) {
        throw new Error('Cannot find #site-search-query');
    }

    var s = input.value;

    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(function () {
        if (ready) {
            search(s);
        }
    }, 400);
}

fetch(dataUrl)
    .then(function (response) { 
        return response.json();
    })
    .then(function (data) { 
        haystack = data;
        ready = true;

        for (let i = 0; i < haystack.length; i++) {
            const item = haystack[i];
            item.safeTitle = sanitise(item.title);
            item.tags = item.tags.map(t => sanitise(t));
            item.safeDescription = sanitise(item.description);

            item.headings.forEach(h => h.safeText = sanitise(h.text));
        }

        /** @type {HTMLFormElement} */
        const siteSearch = qs('#site-search');

        /** @type {HTMLInputElement} */
        const siteSearchQuery = qs('#site-search-query');

        if (siteSearch == null || siteSearchQuery == null) {
            throw new Error('Cannot find #site-search or #site-search-query');
        }
    
        siteSearch.addEventListener('submit', function (e) {
            e.preventDefault();
            debounceSearch();
            return false;
        });
    
        siteSearchQuery.addEventListener('keyup', function (e) {
            e.preventDefault();
            if (!scrolled) {
                scrolled = true;
                this.scrollIntoView(true);
            }
            debounceSearch();
            return false;
        });

        console.log('Search ready');

        const params = new URLSearchParams(window.location.search);
        if (params.has('q')) {
            siteSearchQuery.value = params.get('q') ?? '';
        }

        debounceSearch();
    })
    .catch((error) => {
        console.log(error)
    });
