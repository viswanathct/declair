import { fill, map } from '@laufire/utils/collection';
import typeDefaults from '../defaults/type';

import store from './store';

const types = {
	store,
};

const augmented = map(types, (type) => fill(type, typeDefaults));

export default augmented;
