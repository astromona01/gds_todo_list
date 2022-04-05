import { createStore } from "vuex";

const store = createStore({
		state: {
				todos: [],
				filtered: [],
				sortType: '',
				filterOn: false,
				hasCompleted: false
		},
		getters: {
				todos(state) {
						return state.todos
				},
				filtered(state) {
						return state.filtered;
				},
				hasCompleted(state) {
						return state.hasCompleted;
				}
		},
		mutations: {
				getTodoList: async function (state) {
						const res = await fetch('http://localhost:5000/');
						state.todos = await res.json()
						const hasCompleted = state.todos.find(el => !el.active)
						state.hasCompleted = !!hasCompleted;
				},
				async addTodo(state, text) {
						const lastId = state.todos.length ? state.todos[state.todos.length-1].id : 0;
						const id = lastId+1;
						try {
								await fetch('http://localhost:5000/add-todo', {
										method: 'POST',
										headers: {
												"Content-Type": "application/json"
										},
										body: JSON.stringify({ id, text, active: true })
								})
								state.todos.push({ id, text, active: true });
								if (state.filterOn) {
										store.commit('sortTodos', state.sortType)
								}
						}catch(e) {
								console.log(e)
						}
				},
				async completeTodo(state, id) {
						try {
								await fetch(`http://localhost:5000/complete/${id}`, {
										method: 'PUT'
								})
								const completed = state.todos.find(el => el.id === id)
								completed.active = false
								state.hasCompleted = true
						}catch(e) {
								console.log(e)
						}
				},
				sortTodos(state, sortType){
						state.filterOn = true
						state.sortType = sortType;
						if (sortType === 'active'){
								state.filtered = state.todos.filter(el => el.active)
						} else if (sortType === 'completed') {
								state.filtered = state.todos.filter(el => !el.active)
						} else {
								state.filterOn = false;
								state.filtered = state.todos;
						}
				},
				async clearCompleted(state) {
						try {
								await fetch('http://localhost:5000/clear', {
										method: 'POST',
										headers: {
												"Content-Type": "application/json"
										}
								})
								for(let i = state.todos.length; i > 0; i--){
										if (!state.todos[i-1].active) {
												state.todos.splice(i-1, 1)
										}
								}
								state.hasCompleted = false;
						}catch(e) {
								console.log(e)
						}
				},
		}
})
export default store;