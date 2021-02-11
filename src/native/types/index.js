import { fill, map } from '@laufire/utils/collection';
import typeDefaults from '../defaults/type';

import button from './button';
import dynamic from './dynamic';
import element from './element';
import optional from './optional';
import form from './form';
import input from './input';
import list from './list';
import text from './text';

const types = {
	button, dynamic, element,
	form, input, list, optional, text,
};

const augmented = map(types, (type) => fill(type, typeDefaults));

export default augmented;
