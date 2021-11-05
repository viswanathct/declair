import { contains } from '@laufire/utils/predicates';

const App = {
	// global sources
	sources: {
		// key is used as name
		// defaults to simple
		todoFilter: {
			// seed value
			data: {},
		},
		todos: {
			data: [],
			selector: 'todoFilter',
		},
		todoBackend: {
			// marker for remote store
			url: 'someURL',
			// TODO: Start with plural form dictionaries. Later allow for named arrays as an alternative. Further allow for spaced strings.
			targets: {
				// normalized before  building
				// action defaults to set
				result: 'todos',
				// action defaults to add
				errors: {
					// auto-created in-line source
					name: 'errors',
					data: [],
				},
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
					source: 'allCompleted',
					// asymmetric source and target
					actions: {
						target: 'todoBackend',
						action: 'update',
						// default is given explicitly for understanding
						selector: {},
						// data overrides source
						data: {
							isCompleted: true,
						},
					},
				},
				todoInputs: {
					source: 'todoInputs',
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
					// marker
					action: 'create',
					// default
					event: 'click',
					source: 'todoInputs',
				},
			},
		},
		todos: {
			source: 'todos',
			target: 'todoBackend',
			// inherits sources from parent
			// marker
			item: {
				// source is inferred to be /todos/{item id}
				content: {
					text: {},
					isCompleted: {},
					remove: {
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
