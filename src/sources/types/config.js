/**
 * A simple store.
 */

const config = {
	parse: ({ source, publish }) => {
		const parsed = {
			update: (value) => publish({ [source.name]: value }),
		};

		typeof source.value !== 'undefined' && parsed.update(source.value);

		return parsed;
	},
	type: 'config',
};

export default config;
