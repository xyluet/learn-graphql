const { Application } = require(`./parents/Application`);
const { User } = require(`./models/User`);
const { db } = require(`./config/`);

const app = new Application();
app.use(async () => {
  User.knex(db);
  await User.query();
});

module.exports = { app };
