import type { Site } from 'astro-accelerator-utils/types/Site';

export const SITE: Site = {
  url: 'https://octopus.com',
  useTrailingUrlSlash: false,
  captureStatistics: false,
  subfolder: '/docs',
  feedUrl: '',
  title: 'Documentation and Support',
  description: 'Site description.',
  defaultLanguage: 'en',
  themeColor: '#311e3e',
  owner: 'Octopus Deploy',
  default: {
    lang: 'en',
    locale: 'en-US',
    dir: 'ltr',
  },
  search: {
    fallbackUrl: 'https://www.google.com/search',
    fallbackSite: 'q',
    fallbackQuery: 'q',
  },
  pageSize: 12,
  pageLinks: 5,
  rssLimit: 20,
  dateOptions: {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  cacheMaxAge: 200,
  featureFlags: {
    stickyNav: { top: 112 },
    codeBlocks: ['copy'],
    figures: ['enlarge'],
    youTubeLinks: ['embed'],
    headers: ['link'],
    details: ['tabs'],
    search: ['dialog'],
  },
  images: {
    contentSize:
      '(min-width: 1680px) 1000px, (min-width: 940px) calc(71.81vw - 192px), calc(100vw - 32px)',
    listerSize: '254px',
    authorSize: '170px',
  },
};

// Default image for OG: Tags
export const OPEN_GRAPH = {
  image: {
    src: '/docs/img/devops.png',
    alt: 'An Octopus arm in an infinity shape, supporting people collaborating',
  },
};

export const HEADER_SCRIPTS = `
	<link rel="preload" href="/docs/css/roboto-regular.woff2" as="font" type="font/woff2" crossorigin>
	<link rel="preload" href="/docs/css/roboto-bold.woff2" as="font" type="font/woff2" crossorigin>
	<meta name="google-site-verification" content="nIbWsTU_ELqMnLNxIexH_s6ch3m-s_MaFnl5u8WoaRM" />

	<!-- Inline Script to set the initial theme -->
	<script>
		(() => {
			const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
			document.documentElement.setAttribute('data-theme', theme);
		})();
	</script>

  <script defer>
  const whenActivated = new Promise((resolve) => {
	if (document.prerendering) {
	  document.addEventListener('prerenderingchange', resolve);
	} else {
	  resolve();
	}
  });

  async function add_gtm(w,d,s,l,i) {
	// Only add analytics if the page is not "pre-rendering"
	await whenActivated;

    w[l] = w[l]||[];w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
    var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer'
          ? '&l=' + l 
          : '';
    j.defer=true;
    j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j, f);
  }

  if (document.location.hostname === 'octopus.com'
  	|| document.location.hostname === 'www.octopus.com') {
	// Only add analytics to production site
    add_gtm(window, document, 'script', 'dataLayer', 'GTM-M6BF84M');
  }
  </script>
`.trim();
