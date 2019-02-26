require(`dotenv`).config();
const { merge } = require(`lodash`);
const db = require(`./db`);

const env = process.env.NODE_ENV || `development`;
const configs = {
  base: {
    env,
    db,
  },
  development: {
  },
  production: {},
};

const config = merge(configs.base, configs[env]);

module.exports = config;
