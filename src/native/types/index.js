import { fill, map } from '@laufire/utils/collection';
import typeDefaults from '../defaults/type';

import button from './button';
import element from './element';
import form from './form';
import input from './input';
import list from './list';
import text from './text';

const types = {
	button, element,
	form, input,
	list, text,
};

const augmented = map(types, (type) => fill(type, typeDefaults));

export default augmented;
