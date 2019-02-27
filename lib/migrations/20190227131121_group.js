module.exports = {
  async up(knex) {
    await knex.schema.createTable(`group`, (table) => {
      table.increments();
    });
  },

  async down(knex) {
    await knex.schema.dropTable(`group`);
  },
};
