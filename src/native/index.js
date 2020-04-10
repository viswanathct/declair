import { filter, merge } from '@laufire/utils/collection';
import mount from 'declair/core/mount';
import types from './types';

const setup = (SetupProps) => {
	const { types: typeCustomizations } = SetupProps;
	const widgetTypes = filter(merge(typeCustomizations, types),
		(type) => type.type === 'widget');

	SetupProps.next(SetupProps);
	const Root = mount(widgetTypes, SetupProps.mount);

	return { Root };
};

export default setup;
