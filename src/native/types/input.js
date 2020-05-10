import React, { useState } from 'react';
import { TextInput } from 'react-native';

const element = {
	props: {
		style: {
			default: {
				borderWidth: 1,
			},
		},
	},
	setup: () => ({ data, style }) => {
		const [state, setState] = useState(data);

		return <TextInput { ...{
			style: style(),
			onChangeText: (value) => {
				data(value);
				setState(value);
			},
			value: state,
		}}
		/>;
	},
};

export default element;
