const uuid = require('uuid')["v4"];
const { get, set } = require('lodash');

const { ORDER_STATUS, SUBMITTED } = require('./constants');
const { METHOD, POST, GET, PUT, PATCH, DELETE } = require('../../constants');
const G = require('../../../global');

const order = async (method, req, res) => {

  const {
    order_details,
    order_items
  } = G.SEQUELIZE.models;

  switch (method) {

    case METHOD[POST]: {
      const {
        restaurant_id,
        table_id,
        order_items: order
      } = req.body;

      const order_id = uuid();
      const orderDetails = {
        restaurant_id,
        table_id,
        order_id,
        status: ORDER_STATUS[SUBMITTED]
      };

      const orderItemsResp = await order_items.bulkCreate(order.map(i => set(i, 'order_id', order_id)));
      const orderCreateResp = await order_details.create(orderDetails);

      return {
        success: true,
        data: {
          ...get(orderCreateResp, 'dataValues', {}),
          "order_items": orderItemsResp.map((i) => get(i, 'dataValues', {}))
        }
      };
    } break;




    case METHOD[GET]: {
      const order_id = get(req.query, 'id') || get(req.params, 'id') || null;
      if (!Boolean(order_id)) { throw "Order ID missing"; }

      const orderCreateResp = await order_details.findByPk(order_id);
      const orderItemsResp = await order_items.findAll({ where: { order_id } });

      return {
        success: true,
        data: {
          ...get(orderCreateResp, 'dataValues', {}),
          "order_items": orderItemsResp.map((i) => get(i, 'dataValues', {}))
        }
      };
    } break;




    case METHOD[PATCH]: {
      const order_id = get(req.query, 'id') || get(req.params, 'id') || null;
      if (!Boolean(order_id)) { throw "Order ID missing"; }
      const status = get(req.body, 'status', null);

      if (status && ORDER_STATUS[status] === status) {
        await order_details.update({ status }, { where: { order_id } });
        return {
          success: true
        };
      } else {
        throw "Invalid status";
      }
    } break;




    default: { }
  };
};

module.exports = {
  order
};