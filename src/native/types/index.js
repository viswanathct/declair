import { fill, map } from '@laufire/utils/collection';
import typeDefaults from '../defaults/type';

import element from './element';
import input from './input';
import list from './list';
import text from './text';

const types = {
	element,
	input,
	list,
	text,
};

const augmented = map(types, (type) => fill(type, typeDefaults));

export default augmented;
