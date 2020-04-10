import { values } from '@laufire/utils/collection';

/* Exports */
const entry = (config) => {
	const providers = values(config.providers);
	const mount = (x) => x;

	const next = (() => {
		let index = 0;

		return (props) =>
			(index < providers.length
				? providers[index++]({ mount, ...props, next })
				: () => {});
	})();

	return next(config);
};

export default entry;
