const { Op } = require('sequelize');
const { get } = require('lodash');
const { METHOD, POST, GET, PUT, PATCH, DELETE } = require('../../constants');
const G = require('../../../global');

const orders = async (method, req, res) => {

  const {
    order_details,
    order_items
  } = G.SEQUELIZE.models;

  switch (method) {

    case METHOD[POST]: return ({}); break;




    case METHOD[GET]: {
      const restaurant_id = get(req.query, 'id', '') || get(req.params, 'id', '');

      const orderDetailsResp = await order_details.findAll({ where: { restaurant_id }, limit: 10 });

      const data = {};
      const orderIds = [];

      orderDetailsResp.forEach(o => {
        const order = get(o, 'dataValues', {});
        data[order.order_id] = { ...order, order_items: [] };
        orderIds.push(order.order_id);
      });

      const orderItemsResp = await order_items.findAll({ where: { order_id: { [Op.or]: orderIds } } });

      orderItemsResp.forEach(i => {
        const { order_id, item_name, item_id, item_quantity } = get(i, 'dataValues', {});
        data[order_id].order_items.push({ item_name, item_id, item_quantity });
      });

      return {
        success: true,
        data: Object.values(data)
      };
    } break;




    default: return ({});
  };
};

module.exports = {
  orders
};