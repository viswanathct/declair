import { values } from '@laufire/utils/dist/collection';

/* Exports */
const entry = (config) => {
	const providers = values(config.providers);
	const next = (() => {
		let index = 0;

		return ({ props }) => providers[index++]({ ...props, next });
	})();

	return next({ config });
};

export default entry;
