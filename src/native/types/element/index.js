import React from 'react';
import { View } from 'react-native';
import { map, values } from '@laufire/utils/collection';

const element = {
	props: {
		type: {
			default: 'element',
		},
		data: {
			observing: false,
		},
		style: {
			default: {
				flexDirection: 'row',
				justifyContent: 'flex-start',
				width: '100%',
			},
		},
	},
	setup: (context) => () =>
		<View { ...{ style: context.style() } }>
			{
				values(map(context.items(), (item, key) =>
					<React.Fragment {...{ key }}>
						{ item() }
					</React.Fragment>))
			}
		</View>,
};

export default element;
