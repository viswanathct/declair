import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { collect, values } from '@laufire/utils/collection';
import parse from 'declair/core/parse';

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

const setup = ({ config }) => {
	const mount = parse(providerConfig, config);

	return (props) => mount(props);
};

export default setup;
