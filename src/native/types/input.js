import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { withDefault } from '../../core/utils';

const element = {
	props: {
		style: {
			default: {
				borderWidth: 1,
			},
		},
	},
	setup: ({ data, style }) => {
		const [dummy, setState] = useState();

		return <TextInput { ...{
			style: style(),
			onChangeText: (value) => {
				data(value);
				setState(value);
			},
			value: withDefault(data(), ''),
		}}
		/>;
	},
};

export default element;
