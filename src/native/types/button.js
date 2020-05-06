import React from 'react';
import { Button } from 'react-native';

const button = {
	setup: () => ({ action, available, data, style }) =>
		<Button { ...{
			accessibilityLabel: data(),
			disabled: !available(),
			onPress: action(),
			style: style(),
			title: data(),
		} }/>,
};

export default button;
