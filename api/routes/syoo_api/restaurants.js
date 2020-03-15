const { Op } = require('sequelize');
const { get } = require('lodash');
const utils = require("../../../utils");
const { METHOD, POST, GET, PUT, PATCH, DELETE } = require('../../constants');
const G = require('../../../global');

const restaurants = async (method, req, res) => {

  const {
    restaurant_details
  } = G.SEQUELIZE.models;

  switch (method) {

    case METHOD[GET]: {
      // const REDIS_KEY = `SYOO_API:RESTAURANTS`;
      // let ret = await G.REDIS.get(REDIS_KEY);
      // if (ret) { utils.info("CACHED",REDIS_KEY); return JSON.parse(ret); }

      const restaurantsResp = await restaurant_details.findAll({ limit: 10 });

      ret = {
        success: true,
        data: restaurantsResp.map(r => get(r, 'dataValues', {}))
      };

      // await G.REDIS.set(REDIS_KEY, JSON.stringify(ret), "EX", 10 * 60);
      
      return ret;
    } break;




    default: return ({});
  };
};

module.exports = {
  restaurants
};