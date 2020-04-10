import React from 'react';
import { Text } from 'react-native';

const text = {
	handler: (config) => ({ data }) => <Text { ...config }>{ data }</Text>,
	type: 'widget',
};

export default text;
