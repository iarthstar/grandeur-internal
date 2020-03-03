/**
 * @file sequelize.js
 * @description sequelize js configuration
 * 
 * @author Arth Gajjar <iarthstar@gmail.com>
 */



// modules import
const utils = require('../utils');
const config = require('../config');
const Sequelize = require('sequelize');
const G = require('../global');

const models = require('../models');

module.exports = async () => {

  const { database: db, environment: env } = config;
  const { database, username, password, host } = db[env].POSTGRESQL;

  G.SEQUELIZE = new Sequelize(database, username, password, {
    dialect: 'postgres',
    host: host,
    logging: false
  });

  // sequelize psql connection
  await G.SEQUELIZE.authenticate();

  // syncing all models
  await models.sync();

};