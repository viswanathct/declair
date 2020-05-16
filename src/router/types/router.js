// #TODO: Enable deep-linking. It seems to need some config changes to the consumer configuration.

import React from 'react';
import { Platform, View, Text } from 'react-native';
import { map, fill, values, pick } from '@laufire/utils/collection';
import element from '../../core/config/types/element';

/* Delegates */
const { Route, Link, useRouteMatch } = Platform.os !== 'web'
	? require('declair/bundle/react-router-native')
	: require('react-router-dom');

/* Helpers */
const getLink = (path) => ({ key, label }) => <Link {...{
	key: key,
	to: `${ path }/${ key }`,
}}>
	<Text>{ label || key }</Text>
</Link>;

const getItem = ({ path, item: Item, key }) => <Route {...{
	key: key,
	path: `${ path }/${ key }`,
}}>
	<Item {...{ key }}/>
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
const Routed = (props) => {
	const { style } = props;
	const { path: pathname } = useRouteMatch();
	const labels = props.labels();
	const items = props.items();
	const path = pathname.replace(/\/$/, '');

	return <View {...{ style: styles.wrapper }}>
		<View {...{ style: style() }}>
			{ values(map(items, (dummy, key) => getLink(path)({
				key: key,
				label: labels[key],
			}))) }
		</View>
		<View {...{ style: { flex: 1 }}}>
			{
				values(map(items, (item, key) => getItem({ path, item, key })))
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
		items: {
			normalize: ({ prop, normalize }) =>
				(prop
					? map(prop, (item, name) => normalize({ name }, item))
					: undefined),
			parse: ({ context, parse, prop }) => {
				const items = map(prop, (parsing) =>
					context.mount(parse({ parsing })));

				return () => items;
			},
		},
	},
	parse: (parserArgs) => {
		parserArgs.props.labels = () => pick(parserArgs.parsing.items, 'label');

		return element.parse(parserArgs);
	},
	setup: (props) => () => <Routed { ...props }/>,
	type: 'router',
};

export default fill(router, element);
