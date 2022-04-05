const add = (todos, req) => {
		todos.push(req.body)
		return JSON.stringify(todos, null, 4)
}
const complete = (todos, req) => {
		const id = req.params.id;
		const completed = todos.find(el => el.id == id);
		completed.active = false
		return JSON.stringify(todos, null, 4)
}
const clearCompleted = (todos) => {
		for (let i = todos.length; i > 0; i--) {
				if (!todos[i-1].active) {
						todos.splice(i-1, 1)
				}
		}
		return JSON.stringify(todos, null, 4)
}
module.exports = {
		add,
		complete,
		clearCompleted
}