const { ColumnBuilder } = require(`../parents/builder`);
const helpers = require(`../helpers/function`);

module.exports = {
  async up(knex) {
    await knex.schema.createTable(`user_group`, (table) => {
      const columnBuilder = new ColumnBuilder(table);
      columnBuilder.primaryKey();
      columnBuilder.foreignKey(`user_id`);
      columnBuilder.foreignKey(`group_id`);
      table.timestamp(`created_at`).defaultTo(helpers.now(knex));
      table.timestamp(`updated_at`).defaultTo(helpers.nowAndUpdateNow(knex));
      table.index(`user_id`);
      table.index(`group_id`);
    });
  },

  async down(knex) {
    await knex.schema.dropTable(`user_group`);
  },
};
