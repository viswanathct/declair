import { contains } from '@laufire/utils/predicates';

const App = {
	// inferred to be of type - block, due to the presence of the key, content
	// path defaults to a /
	// global sources
	sources: {
		todoFilter: {
			// name defaults to key
			// type defaults to simple
			// seed value
			data: {},
		},
		todoBackend: {
			// marker for remote store
			url: 'someURL',
			// provides two channels result and errors
			// returns result when the root is got
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
			// path defaults to parentPath/name
			// local source
			sources: {
				todoInputs: {
					data: {
						isCompleted: true,
						text: '',
					},
				},
				allCompleted: {
					// accessed on the fly, hence doesn't have dependencies
					fn: ({ state: { todos }}) =>
						Boolean(todos.find(contains({ isCompleted: true }))),
				},
				buttonAction: {
					fn: ({ data: { todoInputs: { id }}}) =>
						(id ? 'update' : 'create'),
				},
			},
			content: {
				toggleAll: {
					data: 'allCompleted',
					actions: {
						toggleAll: {
							target: '/todoBackend',
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
				submit: {
					// TODO: Reset todoInputs.
					// TODO: Reset todoInputs only on success. Nested conditional  actions.
					// marker
					text: ({ data: { buttonAction }}) =>
						(buttonAction === 'create' ? 'Add' : 'Edit'),
					events: {
						click: {
							createTodo: {
								action: 'buttonAction',
								data: 'todoInputs',
								target: '/todoBackend',
							},
						},
					},
				},
			},
		},
		todos: {
			// disregard current path and access the root sources
			data: '/todos',
			target: '/todoBackend',
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
				events: {
					click: {
						setTodo: {
							target: 'todoInputs',
						},
					},
				},
			},
		},
		toolbar: {
			// evaluated with context
			data: ({ state: { todos }}) => Boolean(todos.length),
			choices: {
				true: {
					path: '/',
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
									data: {},
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
