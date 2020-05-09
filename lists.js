'use strict';

const express = require(`express`);
const listsApi = express.Router();

listsApi.get(`/`, async (req, res) => {
  return res.json({
    API:'APIlists',
  });
});

module.exports = listsApi;
