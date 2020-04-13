import React from 'react';
import { View } from 'react-native';
import { map, omit, values } from '@laufire/utils/collection';

const element = {
	props: {
		type: {
			default: 'element',
		},
		style: {
			default: {
				alignItems: 'center',
				flex: 1,
				flexDirection: 'column',
				justifyContent: 'center',
			},
		},
	},
	setup: (config) => ({ state }) =>
		<View { ...omit(config, ['getData']) }>
			{
				values(map(config.children, (child, key) =>
					<React.Fragment {...{ key }}>
						{ child({ state }) }
					</React.Fragment>))
			}
		</View>,
};

export default element;
