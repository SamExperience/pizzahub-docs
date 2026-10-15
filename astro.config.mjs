// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Published at https://samexperience.github.io/pizzahub-docs/ (GitHub Pages project site).
// https://astro.build/config
export default defineConfig({
	site: 'https://samexperience.github.io',
	base: '/pizzahub-docs',
	integrations: [
		starlight({
			title: 'PizzaHub Docs',
			description: 'Documentation for PizzaHub, a web application for pizzeria staff.',
			social: [
				{
					icon: 'github',
					label: 'PizzaHub on GitHub',
					href: 'https://github.com/SamExperience/pizzahub',
				},
			],
		}),
	],
});
