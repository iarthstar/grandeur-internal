/**
 * @file redis.js
 * @description redis js configuration
 * 
 * @author Arth Gajjar <iarthstar@gmail.com>
 */



// modules import
const Redis = require("ioredis");

const config = require('../config');
const G = require('../global');

module.exports = async () => {

  const { database: db, environment: env } = config;
  const { uri } = db[env].REDIS;

  G.REDIS = new Redis(uri);

};