const G = require('../global');
const { sequelize } = require('../config');


const sync = async () => {

  const PATH = "../models";

  //
  // ─────────────────────────────────────────────────────────── MODELS ───────
  //

  const models = {
    "syoo_api": [
      "order_details",
      "order_items",
      "restaurant_details",
      "item_details",
      "table_details"
    ],
  };

  //
  // ──────────────────────────────────────────────────────────────────────────
  //




  //
  // ────────────────────────────────────────────────────────── SYNCING ───────
  //

  for (service in models)
    for (route of models[service])
      await G.SEQUELIZE.import(`${PATH}/${service}/${route}`).sync(sequelize.sync);

  //
  // ──────────────────────────────────────────────────────────────────────────
  //

};

module.exports = {
  sync
};