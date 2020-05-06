import React from 'react';
import { View } from 'react-native';
import { map, values } from '@laufire/utils/collection';
import { container } from '../defaults/style';

const element = {
	props: {
		style: {
			default: container,
		},
	},
	setup: () => ({ items, data, style }) =>
		<View { ...{ style: style() } }>
			{
				values(map(items(), (item, key) =>
					<React.Fragment {...{ key }}>
						{ item({ data: () => data()[key] }) }
					</React.Fragment>))
			}
		</View>,
};

export default element;
