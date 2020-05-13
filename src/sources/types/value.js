/**
 * A simple value.
 */

import { hasSource } from '../../core/utils';

const value = {
	props: {
		data: {
			parse: (args) => {
				const { config, context, prop, resolver } = args;

				if(context.isObservable(prop))
					return resolver(args);

				if(hasSource(config.sources, prop)) {
					const resolve = resolver(args);

					return () => resolve();
				}

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
