import React from 'react';
import { Button } from 'react-native';

const button = {
	render: ({ available, label, style, target }) =>
		<Button { ...{
			accessibilityLabel: label(),
			disabled: !available(),
			onPress: target,
			style: style(),
			title: label(),
		} }/>,
};

export default button;
