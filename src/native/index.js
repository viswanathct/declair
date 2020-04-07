import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { collection } from '@laufire/utils';
import parse from 'declair/core/parse';

const { collect, values } = collection;

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
					...props.data[key] ? { data: props.data[key] } : {},
					...itemProps,
					key,
				})))
		}
	</View>,
};

const types = {
	element: element,
	text: {
		handler: (props) => <Text {...props}>{ props.data }</Text>,
	},
};

const providerConfig = {
	types,
};

const declair = (consumerConfig) => {
	const mount = parse(providerConfig, consumerConfig);

	return (props) => mount(props);
};

export default declair;