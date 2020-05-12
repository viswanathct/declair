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
	setup: (props) => {
		const { items, style } = props;

		return <View { ...{ style: style() } }>
			{
				values(map(items(props), (item, key) =>
					<React.Fragment {...{ key }}>
						{ item }
					</React.Fragment>))
			}
		</View>;
	},
};

export default element;
