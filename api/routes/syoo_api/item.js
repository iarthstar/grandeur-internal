const uuid = require('uuid')["v4"];
const { Op } = require('sequelize');
const { get } = require('lodash');
const { METHOD, POST, GET, PUT, PATCH, DELETE } = require('../../constants');

const item = async (method, req, res, { sequelize }) => {

  const {
    item_details
  } = sequelize.models;

  switch (method) {

    case METHOD[POST]: {

      const itemDetails = { ...req.body };

      return {
        success: true,
        data: await item_details.create({ ...itemDetails, item_id: uuid() })
      }
    }; break;




    case METHOD[GET]: {
      const item_id = get(req.query, 'id') || get(req.params, 'id') || null;
      if (!Boolean(item_id)) { throw "Item ID missing"; }

      return {
        success: true,
        data: await item_details.findByPk(item_id)
      };
    } break;




    case METHOD[PUT]: {
      const newItemDetails = { ...req.body };
      const { item_id } = newItemDetails;

      delete newItemDetails.item_id;
      delete newItemDetails.updatedAt;
      delete newItemDetails.createdAt;

      return {
        success: true,
        data: await item_details.update({ ...newItemDetails }, { where: { item_id } })
      }
    }; break;




    default: return ({});
  };
};

module.exports = {
  item
};