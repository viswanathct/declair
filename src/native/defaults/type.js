import { StyleSheet } from 'react-native';
import { clone as bypassFreezing } from '@laufire/utils/collection';

const type = {
	props: {
		style: {
			parse: ({ prop }) =>
				StyleSheet.create({ style: bypassFreezing(prop) }).style,
		},
	},
	type: 'uiComponent',
};

export default type;
