import React from 'react';
import { View } from 'react-native';
import { map, values } from '@laufire/utils/collection';
import { container } from '../defaults/style';

const element = {
	props: {
		style: {
			default: {
				...container,
				flexDirection: 'column',
			},
		},
	},
	setup: ({ items, style }) => <View { ...{ style: style() } }>
		{
			values(map(items(), (item, key) =>
				<React.Fragment {...{ key }}>
					{ item }
				</React.Fragment>))
		}
	</View>,
};

export default element;
