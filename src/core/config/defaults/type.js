import { doNothing } from '../../utils';
import { Platform } from 'react-native';
import { merge } from '@laufire/utils/collection';

/* Data */
const { OS: platform } = Platform;

const getSourceActions = ({ context, parsing }) =>
	(context.isObservable(parsing.data)
	&& context.sources[parsing.data].actions
		&& (() => context.sources[parsing.data].actions))
	|| undefined;

/* Exports */
const type = {
	props: {
		actions: {
			parse: ({ config, parsing, prop }) =>
				(prop
					? () => prop
					: getSourceActions({ config, parsing })),
		},
		platform: {
			default: {},
			normalize: ({ prop, config }) =>
				merge(config, prop[platform]) && undefined,
		},
	},
	normalize: doNothing,
	parse: doNothing,
	setup: doNothing,
};

export default type;
