module.exports = (Sequelize, Datatypes) => (
  Sequelize.define("order_details", {
    order_id: {
      type: Datatypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    order_no: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    restaurant_id: {
      type: Datatypes.UUID,
      allowNull: false,
    },
    table_id: {
      type: Datatypes.UUID,
      allowNull: false
    },
    table_name: {
      type: Datatypes.STRING,
      allowNull: false
    },
    status: {
      type: Datatypes.STRING,
      allowNull: false
    }
  })
);