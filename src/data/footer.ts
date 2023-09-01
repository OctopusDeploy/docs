import type { MenuItem } from 'astro-accelerator-utils/types/NavPage';

export const menu: (MenuItem | 'categories' | 'tags' | 'toptags')[] = [
	{
		title: '<img src="/docs/img/octopus.svg" alt="Octopus Deploy" class="octo-logo" width="40" height="43">',
		order: 1,
	},
	{
		title: 'Product',
		order: 2,
		children: [
			{
				title: 'Features',
				url: 'https://octopus.com/features',
				order: 1,
			},
			{
				title: 'Tenanted deployments',
				url: 'https://octopus.com/use-case/tenanted-deployments',
				order: 2,
			},
			{
				title: 'Container deployments',
				url: 'https://octopus.com/use-case/container-deployments',
				order: 3,
			},
			{
				title: 'What\'s new',
				url: 'https://octopus.com/whatsnew',
				order: 4,
			},
			{
				title: 'Roadmap',
				url: 'https://roadmap.octopus.com/tabs/2-planned',
				order: 5,
			},
			{
				title: 'Octopus vs. Azure DevOps',
				url: 'https://octopus.com/azure-devops',
				order: 6,
			},
			{
				title: 'Octopus vs. Jenkins',
				url: 'https://octopus.com/jenkins',
				order: 7,
			},
		]
	},
	{
		title: 'Learn',
		order: 3,
		children: [
			{
				title: 'Getting started',
				url: '/docs/getting-started',
				order: 1,
			},
			{
				title: 'Guides',
				url: 'https://octopus.com/docs/guides',
				order: 2,
			},
			{
				title: 'DevOps handbook',
				url: 'https://octopus.com/devops/',
				order: 3,
			},
			{
				title: 'Deployments',
				url: '/docs/deployment-process',
				order: 4,
			},
			{
				title: 'Runbooks',
				url: '/docs/runbooks',
				order: 5,
			},
			{
				title: 'Training videos',
				url: 'https://www.youtube.com/playlist?list=PLAGskdGvlaw268i2ZTPC1ZrxwFjjKIdKH',
				order: 6,
			},
		]
	},
	{
		title: 'Help',
		order: 4,
		children: [
			{
				title: 'Contact',
				url: 'https://octopus.com/company/contact',
				order: 1,
			},
			{
				title: 'Help and support',
				url: 'https://octopus.com/support',
				order: 2,
			},
			{
				title: 'Community',
				url: 'https://octopus.com/community',
				order: 3,
			},
			{
				title: 'Discussion forum',
				url: 'https://help.octopus.com/',
				order: 4,
			},
			{
				title: 'Upgrade and renew',
				url: 'https://octopus.com/upgrade',
				order: 5,
			},
		]
	},
	{
		title: 'About us',
		order: 5,
		children: [
			{
				title: 'Company',
				url: 'https://octopus.com/company',
				order: 1,
			},
			{
				title: 'Partners',
				url: 'https://octopus.com/partners',
				order: 2,
			},
			{
				title: 'Careers',
				url: 'https://octopus.com/company/careers',
				order: 3,
			},
			{
				title: 'Trust center',
				url: 'https://octopus.com/company/trust',
				order: 4,
			},
			{
				title: 'Security',
				url: 'https://octopus.com/docs/security',
				order: 5,
			},
			{
				title: 'Webinars and events',
				url: 'https://octopus.com/events',
				order: 6,
			},
			{
				title: 'Stickers and swag',
				url: 'https://shop.octopus.com/',
				order: 7,
			},
		]
	},
];

/*
See navigation.ts
Allows customisation of the footer navigation

'categories' -> Auto columns of links for categories
'tags' -> Auto columns of links for tags

*/