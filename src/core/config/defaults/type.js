import { doNothing } from '../../utils';
import { Platform } from 'react-native';
import { merge } from '@laufire/utils/collection';

/* Data */
const { OS: platform } = Platform;

/* Exports */
const type = {
	props: {
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
