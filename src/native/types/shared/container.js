import React from 'react';
import { View } from 'react-native';
import { map, values } from '@laufire/utils/collection';
import { container as containerStyle } from '../../defaults/style';

/* Exports */
const container = {
	props: {
		style: {
			default: containerStyle,
		},
	},
	render: ({ data, items, style, target }) =>
		<View { ...{ style: style() } }>
			{
				values(map(items(), (Item, key) => <Item {...{
					data, key, target,
				}}/>))
			}
		</View>,
};

export default container;
