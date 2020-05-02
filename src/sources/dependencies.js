/* eslint-disable no-magic-numbers */

import { combine, map, values } from '@laufire/utils/collection';
import { unique } from '../core/utils';

/* Helpers */
const parse = (
	depTree, source, ancestors
) => {
	if(ancestors.indexOf(source) > -1)
		throw new Error(`Circular dependency ${ source } in ${ ancestors.splice(-1) }`);

	return combine([source], ...values(map(depTree[source],
		(dependent) => parse(
			depTree, dependent, [...ancestors, source]
		))));
};

const getDependencies = (depTree) =>
	map(depTree, (dependents, source) =>
		unique(combine([],
			...map(dependents, (dependent) => parse(
				depTree, dependent, [source]
			)))));

/* Exports */
const getDependents = (depTree) => {
	const dependencies = getDependencies(depTree);
	const dependentTree = map(dependencies, () => []);

	map(dependencies, (dependents, dependency) =>
		map(dependents, (dependent) =>
			dependentTree[dependent].push(dependency)));

	return map(dependentTree, unique);
};

export default getDependents;
