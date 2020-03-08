const { Op } = require('sequelize');
const { get } = require('lodash');
const utils = require("../../../utils");
const { METHOD, POST, GET, PUT, PATCH, DELETE } = require('../../constants');
const G = require('../../../global');

const tables = async (method, req, res) => {

  const {
    table_details
  } = G.SEQUELIZE.models;

  switch (method) {

    case METHOD[GET]: {
      const restaurant_id = get(req.query, 'id') || get(req.params, 'id') || null;

      // const REDIS_KEY = `SYOO_API:ITEMS:${restaurant_id}`;
      // let ret = await G.REDIS.get(REDIS_KEY);
      // if (ret) { utils.info("CACHED", REDIS_KEY); return JSON.parse(ret); }

      const tables = await table_details.findAll({ where: { restaurant_id } });

      ret = {
        success: true,
        data: tables.map(r => get(r, 'dataValues', {}))
      };

      // await G.REDIS.set(REDIS_KEY, JSON.stringify(ret), "EX", 10 * 60);

      return ret;
    } break;




    default: return ({});
  };
};

module.exports = {
  tables
};