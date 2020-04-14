import React from 'react';
import { Text } from 'react-native';

const text = {
	props: {
		style: {
			default: {
				fontSize: 16,
			},
		},
		type: {
			default: 'text',
		},
	},
	setup: (context) => () => <Text { ...{ style: context.style() } }>
		{ context.data() }
	</Text>,
};

export default text;
