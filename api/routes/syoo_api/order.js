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

      const REDIS_ORDERS_COUNT = `SYOO:ORDERS:COUNT:${restaurant_id}`;

      let ordersCount = await G.REDIS.get(REDIS_ORDERS_COUNT);
      if (ordersCount) {
        ordersCount = Number(ordersCount) + 1;
        await G.REDIS.incr(REDIS_ORDERS_COUNT);
      } else {
        ordersCount = await order_details.count({ where: { restaurant_id } }) + 1;
        await G.REDIS.set(REDIS_ORDERS_COUNT, String(ordersCount), "EX", 24 * 60 * 60);
      }

      orderDetails.order_no = ordersCount;

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




    case METHOD[PUT]: {
      const order_id = get(req.query, 'id') || get(req.params, 'id') || null;
      if (!Boolean(order_id)) { throw "Order ID missing"; }

      const {
        order_items: order
      } = req.body;

      for (item of order) {
        const { item_id } = item;

        delete item.item_id;
        delete item.updatedAt;
        delete item.createdAt;

        await order_items.update({ ...item }, { where: { order_id, item_id } });
      }

      return {
        success: true,
        data: {}
      };

    } break;




    default: { }
  };
};

module.exports = {
  order
};