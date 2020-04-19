import providerTypes from './types';
import { map } from '@laufire/utils/collection';

/* Helpers */
const getPublisher = (context) =>
	(data) => context.publish(data);

/* Exports */
const providerConfig = {
	types: providerTypes,
};

const setup = ({ config, context }) => {
	context.sources = map(config.sources, (source,) => ({
		publish: getPublisher(context),
		...source,
	}));

	context.next();
};

const init = ({ config, context }) =>
	map(config.sources, (source, name) =>
		context.types[source.type].setup({
			config: source,
			context: context.sources[name],
		}));

export default {
	config: providerConfig,
	init: init,
	setup: setup,
};
