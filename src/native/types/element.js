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
	setup: () => (renderProps) => {
		const { items, style } = renderProps;

		return <View { ...{ style: style() } }>
			{
				values(map(items(renderProps), (item, key) =>
					<React.Fragment {...{ key }}>
						{ item }
					</React.Fragment>))
			}
		</View>;
	},
};

export default element;
