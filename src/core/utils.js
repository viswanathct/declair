import { has, walk } from '@laufire/utils/collection';
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

const capitalize = (string) => string[0].toUpperCase() + string.slice(1);

const assignName = (fn, name) => {
	Object.defineProperty(
		fn, 'name', { value: name }
	);

	return fn;
};

/* Exports */
const doNothing = (x) => x;
const sayNothing = () => {};

const hook = (
	call, exHook, inHook
) => (...args) => {
	const returned = call(...inHook ? inHook(...args) : args);

	return exHook ? exHook(returned, ...args) : returned;
};

const unique = (array) => array.filter(isUnique);

const once = (cb) => {
	const state = {};

	return () => (state.returned
		? state.returned
		: (state.returned = cb()));
};

const defined = (...values) =>
	values[values.findIndex((value) => value !== undefined)];

const hasSource = (sources, prop) => {
	const processor = hasSourceProcessors[inferType(prop)];

	return processor
		? processor(sources, prop)
		: false;
};

const isSourceSimple = (parserArgs) => {
	const { context, parsing } = parserArgs;
	const { data } = parsing;

	return !context.isObservable(data) || context.types[data].simple;
};

const namedWrapper = (wrapper, config) =>
	assignName(wrapper, capitalize(config.type.type));

/* Superseded */
const hasActions = (config, source) =>
	typeof source === 'string' && config.sources[source]?.actions?.length > 0;

const setupHook = (parserArgs, cb) => {
	const origSetup = parserArgs.type.setup;

	parserArgs.type = {
		...parserArgs.type,
		setup: ({ props }) => cb(origSetup, props),
	};
};

const isObservable = (config, value) =>
	typeof value === 'string' && Boolean(config.sources[value]);

export {
	doNothing,
	sayNothing,
	once,
	unique,
	defined,
	hook,
	hasSource,
	hasActions,
	isSourceSimple,
	isObservable,
	namedWrapper,
	setupHook,
};
