/**
 * A simple store.
 */

const store = {
	parse: ({ source, publish }) => {
		const parsed = {
			update: (value) => publish({ [source.name]: value }),
		};

		typeof source.value !== 'undefined' && parsed.update(source.value);

		return parsed;
	},
	type: 'store',
};

export default store;
