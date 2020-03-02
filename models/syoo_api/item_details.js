module.exports = (Sequelize, Datatypes) => (
  Sequelize.define("item_details", {
    restaurant_id: {
      type: Datatypes.UUID,
      allowNull: false
    },
    item_id: {
      type: Datatypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    item_name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    item_price: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    item_section: {
      type: Datatypes.STRING,
      allowNull: false
    }
  })
);