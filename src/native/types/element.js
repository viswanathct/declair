import React from 'react';
import { View } from 'react-native';
import { map, values } from '@laufire/utils/collection';
import { container as containerStyle } from '../defaults/style';

/* Exports */
const element = {
	props: {
		style: {
			default: containerStyle,
		},
	},
	render: ({ items, data, style }) => <View { ...{ style: style() } }>
		{
			values(map(items(), (Item, key) => <Item {...{ data, key }}/>))
		}
	</View>,
};

export default element;
