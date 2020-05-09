/**
 * A simple value.
 */

import { isIterable } from '@laufire/utils/reflection';

const value = {
	props: {
		data: {
			parse: (args) => {
				const { context, prop, resolver } = args;

				if(context.isObservable(prop) || isIterable(prop))
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
