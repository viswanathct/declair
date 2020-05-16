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
	setup: () => ({ init, items, key: parentKey, style }) => {
		const [state] = useState({});

		init({ state });

		return <View { ...{ key: parentKey, style: style() } }>
			{
				values(map(items(), (Item, key) => <Item {...{ key, state }}/>))
			}
		</View>;
	},
};

export default form;
