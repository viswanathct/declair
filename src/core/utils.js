const doNothing = (x) => x;
const sayNothing = () => {};

const hook = (
	call, exHook, inHook
) => (...args) => {
	const returned = call(...inHook ? inHook(...args) : args);

	return exHook ? exHook(returned, ...args) : returned;
};

export {
	doNothing,
	sayNothing,
	hook,
};
