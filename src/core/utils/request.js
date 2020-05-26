import { map } from '@laufire/utils/collection';

const objToParamString = (obj) => {
	const Params = new URLSearchParams();

	map(obj, (value, key) => Params.set(key, value));

	const paramsStr = Params.toString();

	return paramsStr ? `?${ paramsStr }` : '';
};

export {
	objToParamString,
};
