import React from 'react';
import { View } from 'react-native';
import { map, values } from '@laufire/utils/collection';
import { container } from '../defaults/style';

const list = {
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
};

export default list;
