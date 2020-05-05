import React from 'react';
import { View } from 'react-native';
import { map, values } from '@laufire/utils/collection';
import { container } from '../defaults/style';

const list = {
	props: {
		style: {
			default: container,
		},
	},
	setup: ({ items, style }) => () =>
		<View { ...{ style: style() } }>
			{
				values(map(items(), (item, key) =>
					<React.Fragment {...{ key }}>
						{ item() }
					</React.Fragment>))
			}
		</View>,
};

export default list;
