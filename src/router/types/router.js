// #TODO: Enable deep-linking. It seems to need some config changes to the consumer configuration.

import React from 'react';
import { Platform, View, Text } from 'react-native';
import { map, fill, values } from '@laufire/utils/collection';
import element from '../../core/config/types/element';

/* Delegates */
const { Route, Link, useRouteMatch } = Platform.os !== 'web'
	? require('declair/bundle/react-router-native')
	: require('react-router-dom');

/* Helpers */
const getLink = (path) => (dummy, key) =>
	<Link {...{
		key: key,
		to: `${ path }/${ key }`,
	}}>
		<Text>{ key }</Text>
	</Link>;

const getItem = (
	path, item, key
) => <Route {...{
	key: key,
	path: `${ path }/${ key }`,
}}>
	{ item }
</Route>;

const styles = {
	wrapper: {
		flex: 1,
	},
	links: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
};

/* Workers */
const Routed = ({ items: passedItems, data: passedData, style }) => {
	const { path: pathname } = useRouteMatch();
	const items = passedItems();
	const data = passedData();
	const path = pathname.replace(/\/$/, '');

	return <View {...{ style: styles.wrapper }}>
		<View {...{ style: style() }}>
			{ values(map(items, getLink(path))) }
		</View>
		<View {...{ style: { flex: 1 }}}>
			{
				values(map(items, (item, key) => getItem(
					path,
					item({ data: () => data[key] }),
					key,
				)))
			}
		</View>
	</View>;
};

/* Exports */
const router = {
	data: {},
	props: {
		style: {
			default: styles.links,
		},
	},
	setup: () => (props) => <Routed { ...props }/>,
	type: 'uiComponent',
};

export default fill(router, element);
