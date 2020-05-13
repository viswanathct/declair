import React from 'react';
import { View } from 'react-native';
import { map, values } from '@laufire/utils/collection';
import { container } from '../defaults/style';

const list = {
	props: {
		style: {
			default: {
				...container,
				flexDirection: 'column',
			},
		},
	},
	setup: ({ items, style }) =>
		<View { ...{ style: style() } }>
			{
				values(map(items(), (Item, key) =>
					<React.Fragment {...{ key }}>
						<Item />
					</React.Fragment>))
			}
		</View>,
};

export default list;
