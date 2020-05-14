import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { defined } from '../../core/utils';

const element = {
	props: {
		style: {
			default: {
				borderWidth: 1,
			},
		},
	},
	setup: ({ data, style }) => {
		const [state, setState] = useState();

		return <TextInput { ...{
			style: style(),
			onChangeText: (value) => {
				setState(value);
				data(value);
			},
			value: defined(
				data(), state, ''
			).toString(),
		}}
		/>;
	},
};

export default element;
