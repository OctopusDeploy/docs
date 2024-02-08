// @ts-check

/**
 * This javascript file comes from Astro Accelerator
 * Edits will be overwritten if you change the file locally
 */
function enhanceSearchIcon() {
    if (document.querySelector('#site-search-query') == null) {
        const icon = document.querySelector('a.search-icon');

        if (icon != null) {
            fetch(icon.href)
                .then(response => response.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const form = doc.querySelector('#site-search');
                    const input = form.querySelector('#site-search-query');
                    const results = doc.querySelector('#site-search-results');
                    icon.setAttribute('aria-expanded', 'false');
                    
                    input?.setAttribute('autofocus', 'autofocus');

                    const close = document.createElement('button');
                    close.id = 'site-search-close';
                    close.value = 'cancel';
                    close.formMethod = 'dialog';
                    close.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>`;
                    
                    const script = doc.querySelector('script[src*="/search.js"]');
                    const scr = document.createElement('script');
                    for (let att, i = 0, atts = script.attributes, n = atts.length; i < n; i++){
                        att = atts[i];
                        scr.setAttribute(att.nodeName, att.nodeValue ?? '');
                    }

                    const dialog = document.createElement('dialog');
                    dialog.className = 'search-dialog';
                    dialog.append(close, form, results);
                    
                    document.body.appendChild(dialog);
                    document.body.appendChild(scr);

                    function openSearch(e) {
                        e.preventDefault();
                        dialog.showModal();
                        icon.setAttribute('aria-expanded', 'true');
                        return false;
                    }

                    // Open search on CTRL + SPACE
                    window.onkeydown = function(e) {
                        if (e.ctrlKey && e.key == ' ') {
                            return openSearch(e);
                        }
                    };

                    // Open search on click
                    icon.addEventListener('click', openSearch);

                    // Close dialog
                    close.addEventListener('click', () => dialog.close());
                    dialog.addEventListener('close', () => icon.setAttribute('aria-expanded', 'false'));
                });
        }
    }
}

export { enhanceSearchIcon };