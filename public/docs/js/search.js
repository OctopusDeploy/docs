// @ts-check

/**
 * This javascript file comes from Astro Accelerator
 * Edits will be overwritten if you change the file locally
 */
import { qs } from './modules/query.js';
import { raiseEvent } from './modules/events.js';
import { contains, sanitise, explode, highlight } from './modules/string.js';
import { stemmer } from './modules/stemmer.js';

// @ts-ignore
const f = site_features ?? {};

/**
 * 
 * @param {string[]} settings 
 * @param {string} option 
 * @returns 
 */
function enabled(settings, option) {
    return settings
        && settings.includes(option);
}

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
        depth: number;
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

@typedef {
    {
        [ix: string]: string
    }
} Synonyms
 */

/** @type {SearchEntry[]} */
var haystack = [];
var currentQuery = '';
var dataUrl = qs('#site-search').dataset.sourcedata;

var scoring = {
    depth: 5,
    phraseTitle: 60,
    phraseHeading: 20,
    phraseDescription: 20,
    termTitle: 40,
    termHeading: 15,
    termDescription: 15,
    termTags: 15,
    termKeywords: 15
};

var ready = false;
var scrolled = false;

/** @type{Synonyms | null} */
var _synonyms = null;

/**
 * Gets the list of synonyms if they exist
 * @returns { Promise<Synonyms> }
 */
async function getSynonyms() {
    if (_synonyms != null) {
        return _synonyms;
    }

    try {
        const synonymsModule = await import('./synonyms.js');
        _synonyms =synonymsModule.synonyms;
    } catch {
        _synonyms = {};
    }

    return _synonyms ?? {};
}

/**
 * Replaces synonyms
 * @param {string[]} queryTerms 
 */
async function replaceSynonyms(queryTerms) {
    const synonyms = await getSynonyms();
    
    for (let i = 0; i < queryTerms.length; i++) {
        const term = queryTerms[i];
        if (synonyms[term] != null) {
            queryTerms.push(synonyms[term]);
        }
    }

    return queryTerms;
}

/**
 * Search term `s` and number of results `r`
 * @param {string} s 
 * @param {number|null} [r=12]
 * @returns 
 */
async function search(s, r) {
    const numberOfResults = r ?? 12;

    /** @type {SearchEntry[]} */
    const needles =  [];

    // Clean the input
    const cleanQuery = sanitise(s);

    if (currentQuery === cleanQuery) {
        return;
    }

    currentQuery = cleanQuery;
    /** @type {string[]} */
    const stemmedTerms = [];
    const queryTerms = await replaceSynonyms(explode(currentQuery));

    for (const term of queryTerms) {
        const stemmed = stemmer(term);
        if (stemmed !== term) {
            stemmedTerms.push(stemmed);
        }
    }

    const allTerms = queryTerms.concat(stemmedTerms);

    cleanQuery.length > 0 && haystack.forEach( (item) => {

        item.foundWords = 0;
        item.score = 0;
        item.matchedHeadings = [];

        // The user searches for "Kitchen Sink"

        // Part 1 - Phrase Matches, i.e. "Kitchen Sink"

        // Title
        if (item.safeTitle === currentQuery) {
            item.foundWords += 2;
        }
        
        if (contains(item.safeTitle, currentQuery)) {
            item.score = item.score + scoring.phraseTitle;
            item.foundWords += 2;
        }

        // Headings
        item.headings.forEach(c => {
            if (contains(c.safeText, currentQuery)) {
                item.score = item.score + scoring.phraseHeading;
                item.matchedHeadings.push(c);
                item.foundWords++;
            }
        });

        // Description
        if (contains(item.description, currentQuery)) {
            item.score = item.score + scoring.phraseDescription;
            item.foundWords++;
        }

        // Part 2 - Term Matches, i.e. "Kitchen" or "Sink"

        let foundWords = 0;
        
        allTerms.forEach(term => {
            let isTermFound = false;

            // Title
            if (contains(item.safeTitle, term)) {
                item.score = item.score + scoring.termTitle;
                isTermFound = true;
            }

            // Headings
            item.headings.forEach(c => {
                if (contains(c.safeText, term)) {
                    item.score = item.score + scoring.termHeading;
                    isTermFound = true;

                    if (item.matchedHeadings.filter(h => h.slug == c.slug).length == 0) {
                        item.matchedHeadings.push(c);
                    }
                }
            });

            // Description
            if (contains(item.description, term)) {
                isTermFound = true;
                item.score = item.score + scoring.termDescription;
            }

            // Tags
            item.tags.forEach(t => {
                if (contains(t, term)) {
                    isTermFound = true;
                    item.score = item.score + scoring.termTags;
                }
            });

            // Keywords
            if (contains(item.keywords, term)) {
                isTermFound = true;
                item.score = item.score + scoring.termKeywords;
            }

            if (isTermFound) {
                foundWords++;
            }
        });

        item.foundWords += foundWords;

        if (item.score > 0) {
            needles.push(item);
        }
    });

    needles.forEach(n => {
        // Bonus points for shallow results, i.e. /features over /features/something/something

        if (n.depth < 5) {
            n.score += scoring.depth;
            n.foundWords++;
        }

        if (n.depth < 4) {
            n.score += scoring.depth;
            n.foundWords++;
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
        // Only highlight user query terms, not stemmed terms
        a.innerHTML = highlight(needle.title, queryTerms);
        a.href = url;

        const path = document.createElement('div');
        path.className = 'result-path';
        path.innerHTML = address.pathname;

        const markers = document.createElement('div');
        markers.className = 'result-text';
        // Only highlight user query terms, not stemmed terms
        markers.innerHTML = highlight(needle.description, queryTerms);

        const li = document.createElement('li');
        li.dataset.words = needle.foundWords.toString();
        li.dataset.score = (Math.round((needle.score/ total) * 1000) / 1000).toString();
        li.appendChild(a);
        li.appendChild(path);
        li.appendChild(markers);

        if (enabled(f.search, 'headings') && needle.matchedHeadings.length > 0) {
            const headings = document.createElement('ul');
            headings.className = 'result-headings';

            headings.tabIndex = 0;

            needle.matchedHeadings
                .forEach(h => {
                    const item = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = url + '#' + h.slug;
                    // Only highlight user query terms, not stemmed terms
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
    raiseEvent('searched', { search: s });
}

/** @type {Number} */
var debounceTimer;

function debounceSearch() {
    var input = /** @type {HTMLInputElement} */(qs('#site-search-query'));

    if (input == null) {
        throw new Error('Cannot find #site-search-query');
    }

    // Words chained with . are combined, i.e. System.Text is "systemtext"
    var s = input.value.replace(/\./g, '');

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
            item.depth = item.url.match(/\//g)?.length ?? 0;

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

        const params = new URLSearchParams(window.location.search);
        if (params.has('q')) {
            siteSearchQuery.value = params.get('q') ?? '';
        }

        for (let key of Object.keys(scoring)) {
            if (params.has(`s_${key}`)) {
                scoring[key] = parseInt(params.get(`s_${key}`) ?? scoring[key].toString(), 10)  ;
            }
        }

        debounceSearch();
    })
    .catch((error) => {
        console.log(error)
    });
