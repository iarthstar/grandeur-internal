/**
 * @file sequelize.js
 * @description sequelize js configuration
 * 
 * @author Arth Gajjar <iarthstar@gmail.com>
 */



// modules import
const Sequelize = require('sequelize');

const config = require('../config');
const G = require('../global');

const models = require('../models');

module.exports = async () => {

  const { database, environment } = config;
  const { uri } = database[environment].POSTGRESQL;

  G.SEQUELIZE = new Sequelize(uri, { logging: false });

  // sequelize psql connection
  await G.SEQUELIZE.authenticate();

  // syncing all models
  await models.sync();

};