import React from 'react';
import { Text } from 'react-native';
import { omit } from '@laufire/utils/collection';

const text = {
	setup: (config) => () => <Text { ...omit(config, ['getData']) }>
		{ config.getData() }
	</Text>,
	type: 'uiComponent',
};

export default text;
