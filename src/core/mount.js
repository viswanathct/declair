import { normalizeProps } from './utils';

/* Exports */
const getMount = (types, mountHook) => {
	const mount = (props) => {
		const normalizedProps = normalizeProps(types, props);
		const type = types[normalizedProps.type];

		return mountHook(type.handler({ context, ...normalizedProps })); // eslint-disable-line no-use-before-define
	};

	const context = {
		mount,
	};

	return mount;
};

export default getMount;
