// #TODO: Improve the flow for platform specific imports.
// #LATER: Enable deep-linking. It seems to need some config changes to the consumer configuration.

import React from 'react';
import { Platform, View, Text } from 'react-native';
import { map, fill, values } from '@laufire/utils/collection';
import element from '../../core/config/types/element';

/* Data */
const { OS: os } = Platform;
const componentName = os !== 'web'
	? 'NativeRouter'
	: 'BrowserRouter';

/* Delegates */
// #NOTE: The package names should be literals, for the packager to understand.
const { [componentName]: Router,
	Route, Link, BackButton } = os !== 'web'
	? require('react-router-native')
	: require('react-router-dom');

const RouterWrapper = os !== 'web'
	? ({ children }) =>
		<Router><BackButton>{ children }</BackButton></Router>
	: Router;

/* Helpers */
const getLink = (dummy, key) =>
	<Link {...{
		key: key,
		to: `/${ key }`,
	}}>
		<Text>{ key }</Text>
	</Link>;

const getItem = (item, key) => <Route {...{
	key: key,
	path: `/${ key }`,
}}>{ item() }</Route>;

/* Exports */
const router = {
	data: {},
	props: {
		style: {
			default: {
				alignItems: 'center',
				flex: 1,
				flexDirection: 'column',
				justifyContent: 'center',
			},
		},
	},
	setup: ({ items: passedItems }) => () => {
		const items = passedItems();

		return <RouterWrapper>
			<View>
				<View>{ values(map(items, getLink)) }</View>
				{
					values(map(items, getItem))
				}
			</View>
		</RouterWrapper>;
	},
	type: 'uiComponent',
};

export default fill(router, element);
