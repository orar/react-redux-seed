const path = require('path');
const shortId = require('shortid');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

const adapter = new FileAsync(path.join(__dirname, 'db.json'));
const dbAdapter = low(adapter);

const createResponse = require('./response.js');

module.exports = (server) => {
  return dbAdapter.then((db) => {
    server.get('/todo/all', (req, res) => {
      const allTodo = db.get('todo').value();

      res.send(createResponse(allTodo, 'ok'));
    });

    server.post('/todo/add', (req, res) => {
      const todo = req.body;
      todo.id = shortId.generate();
      db.get('todo').push(todo).write();

      res.send(createResponse(todo, 'saved', 'todo added'));
    });

    return db.defaults({ todo: [] }).write();
  });
};
