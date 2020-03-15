module.exports = (Sequelize, Datatypes) => (
  Sequelize.define("table_details", {
    restaurant_id: {
      type: Datatypes.UUID,
      allowNull: false
    },
    table_id: {
      type: Datatypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    table_name: {
      type: Datatypes.STRING,
      allowNull: false
    }
  })
);