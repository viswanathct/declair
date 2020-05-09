import React from 'react';
import { Button } from 'react-native';

const button = {
	setup: () => ({ action, available, data, label, style }) =>
		<Button { ...{
			accessibilityLabel: label(),
			disabled: !available(),
			onPress: action(data),
			style: style(),
			title: label(),
		} }/>,
};

export default button;
