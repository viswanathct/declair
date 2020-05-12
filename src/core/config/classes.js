import { action } from './parsers';

const interactive = {
	action: {
		parse: action,
	},
	target: {
		normalize: ({ config, context, prop }) =>
			prop || (context.isObservable(config.data)
				? config.data
				: undefined),
		parse: ({ prop }) => () => prop,
	},
};

export {
	interactive,
};
