import { fill, map } from '@laufire/utils/collection';
import typeDefaults from '../defaults/type';

import store from './store';
import transformation from './transformation';

const types = {
	store,
	transformation,
};

const augmented = map(types, (type) => fill(type, typeDefaults));

export default augmented;
