const action = ({ context, parsing }) => {
	const { action: actionProp, target } = parsing;

	return target
		? actionProp
			? (data) => () => context.publish({
				[target]: {
					action: actionProp,
					data: data(),
				},
			})
			: (data) => () => context.publish({ [target]: data() })
		: undefined;
};

export {
	action,
};
