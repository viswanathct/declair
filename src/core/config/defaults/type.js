import { doNothing } from '../../utils';
import { Platform } from 'react-native';
import { merge } from '@laufire/utils/collection';

/* Data */
const { OS: platform } = Platform;

const getSourceActions = ({ context, parsing }) => // eslint-disable-line complexity
	(context.isObservable(parsing.data)
	&& context.sources[parsing.data].props.actions
		&& (() => context.sources[parsing.data].props.actions))
	|| undefined;

/* Exports */
const type = {
	props: {
		actions: {
			parse: ({ context, parsing, prop }) =>
				(prop
					? () => prop
					: getSourceActions({ context, parsing })),
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
