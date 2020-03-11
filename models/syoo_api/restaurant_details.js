module.exports = (Sequelize, Datatypes) => (
  Sequelize.define("restaurant_details", {
    restaurant_id: {
      type: Datatypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    restaurant_name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    restaurant_phone: {
      type: Datatypes.STRING,
      allowNull: false
    }
  })
);