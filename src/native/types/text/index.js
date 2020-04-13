import React from 'react';
import { Text } from 'react-native';
import { omit } from '@laufire/utils/collection';

const text = {
	props: {
		style: {
			default: {
				fontSize: 16,
			},
		},
		type: {
			default: 'text',
		},
	},
	setup: (config) => () => <Text { ...omit(config, ['getData']) }>
		{ config.getData() }
	</Text>,
};

export default text;
