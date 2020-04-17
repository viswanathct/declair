import { fill, map } from '@laufire/utils/collection';
import typeDefaults from '../defaults/type';

import element from './element';
import text from './text';
import input from './input';

const types = {
	element,
	input,
	text,
};

const augmented = map(types, (type) => fill(type, typeDefaults));

export default augmented;
