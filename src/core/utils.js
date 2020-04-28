import { has, walk } from '@laufire/utils/collection';
import { inferType } from '@laufire/utils/reflection';

/* Helpers */
const hasSourceProcessors = {
	string: (sources, prop) => !!sources[prop],
	object: (sources, prop) => has(walk(prop,
		(value) => hasSource(sources, value)), true), // eslint-disable-line no-use-before-define
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

const isObservable = (config, value) =>
	typeof value === 'string' && Boolean(config.sources[value]);

const hasSource = (sources, prop) => {
	const processor = hasSourceProcessors[inferType(prop)];

	return processor
		? processor(sources, prop)
		: false;
};

export {
	doNothing,
	sayNothing,
	hasSource,
	hook,
	isObservable,
};
