import { map, fill } from '@laufire/utils/collection';
import typeDefaults from '../defaults/type';

import button from './button';
import dynamic from './dynamic';
import element from './element';
import optional from './optional';
import form from './form';
import input from './input';
import list from './list';
import text from './text';

const components = {
	button, dynamic, element, optional,
	form, input, list, text,
};

export default map(components, (component) => fill(component, typeDefaults));
