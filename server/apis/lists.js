'use strict';

const express = require(`express`);
const listsApi = express.Router();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
listsApi.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'rtlry',
  database: 'LPDIP01'
});
listsApi.get('/', function (req, res) {
  connection.query(
    'SELECT * FROM Liste',
    function(err, results) {
      res.json(results)
    }
  );
})
listsApi.post('/', function (req, res) {
  connection.query(
    'INSERT INTO Liste (label, description) VALUES (?, ?)',
    [req.body.label, req.body.description],
    function(err, results) {
      if (err) throw err;
      res.json(req.body)
    });
})
listsApi.put('/', function (req, res) {
  connection.query(
    'UPDATE Liste SET label=?, description=? WHERE id=?',
    [req.body.label, req.body.description, req.params.id],
    function(err, results) {
      if (err) throw err;
      res.json(req.body)
    });
})
module.exports = listsApi;