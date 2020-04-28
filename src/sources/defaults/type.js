/* Helpers */
const getResolver = ({ context, name }) =>
	(data) => (data !== undefined
		? context.publish({ [name]: data })
		: context.state[name]);

/* Exports */
const type = {
	props: {
		data: {},
	},
	parse: ({ config, context, parsing, props }) => {
		const { prop, name } = parsing;

		props.resolve = config.sources[prop]
			? (data) => context.sources[prop](data)
			: getResolver({ context, name });
	},
	setup: ({ resolve }) => (value) => resolve(value),
};

export default type;
