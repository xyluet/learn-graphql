const { db: knex } = require(`../lib/config`);
const [command] = process.argv.slice(2);
const Console = console;

class Migrator {
  constructor(db) {
    this.db = db;
  }

  latest(options) {
    return this.db.migrate.latest(options);
  }

  rollback(options) {
    return this.db.migrate.rollback(options);
  }

  destroy() {
    this.db.destroy();
  }
}
const migrator = new Migrator(knex);
const migrateConfig = {
  directory: `${__dirname}/../lib/migrations`,
};

(async () => {
  try {
    switch (command) {
      case `latest`:
        await migrator.latest(migrateConfig);
        break;
      case `rollback`:
        await migrator.rollback(migrateConfig);
        break;
      default:
        Console.error(`command not found. 'latest' or 'rollback'`);
        break;
    }
  } catch (error) {
    Console.error(error);
  } finally {
    await migrator.destroy();
  }
})();
