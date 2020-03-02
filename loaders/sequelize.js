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

const init = async ({ sequelize }) => {

  const { database: db, environment: env } = config;
  const { database, username, password, host } = db[env];

  sequelize = new Sequelize(database, username, password, {
    dialect: 'postgres',
    host: host,
    logging: false
  });

  // sequelize psql connection
  await sequelize.authenticate();

  //
  // ────────────────────────────────────────────────────── SYOO MODELS ───────
  //
  const order_details = sequelize.import('../models/syoo_api/order_details');
  const order_items = sequelize.import('../models/syoo_api/order_items');
  const restaurant_details = sequelize.import('../models/syoo_api/restaurant_details');
  const item_details = sequelize.import('../models/syoo_api/item_details');

  const syncConfig = { force: config.sequelize.force };

  await order_details.sync(syncConfig);
  await order_items.sync(syncConfig);
  await restaurant_details.sync(syncConfig);
  await item_details.sync(syncConfig);
  //
  // ──────────────────────────────────────────────────────────────────────────
  //
  return sequelize;
};

module.exports = {
  init
};