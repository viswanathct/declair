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
	render: ({ data, style }) =>
		<Text { ...{ style: style() } }>
			{ data() }
		</Text>,
};

export default text;
