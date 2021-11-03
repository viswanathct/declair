import { contains } from '@laufire/utils/predicates';

const App = {
	// global source
	sources: {
		todosBackend: {
			url: 'someURL',
			target: {
				data: 'todos',
				error: {
					source: 'errors',
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
				allCompleted: {
					fn: ({ state: { todos }}) =>
						Boolean(todos.find(contains({ isCompleted: true }))),
				},
			},
			content: {
				toggleAll: {
					source: 'allCompleted',
					actions: {
						action: 'update',
						selector: {},
						data: {
							isCompleted: true,
						},
					},
				},
				todoInputs: {
					source: 'todoInputs',
					// Seed value.
					data: {
						isCompleted: true,
						text: '',
					},
				},
				addTodo: {
					// marker
					text: 'Add',
					action: 'create',
					target: 'todosBackend',
				},
			},
		},
		todos: {
			// copied to target
			source: 'todos',
			data: [],
			// marker
			item: {
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
			// inline source
			source: ({ state: { todos }}) => Boolean(todos.length),
			choices: {
				true: {
					content: {
						filterButtons: {
							// propagated to all children.
							target: 'todoFilter',
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
						clearCompleted: {
							target: 'todos',
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
