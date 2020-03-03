const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  environment: process.env.CURRENT_ENV || "dev",
  sequelize: {
    sync: {
      force: process.env.SEQUELIZE_FORCE || false
    }
  },
  server: {
    PORT: process.env.PORT || 8080,
  },
  database: {
    "dev": {
      POSTGRESQL: {
        "database": "postgres",
        "username": "postgres",
        "password": "1234",
        "host": "localhost"
      },
      REDIS: {}
    },
    "prod": {
      POSTGRESQL: {
        "uri": process.env.DB_POSTGRESQL_URI,
        "database": process.env.DB_POSTGRESQL_DATABASE,
        "username": process.env.DB_POSTGRESQL_USERNAME,
        "password": process.env.DB_POSTGRESQL_PASSWORD,
        "host": process.env.DB_POSTGRESQL_HOST
      },
      REDIS: {
        "uri": process.env.DB_REDIS_URI
      }
    }
  },
  api: {
    prefix: ""
  }
};