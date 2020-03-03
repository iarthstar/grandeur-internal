/**
 * @file express.js
 * @description express js configuration
 * 
 * @author Arth Gajjar <iarthstar@gmail.com>
 */



// modules import
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('../api');
const config = require('../config');
const utils = require('../utils');
const G = require('../global');

module.exports = async () => {

  G.EXPRESS_APP = express();

  G.EXPRESS_APP.get('/', (_req, res) => res.status(200).end());
  G.EXPRESS_APP.get('/status', (_req, res) => res.status(200).end());
  G.EXPRESS_APP.head('/status', (_req, res) => res.status(200).end());
  G.EXPRESS_APP.enable('trust proxy');

  G.EXPRESS_APP.use(cors());

  G.EXPRESS_APP.use(bodyParser.json());
  G.EXPRESS_APP.use(bodyParser.urlencoded({ extended: false }));

  G.EXPRESS_APP.use(config.api.prefix, routes());

  G.EXPRESS_APP.use((_req, _res, next) => {
    const err = new Error('Something went wrong...');
    err['status'] = 404;
    next(err);
  });

  G.EXPRESS_APP.use((err, _req, res, _next) => {
    return res.json({
      error: true,
      error_message: err.message
    }).status(err.status || 500);
  });
};