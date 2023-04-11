import type { NavPage } from '@util/NavigationTypes.astro';

export const menu: (NavPage | 'auto')[] = [
	'auto'
];

/*
* DEFAULT USAGE NOTES
* 
* Use the string 'auto' in the menu to automatically generate the navigation,
* or specify items individually to have full control. The simplest example is:

export const menu: (NavPage | 'auto')[] = [
	'auto'
];

*/

/*
* CUSTOM USAGE NOTES
* 
* A more complex example would include items and child items. The ordering
* of automatic and manual entries is "merged", so you don't need to place 'auto'
* anywhere specific in this list. Set the order fields instead.

export const menu: (NavPage | 'auto')[] = [
	'auto',
	{
		title: 'Section',
		url: '/section/',
		ariaCurrent: false,
		isOpen: false,
		order: 1,
		section: 'Section',
		children: [
			{
				title: 'Blog',
				url: '/section/blog/',
				ariaCurrent: false,
				isOpen: false,
				order: 1,
				section: '',
				children: []
			 },
			 {
				title: 'Publications',
				url: '/section/publications/',
				ariaCurrent: false,
				isOpen: false,
				order: 2,
				section: '',
				children: []
			 },
			 {
				title: 'About',
				url: '/section/about/',
				ariaCurrent: false,
				isOpen: false,
				order: 3,
				section: '',
				children: []
			 },
		]
 	},
];

*/