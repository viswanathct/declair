/**
 * A simple store.
 */

const store = {
	parse: ({ source, publish }) => {
		const parsed = {
			data: (data) => publish({ [source.name]: data }),
		};

		return parsed;
	},
	type: 'store',
};

export default store;
