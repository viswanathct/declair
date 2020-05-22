import React from 'react';
import { View } from 'react-native';
import { map, values } from '@laufire/utils/collection';
import { container } from '../defaults/style';
import { defined } from '../../core/utils';

const list = {
	props: {
		data: {
			default: [],
		},
		style: {
			default: container,
		},
	},
	render: ({ data, item: Item, style }) =>
		<View { ...{ style: style() } }>
			{
				values(map(data(), (itemData, key) =>
					<Item {...{
						key: defined(itemData.id, key),
						data: (dataIn) => data(dataIn, itemData)[key],
					}}/>))
			}
		</View>,
};

export default list;
