import React from 'react';
import { View } from 'react-native';
import { map, values } from '@laufire/utils/collection';
import { container as containerStyle } from '../defaults/style';

/* Exports */
const form = {
	props: {
		data: {
			default: {},
		},
		style: {
			default: {
				...containerStyle,
				flexDirection: 'column',
			},
		},
	},
	render: ({ data, items, style }) =>
		<View { ...{ style: style() } }>
			{
				values(map(items(), (Item, key) => <Item {...{
					data, key,
				}}/>))
			}
		</View>,
};

export default form;
