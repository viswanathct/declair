/**
 * A source that could transform passed data, based on the given meta.
 */

const transformation = {
	props: {
		data: {},
		transform: {
			parse: ({ prop }) => prop,
		},
	},
	setup: ({ data, transform }) => () => transform(data()),
	type: 'transformation',
};

export default transformation;
