const Knex = require(`knex`);

const db = Knex({
  client: `mysql2`,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
  },
  migrations: {
    directory: `../migrations`,
  },
});

module.exports = db;
