// @ts-check

import { qs } from './modules/query.js';
import { raiseEvent } from './modules/events.js';
import { contains, sanitise, explode, highlight } from './modules/string.js';

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

/**
 * Removes "morphological and inflexional endings" from words
 * See: http://www.tartarus.org/~martin/PorterStemmer
 */
const stemmer = (function () {
    const step2list = {
        "ational": "ate",
        "tional": "tion",
        "enci": "ence",
        "anci": "ance",
        "izer": "ize",
        "bli": "ble",
        "alli": "al",
        "entli": "ent",
        "eli": "e",
        "ousli": "ous",
        "ization": "ize",
        "ation": "ate",
        "ator": "ate",
        "alism": "al",
        "iveness": "ive",
        "fulness": "ful",
        "ousness": "ous",
        "aliti": "al",
        "iviti": "ive",
        "biliti": "ble",
        "logi": "log"
    };

    const step3list = {
        "icate": "ic",
        "ative": "",
        "alize": "al",
        "iciti": "ic",
        "ical": "ic",
        "ful": "",
        "ness": ""
    };

    const c = "[^aeiou]", // consonant
    v = "[aeiouy]",       // vowel
    C = c + "[^aeiouy]*", // consonant sequence
    V = v + "[aeiou]*",   // vowel sequence

    mgr0 = "^(" + C + ")?" + V + C,                   // [C]VC... is m>0
    meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$", // [C]VC[V] is m=1
    mgr1 = "^(" + C + ")?" + V + C + V + C,           // [C]VCVC... is m>1
    s_v = "^(" + C + ")?" + v;                        // vowel in stem

    /**
     * @param {string} w
     * @returns {string}
     */
    return function (w) {
        var stem,
            suffix,
            firstch,
            re,
            re2,
            re3,
            re4,
            origword = w;

        if (w.length < 3) { return w; }

        firstch = w.substring(0, 1);

        if (firstch == "y") {
            w = firstch.toUpperCase() + w.substring(1, w.length);
        }

        // Step 1a
        re = /^(.+?)(ss|i)es$/;
        re2 = /^(.+?)([^s])s$/;

        if (re.test(w)) { 
            w = w.replace(re, "$1$2"); 
        } else if (re2.test(w)) {
            w = w.replace(re2, "$1$2"); 
        }

        // Step 1b
        re = /^(.+?)eed$/;
        re2 = /^(.+?)(ed|ing)$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            re = new RegExp(mgr0);
            if (re.test(fp[1])) {
                re = /.$/;
                w = w.replace(re, "");
            }
        } else if (re2.test(w)) {
            var fp = re2.exec(w);
            stem = fp[1];
            re2 = new RegExp(s_v);
            if (re2.test(stem)) {
                w = stem;
                re2 = /(at|bl|iz)$/;
                re3 = new RegExp("([^aeiouylsz])\\1$");
                re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
                if (re2.test(w)) { w = w + "e"; }
                else if (re3.test(w)) { re = /.$/; w = w.replace(re, ""); }
                else if (re4.test(w)) { w = w + "e"; }
            }
        }

        // Step 1c
        re = /^(.+?)y$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            stem = fp[1];
            re = new RegExp(s_v);
            if (re.test(stem)) { w = stem + "i"; }
        }

        // Step 2
        re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            stem = fp[1];
            suffix = fp[2];
            re = new RegExp(mgr0);
            if (re.test(stem)) {
                w = stem + step2list[suffix];
            }
        }

        // Step 3
        re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            stem = fp[1];
            suffix = fp[2];
            re = new RegExp(mgr0);
            if (re.test(stem)) {
                w = stem + step3list[suffix];
            }
        }

        // Step 4
        re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
        re2 = /^(.+?)(s|t)(ion)$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            stem = fp[1];
            re = new RegExp(mgr1);
            if (re.test(stem)) {
                w = stem;
            }
        } else if (re2.test(w)) {
            var fp = re2.exec(w);
            stem = fp[1] + fp[2];
            re2 = new RegExp(mgr1);
            if (re2.test(stem)) {
                w = stem;
            }
        }

        // Step 5
        re = /^(.+?)e$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            stem = fp[1];
            re = new RegExp(mgr1);
            re2 = new RegExp(meq1);
            re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
            if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
                w = stem;
            }
        }

        re = /ll$/;
        re2 = new RegExp(mgr1);
        if (re.test(w) && re2.test(w)) {
            re = /.$/;
            w = w.replace(re, "");
        }

        // and turn initial Y back to y

        if (firstch == "y") {
            w = firstch.toLowerCase() + w.substr(1);
        }

        return w;
    }
})();

/** @type {SearchEntry[]} */
var haystack = [];
var currentQuery = '';
var dataUrl = qs('#site-search').dataset.sourcedata;

var ready = false;
var scrolled = false;

var _synonyms = null;

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

    return _synonyms;
}

/**
 * Replaces synonyms
 * @param {string[]} queryTerms 
 */
function replaceSynonyms(queryTerms) {
    const synonyms = getSynonyms();
    
    for (let i = 0; i < queryTerms.length; i++) {
        const term = queryTerms[i];
        if (synonyms[term] != null) {
            queryTerms[i] = synonyms[term];
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

    currentQuery = cleanQuery;
    /** @type {string[]} */
    const stemmedTerms = [];
    const queryTerms = replaceSynonyms(explode(currentQuery));

    for (const term of queryTerms) {
        const stemmed = stemmer(term);
        if (stemmed !== term) {
            stemmedTerms.push(stemmed);
        }
    }

    const allTerms = queryTerms.concat(stemmedTerms);

    console.log(allTerms);

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
        
        allTerms.forEach(term => {
            let isTermFound = false;
            const isUserTerm = queryTerms.includes(term);

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

        item.foundWords = foundWords / allTerms.length;

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
    raiseEvent('searched', { search: s });
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
