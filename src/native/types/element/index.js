import React from 'react';
import { View } from 'react-native';
import { collect, values } from '@laufire/utils/collection';
import styles from '../../styles';

const element = {
	config: {
		style: styles.element,
	},
	handler: (config) => ({ state }) =>
		<View { ...config }>
			{
				values(collect(config.children, (dummy, key) =>
					<React.Fragment {...{ key }}>
						{
							config.renderChild(key, state)
						}
					</React.Fragment>))
			}
		</View>,
	type: 'widget',
};

export default element;
