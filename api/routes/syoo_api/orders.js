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

      // let ret = await G.REDIS.get(`SYOO_API:ORDERS:${restaurant_id}`);
      // if (ret) return JSON.parse(ret);

      const orderDetailsResp = await order_details.findAll({ where: { restaurant_id, status: "SUBMITTED" }, limit: 10 });
      if(orderDetailsResp.length === 0){
        return {
          success: true,
          data: []
        };
      }

      const data = {};
      const orderIds = [];

      orderDetailsResp.forEach(o => {
        const order = get(o, 'dataValues', {});
        data[order.order_id] = { ...order, order_items: [] };
        orderIds.push(order.order_id);
      });

      const orderItemsResp = await order_items.findAll({ where: { order_id: { [Op.or]: orderIds } } });

      orderItemsResp.forEach(i => {
        const { order_id, item_name, item_id, item_quantity, item_price } = get(i, 'dataValues', {});
        data[order_id].order_items.push({ item_name, item_id, item_quantity, item_price });
      });

      ret = {
        success: true,
        data: Object.values(data)
      };

      // await G.REDIS.set(`SYOO_API:ORDERS:${restaurant_id}`, JSON.stringify(ret), "EX", 5 * 60);

      return ret;
    } break;




    default: return ({});
  };
};

module.exports = {
  orders
};