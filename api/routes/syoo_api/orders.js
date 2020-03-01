const { get } = require('lodash');
const {
  METHOD,
  POST,
  GET,
  PUT,
  PATCH,
  DELETE
} = require('../../constants');

const orders = async (method, req, res, { sequelize }) => {

  switch (method) {

    case METHOD[POST]: break;




    case METHOD[GET]: {
      const restaurant_id = get(req.query, 'id', '') || get(req.params, 'id', '');

      const joinedResp = await sequelize.query(`SELECT *
      FROM order_details
      FULL OUTER JOIN order_items
      ON order_details.order_id = order_items.order_id
      WHERE order_details.restaurant_id='${restaurant_id}'
      LIMIT 10;`);

      let data = {};

      get(joinedResp, '0', []).map(item => {
        if (data.hasOwnProperty(item.order_id)) {
          data[item.order_id].push(item);
        } else {
          data[item.order_id] = [item];
        }
      });

      data = Object.keys(data).map(key => ({
        order_id: key,
        restaurant_id: restaurant_id,
        table_id: data[key][0].table_id,
        order_items: data[key].map(({ item_name, item_id, item_quantity }) => ({ item_name, item_id, item_quantity }))
      }));

      return {
        success: true,
        data
      };
    } break;




    default: { }
  };
};

module.exports = {
  orders
};