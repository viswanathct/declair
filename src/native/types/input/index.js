import React from 'react';
import { TextInput } from 'react-native';

const element = {
	props: {
		type: {
			default: 'input',
		},
		style: {
			default: {
				borderWidth: 1,
			},
		},
	},
	setup: ({ data, style }) => () =>
		<TextInput { ...{
			style: style(),
			onChangeText: data,
			value: data(),
		}}
		/>,
};

export default element;
