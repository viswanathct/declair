import React from 'react';
import { Text } from 'react-native';

const text = {
	props: {
		style: {
			default: {
				fontSize: 16,
			},
		},
	},
	setup: ({ data, style }) => <Text { ...{ style: style() } }>
		{ data() }
	</Text>,
};

export default text;
