/* eslint-disable max-lines-per-function */
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
	handler: (config) => {
		const children = collect(config.items, (itemConfig, key) =>
			({
				config: itemConfig,
				render: config.context.mount({
					...itemConfig,
					key,
				}),
			}));

		return ({ state }) => <View { ...config }>
			{
				values(collect(children, (child, key) =>
					<React.Fragment {...{ key }}>
						{
							child.render({
								state,
								...{
									data: child.config.source
										? state[child.config.source]
										: child.config.hasOwnProperty('data')
											? child.config.data
											: config.data[key] || {},
								},
							})
						}
					</React.Fragment>))
			}
		</View>;
	},
	type: 'widget',
};

const types = {
	element: element,
	text: {
		handler: (config) =>
			({ data }) => <Text { ...config }>{ data }</Text>,
		type: 'widget',
	},
};

const setup = (SetupProps) => {
	const { types: typeCustomizations } = SetupProps;
	const widgetTypes = filter(merge(
		{}, typeCustomizations, types
	), (type) => type.type === 'widget');

	SetupProps.next(SetupProps);
	const Root = getMount(widgetTypes, SetupProps.mount);

	return Root;
};

export default setup;
