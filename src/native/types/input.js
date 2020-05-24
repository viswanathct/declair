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
		const { data } = props;
		const state = setupArgs.context.getState();

		return setupArgs.type.render({
			...props,
			data: () => defined(data(), '').toString(),
			state: state,
		});
	},
	render: ({ data, style, target, state }) => <TextInput { ...{
		style: style(),
		onChangeText: (value) => {
			state(value);
			target(value);
		},
		value: data(),
	}}
	/>,
};

export default input;
