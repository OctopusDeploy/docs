// @ts-check

import { qs } from './modules/query.js';
import { raiseEvent } from './modules/events.js';
import { contains, sanitise, explode, highlight } from './modules/string.js';

/**
type Heading = {
    text: string;
    safeText: string;
    slug: string;
}

type SearchEntry = {
    score: number;
    title: string;
    safeTitle: string;
    description: string;
    safeDescription: string;
    headings: Heading[];
    tags: string;
    url: string;
    date: string;
    matchedHeadings: Heading[];
}
 */

var dataUrl = qs('#site-search').dataset.sourcedata;
var haystack = /** @type {SearchEntry} */ [];
var currentQuery = '';

var ready = false;
var scrolled = false;

/**
 * 
 * @param {string} s 
 * @returns 
 */
function search(s) {
    const needles = /** @type {SearchEntry} */ [];

    // Clean the input
    const cleanQuery = sanitise(s);

    if (currentQuery === cleanQuery) {
        return;
    }

    raiseEvent('searched', { search: s });

    currentQuery = cleanQuery;
    const queryTerms = explode(currentQuery);

    s.length > 0 && haystack.forEach( (item) => {

        item.score = 0;
        item.matchedHeadings = [];

        // Imagine the user searched for "Kitchen Sink"
        // The scores are arranged below from highest to lowest relevance

        // If the title contains "Kitchen Sink"
        if (contains(item.safeTitle, currentQuery)) {
            item.score = item.score + 60;
        }

        // If a heading contains "Kitchen Sink"
        item.headings.forEach(c => {
            if (contains(c.safeText, currentQuery)) {
                item.score = item.score + 25;
                item.matchedHeadings.push(c);
            }
        });

        // If the title contains "Kitchen Sink"
        if (contains(item.description, currentQuery)) {
            item.score = item.score + 20;
        }
        
        queryTerms.forEach(term => {
            // If the title contains "Kitchen" or "Sink"
            if (contains(item.safeTitle, term)) {
                item.score = item.score + 40;
            }

            // If a heading contains "Kitchen" or "Sink"
            item.headings.forEach(c => {
                if (contains(c.safeText, term)) {
                    item.score = item.score + 15;
                    if (item.matchedHeadings.filter(h => h.slug == c.slug).length == 0) {
                        item.matchedHeadings.push(c);
                    }
                }
            });

            // If the description contains "Kitchen" or "Sink"
            if (contains(item.description, term)) {
                item.score = item.score + 10;
            }

            // If a tag contains "Kitchen" or "Sink"
            item.tags.forEach(t => {
                if (contains(t, term)) {
                    item.score = item.score + 5;
                }
            });
        })

        if (item.score > 0) {
            needles.push(item);
        }
    });

    needles.sort(function (a, b){
        return b.score - a.score;
    });

    const total = needles.reduce(function (accumulator, needle) {
        return accumulator + needle.score;
        }, 0);

    const results = qs('#site-search-results');

    const ol = document.createElement('ol');
    ol.className = 'site-search-results';

    const limit = Math.min(needles.length, 12);

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

        const headings = document.createElement('ul');
        markers.className = 'result-headings';
        console.log(needle.matchedHeadings);
        needle.matchedHeadings
            .forEach(h => {
                const item = document.createElement('li');
                const link = document.createElement('a');
                link.href = url + '#' + h.slug;
                link.innerHTML = highlight(h.text, queryTerms);
                item.appendChild(link);
                headings.append(item);
            });

        const li = document.createElement('li');
        li.appendChild(a);
        li.appendChild(path);
        li.appendChild(markers);
        li.append(headings);
        li.dataset.score = (Math.round((needle.score/ total) * 100)).toString();

        ol.appendChild(li);
    }

    var h2 = document.createElement('h2');
    h2.innerHTML = needles.length === 0
        ? results.dataset.emptytitle || 'No Results'
        : results.dataset.title || 'Results';

    results.innerHTML = '';
    results.appendChild(h2);
    results.appendChild(ol);

    const address = window.location.href.split('?')[0];
    window.history.pushState({}, '', address + '?q=' + encodeURIComponent(cleanQuery));
}

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

        var siteSearch = qs('#site-search');

        var siteSearchQuery = qs('#site-search-query');

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
            siteSearchQuery.value = params.get('q');
        }

        debounceSearch();
    })
    .catch((error) => {
        console.log(error)
    });
