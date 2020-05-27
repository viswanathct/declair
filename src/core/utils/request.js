import { map } from '@laufire/utils/collection';
import parseURL from 'url-parse';

const url = (config) => `${ parseURL(config.url).set('query', config.params) }`;

// #Superseded: due to the lack of support for URLSearchParams on react-native.
const objToParamString = (obj) => {
	const Params = new URLSearchParams();

	map(obj, (value, key) => Params.set(key, value));

	const paramsStr = Params.toString();

	return paramsStr ? `?${ paramsStr }` : '';
};

export {
	url,
	objToParamString,
};
