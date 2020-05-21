import React from 'react';
import { View } from 'react-native';
import { map, values } from '@laufire/utils/collection';
import { container as containerStyle } from '../defaults/style';

/* Exports */
const element = {
	props: {
		data: {
			default: {},
		},
		style: {
			default: containerStyle,
		},
	},
	render: ({ items, style }) => <View { ...{ style: style() } }>
		{
			values(map(items(), (Item, key) => <Item {...{ key }}/>))
		}
	</View>,
};

export default element;
