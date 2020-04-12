import { StyleSheet } from 'react-native';

const type = {
	processors: {
		style: ({ prop }) => StyleSheet.create({ style: prop }).style,
	},
	type: 'uiComponent',
};

export default type;
