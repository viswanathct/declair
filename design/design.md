# Design

## Ideas

### Actions

* **props**
	* target
	* source
	* action (defaults to set)
	* data (optional / received)
	* selector (defaults to data)

### Components

* **key props**
	* prop - a path that points to underlying data in the current sub-state of the state tree. Could either be absolute or relative. Acts as the default for both source and target. Assumes the component key to the prop.
	* path - points to a key in state. Built automatically.
	* data
		* Used as seed data for the prop.
	* actions
		* event (component specific defaults).
		* action - action name / inline action.
	* text
* values
	* All strings are assumed to be sources unless explicitly mentioned as literals.
	* Dicts are used to detail props. Ex: { type: 'literal', value: 'something' }
* components
	* display
	* block
		* content
	* list
		* item(s?)
	* input controls
	* button
		* doesn't assume the component key to be the prop.
	* timer
		* state
		* delay

* attrs

### Sources

* props
	* selector

* Single state tree.

* Single source interface.
	* With the following methods: init, get, set, reset, create, read, update, patch and delete.
	* init is called automatically with the first call.
	* collection props
		* filter
		* sort
		* page
		* limit

* Child props are manipulated through the prop attribute of components.

* Single source processor, which manipulates the state tree and lends itself to custom sources for state management.

* Implicit sources. IE: The state tree and it's subs themselves are sources.

* Inbuilt sources
	* history / route

* Custom sources
	* timer - could be configured for delay, start and maxTicks.
	* remote
	* summary
		* selector
		* count / [all/some/none]

* Remote source has a target local source.

* Errors are stored in a sub-object and are sources themselves.

* Custom source are treated as  components themselves, to allow for better DevEx and lazy initialization (IE: Initialized only when the relevant page or subsection is rendered).

* Parent sources are available to all children and imparted to descendants.

* Consider using dictionaries instead of arrays.
	* Use maps instead of objects, as with the later:
		* Keeping order could be difficult.
			* Numeric indices are prioritized. This could be mitigated by having string prefixes.
			* Patches have to maintain order for existing props. New props could be appended.

### Testing

* Integration testing is favoured to allow for leaner library.

* Schemas could be used to generate integration testing payloads. All variations of the schema are tested, by automatically building combinations.

* If possible testing could run until complete coverage is done.

* Internals are exported separately for aiding testing. Ex: Normalizer is exported separately for testing.

### DevEx

* Unknown props and configs are ignored to allow for design first development. IE: Configs are designed in advance.

* Everything, including the source config is available as an unified object tree for easing development and testing.

## ToDos

* components
	* router
		* should support parameters (currently missing)

* sources
	* Single state tree is missing. Instead components have their own state.
