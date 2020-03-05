const uuid = require('uuid')["v4"];
const { Op } = require('sequelize');
const { get } = require('lodash');
const { METHOD, POST, GET, PUT, PATCH, DELETE } = require('../../constants');
const G = require('../../../global');

const restaurant = async (method, req, res) => {

  const {
    restaurant_details
  } = G.SEQUELIZE.models;

  switch (method) {

    case METHOD[POST]: {

      const restaurantDetails = { ...req.body };
      
      await G.REDIS.del(`SYOO_API:RESTAURANTS`);
      
      return {
        success: true,
        data: await restaurant_details.create({ ...restaurantDetails, restaurant_id: uuid() })
      }
    }; break;




    case METHOD[GET]: {
      const restaurant_id = get(req.query, 'id') || get(req.params, 'id') || null;
      if (!Boolean(restaurant_id)) { throw "Restaurant ID missing"; }

      return {
        success: true,
        data: await restaurant_details.findByPk(restaurant_id)
      };
    } break;




    case METHOD[PUT]: {
      const restaurant_id = get(req.query, 'id') || get(req.params, 'id') || null;
      if (!Boolean(restaurant_id)) { throw "Restaurant ID missing"; }

      const newRestaurantDetails = { ...req.body };

      delete newRestaurantDetails.restaurant_id;
      delete newRestaurantDetails.updatedAt;
      delete newRestaurantDetails.createdAt;

      await G.REDIS.del(`SYOO_API:RESTAURANTS`);

      return {
        success: true,
        data: await restaurant_details.update(newRestaurantDetails, { where: { restaurant_id } })
      }
    }; break;




    default: return ({});
  };
};

module.exports = {
  restaurant
};