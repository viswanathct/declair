import { map, fill } from '@laufire/utils/collection';
import typeDefaults from '../defaults/type';

import button from './button';
import element from './element';
import form from './form';
import list from './list';

const input = {};
const text = {};

const components = {
	button, element, input,
	form, list, text,
};

export default map(components, (component) => fill(component, typeDefaults));
