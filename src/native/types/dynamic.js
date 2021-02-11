import React from 'react';
import { View } from 'react-native';

/* Exports */
const dynamic = {
	render: ({ item, style }) => {
		const Item = item();

		return <View { ...{ style: style() } }>
			<Item/>
		</View>;
	},
};

export default dynamic;
