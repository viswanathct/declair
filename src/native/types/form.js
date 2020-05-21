import React, { useState } from 'react';
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
	render: ({ action, data, items, style }) => {
		const [state] = useState(data());

		return <View { ...{ style: style() } }>
			{
				values(map(items, (Item, key) => <Item {...{
					action, key, state,
				}}/>))
			}
		</View>;
	},
};

export default form;
