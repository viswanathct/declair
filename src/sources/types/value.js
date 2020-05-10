/**
 * A simple value.
 */

import { hasSource } from '../../core/utils';

const value = {
	props: {
		data: {
			parse: (args) => {
				const { config, context, prop, resolver } = args;

				if(context.isObservable(prop)
					|| hasSource(config.sources, prop))
					return resolver(args);

				const state = {
					store: prop,
				};

				return (data) => (data !== undefined
					? (state.store = data)
					: state.store);
			},
		},
	},
	setup: ({ data }) => data,
};

export default value;
