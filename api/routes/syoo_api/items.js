const { Op } = require('sequelize');
const { get } = require('lodash');
const utils = require("../../../utils");
const { METHOD, POST, GET, PUT, PATCH, DELETE } = require('../../constants');
const G = require('../../../global');

const items = async (method, req, res) => {

  const {
    item_details
  } = G.SEQUELIZE.models;

  switch (method) {

    case METHOD[GET]: {
      const restaurant_id = get(req.query, 'id') || get(req.params, 'id') || null;

      const REDIS_KEY = `SYOO_API:ITEMS:${restaurant_id}`;
      let ret = await G.REDIS.get(REDIS_KEY);
      if (ret) { utils.info("CACHED", REDIS_KEY); return JSON.parse(ret); }

      const items = await item_details.findAll({ where: { restaurant_id } });

      ret = {
        success: true,
        data: items.map(r => get(r, 'dataValues', {}))
      };

      await G.REDIS.set(REDIS_KEY, JSON.stringify(ret), "EX", 10 * 60);

      return ret;
    } break;




    default: return ({});
  };
};

module.exports = {
  items
};