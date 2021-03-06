const { ColumnBuilder } = require(`../parents/builder`);
const helpers = require(`../helpers/function`);

module.exports = {
  async up(knex) {
    await knex.schema.createTable(`user`, (table) => {
      const columnBuilder = new ColumnBuilder(table);

      columnBuilder.primaryKey();
      columnBuilder.string(`first_name`);
      columnBuilder.string(`last_name`);
      table.integer(`age`);
      table.timestamp(`created_at`).defaultTo(helpers.now(knex));
      table.timestamp(`updated_at`).defaultTo(helpers.nowAndUpdateNow(knex));
    });
  },

  async down(knex) {
    await knex.schema.dropTable(`user`);
  },
};
