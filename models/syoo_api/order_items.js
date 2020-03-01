module.exports = (Sequelize, Datatypes) => (
  Sequelize.define("order_items", {
    order_id: {
      type: Datatypes.UUID,
      allowNull: false
    },
    item_name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    item_id: {
      type: Datatypes.UUID,
      allowNull: false
    },
    item_quantity: {
      type: Datatypes.INTEGER,
      allowNull: false
    }
  })
);