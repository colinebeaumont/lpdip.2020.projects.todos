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
    function(err, results, fields) {
      res.json(results)
    }
  );
})
listsApi.post('/', function (req, res) {
  connection.query(
    'INSERT INTO Liste (label, description) VALUES (?, ?)',
    [req.body.label, req.body.description],
    function(err, results, fields) {
      res.json(results)
    });
})
listsApi.put('/', function (req, res) {
  connection.query(
    'UPDATE todo SET label=? WHERE id=?',
    [req.body.label, req.body.description],
    function(err, results, fields) {
      res.json(results)
    });
})
module.exports = listsApi;