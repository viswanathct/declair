import { assign, has, walk } from '@laufire/utils/collection';
import { inferType } from '@laufire/utils/reflection';

/* Helpers */
const hasSourceProcessors = {
	string: (sources, prop) => !!sources[prop],
	object: (sources, prop) => has(walk(prop,
		(value) => hasSource(sources, value)), true), // eslint-disable-line no-use-before-define
};

const isUnique = (
	value, index, array
) => array.indexOf(value) === index;

/* Exports */
const doNothing = (x) => x;
const sayNothing = () => {};

const hook = (
	call, exHook, inHook
) => (...args) => {
	const returned = call(...inHook ? inHook(...args) : args);

	return exHook ? exHook(returned, ...args) : returned;
};

const isObservable = (config, value) =>
	typeof value === 'string' && Boolean(config.sources[value]);

const hasSource = (sources, prop) => {
	const processor = hasSourceProcessors[inferType(prop)];

	return processor
		? processor(sources, prop)
		: false;
};

const unique = (array) => array.filter(isUnique);

const setupHook = (parserArgs, cb = doNothing) => {
	const ret = {};
	const origSetup = parserArgs.type.setup;

	parserArgs.type = {
		...parserArgs.type,
		setup: (props) => {
			assign(ret, cb(props));
			return origSetup(props);
		},
	};

	return ret;
};

const once = (cb) => {
	const state = {};

	return () => !state.called && (state.called = true && cb());
};

export {
	doNothing,
	sayNothing,
	hasSource,
	hook,
	isObservable,
	once,
	setupHook,
	unique,
};
