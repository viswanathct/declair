import { normalizeProps } from './utils';

/* Exports */
const getMount = (types) => {
	const mount = (props) => {
		const normalizedProps = normalizeProps(types, props);
		const type = types[normalizedProps.type];

		return type.handler({ context, ...normalizedProps }); // eslint-disable-line no-use-before-define
	};

	const context = {
		mount,
	};

	return mount;
};

export default getMount;
