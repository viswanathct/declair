# decalir

	A tool to help in building simple, declarative, cross-platform UIs.

## The `Why`

* Allows for full stack developers to work with UI, without knowing the nuances.
* Enables Frontend developers to focus on structure and style, instead of wiring things up and writing boilerplate code.

## Installation
```sh
$ npm install declair
```

## Keys

* Most properties are common across components, even when unused, so to reduce complexity.

## Notes

* Tests wouldn't be written, until the structure reaches some stability.
* MobX is preferred over react state hooks, for it's simplicity.

# Development

## Setup
```sh
$ sh ./setup.sh
```

## ToDo
* Try to use classes, instead of object patching, to allow for future contributions.
* Decide on the state providers between MobX and ReactHooks.
* Straighten the circumventions for importing reactive-router-native.
