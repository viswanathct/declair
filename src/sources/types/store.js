/**
 * A simple store.
 */
const store = {
	props: {
		data: {
			parse: ({ name, context }) =>
				(data) => context.publish({ [name]: data }),
		},
	},
	type: 'store',
};

export default store;
