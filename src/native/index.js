import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { collect, filter, merge, values } from '@laufire/utils/collection';
import mount from 'declair/core/mount';

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
	handler: (config) => ({ state }) => <View { ...config }>
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

const types = {
	element: element,
	text: {
		handler: (config) => ({ data }) => <Text { ...config }>{ data }</Text>,
		type: 'widget',
	},
};

const setup = (SetupProps) => {
	const { types: typeCustomizations } = SetupProps;
	const widgetTypes = filter(merge(
		{}, typeCustomizations, types
	), (type) => type.type === 'widget');

	SetupProps.next(SetupProps);
	const Root = mount(widgetTypes, SetupProps.mount);

	return Root;
};

export default setup;
