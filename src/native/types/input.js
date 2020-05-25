import React from 'react';
import { TextInput } from 'react-native';

const input = {
	props: {
		style: {
			default: {
				borderWidth: 1,
			},
		},
	},
	render: ({ data, style, target }) =>
		<TextInput { ...{
			style: style(),
			onChangeText: target,
			value: data(),
		}}/>,
};

export default input;
