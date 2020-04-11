import React from 'react';
import { View } from 'react-native';
import { map, values } from '@laufire/utils/collection';
import styles from '../../styles';

const element = {
	config: {
		style: styles.element,
	},
	handler: (config) => ({ state }) =>
		<View { ...config }>
			{
				values(map(config.children, (child, key) =>
					<React.Fragment {...{ key }}>
						{ child(state) }
					</React.Fragment>))
			}
		</View>,
	type: 'widget',
};

export default element;
