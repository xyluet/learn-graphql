module.exports = {
  up: (knex) => {
    return knex.schema.createTable(`user`, (table) => {
      table.increments();
    });
  },

  down: (knex) => {
    return knex.schema.dropTable(`user`);
  },
};
