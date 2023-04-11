import type { NavPage } from 'astro-accelerator-utils/types/NavPage';

export const menu: (NavPage | 'categories' | 'tags' | 'toptags')[] = [
	{
		title: '<img src="/devops/img/octopus.svg" alt="Octopus Deploy" class="octo-logo" width="40" height="43">',
		url: '',
		ariaCurrent: false,
		isOpen: false,
		order: 1,
		section: '',
		children: []
	},
	'categories',
	'toptags',
	{
		title: 'Quick Links',
		url: '',
		ariaCurrent: false,
		isOpen: false,
		order: 1,
		section: '',
		children: [{
			title: 'Octopus Slack Community',
			url: 'https://oc.to/DevOpsMicrosite',
			ariaCurrent: false,
			isOpen: false,
			order: 1,
			section: '',
			children: []
		},{
			title: 'Octopus Deploy',
			url: 'https://octopus.com',
			ariaCurrent: false,
			isOpen: false,
			order: 1,
			section: '',
			children: []
		}]
}];

/*
See navigation.ts
Allows customisation of the footer navigation

'categories' -> Auto columns of links for categories
'tags' -> Auto columns of links for tags

*/