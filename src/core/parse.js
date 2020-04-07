import { collection } from '@laufire/utils';
import defaults from './defaults';

const { merge } = collection;

const normalizeProps = (types, props) => {
	const type = props.type || defaults.type;

	return merge(
		{ type }, defaults.typeConfigs[type],
		types[type]?.config, props
	);
};

const parse = (providerConfig, consumerConfig) => {
	const { types } = merge(
		{}, providerConfig, consumerConfig
	);

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

export default parse;
