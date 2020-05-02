/**
 * A simple value.
 */

import { doNothing } from '../../core/utils';
import { isIterable } from '@laufire/utils/reflection';

const value = {
	props: {
		data: {
			parse: (args) => {
				const { context, prop, resolver } = args;

				return isIterable(prop) || context.isObservable(prop)
					? resolver(args)
					: doNothing;
			},
		},
	},
	setup: ({ data }) => data,
};

export default value;
