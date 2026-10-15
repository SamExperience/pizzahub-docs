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
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'Start',
					items: [
						{ label: 'Overview', slug: 'overview' },
						{ label: 'Getting started', slug: 'getting-started' },
					],
				},
				{
					label: 'Product',
					items: [{ label: 'Features', slug: 'features' }],
				},
				{
					label: 'Technical',
					items: [
						{ label: 'Architecture', slug: 'architecture' },
						{ label: 'Data model', slug: 'data-model' },
						{ label: 'Security', slug: 'security' },
					],
				},
				{
					label: 'Operations',
					items: [
						{ label: 'Subscription', slug: 'subscription' },
						{ label: 'Deployment', slug: 'deployment' },
					],
				},
			],
		}),
	],
});
