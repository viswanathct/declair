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
		const [dummy, setState] = useState();

		return <TextInput { ...{
			style: style(),
			onChangeText: (value) => {
				data(value);
				setState(value);
			},
			value: data(),
		}}
		/>;
	},
};

export default element;
