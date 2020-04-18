import providerTypes from './types';
import { map, merge } from '@laufire/utils/collection';

/* Helpers */
const getPublisher = (context) =>
	(data) => context.publish(data);

/* Exports */
const providerConfig = {
	types: providerTypes,
};

const setup = ({ config, context }) => {
	const { types } = context;

	context.sources = map(config.sources, (source, name) => {
		const type = types[source.type];

		return type.parse({
			publish: getPublisher(context),
			source: { name, ...merge(
				{}, type.config, source
			) },
		});
	});

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
