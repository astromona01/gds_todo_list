const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

const port = process.env.port || 5000;
const todos = require('./todos');

const actions = {
		add: todos.add,
		complete: todos.complete,
		clear: todos.clearCompleted
}

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

function handler(req, res, action, file) {
		fs.readFile(file, 'utf-8', (err, data) => {
				if (err) {
						res.sendStatus(404, JSON.stringify({result: 0, text: err}));
				} else {
						const newFile = actions[action](JSON.parse(data), req)
						fs.writeFile(file, newFile, (err) => {
								if (err){
										res.send('{"result": 0}');
								}else {
										res.send('{"result": 1}')
								}
						})
				}
		})
}
app.get('/', (req, res)=> {
		fs.readFile('./src/server/db/todos.json', 'utf-8', (err, data)=> {
				if (err){
						res.sendStatus(404, JSON.stringify({result: 0, text: err}));
				}else {
						res.send(data);
				}
		});
});

app.post('/add-todo', (req, res) => {
		handler(req, res, 'add', './src/server/db/todos.json')
})
app.put('/complete/:id', (req, res) => {
		handler(req, res, 'complete', './src/server/db/todos.json')
})
app.post('/clear', (req, res) => {
		handler(req, res, 'clear', './src/server/db/todos.json')
})
app.listen(port, () => {
		console.log(`Listening ${port}`)
})