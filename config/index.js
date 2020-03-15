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
    dev: {
      POSTGRESQL: {
        uri: "postgres://postgres:1234@localhost:5432/postgres"
      },
      REDIS: {
        uri: ""
      }
    },
    prod: {
      POSTGRESQL: {
        uri: process.env.DATABASE_URL
      },
      REDIS: {
        uri: process.env.REDIS_URL
      }
    }
  },
  api: {
    prefix: ""
  }
};