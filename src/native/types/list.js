import React from 'react';
import { View } from 'react-native';
import { map, merge, values } from '@laufire/utils/collection';
import { container } from '../styles';

const list = merge({
	props: {
		data: {
			default: [],
		},
		style: {
			default: {
				...container,
				flexDirection: 'column',
			},
		},
	},
	setup: ({ item: Item }) => (props) => <View { ...{ style: props.style() } }>
		{
			values(map(props.data(), (itemData, key) =>
				<Item {...{
					key: key,
					data: (dataIn) => props.data(dataIn, itemData)[key],
				}}/>))
		}
	</View>,
});

export default list;
