import React from 'react';
import { Button } from 'react-native';

const button = {
	render: ({ available, data, label, style, target }) =>
		<Button { ...{
			accessibilityLabel: label(),
			disabled: !available(),
			onPress: () => target(data()),
			style: style(),
			title: label(),
		} }/>,
};

export default button;
