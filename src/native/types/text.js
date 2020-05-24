import React from 'react';
import { Text } from 'react-native';
import { defined } from '../../core/utils';

const text = {
	props: {
		style: {
			default: {
				fontSize: 16,
			},
		},
	},
	setup: (parserArgs) => (props) => {
		const { data } = props;

		return parserArgs.type.render({
			...props,
			data: () => defined(data(), '').toString(),
		});
	},
	render: ({ data, style }) => <Text { ...{ style: style() } }>
		{ data() }
	</Text>,
};

export default text;
