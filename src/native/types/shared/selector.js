import React from 'react';
import { View } from 'react-native';

/* Exports */
const selector = {
	render: ({ item: Item, style }) =>
		<View { ...{ style: style() } }>
			<Item/>
		</View>,
};

export default selector;
