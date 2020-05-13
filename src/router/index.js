import React from 'react';
import types from './types';
import { Platform } from 'react-native';

/* Data */
const { OS: os } = Platform;
const componentName = os !== 'web'
	? 'NativeRouter'
	: 'BrowserRouter';

// #NOTE: The package names should be literals, for the packager to understand.
const { [componentName]: Router, BackButton } = os !== 'web'
	? require('declair/bundle/react-router-native')
	: require('react-router-dom');

const RouterWrapper = os !== 'web'
	? ({ children: Children }) =>
		<Router><BackButton><Children/></BackButton></Router>
	: Router;

/* Exports */
const config = {
	types,
};

const setup = ({ context }) => {
	const { root } = context;

	context.root = () => {
		const Root = root();

		return <RouterWrapper><Root/></RouterWrapper>;
	};
	context.next();
};

export default {
	config,
	setup,
};
