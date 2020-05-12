import React from 'react';
import { Button } from 'react-native';

const button = {
	setup: ({ available, data, label, style }) =>
		<Button { ...{
			accessibilityLabel: label(),
			disabled: !available(),
			onPress: data,
			style: style(),
			title: label(),
		} }/>,
};

export default button;
