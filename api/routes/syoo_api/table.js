const uuid = require('uuid')["v4"];
const { Op } = require('sequelize');
const { get } = require('lodash');
const { METHOD, POST, GET, PUT, PATCH, DELETE } = require('../../constants');
const G = require('../../../global');

const table = async (method, req, res) => {

  const {
    table_details
  } = G.SEQUELIZE.models;

  switch (method) {

    case METHOD[POST]: {

      const tableDetails = { ...req.body };

      return {
        success: true,
        data: await table_details.create({ ...tableDetails, table_id: uuid() })
      }
    }; break;




    case METHOD[GET]: {
      const table_id = get(req.query, 'id') || get(req.params, 'id') || null;
      if (!Boolean(table_id)) { throw "Table ID missing"; }

      return {
        success: true,
        data: await table_details.findByPk(table_id)
      };
    } break;




    case METHOD[PUT]: {
      const table_id = get(req.query, 'id') || get(req.params, 'id') || null;
      if (!Boolean(table_id)) { throw "Table ID missing"; }

      const newTableDetails = { ...req.body };

      delete newTableDetails.table_id;
      delete newTableDetails.updatedAt;
      delete newTableDetails.createdAt;

      return {
        success: true,
        data: await table_details.update(newTableDetails, { where: { table_id } })
      }
    }; break;

    case METHOD[DELETE]: {
      const table_id = get(req.query, 'id') || get(req.params, 'id') || null;
      if (!Boolean(table_id)) { throw "Table ID missing"; }

      return {
        success: true,
        data: await table_details.destroy({ where: { table_id } })
      };
    } break;


    default: return ({});
  };
};

module.exports = {
  table
};