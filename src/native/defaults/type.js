import { StyleSheet } from 'react-native';

const type = {
	props: {
		style: {
			parse: ({ prop }) => StyleSheet.create({ style: prop }).style,
		},
	},
	type: 'uiComponent',
};

export default type;
