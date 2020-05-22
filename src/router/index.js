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
	? ({ children }) =>
		<Router><BackButton>{ children }</BackButton></Router>
	: Router;

/* Exports */
const config = {
	types,
};

const init = ({ context }) => {
	const { Root } = context;
	const RouterRoot = () => <RouterWrapper><Root/></RouterWrapper>;

	context.Root = RouterRoot;
	context.next();
};

export default {
	config,
	init,
};
