import { StyleSheet } from 'react-native';
import { clone as bypassFreezing } from '@laufire/utils/collection';

const type = {
	props: {
		data: {
			primitive: true,
			parse: () => (data) => data,
		},
		style: {
			primitive: true,
			parse: () => (data) =>
				StyleSheet.create({ style: bypassFreezing(data) }).style,
		},
	},
	type: 'uiComponent',
};

export default type;
