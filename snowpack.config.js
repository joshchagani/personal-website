/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
	mount: {
		public: { url: '/', static: true },
		src: { url: '/dist' },
	},
	plugins: [
		'@snowpack/plugin-react-refresh',
		'@snowpack/plugin-dotenv',
		'@snowpack/plugin-typescript',
		'snowpack-plugin-hash',
	],
	routes: [
		/* Enable an SPA Fallback in development: */
		// {"match": "routes", "src": ".*", "dest": "/index.html"},
	],
	optimize: {
		minify: true,
		bundle: true,
	},
	packageOptions: {
		source: 'remote',
		types: true,
	},
	devOptions: {
		/* ... */
	},
	buildOptions: {
		/* ... */
	},
}
