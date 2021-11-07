import { contains } from '@laufire/utils/predicates';

// inferred to be of type - block, due to the presence of the key, content
const App = {
	// global sources
	sources: {
		// key is used as name
		todoFilter: {
			// seed value
			// type defaults to simple
			data: {},
		},
		todoBackend: {
			// marker for remote store
			url: 'someURL',
			// provides two channels result and errors
		},
		todos: {
			// type simple is inferred
			// simple can also act as proxies
			data: 'todoBackend/result',
			// could be overridden through source.get
			selector: 'todoFilter',
		},
		errors: {
			data: {
				remoteErrors: 'todoBackend/errors',
			},
		},
	},
	// marker
	content: {
		todoForm: {
			// local source
			sources: {
				todoInputs: {
					data: {
						isCompleted: true,
						text: '',
					},
				},
				allCompleted: {
					fn: ({ state: { todos }}) =>
						Boolean(todos.find(contains({ isCompleted: true }))),
				},
			},
			content: {
				toggleAll: {
					data: 'allCompleted',
					actions: {
						toggleAll: {
							target: 'todoBackend',
							action: 'update',
							// change is the default event provided by the type, checkbox
							// default is given explicitly for understanding
							selector: {},
							// data overrides source
							data: {
								isCompleted: true,
							},
						},
					},
				},
				todoInputs: {
					data: 'todoInputs',
					content: {
						text: {
							type: 'text',
							// source is inferred from key
							// accessed as sources['parentSource/childSource]
						},
					},
				},
				addTodo: {
					// TODO: Reset todoInputs.
					// TODO: Reset todoInputs only on success. Nested conditional  actions.
					// marker
					text: 'Add',
					// inferred action
					event: 'click',
					// marker
					action: 'create',
					// default
					data: 'todoInputs',
				},
			},
		},
		todos: {
			// inherits sources from parent
			data: 'todos',
			target: 'todoBackend',
			// marker
			item: {
				// data is inferred to be /todos/{item id}
				content: {
					text: {},
					isCompleted: {},
					remove: {
						// target is inherited
						action: 'delete',
					},
				},
			},
		},
		buttons: {
			// evaluated with context
			data: ({ state: { todos }}) => Boolean(todos.length),
			choices: {
				true: {
					content: {
						filterButtons: {
							// propagated to all children
							target: 'todoFilter',
							content: {
								all: {
									// marker
									text: 'All',
									// marker
									// default
									action: 'set',
									data: { isCompleted: true },
								},
								active: {
									text: 'Active',
									data: { isCompleted: false },
								},
								completed: {
									text: 'Completed',
									data: { isCompleted: true },
								},
							},
						},
						clearCompleted: {
							target: 'todoBackend',
							action: 'delete',
							selector: { isCompleted: true },
						},
					},
				},
			},
		},
	},
};

export default App;
