import mount from 'declair/core/mount';
import types from './types';

const setup = (SetupProps) => {
	SetupProps.next(SetupProps);
	const Root = mount(SetupProps, types);

	return { Root };
};

export default setup;
