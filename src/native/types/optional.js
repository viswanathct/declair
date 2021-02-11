import React from 'react';
import { View } from 'react-native';

/* Exports */
const optional = {
	render: ({ item, style }) => {
		const Item = item();

		return Item
			? <View { ...{ style: style() } }>
				<Item/>
			</View>
			: null;
	},
};

export default optional;
