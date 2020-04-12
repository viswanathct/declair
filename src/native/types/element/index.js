import React from 'react';
import { View } from 'react-native';
import { map, omit, values } from '@laufire/utils/collection';
import styles from '../../styles';

const element = {
	config: {
		style: styles.element,
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
	type: 'widget',
};

export default element;
