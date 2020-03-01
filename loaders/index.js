/**
 * @file loaders/index.js
 * @description all the loaders required for the server are here
 * 
 * @author Arth Gajjar <iarthstar@gmail.com>
 */



// modules import
const utils = require('../utils');
const expressLoader = require('./express');
const sequelizeLoader = require('./sequelize');

exports.init = async ({ expressApp, sequelize }) => {

  const sq = await sequelizeLoader.init({ sequelize });
  utils.success('Sequelize Intialized');
  await expressLoader.init({ app: expressApp, sequelize: sq });
  utils.success('Express Intialized');

};