const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  environment: process.env.CURRENT_ENV || "dev",
  sequelize: {
    force: process.env.SEQUELIZE_FORCE || false
  },
  server: {
    PORT: process.env.PORT || 8080,
  },
  database: {
    "dev": {
      "database": "postgres",
      "username": "postgres",
      "password": "1234",
      "host": "localhost"
    },
    "prod": {
      "database": process.env.DB_DATABASE,
      "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "host": process.env.DB_HOST
    }
  },
  api: {
    prefix: ""
  }
}