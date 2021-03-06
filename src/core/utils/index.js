import { contains, has, map,
	merge, select, walk } from '@laufire/utils/collection';
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

const dataCall = (parserArgs) => {
	const { context, parsing, resolver } = parserArgs;
	const { data } = parsing;
	const resolve = resolver(parserArgs);

	return !context.isObservable(data)
		|| context.sources[data].type.simple
			=== context.types[parsing.type].simple
		? () => resolve()
		: () => resolve()?.data;
};

const targetCall = ({ action, data, target }) => (action
	? () => target({ action: action(), data: data() })
	: () => target(data()));

const namedWrapper = (wrapper, config) =>
	assignName(wrapper, capitalize(config.type.type));

const patched = (base, patch) => (!contains(base, patch)
	? merge(base, patch)
	: undefined);

const propResolver = (props, selector) => {
	const availableProps = select(props, selector);

	return () => map(availableProps, (dummy, key) => props[key]());
};

const whenData = (data, render) =>
	(!data || (data && data() !== undefined)
		? render()
		: null);

export {
	doNothing,
	sayNothing,
	once,
	unique,
	defined,
	hook,
	hasSource,
	isSourceSimple,
	dataCall,
	targetCall,
	patched,
	propResolver,
	namedWrapper,
	whenData,
};
