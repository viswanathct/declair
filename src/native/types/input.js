import React from 'react';
import { TextInput } from 'react-native';
import { defined } from '../../core/utils';

const input = {
	props: {
		style: {
			default: {
				borderWidth: 1,
			},
		},
	},
	setup: (setupArgs) => (props) => {
		const state = setupArgs.context.getState();

		return setupArgs.type.render({ ...props, state });
	},
	render: ({ data, style, state }) => <TextInput { ...{
		style: style(),
		onChangeText: (value) => {
			state(value);
			data(value);
		},
		value: defined(data(), '').toString(),
	}}
	/>,
};

export default input;
