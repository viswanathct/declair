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
	render: ({ data, item: Item, style, target }) =>
		<View { ...{ style: style() } }>
			{
				values(map(data(), (itemData, key) =>
					<Item {...{
						key: defined(itemData.id, key),
						data: () => itemData,
						target: (dataIn) => target(dataIn, itemData),
					}}/>))
			}
		</View>,
};

export default list;
