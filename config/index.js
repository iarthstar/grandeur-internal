const dotenv = require('dotenv');

dotenv.config();

const DEVELOPMENT = "development";
const LOCALHOST = "localhost";
const STAGING = "staging";
const PRODUCTION = "production";

const Environments = {
  [LOCALHOST]: LOCALHOST,
  [DEVELOPMENT]: DEVELOPMENT,
  [STAGING]: STAGING,
  [PRODUCTION]: PRODUCTION
};

const PSQL_USERNAME = process.env.PSQL_USERNAME || "postgres";
const PSQL_PASSWORD = process.env.PSQL_PASSWORD || "1234";
const PSQL_DATABASE = process.env.PSQL_DATABASE || "postgres";
const PSQL_HOST = process.env.PSQL_HOST || "localhost";
const PSQL_PORT = process.env.PSQL_PORT || "5432";

const PSQL_URI = process.env.PSQL_URI || `postgres://${PSQL_USERNAME}:${PSQL_PASSWORD}@${PSQL_HOST}:${PSQL_PORT}/${PSQL_DATABASE}`;

const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "";
const REDIS_DATABASE = process.env.REDIS_DATABASE || "0";
const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || "6379";

const REDIS_URI = process.env.REDIS_URI || `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}/${REDIS_DATABASE}`;

module.exports = {
  environment: process.env.CURRENT_ENV || Environments[DEVELOPMENT],
  sequelize: {
    sync: {
      force: process.env.SEQUELIZE_FORCE || false
    }
  },
  server: {
    PORT: process.env.PORT || 8080,
  },
  database: {
    [LOCALHOST]: {
      POSTGRESQL: {
        uri: PSQL_URI
      },
      REDIS: {
        uri: REDIS_URI
      }
    },
    [DEVELOPMENT]: {
      POSTGRESQL: {
        uri: process.env.DATABASE_URL
      },
      REDIS: {
        uri: process.env.REDIS_URL
      }
    },
    [STAGING]: {
      POSTGRESQL: {
        uri: process.env.DATABASE_URL
      },
      REDIS: {
        uri: process.env.REDIS_URL
      }
    },
    [PRODUCTION]: {
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