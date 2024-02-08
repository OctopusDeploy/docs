// @ts-check

/**
 * This javascript file comes from Astro Accelerator
 * Edits will be overwritten if you change the file locally
 */
import { qsa } from './query.js';

function enhanceYoutubeLinks() {
    const videos = qsa('a[href^="https://www.youtube.com/watch?v="]');

    for (var video of videos) {
        if (video.parentNode.childNodes.length > 1) {
            // Don't turn video into embed if it's part of a longer paragraph, for example.
            continue;
        }

        const id = new URL(video.href).searchParams.get('v');
        video.setAttribute('data-youtube', id);
        video.classList.add('init');
        video.setAttribute('role', 'button');

        video.innerHTML = `<div class="yt-video">
        <div class="play-icon" style="background-image: url(https://img.youtube.com/vi/${id}/0.jpg)">▶</div>
        <div class="title">${video.textContent}</div>
        </div>`;
    }

    function clickHandler (event) {
        var link = event.target.closest('[data-youtube]');

        if (!link) {
            return;
        }

        event.preventDefault();
        var id = link.getAttribute('data-youtube');

        var player = document.createElement('div');
        player.innerHTML = `<iframe class="yt-iframe" width="560" height="315" src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

        link.replaceWith(player);
    }

    document.addEventListener('click', clickHandler);
}

export { enhanceYoutubeLinks }