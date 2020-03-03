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
const redisLoader = require('./redis');

module.exports = async () => {

  await sequelizeLoader();
  utils.success('Sequelize Intialized');

  await redisLoader();
  utils.success('Redis Initialized');
  
  await expressLoader();
  utils.success('Express Intialized');

};