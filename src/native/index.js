import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { collect, filter, merge, values } from '@laufire/utils/collection';
import getMount from '../core/mount';

const styles = StyleSheet.create({
	element: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
});

const element = {
	config: {
		style: styles.element,
	},
	handler: (props) => <View { ...props }>
		{
			values(collect(props.items, (itemProps, key) =>
				props.context.mount({
					...props,
					...{ data: itemProps.source
						? props.state[itemProps.source]
						: props.data[key] || {}},
					...itemProps,
					key,
				})))
		}
	</View>,
	type: 'widget',
};

const types = {
	element: element,
	text: {
		handler: (props) => <Text {...props}>{ props.data }</Text>,
		type: 'widget',
	},
};

const setup = ({ config }) => {
	const widgetTypes = filter(merge(
		{}, config.types, types
	), (type) => type.type === 'widget');

	return getMount(widgetTypes);
};

export default setup;
