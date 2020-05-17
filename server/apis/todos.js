'use strict';

const express = require(`express`);
const todoApi = express.Router();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
todoApi.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'rtlry',
  database: 'LPDIP01'
});
todoApi.get('/', function (req, res) {
  connection.query(
    'SELECT * FROM todo',
    function(err, results) {
      if (err) throw err;
      results.forEach(
        todo => { 
          if (todo.isDone === 0) { todo.isDone = false; } else { todo.isDone = true; } 
        }
      )
      res.json(results)
    }
  );
})
todoApi.post('/', function (req, res) {
  connection.query(
    'INSERT INTO todo (label, idList, isDone) VALUES (?, 1, false)',
    [req.body.label, req.body.idList, req.body.isDone],
    function(err, results) {
      if (err) throw err;
      res.json(req.body)
    });
})
todoApi.put('/', function (req, res) {
  connection.query(
    'UPDATE todo SET label=?, isDone=? WHERE id=?',
    [req.body.label, req.body.isDone, req.params.id],
    function(err, results) {
      if (err) throw err;
      res.json(req.body)
    });
})
todoApi.delete('/', function (req, res) {
  connection.query(
    'DELETE FROM todo WHERE id=?',
    [req.params.id],
    function(err, results) {
      if (err) throw err;
      res.json(results)
    });
})
module.exports = todoApi;